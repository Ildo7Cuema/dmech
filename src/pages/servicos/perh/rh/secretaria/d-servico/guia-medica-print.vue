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
          <div class="col-4 text-center">
            <div class="col-12 text-center" style="line-height: 1.5">
              <b
                ><span v-if="model == 'Director Municipal'">
                  <b>O Director Municipal</b>
                </span></b
              ><b
                ><span v-if="model == 'Director Interino'">
                  <b>Na ausencia do Director Municipal</b>
                </span></b
              >
              <br />
              <br />
              <span v-if="model == 'Director Municipal'" class="q-pa-md">
                {{ addInfo.directoMunicipal }}
              </span>
              <br />
              <b
                ><span v-if="model == 'Director Interino'">
                  {{ addInfo.directoMunicipal_interino }} </span
                ><br
              /></b>
              <p>
                <b
                  ><span v-if="model == 'Director Interino'" class="text-small">
                    ({{ addInfo.directoMunicipal_interino_funcao }})
                  </span></b
                >
              </p>
            </div>
          </div>
          <div class="col-4 text-center">República de Angola</div>
          <div class="col-4 text-center"></div>
        </div>

        <div class="row">
          <div class="col-12 text-center">
            <b
              >Direcção Municipal da Educação {{ artigoMunicipio }}
              {{ addInfo.municipio }}</b
            >
          </div>
        </div>

        <div class="row">
          <div class="col-12 text-center">
            <br />
            <br />
            <b>GUIA MÉDICA Nº_______/{{ dateNowYear }}</b>
            <br />
            <br />
            <span class="top-subtitle">
              Vai apresentar-se ao <b>{{ addInfo.hospital }}</b></span
            >
          </div>

          <div class="col-12" style="line-height: 1.5">
            <br />
            <pre class="StyleFontDocument">
   Nome do beneficiário: <b>{{ dados[0].name }}</b>
   Situação: <b>{{ dados[0].cituacao_funcionario }}</b>
   Categoria:<b>{{dados[0].categorias.categoria}}</b>
   Provimentos mensais do agregado familiar
   Kz
   <q-separator size="2px" color="black" inset class="line-mais-tope" style="margin-bottom: -20px !important;"/>
   Elementos referentes ao beneficiário:
   <q-separator color="black" class="line-mais-tope" style="width:287px; margin-left: 14px !important;"/>
   <q-separator color="black" class="line-mais-tope2" style="width:287px; margin-left: 14px !important; margin-bottom:-10px !important"/>
   Filiação:
   <b>{{dados[0].nome_pai}}</b>
   e
   <b>{{dados[0].nome_mae}}</b>
   Naturalidade: <b>{{dados[0].municipio}}</b>
   Município: <b>{{dados[0].municipio}}</b>
   Província: <b>{{dados[0].provincia}}</b>
   Idade: <b>{{idade}}</b> anos                    Estado Civil: <b>{{dados[0].estado_civil}}</b>                 Género: <b>{{dados[0].genero}}</b>
   <div class="col-12" style="line-height: 1.5; margin-top:-60px !important">
            <b
              ><span v-if="model2 == 'Secretário'">
                                                            s<b>O Secretário</b>
              </span></b
            >
            <p v-if="model2 == 'Secretário'" class="line-top-nama-asign">
                                                     {{ addInfo.nome_secretario }}
            </p>
            <b
              ><span v-if="model2 == 'Secretário interino'">
                                                      <b>Na ausencia do Secretário</b>
              </span></b
            >
            <b
              ><span v-if="model2 == 'Secretário interino'">
                                                            {{ addInfo.nome_secretario_interino }} </span
              ></b>
            <p>
              <b
                ><span v-if="model2 == 'Secretário interino'" class="text-small">
                                                            ({{ addInfo.nome_funcao_secretario_interino }})
                </span></b
              >
            </p>
             <p class="col-12 text-center line-top-data-asign"><b>{{ addInfo.municipio }}, {{ data }}.</b></p>
            <q-separator size="2px" color="black" inset class="line-mais-tope" style="margin-top: -45px"/>


          </div>
<p style="margin-top: -115px !important">    Prescrição Médica</p>
<q-separator size="1px" color="black" inset style="margin-top:-8px !important"/>
<q-separator size="1px" color="black" inset style="margin-top:2px !important"/>
<q-separator size="1px" color="black" inset style="margin-top:2px !important"/>
<q-separator size="1px" color="black" inset style="margin-top:2px !important"/>
         <p style="margin-top:-36px !important">    _________ {{ dateNowYear }}                                                                           O Médico
                                                                                        _____________________________
          </p>
            </pre>
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
    const idade = ref("");

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

    const salarioPorExtenso = ref("");
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
        $q.loading.show();
        const element = window.document.getElementById("elemento-para-pdf");
        //const element = document.getElementById("elemento-para-pdf");
        await html2pdf()
          .from(element)
          .set({
            margin: 0.89,
            filename: "Guia-medica.pdf",
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
      console.log(route.params.model2);
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

      idade.value =
        moment().format("YYYY") -
        moment(dados.value[0].data_nascimento).format("YYYY");

      dataDeFeria.value = moment(addInfo.value.calendary).format(
        "D [de] MMMM [de] YYYY"
      );

      dataEmissao.value = moment(dados.value[0].data_emissao).format(
        "D [de] MMMM [de] YYYY"
      );
      dataInicioFuncao.value = moment(dados.value[0].data_inicio_funcao).format(
        "D [de] MMMM [de] YYYY"
      );

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
      idade,
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
.line-mais-tope {
  margin-top: -25px;
}
.line-mais-tope2 {
  margin-top: -47px;
}
.line-top-nama-asign {
  margin-top: -60px !important;
}
.line-top-data-asign {
  margin-top: -230px !important;
}
.text-small {
  font-size: small;
}
.tab {
  margin-left: 40px;
}
</style>
