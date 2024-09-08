<template>
  <q-page>
    <loading-component :show="loading" />
    <loading-component2 :load="show" />
    <div class="row q-mt-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-subtitle2">
              Filtro de pesquisa de <b class="text-red">Mini-Pautas</b>
              <q-icon
                class="q-ml-md"
                size="lg"
                color="green-10"
                name="mdi-microsoft-excel"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-select
              flat
              dense
              v-model="searchForm.docente_id"
              label="Selecione o(a) Docente para filtrar sua mini-pauta"
              option-value="id"
              option-label="name"
              :options="docentes"
              emit-value
              map-options
              :rules="[
                (val) =>
                  !!val || 'Selecione um docente para buscar a mini-pauta',
              ]"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-form @submit.prevent="hendleMiniPaulta" v-if="showFilter">
      <div class="row q-mt-md bg-green-10 text-white">
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.cursoID"
            label="Seleciona o curso"
            option-value="id"
            option-label="nome_curso"
            :options="cursos"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione o curso']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.classeID"
            :options="classes"
            label="Seleciona a classe"
            option-value="id"
            option-label="nome_classe"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione a classe']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.turmaID"
            :options="turmas"
            label="Seleciona a turma"
            option-value="id"
            option-label="nome_turma"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione a turma']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.periodoID"
            :options="periodos"
            label="Seleciona o período"
            option-value="id"
            option-label="nome_periodo"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione o período']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.anoLectivo"
            :options="anosLectivos"
            label="Seleciona o ano lectivo"
            option-value="id"
            option-label="ano_lectivo"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione o ano lectivo']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.disciplinaID"
            :options="disciplinas"
            label="Seleciona uma disciplina"
            option-value="id"
            option-label="nome_disciplina"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione a disciplina']"
          />
        </div>
        <div class="col-12 flex flex-center item-center q-mb-sm">
          <q-btn
            outline
            type="submit"
            dark
            label="buscar"
            icon="mdi-text-box-search-outline"
            size="sm"
            align="center"
            class="flex item-center"
          />
        </div>
      </div>
    </q-form>
    <br />
    <!--
    <mini-pauta-component
      :dataMiniPautas="miniPauta"
      :nome_docente="nome_docente"
      :genero="genero"
      v-if="showMiniPauta"
    />
    -->

    <q-table
      :rows="tableData.rows"
      dense
      row-key="nome"
      :filter="filter"
      bordered
      :separator="Cell"
      style="border-radius: 0"
      v-if="showMiniPauta && show == false"
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
        <span class="text-h5 text-red-10">MINI-PAUTA</span>
      </template>

      <!-- Custom Header Slot with Multi-line Header -->
      <template v-slot:header>
        <q-tr>
          <!-- First Row for Discipline Names -->
          <q-th rowspan="2">Nº</q-th>
          <q-th rowspan="2">NOME DE ALUNOS</q-th>
          <q-th rowspan="2">GÊN.</q-th>
          <q-th
            v-for="col in trimestreHeaderColumns"
            :key="'discipline_' + col.name"
            :colspan="col.colspan"
            align="center"
          >
            {{ col.label }}
          </q-th>
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
import { ref, onMounted, computed, watch } from "vue";
import userAuthUser from "src/composible/userAuthUser";
import { useEscolaStore } from "src/stores/escolas";

import { useCursoStore } from "src/stores/cursos";
import { useClasseStore } from "src/stores/classes";
import { useTurmaStore } from "src/stores/turmas";
import { usePeriodoStore } from "src/stores/periodos";
import { useDisciplinaStore } from "src/stores/disciplinas";
import { useAnoLectivoStore } from "src/stores/ano_lectivo";
import loadingComponent from "src/components/loading/loadingComponent.vue";
import loadingComponent2 from "src/components/loading/loadingComponent2.vue";
import { useNotasStore } from "src/stores/notas";
import usenotification from "src/composible/useNotify";
//import miniPautaComponent from "src/components/mini-pautas/mini-pautasComponent.vue";
import { useMiniPautaStore } from "src/stores/mini-pautas";
import { useFuncionarioStore } from "src/stores/funcionarios";
import { useTurmasProf } from "src/stores/add_turmas_profs";
import { useAdd_Nota_Miniauta_Store } from "src/stores/add_notas";

export default {
  name: "MiniPauta",
  components: { loadingComponent, loadingComponent2 /*miniPautaComponent*/ },
  setup() {
    const { user } = userAuthUser();
    const { getEscolaByEmail } = useEscolaStore();
    const { getAllCursos } = useCursoStore();
    const { getAllClasses } = useClasseStore();
    const { getAllTurmas } = useTurmaStore();
    const { getAllPeriodos } = usePeriodoStore();
    const { getAllDisciplinas } = useDisciplinaStore();
    const { getAllAnoLectivo } = useAnoLectivoStore();
    const { getMiniPautas } = useNotasStore();
    const { notifyError, notifySuccess } = usenotification();
    const { getNotas } = useMiniPautaStore();
    const { getFuncionariosEscola, getFuncionarioNameById } =
      useFuncionarioStore();
    const {
      getDocente_disciplinas,
      getDocente_classes,
      getDocente_turmas,
      getDocente_cursos,
      getDocente_periodos,
    } = useTurmasProf();

    const filter = ref("");

    const { getMiniPauta } = useAdd_Nota_Miniauta_Store();

    const loading = ref(false);
    const carrearMiniPauta = ref(false);
    const showMiniPauta = ref(false);
    const showFilter = ref(false);
    const tableData = ref({ columns: [], rows: [] });
    const show = ref(false);

    const cursos = ref([]);
    const docentes = ref([]);
    const classes = ref([]);
    const turmas = ref([]);
    const periodos = ref([]);
    const disciplinas = ref([]);
    const anosLectivos = ref([]);
    const miniPauta = ref([]);
    const searchForm = ref({
      docente_id: "",
      escolaId: "",
      cursoID: "",
      classeID: "",
      turmaID: "",
      periodoID: "",
      anoLectivo: "",
      disciplinaID: "",
    });

    const trimestreHeaderColumns = computed(() => {
      return tableData.value.columns.filter((col) => col.isTrimestreHeader);
    });

    const fieldHeaderColumns = computed(() => {
      return tableData.value.columns.filter((col) => col.isFieldHeader);
    });

    const nome_docente = ref("");
    const genero = ref("");

    onMounted(() => {
      escola();
    });

    //cria uma função para retornar o id da escola
    const escola = async () => {
      try {
        loading.value = true;
        await getEscolaByEmail("escolas", user.value.email).then((idEscola) => {
          searchForm.value.escolaId = idEscola;
          //carregar os fucionarios da escola
          getFuncionariosEscola(
            "funcionarios",
            user.value.user_metadata.organization_id,
            idEscola
          ).then((res) => {
            console.log(res);
            docentes.value = res;
          });
        });
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    watch(
      () => searchForm.value.docente_id,
      async (newValue) => {
        try {
          if (newValue) {
            loading.value = true;
            const { escolaId } = searchForm.value;
            //carregar cursos onde o docente leciona
            const n_cursos = await getDocente_cursos(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            cursos.value = n_cursos.map((c) => ({
              id: c.cursos.id,
              nome_curso: c.cursos.nome_curso,
            }));

            //carregar classes onde o docente leciona
            const n_classes = await getDocente_classes(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            classes.value = n_classes.map((c) => ({
              id: c.classes.id,
              nome_classe: c.classes.nome_classe,
            }));

            //carregar turmas onde o docente leciona
            const n_turmas = await getDocente_turmas(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            turmas.value = n_turmas.map((c) => ({
              id: c.turmas.id,
              nome_turma: c.turmas.nome_turma,
            }));

            //carregar periodos onde o docente leciona
            const n_periodos = await getDocente_periodos(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            periodos.value = n_periodos.map((c) => ({
              id: c.periodos.id,
              nome_periodo: c.periodos.nome_periodo,
            }));

            //carregar disciplinas onde o docente leciona
            const n_disciplinas = await getDocente_disciplinas(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            disciplinas.value = n_disciplinas.map((c) => ({
              id: c.disciplinas.id,
              nome_disciplina: c.disciplinas.nome_disciplina,
            }));

            await getAllAnoLectivo(escolaId).then((res) => {
              console.log(res);
              anosLectivos.value = res;
            });

            //buscar o nome do docente

            await getFuncionarioNameById("funcionarios", newValue).then(
              (item) => {
                console.log("Docente", item);
                nome_docente.value = item[0].name;
                genero.value = item[0].genero;
              }
            );
          }
          showFilter.value = true;
        } catch (error) {
          console.log(error.message);
        } finally {
          loading.value = false;
        }
      }
    );

    const Cell = "cell";
    const TrimestresDBT = ref([]);
    const hendleMiniPaulta = async () => {
      try {
        carrearMiniPauta.value = true;
        const {
          escolaId,
          cursoID,
          classeID,
          turmaID,
          periodoID,
          anoLectivo,
          disciplinaID,
        } = searchForm.value;
        const data = await getMiniPauta(
          escolaId,
          cursoID,
          classeID,
          turmaID,
          periodoID,
          anoLectivo,
          disciplinaID
        );
        console.log(miniPauta.value);
        const mini_pauta = {};
        const trimestres = new Set();
        const disciplinasDB = new Set();
        data.forEach(
          ({
            alunos,
            trimestre,
            disciplinas,
            mac,
            npp,
            npt,
            mt,
            nee,
            neo,
            mec,
            mfd,
            ne,
            mf,
          }) => {
            const key = alunos.nome;
            if (!mini_pauta[key]) {
              mini_pauta[key] = {
                nome: alunos.nome,
                genero: alunos.genero === "masculino" ? "M" : "F",
              };
            }

            const trimestreName = trimestre;
            const disciplinaName = disciplinas.nome_disciplina;
            TrimestresDBT.value.push(trimestreName);
            if (
              ["III Trimestre"].includes(trimestreName) &&
              ["Língua Portuguesa", "Inglês", "Francês"].includes(
                disciplinaName
              )
            ) {
              mini_pauta[key][`${trimestreName}_MAC`] = mac;
              mini_pauta[key][`${trimestreName}_NPP`] = npp;
              mini_pauta[key][`${trimestreName}_MT`] = mt;
              mini_pauta[key][`${trimestreName}_MFD`] = mfd;
              mini_pauta[key][`${trimestreName}_NEE`] = nee;
              mini_pauta[key][`${trimestreName}_NEO`] = neo;
              mini_pauta[key][`${trimestreName}_MEC`] = mec;
              mini_pauta[key][`${trimestreName}_MF`] = mf;
            } else if (["III Trimestre"].includes(trimestreName)) {
              mini_pauta[key][`${trimestreName}_MAC`] = mac;
              mini_pauta[key][`${trimestreName}_NPP`] = npp;
              mini_pauta[key][`${trimestreName}_MT`] = mt;
              mini_pauta[key][`${trimestreName}_MFD`] = mfd;
              mini_pauta[key][`${trimestreName}_NE`] = ne;
              mini_pauta[key][`${trimestreName}_MF`] = mf;
            } else {
              mini_pauta[key][`${trimestreName}_MAC`] = mac;
              mini_pauta[key][`${trimestreName}_NPP`] = npp;
              mini_pauta[key][`${trimestreName}_NPT`] = npt;
              mini_pauta[key][`${trimestreName}_MT`] = mt;
            }

            trimestres.add(trimestreName);
            disciplinasDB.add(disciplinaName);
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

        // Adiciona cabeçalho da disciplina
        trimestres.forEach((trimestre) => {
          const isTrimestreSubjet = ["III Trimestre"].includes(trimestre);
          disciplinasDB.forEach((disciplinas) => {
            const isDisciplinaSubject = [
              "Língua Portuguesa",
              "Inglês",
              "Francês",
            ].includes(disciplinas);
            const colspan = 4;
            columns.push({
              name: `${trimestre}_header`,
              label: trimestre,
              align: "center",
              field: () => "", // Campo fictício para cabeçalho
              colspan,
              isTrimestreHeader: true,
              isFieldHeader: false,
              sortable: false,
            });

            // Adiciona colunas para MT1, MT2, MT3, MFD, MEC (se aplicável) e MF
            columns.push({
              name: `${trimestre}_MAC`,
              label: "MAC",
              align: "center",
              field: (row) => row[`${trimestre}_MAC`] || "-",
              sortable: true,
              isTrimestreHeader: false,
              isFieldHeader: true,
            });
            columns.push({
              name: `${trimestre}_NPP`,
              label: "NPP",
              align: "center",
              field: (row) => row[`${trimestre}_NPP`] || "-",
              sortable: true,
              isTrimestreHeader: false,
              isFieldHeader: true,
            });
            if (!isTrimestreSubjet) {
              columns.push({
                name: `${trimestre}_NPT`,
                label: "NPT",
                align: "center",
                field: (row) => row[`${trimestre}_NPT`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
            }
            columns.push({
              name: `${trimestre}_MT`,
              label: "MT",
              align: "center",
              field: (row) => row[`${trimestre}_MT`] || "-",
              sortable: true,
              isTrimestreHeader: false,
              isFieldHeader: true,
            });

            if (isTrimestreSubjet && isDisciplinaSubject) {
              columns.push({
                name: `${trimestre}_MFD`,
                label: "MFD",
                align: "center",
                field: (row) => row[`${trimestre}_MFD`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
              columns.push({
                name: `${trimestre}_NEE`,
                label: "NEE",
                align: "center",
                field: (row) => row[`${trimestre}_NEE`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
              columns.push({
                name: `${trimestre}_NEO`,
                label: "NEO",
                align: "center",
                field: (row) => row[`${trimestre}_NEO`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
              columns.push({
                name: `${trimestre}_MEC`,
                label: "MEC",
                align: "center",
                field: (row) => row[`${trimestre}_MEC`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
              columns.push({
                name: `${trimestre}_MF`,
                label: "MF",
                align: "center",
                field: (row) => row[`${trimestre}_MF`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
            } else if (isTrimestreSubjet) {
              console.log(isTrimestreSubjet);
              columns.push({
                name: `${trimestre}_MFD`,
                label: "MFD",
                align: "center",
                field: (row) => row[`${trimestre}_MFD`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
              columns.push({
                name: `${trimestre}_NE`,
                label: "NE",
                align: "center",
                field: (row) => row[`${trimestre}_NE`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
              columns.push({
                name: `${trimestre}_MF`,
                label: "MF",
                align: "center",
                field: (row) => row[`${trimestre}_MF`] || "-",
                sortable: true,
                isTrimestreHeader: false,
                isFieldHeader: true,
              });
            }
          });
        });

        /*await getNotas(
          escolaId,
          cursoID,
          classeID,
          turmaID,
          periodoID,
          anoLectivo,
          disciplinaID
        ).then((res) => {
          console.log(res);
          miniPauta.value = res;
        });
        showMiniPauta.value = true;*/

        const rows = Object.values(mini_pauta).map((row, index) => {
          return {
            order: index + 1,
            ...row,
          };
        });

        tableData.value = { columns, rows };
        console.log(tableData.value);
        showMiniPauta.value = true;
      } catch (error) {
        console.log(error.message);
      } finally {
        carrearMiniPauta.value = false;
      }
    };

    const isMF = (field) => {
      return typeof field === "string" && field.includes("MF");
    };

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
      const suffixes = ["_MT", "_MFD", "_MEC", "_NE", "MF"];
      // Adiciona cada sufixo a cada disciplina para formar os nomes das colunas
      const columnNames = TrimestresDBT.value.flatMap((trimestre) =>
        suffixes.map((suffix) => `${trimestre}${suffix}`)
      );
      if (columnNames.includes(fieldName)) {
        return "background-color: #f5f5f5"; // Define a cor de fundo desejada
      }
    };

    return {
      getTextAlignment,
      corValor,
      bgColor,
      tableData,
      searchForm,
      cursos,
      classes,
      turmas,
      periodos,
      disciplinas,
      anosLectivos,
      loading,
      hendleMiniPaulta,
      carrearMiniPauta,
      showMiniPauta,
      miniPauta,
      docentes,
      showFilter,
      nome_docente,
      genero,
      trimestreHeaderColumns,
      fieldHeaderColumns,
      show,
      isMF,
      Cell,
      filter,
    };
  },
};
</script>
