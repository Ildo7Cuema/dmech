<template>
  <q-page class="q-pt-md">
    <loading-component2 :load="show" />
    <q-card class="q-pb-sm" bordered style="border-radius: 0">
      <q-card-section>
        <span class="text-subtitle2">Filtrar Pauta</span>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="fetchPauta">
          <div class="row">
            <q-select
              dense
              v-model="form.classe_id"
              :options="optionsClasse"
              label="Selecione a classe"
              class="col-2"
              option-value="id"
              option-label="nome_classe"
              map-options
              emit-value
            />
            <q-select
              dense
              v-model="form.turma_id"
              :options="optionsTurma"
              label="Selecione a turma"
              class="col-2"
              option-value="id"
              option-label="nome_turma"
              map-options
              emit-value
            />
            <q-select
              dense
              v-model="form.curso_id"
              :options="optionsCurso"
              label="Selecione o curso"
              class="col-2"
              option-value="id"
              option-label="nome_curso"
              map-options
              emit-value
            />
            <q-select
              dense
              v-model="form.periodo_id"
              :options="optionsPeriodo"
              label="Selecione o período"
              class="col-2"
              option-value="id"
              option-label="nome_periodo"
              map-options
              emit-value
            />
            <q-select
              dense
              v-model="form.ano_lectivo"
              :options="optionsAnoLectivo"
              label="Selecione o ano lectivo"
              class="col-2"
              option-value="id"
              option-label="ano_lectivo"
              map-options
              emit-value
            />
            <div class="col-2">
              <q-btn
                type="submit"
                label="Filtrar"
                icon="mdi-file-search-outline"
                no-caps
                class="q-pt-sm q-ml-sm"
                outline
                style="color: goldenrod; margin-top: 4px"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-table
      :rows="tableData.rows"
      dense
      row-key="nome"
      :filter="filter"
      bordered
      :separator="Cell"
      style="border-radius: 0"
      v-if="showPauta && show == false"
    >
      <template v-slot:top-right>
        <q-input
          color="primary"
          v-model="filter"
          lable="Pesquisar"
          placeholder="Pesquisar"
          dense
          outlined
          class="q-mr-sm"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-left>
        <span class="text-h5 text-red-10">PAUTA</span>
      </template>

      <!-- Custom Header Slot with Multi-line Header -->
      <template v-slot:header>
        <q-tr>
          <!-- First Row for Discipline Names -->
          <q-th rowspan="2">Nº</q-th>
          <q-th rowspan="2">NOME DE ALUNOS</q-th>
          <q-th rowspan="2">GÊN.</q-th>
          <q-th
            v-for="col in disciplineHeaderColumns"
            :key="'discipline_' + col.name"
            :colspan="col.colspan"
            align="center"
          >
            {{ col.label }}
          </q-th>
          <q-th rowspan="2">OBSERVAÇÃO</q-th>
        </q-tr>
        <q-tr style="background-color: #f5f5f5">
          <!-- Second Row for Field Names -->
          <q-th
            v-for="col in fieldHeaderColumns"
            :key="'fields_' + col.name"
            align="center"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props" :style="[getTextAlignment(props), bgColor(props)]">
          <span v-if="isMF(props.col.field)" :style="corValor(props)">
            <q-span v-if="props.row[props.col.field] !== '-'">
              {{ props.row[props.col.field] || "-" }}
            </q-span>
            <span v-else>-</span>
          </span>
          <span v-else :style="corValor(props)">
            {{ props.row[props.col.field] || "-" }}
          </span>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import useSupabase from "src/boot/supabase";
//import userApi from "src/composible/userApi";
import userAuthUser from "src/composible/userAuthUser";
import { useEscolaStore } from "src/stores/escolas";
import { useClasseStore } from "src/stores/classes";
import { useTurmaStore } from "src/stores/turmas";
import { usePeriodoStore } from "src/stores/periodos";
import { useCursoStore } from "src/stores/cursos";
import { useAnoLectivoStore } from "src/stores/ano_lectivo";
import loadingComponent2 from "src/components/loading/loadingComponent2.vue";
import usenotification from "src/composible/useNotify";

export default {
  name: "Pauta-Componente",
  components: { loadingComponent2 },
  setup() {
    const filter = ref("");
    const { supabase } = useSupabase();
    const { user } = userAuthUser();
    const { getEscolaByEmail } = useEscolaStore();
    const tableData = ref({ columns: [], rows: [] });
    const optionsClasse = ref([]);
    const optionsTurma = ref([]);
    const optionsCurso = ref([]);
    const optionsPeriodo = ref([]);
    const optionsAnoLectivo = ref([]);
    const { notifyError } = usenotification();

    const { getAllClasses } = useClasseStore();
    const { getAllTurmas } = useTurmaStore();
    const { getAllPeriodos } = usePeriodoStore();
    const { getAllCursos } = useCursoStore();
    const { getAllAnoLectivo } = useAnoLectivoStore();

    const show = ref(false);
    const showPauta = ref(false);

    const form = ref({
      classe_id: null,
      turma_id: null,
      curso_id: null,
      periodo_id: null,
      ano_lectivo: "",
    });

    // Computed properties for headers
    const disciplineHeaderColumns = computed(() => {
      return tableData.value.columns.filter((col) => col.isDisciplineHeader);
    });

    const fieldHeaderColumns = computed(() => {
      return tableData.value.columns.filter((col) => col.isFieldHeader);
    });

    const Cell = "cell";
    const disciplinasDB = ref([]);
    const fetchPauta = async () => {
      try {
        show.value = true;
        const { data, error } = await supabase
          .from("pauta") // Nome da tabela
          .select(
            `
          *,
          alunos:aluno_id(nome, genero),
          disciplinas:disciplina_id(nome_disciplina),
          mt1, mt2, mt3, mfd, mf, ne, mec
        `
          )
          .eq("classe_id", form.value.classe_id)
          .eq("turma_id", form.value.turma_id)
          .eq("curso_id", form.value.curso_id)
          .eq("periodo_id", form.value.periodo_id)
          .eq("ano_lectivo", form.value.ano_lectivo.ano_lectivo);

        if (error) {
          console.error("Erro ao buscar dados:", error);
          return;
        }

        const pauta = {};
        const disciplines = new Set();

        if (data.length == 0) {
          notifyError(
            "Não há dados para exibir na pauta com o filtro selecionado"
          );
          show.value = false;
          return;
        }

        data.forEach(
          ({ alunos, disciplinas, mt1, mt2, mt3, mfd, mf, ne, mec }) => {
            const key = alunos.nome;

            if (!pauta[key]) {
              pauta[key] = {
                nome: alunos.nome,
                genero: alunos.genero === "masculino" ? "M" : "F",
              };
            }

            const disciplineName = disciplinas.nome_disciplina;
            disciplinasDB.value.push(disciplinas.nome_disciplina);
            if (
              ["Língua Portuguesa", "Inglês", "Francês"].includes(
                disciplineName
              )
            ) {
              pauta[key][`${disciplineName}_MT1`] = mt1;
              pauta[key][`${disciplineName}_MT2`] = mt2;
              pauta[key][`${disciplineName}_MT3`] = mt3;
              pauta[key][`${disciplineName}_MFD`] = mfd;
              pauta[key][`${disciplineName}_MEC`] = mec;
              pauta[key][`${disciplineName}_MF`] = mf;
            } else {
              pauta[key][`${disciplineName}_MT1`] = mt1;
              pauta[key][`${disciplineName}_MT2`] = mt2;
              pauta[key][`${disciplineName}_MT3`] = mt3;
              pauta[key][`${disciplineName}_MFD`] = mfd;
              pauta[key][`${disciplineName}_NE`] = ne;
              pauta[key][`${disciplineName}_MF`] = mf;
            }

            disciplines.add(disciplineName);
          }
        );

        const columns = [
          {
            name: "order",
            label: "Nº",
            align: "center",
            field: "order",
            sortable: false,
            colspan: 1,
          },
          {
            name: "genero",
            label: "Gênero",
            align: "center",
            field: "genero",
            sortable: true,
            colspan: 1,
          },
          {
            name: "nome",
            label: "Nome do Aluno",
            align: "left",
            field: "nome",
            sortable: true,
            colspan: 1,
          },
        ];

        disciplines.forEach((discipline) => {
          const isLanguageSubject = [
            "Língua Portuguesa",
            "Inglês",
            "Francês",
          ].includes(discipline);

          const colspan = isLanguageSubject ? 6 : 6;

          // Adiciona cabeçalho da disciplina
          columns.push({
            name: `${discipline}_header`,
            label: discipline,
            align: "center",
            field: () => "", // Campo fictício para cabeçalho
            colspan,
            isDisciplineHeader: true,
            isFieldHeader: false,
            sortable: false,
          });

          // Adiciona colunas para MT1, MT2, MT3, MFD, MEC (se aplicável) e MF
          columns.push({
            name: `${discipline}_MT1`,
            label: "MT1",
            align: "center",
            field: (row) => row[`${discipline}_MT1`] || "-",
            sortable: true,
            isDisciplineHeader: false,
            isFieldHeader: true,
          });
          columns.push({
            name: `${discipline}_MT2`,
            label: "MT2",
            align: "center",
            field: (row) => row[`${discipline}_MT2`] || "-",
            sortable: true,
            isDisciplineHeader: false,
            isFieldHeader: true,
          });
          columns.push({
            name: `${discipline}_MT3`,
            label: "MT3",
            align: "center",
            field: (row) => row[`${discipline}_MT3`] || "-",
            sortable: true,
            isDisciplineHeader: false,
            isFieldHeader: true,
          });
          columns.push({
            name: `${discipline}_MFD`,
            label: "MFD",
            align: "center",
            field: (row) => row[`${discipline}_MFD`] || "-",
            sortable: true,
            isDisciplineHeader: false,
            isFieldHeader: true,
          });

          if (isLanguageSubject) {
            columns.push({
              name: `${discipline}_MEC`,
              label: "MEC",
              align: "center",
              field: (row) => row[`${discipline}_MEC`] || "-",
              sortable: true,
              isDisciplineHeader: false,
              isFieldHeader: true,
            });
          }
          if (!isLanguageSubject) {
            columns.push({
              name: `${discipline}_NE`,
              label: "NE",
              align: "center",
              field: (row) => row[`${discipline}_NE`] || "-",
              sortable: true,
              isDisciplineHeader: false,
              isFieldHeader: true,
            });
          }
          columns.push({
            name: `${discipline}_MF`,
            label: "MF",
            align: "center",
            field: (row) => row[`${discipline}_MF`] || "-",
            sortable: true,
            isDisciplineHeader: false,
            isFieldHeader: true,
          });
        });

        // Adiciona o número de ordem
        //adicionar compo observação com resultado de transita não transita caso os campos mt1 seja todos igual a 9.45 ou maior
        /*const rows = Object.values(pauta).map((row, index) => ({
          order: index + 1,
          ...row,
        }));
*/
        /*  const rows = Object.values(pauta).map((row, index) => {
          // Verifica se todos os campos que terminam com _MT1 são >= 9.45
          const all_MF_FieldsGreaterOrEqualThan945 = Object.keys(row)
            .filter((key) => key.endsWith("_MF"))
            .every((key) => row[key] >= 9.45);

          return {
            order: index + 1,
            ...row,
            observacao: all_MF_FieldsGreaterOrEqualThan945
              ? "TRANSITA"
              : "NÃO TRANSITA",
          };
        });
*/

        /**
         * Pronpt do ChatGpt
         *
         * neste codigo, no resultado da observação pretendo que seja mais aprofundado,
         * pretendo atribuir os seguintes resultados: se todos os campos que terminam em _MF
         * forem maior ou igual 9.45 deve Transintar, se em todos os campos que terminam em _MF
         * forem menor que 9.45 então não transita, se forem mais de  3 campos que terminam em _MF
         * e terem menor ou igual 9.44 não Transita, se 3 campos que terminam com _MF tiverem menor que 9.45
         * e um valor abaixo ou igual a 7.44, não transita
         */
        const rows = Object.values(pauta).map((row, index) => {
          // Obtém todas as chaves que terminam com _MF
          const mfKeys = Object.keys(row).filter((key) => key.endsWith("_MF"));

          // Verifica se todos os campos _MF são >= 9.45
          const all_MF_FieldsGreaterOrEqualThan945 = mfKeys.every(
            (key) => row[key] >= 9.45
          );

          // Verifica se todos os campos _MF são < 9.45
          const all_MF_FieldsLessThan945 = mfKeys.every(
            (key) => row[key] < 9.45
          );

          // Conta quantos campos _MF são <= 9.44
          const count_MF_FieldsLessOrEqualThan944 = mfKeys.filter(
            (key) => row[key] <= 9.44
          ).length;

          // Conta quantos campos _MF são < 9.45
          const count_MF_FieldsLessThan945 = mfKeys.filter(
            (key) => row[key] < 9.45
          ).length;

          // Verifica se existe algum campo _MF <= 7.44
          const any_MF_FieldsLessOrEqualThan744 = mfKeys.some(
            (key) => row[key] <= 7.44
          );

          // Determina a observação com base nas condições
          let observacao = "NÃO TRANSITA"; // Default

          if (all_MF_FieldsGreaterOrEqualThan945) {
            observacao = "TRANSITA";
          } else if (all_MF_FieldsLessThan945) {
            observacao = "NÃO TRANSITA";
          } else if (count_MF_FieldsLessOrEqualThan944 > 3) {
            observacao = "NÃO TRANSITA";
          } else if (
            count_MF_FieldsLessThan945 >= 3 &&
            any_MF_FieldsLessOrEqualThan744
          ) {
            observacao = "NÃO TRANSITA";
          }

          return {
            order: index + 1,
            ...row,
            observacao,
          };
        });

        tableData.value = { columns, rows };

        console.log(tableData.value.rows);
        showPauta.value = true;
      } catch (error) {
        console.log(error);
      } finally {
        show.value = false;
      }
    };

    onMounted(async () => {
      //fetchPauta();
      await getEscolaByEmail("escolas", user.value.email).then(async (item) => {
        //Buscar classes que pertencem a esta escola
        try {
          show.value = true;
          optionsClasse.value = await getAllClasses(item);
          optionsTurma.value = await getAllTurmas(item);
          optionsPeriodo.value = await getAllPeriodos(item);
          optionsAnoLectivo.value = await getAllAnoLectivo(item);
          optionsCurso.value = await getAllCursos(item);
        } catch (error) {
        } finally {
          show.value = false;
        }
      });
    });

    const isMF = (field) => {
      return typeof field === "string" && field.includes("MF");
    };

    // Função para determinar o alinhamento do texto
    const getTextAlignment = (props) => {
      const value = props.row[props.col.field];
      // Alinha ao centro se o valor da célula for número ou "-". Alinha à esquerda para textos.
      const isNumberOrDash =
        !isNaN(value) || value === "-" || value === "M" || value === "F";
      return isNumberOrDash ? "text-align: center" : "text-align: left";
    };

    //Atribuir cor nas notas de acordo se valor é maior ou não com 9.45
    const corValor = (props) => {
      const value = props.row[props.col.field];
      if (value >= 9.45) {
        return "color: blue";
      } else if (value <= 9.44 && props.col.name !== "order") {
        return "color:red";
      }
    };

    const bgColor = (props) => {
      //console.log(disciplinasDB.value);
      const fieldName = props.col.name;
      // Lista de sufixos desejados
      const suffixes = ["_MF", "_MFD", "_MEC", "_NE"];
      // Adiciona cada sufixo a cada disciplina para formar os nomes das colunas
      const columnNames = disciplinasDB.value.flatMap((discipline) =>
        suffixes.map((suffix) => `${discipline}${suffix}`)
      );
      if (columnNames.includes(fieldName)) {
        return "background-color: #f5f5f5"; // Define a cor de fundo desejada
      }
    };

    return {
      tableData,
      filter,
      isMF,
      disciplineHeaderColumns,
      fieldHeaderColumns,
      Cell,
      getTextAlignment,

      optionsClasse,
      optionsTurma,
      optionsCurso,
      optionsPeriodo,
      optionsAnoLectivo,
      form,
      show,
      fetchPauta,
      showPauta,
      corValor,
      bgColor,
      disciplinasDB,
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados, se necessário */
</style>
