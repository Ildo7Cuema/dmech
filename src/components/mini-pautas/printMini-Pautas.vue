<template>
  <div>
    <loading-component3 :loadShowPrint="carregar" />
    <div>
      <iframe
        v-if="pdfSrc"
        :src="pdfSrc"
        style="width: 100%; height: 500px"
      ></iframe>
      <div style="display: none">
        <div id="elemento-para-pdf" class="StyleFontDocument alignTextJustify">
          <div class="row" style="line-height: 1.5">
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
          </div>

          <div class="row">
            <div class="col-12 text-center">
              <br />
              <br />
              <b>MINI-PAUTA</b>
            </div>
          </div>

          <!-- Mini-Pauta-->
          <table class="table green-border" id="dataTable">
            <tr class="bg-grey-4">
              <td class="bg-grey-4" rowspan="2">Nº</td>
              <td class="bg-grey-4" rowspan="2" style="width: 200px !important">
                Nome de alunos
              </td>
              <td class="bg-grey-4" colspan="4" style="text-align: center">
                I Trimestre
              </td>
              <td class="bg-grey-4" colspan="4" style="text-align: center">
                II Trimestre
              </td>
              <td class="bg-grey-4" colspan="4" style="text-align: center">
                III Trimestres
              </td>
              <td class="bg-grey-4" rowspan="2" style="text-align: center">
                MFD
              </td>
              <td
                class="bg-grey-4"
                style="text-align: center"
                rowspan="2"
                v-if="
                  !isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)
                "
              >
                NE
              </td>
              <td
                class="bg-grey-4"
                style="text-align: center"
                colspan="3"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                EXAME O/E
              </td>
              <td class="bg-grey-4" rowspan="2" style="text-align: center">
                NF
              </td>
            </tr>
            <tr>
              <td class="bg-grey-4" style="text-align: center">MAC</td>
              <td class="bg-grey-4" style="text-align: center">NPP</td>
              <td class="bg-grey-4" style="text-align: center">NPT</td>
              <td class="bg-grey-4" style="text-align: center">MT1</td>
              <td class="bg-grey-4" style="text-align: center">MAC</td>
              <td class="bg-grey-4" style="text-align: center">NPP</td>
              <td class="bg-grey-4" style="text-align: center">NPT</td>
              <td class="bg-grey-4" style="text-align: center">MT2</td>
              <td class="bg-grey-4" style="text-align: center">MAC</td>
              <td class="bg-grey-4" style="text-align: center">NPP</td>
              <td class="bg-grey-4" style="text-align: center">NPT</td>
              <td class="bg-grey-4" style="text-align: center">MT3</td>
              <td
                class="bg-grey-4"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                NEE
              </td>
              <td
                class="bg-grey-4"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                NEO
              </td>
              <td
                class="bg-grey-4"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                MEC
              </td>
            </tr>
            <tr v-for="(a, index) in dataMiniPautas" :key="a">
              <td style="text-align: center">{{ index + 1 }}</td>
              <td>{{ a.nome_aluno }}</td>
              <td :style="{ color: getColorMac1() }" style="text-align: center">
                {{ a.nota_mac1 }}
              </td>
              <td :style="{ color: getColorNpp1() }" style="text-align: center">
                {{ a.nota_npp1 }}
              </td>
              <td :style="{ color: getColorNpt1() }" style="text-align: center">
                {{ a.nota_npt1 }}
              </td>
              <td
                class="bg-grey-4"
                :style="{ color: getColorMt1() }"
                style="text-align: center"
              >
                {{ a.nota_mt1 }}
              </td>
              <td :style="{ color: getColorMac2() }" style="text-align: center">
                {{ a.nota_mac2 }}
              </td>
              <td :style="{ color: getColorNpp2() }" style="text-align: center">
                {{ a.nota_npp2 }}
              </td>
              <td :style="{ color: getColorMpt2() }" style="text-align: center">
                {{ a.nota_npt2 }}
              </td>
              <td
                class="bg-grey-4"
                :style="{ color: getColorMt2() }"
                style="text-align: center"
              >
                {{ a.nota_mt2 }}
              </td>
              <td :style="{ color: getColorMac3() }" style="text-align: center">
                {{ a.nota_mac3 }}
              </td>
              <td :style="{ color: getColorNpp3() }" style="text-align: center">
                {{ a.nota_npp3 }}
              </td>
              <td :style="{ color: getColorNpt3() }" style="text-align: center">
                {{ a.nota_npt3 }}
              </td>
              <td
                class="bg-grey-4"
                :style="{ color: getColorMt3() }"
                style="text-align: center"
              >
                {{ a.nota_mt3 }}
              </td>
              <td
                class="bg-grey-4"
                :style="{ color: getColorMfd() }"
                style="text-align: center"
              >
                {{ a.nota_mfd }}
              </td>
              <td
                class="bg-grey-4"
                :style="{ color: getColorNe() }"
                style="text-align: center"
                v-if="
                  !isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)
                "
              >
                {{ a.nota_ne }}
              </td>
              <td
                :style="{ color: getColorNee() }"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                {{ a.nota_nee }}
              </td>
              <td
                :style="{ color: getColorNeo() }"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                {{ a.nota_neo }}
              </td>
              <td
                class="bg-grey-4"
                :style="{ color: getColorMec() }"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                {{ a.nota_mec }}
              </td>
              <td
                class="bg-grey-4"
                :style="{ color: getColorMf() }"
                style="text-align: center"
              >
                {{ a.nota_mf }}
              </td>
            </tr>
          </table>
          <br />
          O Coordenador: _________________________________________
          <br />
          O Professor: ____________________________________________
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
import { useTurmaStore } from "src/stores/turmas";
import { usePeriodoStore } from "src/stores/periodos";
import loadingComponent3 from "../loading/loadingComponent3.vue";
export default {
  components: { loadingComponent3 },
  props: {
    dataMiniPautas: { type: Object, required: true },
    loading: { type: Boolean, required: true },
  },
  setup(props) {
    const { getDisciplinaById } = useDisciplinaStore();
    const { getEscolaById } = useEscolaStore();
    const { getClasseById } = useClasseStore();
    const { getTurmaById } = useTurmaStore();
    const { getPeriodoById } = usePeriodoStore();
    const nome_disciplina = ref("");
    const nivel_ensino = ref("");
    const anoLectivo = ref("");
    const nome_escola = ref("");
    const classe = ref("");
    const turma = ref("");
    const carregar = ref(false);
    const periodo = ref("");
    const joinedData = ref([]);
    const notasMiniPauta = ref([]);
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

    //Codigo para imprimir documneto no formato PDF
    const gerarPDF = async () => {
      try {
        carregar.value = true;
        const element = window.document.getElementById("elemento-para-pdf");
        //const element = document.getElementById("elemento-para-pdf");
        await html2pdf()
          .from(element)
          .set({
            margin: 0.89,
            filename: "Mini-Pauta.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
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
              const imageTopY = 0.3; // Posição Y da imagem no topo
              const imageFooterWidth = 8; // Largura da imagem no rodapé
              const imageFooterHeight = 0.51; // Altura da imagem no rodapé
              const imageFooterX = pageWidth - imageFooterWidth - 0.1; // Posição X da imagem no rodapé (alinhada à direita)
              const imageFooterY = pdf.internal.pageSize.height - 0.6; // Posição Y da imagem no rodapé (altura da página - altura da imagem - margem inferior)

              const baseUrl = process.env.NODE_ENV === "production" ? "/" : "/";
              pdf.addImage(
                `${baseUrl}Simbolo-da-Republica.png`,
                "PNG",
                //imageX,
                // 0.25,
                //imageWidth,
                // 0.52
                imageTopX,
                imageTopY,
                imageTopWidth,
                imageTopHeight
              );
              pdf.setFontSize(10);
              pdf.setTextColor(150);
              /*pdf.text(
              "Sistema Integrado DME",
              1,
              pdf.internal.pageSize.height - 0.5
            );*/

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
        carregar.value = false;
      }
    };
    /*
    const dados = computed(() => {
      return JSON.parse(route.params.dados);
    });
    const addInfo = computed(() => {
      return JSON.parse(route.params.addInfo);
    });
    const model2 = computed(() => {
      return route.params.model2;
    });
    const model = computed(() => {
      return route.params.model;
    });
*/
    onMounted(async () => {
      anoLectivo.value = props.dataMiniPautas[0].ano_lectivo;
      await getDisciplinaById(props.dataMiniPautas[0].disciplinaid).then(
        (item) => {
          console.log(item);
          nome_disciplina.value = item.nome_disciplina;
        }
      );
      await getEscolaById(props.dataMiniPautas[0].escolaid).then((item) => {
        nome_escola.value = item[0].name;
        nivel_ensino.value = item[0].nivel_ensino;
        provincia.value = item[0].provincia;
        municipio.value = item[0].municipio;

        console.log(item);
      });

      await getClasseById(props.dataMiniPautas[0].classeid).then((item) => {
        console.log(item);
        classe.value = item.nome_classe;
      });

      await getTurmaById(props.dataMiniPautas[0].turmaid).then((item) => {
        turma.value = item.nome_turma;
      });

      await getPeriodoById(props.dataMiniPautas[0].periodoid).then((item) => {
        periodo.value = item.nome_periodo;
      });

      dataMiniPautas.value = props.dataMiniPautas;

      gerarPDF();

      moment.updateLocale("pt-br", {
        months: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
      });

      data.value = moment().format("D [de] MMMM [de] YYYY");
      /*
      if (terminaEmAOrao.test(dados.value[0].comuna)) {
        // Usar o artigo "da"
        artigoComuna.value = "da";
        console.log(dados.value[0].comuna);
      } else if (terminaEmOuOs.test(dados.value[0].comuna)) {
        // Usar o artigo "do"
        artigoComuna.value = "do";
      } else if (terminaEmEouEs.test(dados.value[0].comuna)) {
        // Usar o artigo "de"
        artigoComuna.value = "de";
      } else {
        // Lógica para outro caso, se necessário
      }
*/

      if (
        provinciaComessaComH.test(provincia.value) &&
        provinciaTerminacomComA.test(provincia.value)
      ) {
        artigoQueAntecedeDonomeDaProvincia.value = "da";
      } else if (
        provinciaComessaComBeBCKHNMUZ.test(provincia.value) &&
        provinciaTerminacomComA.test(provincia.value)
      ) {
        artigoQueAntecedeDonomeDaProvincia.value = "de";
      } else if (
        provinciaComessaComBeBCKHNMUZ.test(provincia.value) &&
        provinciaTerminacomComO.test(provincia.value)
      ) {
        artigoQueAntecedeDonomeDaProvincia.value = "do";
      } else if (
        provinciaComessaComBeBCKHNMUZ.test(provincia.value) &&
        provinciaTerminacomComEL.test(provincia.value)
      ) {
        artigoQueAntecedeDonomeDaProvincia.value = "de";
      } else {
        artigoQueAntecedeDonomeDaProvincia.value = "de";
      }
      /*
      if (artigoDaInstituicaoComessaComE.test(addInfo.value.escola_id)) {
        artigoQantecedEscola.value = "na";
      } else {
        artigoQantecedEscola.value = "no";
      }
*/
      if (terminaEmAOrao.test(municipio.value)) {
        // Usar o artigo "da"
        artigoMunicipio.value = "da";
      } else if (terminaEmOuOs.test(municipio.value)) {
        // Usar o artigo "do"
        artigoMunicipio.value = "do";
      } else if (terminaEmEouEs.test(municipio.value)) {
        // Usar o artigo "de"
        artigoMunicipio.value = "de";
      } else {
        // Lógica para outro caso, se necessário
      }

      if (terminaEmAOrao.test(provincia.value)) {
        // Usar o artigo "da"
        artigoProvincia.value = "da";
      } else if (terminaEmOuOs.test(provincia.value)) {
        // Usar o artigo "do"
        artigoProvincia.value = "do";
      } else if (terminaEmEouEs.test(provincia.value)) {
        // Usar o artigo "de"
        artigoProvincia.value = "de";
      } else {
        // Lógica para outro caso, se necessário
      }
      /*
      if (terminaEmSeE.test(dados.value[0].instituto_formacao)) {
        artigoInstituicao.value = "no";
      } else {
        artigoInstituicao.value = "na";
      }

      if (
        dados.value[0].habilitacao == "licenciada" ||
        dados.value[0].habilitacao == "licenciado"
      ) {
        artigoComHabiltacao.value = "a licenciatura";
      } else {
        const terminaEmO = /(\b\w+o\b)$/;
        const terminaEmE = /(\b\w+e\b)$/;
        if (terminaEmO.test(dados.value[0].habilitacao)) {
          artigoComHabiltacao.value = "o " + dados.value[0].habilitacao;
        }
        if (terminaEmE.test(dados.value[0].habilitacao)) {
          artigoComHabiltacao.value = "a " + dados.value[0].habilitacao;
        }
      }
        */
    });

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
    };
  },
};
</script>
<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
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
</style>
