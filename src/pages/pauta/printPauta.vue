<template>
  <div>
    <loading-component3 :loadShowPrint="carrearMiniPauta" />
    <div>
      <iframe
        v-if="pdfSrc"
        :src="pdfSrc"
        style="width: 100%; height: 500px"
      ></iframe>
      <div style="display: none">
        <div id="elemento-para-pdf" class="StyleFontDocument alignTextJustify">
          <div class="row q-mt-sm" style="line-height: 1.5">
            <div class="col-12 text-center">República de Angola</div>
            <div class="col-12 text-center">
              Governo Provincial {{ artigoQueAntecedeDonomeDaProvincia }}
              {{ provincia }}
            </div>
            <div class="col-12 text-center">
              Administração Municipal {{ artigoMunicipio }}
              {{ municipio }}
            </div>
            <div class="col-12 text-center">
              <b>Direcção Municipal da Educação</b>
            </div>
            <div class="col-12 text-center">
              <b class="text-red-10">{{ nome_escola }}</b>
            </div>
          </div>

          <!-- Pauta-->
          <div class="row q-mb-sm">
            <div class="col-12 text-caption text-center">
              [ <b class="text-red-6">{{ nome_disciplina }}</b> ] - [ Curso:
              <b>{{ curso }}</b> ] - [ Ano lectivo: <b>{{ anoLectivo }}</b> ] [
              <b>{{ classe }}</b> ] [ Turma: <b>{{ turma }}</b> ] [ Período:
              <b>{{ periodo }}</b> ]
            </div>
          </div>

          <!--Tabela-->
          <q-table
            :rows="tableData.rows"
            dense
            row-key="nome"
            bordered
            :separator="Cell"
            style="border-radius: 0"
            :pagination="pagination"
          >
            <template v-slot:top-left>
              <span class="text-h5 text-red-10">PAUTA Nº _______ </span>
            </template>

            <!-- Custom Header Slot with Multi-line Header -->
            <template v-slot:header>
              <q-tr>
                <!-- First Row for Discipline Names -->
                <q-th>Nº</q-th>
                <q-th>NOME DE ALUNOS</q-th>
                <q-th>GÊN.</q-th>
                <q-th
                  v-for="col in disciplineHeaderColumns"
                  :key="'discipline_' + col.name"
                  :colspan="col.colspan"
                  align="center"
                >
                  {{ col.label }}
                </q-th>
                <q-th>OBSERVAÇÃO</q-th>
              </q-tr>
              <q-tr style="background-color: #f5f5f5">
                <!-- Second Row for Field Names -->
                <q-th></q-th>
                <q-th></q-th>
                <q-th></q-th>
                <q-th
                  v-for="col in fieldHeaderColumns"
                  :key="'fields_' + col.name"
                  align="center"
                >
                  {{ col.label }}
                </q-th>
                <q-th></q-th>
              </q-tr>
            </template>

            <template v-slot:body-cell="props">
              <q-td
                :props="props"
                :style="[
                  getTextAlignment(props),
                  bgColor(props),
                  corValorObservacao(props),
                ]"
              >
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

          <br />
          <div class="row">
            <div class="col-12">
              <table class="table sem-bordas" border="1" style="width: 100%">
                <tr>
                  <td style="text-align: center; padding: 10px">
                    <b>O Conselho:</b>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td border="1" style="padding: 10px; text-align: center">
                    1._________________________________________________
                  </td>
                  <td style="padding: 10px; text-align: center">
                    <b>O(A) Director(a) Pedagógico</b>
                  </td>
                  <td style="padding: 10px; text-align: center">
                    <b>O(A) Director(a) Geral</b>
                  </td>
                </tr>
                <tr>
                  <td border="1" style="padding: 10px; text-align: center">
                    2._________________________________________________
                  </td>
                  <td style="padding: 10px; text-align: center">
                    ____________________________________________
                  </td>
                  <td style="padding: 10px; text-align: center">
                    ____________________________________________
                  </td>
                </tr>
                <tr>
                  <td border="1" style="padding: 10px; text-align: center">
                    3._________________________________________________
                  </td>
                  <td style="padding: 10px; text-align: center">
                    Data:/______/________________/20_____
                  </td>
                  <td style="padding: 10px; text-align: center">
                    Data:/______/________________/20_____
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import useApi from "src/composible/userApi";
import { useQuasar } from "quasar";
import usenotification from "src/composible/useNotify";
import { document } from "postcss";
import moment from "moment";
import { useMiniPautaStore } from "src/stores/mini-pautas";
import { useDisciplinaStore } from "src/stores/disciplinas";
import { useEscolaStore } from "src/stores/escolas";
import { useClasseStore } from "src/stores/classes";
import { useCursoStore } from "src/stores/cursos";
import { useTurmaStore } from "src/stores/turmas";
import { usePeriodoStore } from "src/stores/periodos";
import loadingComponent3 from "src/components/loading/loadingComponent3.vue";
import { useCargoStore } from "src/stores/cargos";
export default {
  components: { loadingComponent3 },
  props: {
    dataPautas: { type: Object, required: true },
  },
  setup(props) {
    const { getDisciplinaById } = useDisciplinaStore();
    const { getEscolaById } = useEscolaStore();
    const { getClasseById } = useClasseStore();
    const { getTurmaById } = useTurmaStore();
    const { getPeriodoById } = usePeriodoStore();
    const { getCursoById } = useCursoStore();
    const { getDirectorDeTurma, getCoordenadorCurso } = useCargoStore();
    const nome_disciplina = ref("");
    const nivel_ensino = ref("");
    const anoLectivo = ref("");
    const nome_escola = ref("");
    const nome_docente = ref("");
    const classe = ref("");
    const turma = ref("");
    const curso = ref("");
    const tableData = ref({ columns: [], rows: [] });
    const showPauta = ref(false);

    const carregar = ref(false);
    const periodo = ref("");
    const joinedData = ref([]);
    const notasMiniPauta = ref([]);
    const Cell = "cell";
    const isLinguaPortuguesaOrEstrangeira = [
      "Língua Portuguesa",
      "L. Portuguesa",
      "Língua Estrangeira",
      "L. Estrangeira",
      "Inglês",
      "Ingles",
      "Francês",
      "Frances",
    ];
    const dataMiniPautas = ref([]);
    const pdfSrc = ref(null);
    const route = useRoute();
    const docRef = ref();
    const $q = useQuasar();
    const { getById, getFuncionarioWithCategoriasAndEscolas } = useApi();
    //const dados = ref([]);
    const artigoComuna = ref("");
    const artigoMunicipio = ref("");
    const artigoProvincia = ref("");
    const dataNascimento = ref("");
    const dataEmissao = ref("");
    const dataInicioFuncao = ref("");
    const artigoComHabiltacao = ref("");
    const artigoInstituicao = ref("");
    const provincia = ref("");
    const municipio = ref("");
    const data = ref(null);
    const dateNowYear = new Date().toJSON().slice(0, 4);
    const dataShotForm = ref("");
    const artigoQantecedEscola = ref("");
    const artigoQueAntecedeDonomeDaProvincia = ref();
    // Expressão regular para verificar se a última palavra termina em "a", "ão" ou "ões"
    const terminaEmAOrao = /(\b\w+a\b|\b\w+ão\b|\b\w+ões\b)$/;
    const artigoDaInstituicaoComessaComE = /^[E]/i;

    const provinciaComessaComH = /^[H]/i;
    const provinciaComessaComBeBCKHNMUZ = /^[BCKHNMUZ]/i;
    const provinciaTerminacomComA = /(\b\w+a\b)/i;
    const provinciaTerminacomComO = /(\b\w+o\b)/i;
    const provinciaTerminacomComEL = /(\b\w+e\b|\b\w+l)/i;

    // Expressão regular para verificar se a última palavra termina em "o" ou "os"
    const terminaEmOuOs = /(\b\w+o\b|\b\w+os\b|\b\w+ei\b)$/;

    // Expressão regular para verificar se a última palavra termina em "e" ou "es"
    const terminaEmEouEs = /(\b\w+e\b|\b\w+es\b)$/;

    //Expressão regular para verificar de a ultima palavra termina em "s"
    const terminaEmSeE = /(\b\w+E\b|\b\w+S\b|\b\w+e\b|\b\w+s\b)$/;

    const id_turma = ref(null);
    const cargo_curso_id = ref(null);
    const genero_director_turma = ref("");
    const genero = ref("");
    const genero_coordenador_curso = ref("");
    const nome_director_turma = ref("");
    const nome_coordenador_curso = ref("");
    const disciplinasTemplate = ref([]);
    const TrimestresDBT = ref([]);
    const disciplinasDB = ref([]);
    const carrearMiniPauta = ref(false);

    const trimestreHeaderColumns = computed(() => {
      return tableData.value.columns.filter((col) => col.isTrimestreHeader);
    });

    // Computed properties for headers
    const disciplineHeaderColumns = computed(() => {
      return tableData.value.columns.filter((col) => col.isDisciplineHeader);
    });

    const fieldHeaderColumns = computed(() => {
      return tableData.value.columns.filter((col) => col.isFieldHeader);
    });

    const isDisciplinaEstrangeiras = computed(() => {
      const disciplinasEstrangeiras = [
        "Língua Portuguesa",
        "Inglês",
        "Francês",
      ];
      return disciplinasTemplate.value.some((disciplina) =>
        disciplinasEstrangeiras.includes(disciplina)
      );
    });

    watch(
      () => props.dataPautas,
      async (newValue) => {
        try {
          carrearMiniPauta.value = true;
          const data = newValue;
          console.log(data);
          //pegar informação de ano lectivo, curso, disciplina, nome do professor na primeira linha
          anoLectivo.value = data[0].ano_lectivo;
          nome_disciplina.value = data[0].disciplinas.nome_disciplina;
          nome_escola.value = data[0].escolas.name;
          provincia.value = data[0].escolas.provincia;
          municipio.value = data[0].escolas.municipio;
          classe.value = data[0].classes.nome_classe;
          turma.value = data[0].turmas.nome_turma;
          curso.value = data[0].cursos.nome_curso;
          periodo.value = data[0].periodos.nome_periodo;

          const cursoId = data[0].cursos.id;
          console.log(cursoId);
          if (cursoId !== undefined) {
            await getCoordenadorCurso(cursoId).then((item) => {
              nome_coordenador_curso.value = item[0].funcionarios.name;
              genero_coordenador_curso.value = item[0].funcionarios.genero;
            });
          } else {
            console.error("Curso ID está indefinido");
          }

          const turmaId = data[0]?.turmas?.id;
          if (turmaId !== undefined) {
            await getDirectorDeTurma(turmaId).then((item) => {
              nome_director_turma.value = item[0].funcionarios.name;
              genero_director_turma.value = item[0].funcionarios.genero;
            });
          } else {
            console.error("Turma ID está indefinido");
          }

          if (data.length == 0) {
            notifyError(
              "Não há dados para exibir na pauta com o filtro selecionado"
            );
            show.value = false;
            return;
          }

          const pauta = {};
          const disciplines = new Set();

          data.forEach(
            ({ alunos, disciplinas, mt1, mt2, mt3, mfd, mf, ne, mec }) => {
              const key = alunos.nome;

              if (!alunos || !disciplinas) {
                console.error("Dados de aluno ou disciplina indefinidos:", {
                  alunos,
                  disciplinas,
                });
                return; // Pula iteração se não tiver dados válidos
              }

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

          if (
            // Verifica se a última palavra da comuna termina em "a" ou "ão"
            provinciaComessaComH.test(data[0].escolas.provincia) &&
            provinciaTerminacomComA.test(data[0].escolas.provincia)
          ) {
            artigoQueAntecedeDonomeDaProvincia.value = "da";
          } else if (
            provinciaComessaComBeBCKHNMUZ.test(data[0].escolas.provincia) &&
            provinciaTerminacomComA.test(data[0].escolas.provincia)
          ) {
            artigoQueAntecedeDonomeDaProvincia.value = "de";
          } else if (
            provinciaComessaComBeBCKHNMUZ.test(data[0].escolas.provincia) &&
            provinciaTerminacomComO.test(data[0].escolas.provincia)
          ) {
            artigoQueAntecedeDonomeDaProvincia.value = "do";
          } else if (
            provinciaComessaComBeBCKHNMUZ.test(data[0].escolas.provincia) &&
            provinciaTerminacomComEL.test(data[0].escolas.provincia)
          ) {
            artigoQueAntecedeDonomeDaProvincia.value = "de";
          } else {
            artigoQueAntecedeDonomeDaProvincia.value = "de";
          }

          if (terminaEmAOrao.test(data[0].escolas.municipio)) {
            // Usar o artigo "da"
            artigoMunicipio.value = "da";
          } else if (terminaEmOuOs.test(data[0].escolas.municipio)) {
            // Usar o artigo "do"
            artigoMunicipio.value = "do";
          } else if (terminaEmEouEs.test(data[0].escolas.municipio)) {
            // Usar o artigo "de"
            artigoMunicipio.value = "de";
          } else {
            // Lógica para outro caso, se necessário
          }

          if (terminaEmAOrao.test(data[0].escolas.provincia)) {
            // Usar o artigo "da"
            artigoProvincia.value = "da";
          } else if (terminaEmOuOs.test(data[0].escolas.provincia)) {
            // Usar o artigo "do"
            artigoProvincia.value = "do";
          } else if (terminaEmEouEs.test(data[0].escolas.provincia)) {
            // Usar o artigo "de"
            artigoProvincia.value = "de";
          } else {
            // Lógica para outro caso, se necessário
          }

          // Adiciona o número de ordem
          const rows = Object.values(pauta).map((row, index) => {
            // Obtém todas as chaves que terminam com _MF
            const mfKeys = Object.keys(row).filter((key) =>
              key.endsWith("_MF")
            );

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
          console.log(tableData.value);
          tableData.value = { columns, rows };
          showPauta.value = true;
        } catch (error) {
          console.log(error);
        } finally {
          carrearMiniPauta.value = false;
          gerarPDF();
        }
      }
    );

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

    const corValorObservacao = (props) => {
      const value = props.row[props.col.field];
      if (value == "TRANSITA") {
        return "color: blue";
      } else if (value == "NÃO TRANSITA") {
        return "color:red";
      } else {
        return "color: black";
      }
    };

    const bgColor = (props) => {
      //console.log(disciplinasDB.value);
      const fieldName = props.col.name;
      // Lista de sufixos desejados
      const suffixes = ["_MT", "_MFD", "_MEC", "_NE", "_MF"];
      // Adiciona cada sufixo a cada disciplina para formar os nomes das colunas
      const columnNames = disciplinasDB.value.flatMap((nomeDisciplina) =>
        suffixes.map((suffix) => `${nomeDisciplina}${suffix}`)
      );
      if (columnNames.includes(fieldName)) {
        return "background-color: #f5f5f5"; // Define a cor de fundo desejada
      }
    };

    const getColorMac1 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mac1 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mac1 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPP1
    const getColorNpp1 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npp1 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npp1 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPT1
    const getColorNpt1 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npt1 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npt1 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MT1
    const getColorMt1 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mt1 != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mt1 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MAC2
    const getColorMac2 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mac2 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mac2 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPP2
    const getColorNpp2 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npp2 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npp2 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPT2
    const getColorMpt2 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npt2 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npt2 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MT2
    const getColorMt2 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mt2 != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mt2 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MAC3
    const getColorMac3 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mac3 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mac3 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPP3
    const getColorNpp3 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npp3 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npp3 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPT3
    const getColorNpt3 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npt3 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npt3 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MT3
    const getColorMt3 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mt3 != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mt3 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MFD
    const getColorMfd = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mfd != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mfd <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNe = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.ne != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.ne <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NEE
    const getColorNee = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.nee != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.nee <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NEO
    const getColorNeo = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.neo != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.neo <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MEC
    const getColorMec = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mec != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mec <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NF
    const getColorMf = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mf != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mf <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //Codigo para imprimir documneto no formato PDF
    const gerarPDF = async () => {
      try {
        const element = window.document.getElementById("elemento-para-pdf");
        //const element = document.getElementById("elemento-para-pdf");
        await html2pdf()
          .from(element)
          .set({
            //margin: 0.3937,
            margin: [0.5, 0.2, 0.2, 0.2], // Margens: [superior, direita, inferior, esquerda]
            filename: "Pauta.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "A3", orientation: "landscape" },
          })
          .toPdf()
          .get("pdf")
          .then((pdf) => {
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
              pdf.setPage(i);
              const pageWidth = pdf.internal.pageSize.width;
              const imageTopWidth = 0.55; // Largura da imagem no topo
              const imageTopHeight = 0.55; // Altura da imagem no topo
              const imageTopX = (pageWidth - imageTopWidth) / 2; // Posição X da imagem no topo (centralizada)
              const imageTopY = 0; // Posição Y da imagem no topo
              const imageFooterWidth = 8; // Largura da imagem no rodapé
              const imageFooterHeight = 0.51; // Altura da imagem no rodapé
              const imageFooterX = pageWidth - imageFooterWidth - 0.3937; // Posição X da imagem no rodapé (alinhada à direita)
              const imageFooterY = pdf.internal.pageSize.height - 0.3937; // Posição Y da imagem no rodapé (altura da página - altura da imagem - margem inferior)
              const baseUrl = process.env.NODE_ENV === "production" ? "/" : "/";

              pdf.addImage(
                `${baseUrl}Simbolo-da-Republica.png`,
                "PNG",
                imageTopX,
                imageTopY,
                imageTopWidth,
                imageTopHeight
              );
              pdf.setFontSize(10);
              pdf.setTextColor(150);
              pdf.addImage(
                `${baseUrl}icons/RodapeIMG.png`,
                "PNG",
                imageFooterX,
                imageFooterY,
                imageFooterWidth,
                imageFooterHeight
              );
            }
            const blob = new Blob([pdf.output("blob")], {
              type: "application/pdf",
            });
            const url = URL.createObjectURL(blob);
            pdfSrc.value = url;
          });
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };
    return {
      pdfSrc,
      gerarPDF,
      dataNascimento,
      dataEmissao,
      dataInicioFuncao,
      artigoComuna,
      artigoMunicipio,
      artigoProvincia,
      artigoComHabiltacao,
      artigoInstituicao,
      //addInfo,
      //dados,
      data,
      //model2,
      //model,
      dateNowYear,
      nome_disciplina,
      artigoQantecedEscola,
      artigoQueAntecedeDonomeDaProvincia,
      isLinguaPortuguesaOrEstrangeira,
      getColorMac1,
      getColorNpp1,
      getColorNpt1,
      getColorMt1,
      getColorMac2,
      getColorNpp2,
      getColorMpt2,
      getColorMt2,
      getColorMac3,
      getColorNpp3,
      getColorNpt3,
      getColorMt3,
      getColorMfd,
      getColorNe,
      getColorNee,
      getColorNeo,
      getColorMec,
      getColorMf,
      carregar,
      provincia,
      municipio,
      nome_escola,
      nivel_ensino,
      anoLectivo,
      classe,
      turma,
      periodo,
      curso,
      genero_director_turma,
      genero_coordenador_curso,
      genero,
      nome_director_turma,
      nome_coordenador_curso,
      isMF,
      getTextAlignment,
      corValor,
      bgColor,
      corValorObservacao,
      tableData,
      disciplinasTemplate,
      TrimestresDBT,
      trimestreHeaderColumns,
      fieldHeaderColumns,
      isDisciplinaEstrangeiras,
      Cell,
      disciplineHeaderColumns,
      carrearMiniPauta,
      nome_docente,
      pagination: {
        rowsPerPage: 0, // Definir como 0 para mostrar todas as linhas
      },
      dataShotForm,
      showPauta,
      disciplinasDB,
    };
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.sem-bordas {
  border: none !important; /* Remove todas as bordas da tabela */
}

.sem-bordas td {
  border: none !important; /* Remove todas as bordas das células */
  padding: 8px; /* Espaçamento interno das células, se necessário */
}

.q-table {
  width: 100% !important;
}

.q-table .q-td,
.q-table .q-th {
  white-space: nowrap;
}

table tr td {
  font-size: 12px;
}
table tr td {
  font-size: 12px;
}

.table.green-border td {
  min-width: 100px; /* Ajuste a largura conforme necessário */
  white-space: nowrap;
}

.table.green-border {
  width: 100%;
  table-layout: fixed;
}

.table {
  margin: 0 auto;
  border-collapse: collapse;
}

.table td {
  border: 1px solid #030303;
  padding: 0px;
}

.table input[type="number"] {
  width: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
}

.table input[type="number"] {
  width: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
  margin: 0;
  padding: 0;
}

/* Estilos globais para a tabela */
#elemento-para-pdf .q-table {
  font-size: 10px; /* Reduz o tamanho da fonte */
}

#elemento-para-pdf .q-table .q-th,
#elemento-para-pdf .q-table .q-td {
  padding: 4px; /* Reduz o padding para economizar espaço */
  line-height: 1.2; /* Ajusta a altura da linha se necessário */
}

#elemento-para-pdf .q-table .q-th {
  font-weight: bold; /* Torna o texto dos cabeçalhos mais visível, se desejado */
}
</style>
