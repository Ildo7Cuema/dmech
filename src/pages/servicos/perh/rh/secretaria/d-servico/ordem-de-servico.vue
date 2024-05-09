<template>
  <div>
    <iframe
      v-if="pdfSrc"
      :src="pdfSrc"
      style="width: 100%; height: 800px"
    ></iframe>
    <div style="display: none">
      <div id="elemento-para-pdf" class="StyleFontDocument alignTextJustify">
        <div class="row" style="line-height: 1.5">
          <div class="col-12 text-center">República de Angola</div>
          <div class="col-12 text-center">
            Governo Provincial {{ artigoQueAntecedeDonomeDaProvincia }}
            {{ addInfo.provincia }}
          </div>
          <div class="col-12 text-center">
            Administração Municipal do {{ addInfo.municipio }}
          </div>
          <div class="col-12 text-center">
            <b>Direcção Municipal da Educação</b>
          </div>
          <div class="col-12 text-center">
            <b><q-separator size="md" color="black" /></b>
            <p
              class="text-small top-subtitle"
              style="
                font-size: 10px;
                margin-top: 0.1px !important;
                text-transform: uppercase;
              "
            >
              <b
                >(<spam v-if="addInfo.modelCC !== 'Administrador Municipal'">{{
                  addInfo.nome_seccao
                }}</spam
                ><spam v-else
                  ><span v-if="dados[0].genero == 'Masculino'"
                    >Gabinete do Director</span
                  ><span v-if="dados[0].genero == 'Feminino'"
                    >Gabinete da Directora</span
                  ></spam
                >)</b
              >
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-12 text-left">
            <br />
            <br />
            <br />
            <b>C/C</b>

            <br />
            <br />

            <b>{{ addInfo.modelCC }}</b>
          </div>

          <div class="col-12 text-center">
            <br />
            <br />
            <br />
            <b style="text-transform: uppercase"
              >ORDEM DE SERVIÇO Nº_______/<span
                v-if="addInfo.modelCC == 'Administrador Municipal'"
                >G.D</span
              ><span v-else>{{ primeirasLetras }}</span
              >/DME.{{ Munic }}/{{ dateNowYear }}</b
            >
          </div>

          <div class="col-12" style="line-height: 1.5">
            <br />

            Ausentando-me da Instituição {{ addInfo.motivo_da_ausencia }}, e
            havendo necessidade de se manter o normal funcionamento da mesma;
          </div>

          <div class="col-12 text-center">
            <br />
            <br />
            <b>DETERMINO:</b>
          </div>

          <div class="col-12" style="line-height: 1.5">
            <br />
            Fica a responder pelas actividades correntes da
            <spam v-if="addInfo.modelCC !== 'Administrador Municipal'">{{
              addInfo.nome_seccao
            }}</spam
            ><spam v-else>Direcção Municipal da Educação</spam>, apartir do dia
            {{ dataDeFeria }},
            <span v-if="addInfo.genero == 'Masculino'">o senhor</span
            ><span v-else>a senhora</span>: <b>{{ addInfo.nome_interino }}</b> -
            {{ addInfo.nome_interino_funcao }}

            <br />
            <br />
            <br />
            Obs.: Os assuntos que ultrapassarem as competências deste, ficarão
            pendentes.
          </div>

          <div class="col-12 text-center">
            <br />
            <br />
            <p><b>CUMPRA-SE!</b></p>
            <br />
            <br />
            {{ addInfo.municipio }}, {{ data }}.
          </div>

          <div class="col-12 text-center" style="line-height: 1.5">
            <br />
            <br />
            <br />
            <b
              ><span v-if="addInfo.modelCC == 'Administrador Municipal'">
                <b
                  ><span v-if="dados[0].genero == 'Masculino'"
                    >O Director Municipal</span
                  ><span v-if="dados[0].genero == 'Feminino'"
                    >A Directora Municipal</span
                  ></b
                >
              </span>
              <span v-else
                ><span v-if="dados[0].genero == 'Masculino'">O</span
                ><span v-else>A</span> Chefe de Secção</span
              ></b
            >
            <br />
            <br />
            <span class="q-pa-md">
              {{ dados[0].nome }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import { ref, computed, onMounted, inject } from "vue";
import { useRoute } from "vue-router";
import useApi from "src/composible/userApi";
import { useQuasar } from "quasar";
import moment from "moment";
import { toWordsKey } from "src/boot/num2words";
import { formatCurrency } from "src/utils/formatCurrency";

export default {
  setup() {
    const pdfSrc = ref(null);
    const route = useRoute();

    const $q = useQuasar();
    //const dados = ref([]);
    const artigoComuna = ref("");
    const artigoMunicipio = ref("");
    const artigoProvincia = ref("");
    const dataNascimento = ref("");
    const dataEmissao = ref("");
    const dataInicioFuncao = ref("");
    const artigoComHabiltacao = ref("");
    const artigoInstituicao = ref("");
    const data = ref(null);
    const dateNowYear = new Date().toJSON().slice(0, 4);
    const artigoQantecedEscola = ref("");
    const artigoQueAntecedeDonomeDaProvincia = ref();
    const dataDeFeria = ref("");
    const Munic = ref("");
    const salarioPorExtenso = ref("");
    // Expressão regular para verificar se a última palavra termina em "a", "ão" ou "ões"
    const terminaEmAOrao = /(\b\w+a\b|\b\w+ão\b|\b\w+ões\b)$/;
    const artigoDaInstituicaoComessaComE = /^[E]/i;

    const provinciaComessaComH = /^[H]/i;
    const provinciaComessaComBeBCKHNMUZ = /^[BCKHNMUZ]/i;
    const provinciaTerminacomComA = /(\b\w+a\b)/i;
    const provinciaTerminacomComO = /(\b\w+o\b)/i;
    const provinciaTerminacomComEL = /(\b\w+e\b|\b\w+l)/i;

    const primeirasLetras = ref("");

    const removeUltimasLetras = /(\s\w+){4}$/;

    // Expressão regular para verificar se a última palavra termina em "o" ou "os"
    const terminaEmOuOs = /(\b\w+o\b|\b\w+os\b|\b\w+ei\b)$/;

    // Expressão regular para verificar se a última palavra termina em "e" ou "es"
    const terminaEmEouEs = /(\b\w+e\b|\b\w+es\b)$/;

    //Expressão regular para verificar de a ultima palavra termina em "s"
    const terminaEmSeE = /(\b\w+E\b|\b\w+S\b|\b\w+e\b|\b\w+s\b)$/;

    //Codigo para imprimir documneto no formato PDF
    const gerarPDF = () => {
      try {
        $q.loading.show();
        const element = window.document.getElementById("elemento-para-pdf");
        //const element = document.getElementById("elemento-para-pdf");
        html2pdf()
          .from(element)
          .set({
            margin: 0.89,
            filename: "Testificação.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
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

              pdf.addImage(
                "../../../../../../public/icons/ensigna.jpg",
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
                "../../../../../../public/icons/RodapeIMG.png",
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
        $q.loading.hide();
      }
    };

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

    const moedaPorExtenso = computed(() => {
      return converterParaExtenso(dados.value[0].salario_base);
    });

    onMounted(() => {
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

      data;

      data.value = moment().format("D [de] MMMM [de] YYYY");

      dataNascimento.value = moment(dados.value[0].data_nascimento).format(
        "D [de] MMMM [de] YYYY"
      );

      dataDeFeria.value = moment(addInfo.value.calendary).format(
        "D [de] MMMM [de] YYYY"
      );

      dataEmissao.value = moment(dados.value[0].data_emissao).format(
        "D [de] MMMM [de] YYYY"
      );
      dataInicioFuncao.value = moment(dados.value[0].data_inicio_funcao).format(
        "D [de] MMMM [de] YYYY"
      );

      const municipio = addInfo.value.municipio;
      if (municipio.length >= 7) {
        const nomeMunicipioCurto = municipio.slice(0, -4);
        Munic.value = nomeMunicipioCurto;
      } else if (municipio.length >= 6) {
        const nomeMunicipioCurto = municipio.slice(0, -2);
        Munic.value = nomeMunicipioCurto;
      } else {
        Munic.value = municipio;
      }

      //codigo para pegar a primeira letra de cada palvara na frase
      const frase = addInfo.value.nome_seccao;
      const preposicoes = ["de", "e", "do", "de", ","];
      const regex = new RegExp(`\\b(${preposicoes.join("|")})\\b`, "g");
      const fraseSemPreposicao = frase.replace(regex, "");
      //console.log(fraseSemPreposicao);
      const palavras = fraseSemPreposicao.split(" ");
      const letrasIniciais = palavras.map((palavra) => palavra[0]);
      //console.log(letrasIniciais.join(""));
      primeirasLetras.value = letrasIniciais.join("");

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

      //salarioPorExtenso.value = toWords.convert(dados.value[0].salario_base);

      if (
        provinciaComessaComH.test(addInfo.value.provincia) &&
        provinciaTerminacomComA.test(addInfo.value.provincia)
      ) {
        artigoQueAntecedeDonomeDaProvincia.value = "da";
      } else if (
        provinciaComessaComBeBCKHNMUZ.test(addInfo.value.provincia) &&
        provinciaTerminacomComA.test(addInfo.value.provincia)
      ) {
        artigoQueAntecedeDonomeDaProvincia.value = "de";
      } else if (
        provinciaComessaComBeBCKHNMUZ.test(addInfo.value.provincia) &&
        provinciaTerminacomComO.test(addInfo.value.provincia)
      ) {
        artigoQueAntecedeDonomeDaProvincia.value = "do";
      } else if (
        provinciaComessaComBeBCKHNMUZ.test(addInfo.value.provincia) &&
        provinciaTerminacomComEL.test(addInfo.value.provincia)
      ) {
        artigoQueAntecedeDonomeDaProvincia.value = "de";
      } else {
        artigoQueAntecedeDonomeDaProvincia.value = "de";
      }

      if (artigoDaInstituicaoComessaComE.test(addInfo.value.escola_id)) {
        artigoQantecedEscola.value = "na";
      } else {
        artigoQantecedEscola.value = "no";
      }

      if (terminaEmAOrao.test(dados.value[0].municipio)) {
        // Usar o artigo "da"
        artigoMunicipio.value = "da";
      } else if (terminaEmOuOs.test(dados.value[0].municipio)) {
        // Usar o artigo "do"
        artigoMunicipio.value = "do";
      } else if (terminaEmEouEs.test(dados.value[0].municipio)) {
        // Usar o artigo "de"
        artigoMunicipio.value = "de";
      } else {
        // Lógica para outro caso, se necessário
      }

      if (terminaEmAOrao.test(dados.value[0].provincia)) {
        // Usar o artigo "da"
        artigoProvincia.value = "da";
      } else if (terminaEmOuOs.test(dados.value[0].provincia)) {
        // Usar o artigo "do"
        artigoProvincia.value = "do";
      } else if (terminaEmEouEs.test(dados.value[0].provincia)) {
        // Usar o artigo "de"
        artigoProvincia.value = "de";
      } else {
        // Lógica para outro caso, se necessário
      }

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
    });

    return {
      salarioPorExtenso,
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
      addInfo,
      dados,
      data,
      model2,
      model,
      dateNowYear,
      artigoQantecedEscola,
      artigoQueAntecedeDonomeDaProvincia,
      formatCurrency,
      moedaPorExtenso,
      dataDeFeria,
      primeirasLetras,
      Munic,
    };
  },
};
</script>
<style scoped>
.StyleFontDocument {
  font-family: "Century Gothic", Arial, sans-serif;
}
.alignTextJustify {
  text-align: justify;
}
p {
  margin-top: -7px !important;
}
.top-subtitle {
  margin-top: -4px !important;
}
.text-small {
  font-size: small;
}
.tab {
  margin-left: 40px;
}
</style>
