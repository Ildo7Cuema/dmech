<template>
  <div>
    <iframe
      v-if="pdfSrc"
      :src="pdfSrc"
      style="width: 100%; height: 800px"
    ></iframe>
    <div style="display: none">
      <div id="elemento-para-pdf" class="StyleFontDocument">
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
        </div>

        <div class="row">
          <div class="col-12 text-center">
            <br />
            <pre>
         AO
                                      BANCO ANGOLANO DE INVESTIMENTOS
                                        ATT: <span style="text-transform: uppercase;">{{ dados[0].balcao_domicilio }}</span>
                    <span style="text-transform: uppercase;">{{ dados[0].balcao_domicilio_municipio }}-{{
                dados[0].balcao_domicilio_provincia
              }}</span>
            </pre>
          </div>
          <div class="col-12 StyleFontDocument alignTextJustify">
            Data:{{ dataShotForm }}
            <p />
            Assunto:<b>Declaração de Consignação de Salário</b>
            <br />
            <br />
            <div style="line-height: 1.3">
              Para os devidos efeitos, declaramos que,
              <span v-if="dados[0].genero == 'Masculino'">o</span
              ><span v-else>a</span> cliente identificado abaixo é
              <span v-if="dados[0].genero == 'Masculino'">funcionario</span
              ><span v-else>funcionária</span> desta instituição.
            </div>
            <br />

            <div style="line-height: 1.3">
              <br />Nome: <b>{{ dados[0].name }}</b>
              <p />
              N.º de conta: {{ dados[0].num_conta_bancaria }}.10.001
              <p />
              N.º do Bilhete de Identidade: {{ dados[0].num_bilhete }}
              <p />
              Telemóvel: {{ dados[0].num_telemovel }}
              <p />
              Correio electrónico: <span v-if="dados[0].email == null">S/C</span
              ><span v-else>{{ dados[0].email }}</span>
              <p />
              Morada: {{ dados[0].localidade }}
              <p />
              Balcão de domicílio: {{ dados[0].balcao_domicilio }}
              <p />
              Vínculo contratual: Por tempo indeterminado
              <p />
              Função:<span v-if="dados[0].status_nomeacao == 'Sim'">{{
                dados[0].nome_cargo
              }}</span
              ><span v-else>{{ dados[0].categorias.categoria }}</span
              >.
              <p />
              Salário base mensal (KZ):
              <b
                >{{ formatCurrency(dados[0].salario_base) }} ({{
                  dados[0].salario_base_extenso
                }})</b
              >
              <br />
              <p />
              Finalidade da declaração: <b>Obtenção de Crédito.</b>
            </div>
            <br />
            <br />
            <div style="line-height: 1.3">
              Para garantia do cumprimento das obrigações assumidas e a pedido
              do trabalhador, comprometemo-nos a consignar irrevogavelmente o
              salário do mesmo, na conta acima mencionada, junto do Banco
              Angolano de Investimentos (BAI) até a liquidação total das
              obrigações assumidas.
            </div>
            <br />
            <br />
            <div style="line-height: 1.3">
              Assumimos a responsabilidade de comunicar ao BAI toda e qualquer
              alteração que se verifique no vínculo jurídico-laboral com o
              trabalhador.
            </div>
            <br />
            Atenciosamente;

            <div class="col-12 text-center">
              <span v-if="model == 'Director Municipal'" style="line-height: 2">
                <b>O Director Municipal</b>
                <br />
                {{ addInfo.directoMunicipal }}
              </span>
              <span v-if="model == 'Director Interino'" style="line-height: 2">
                <b>Na ausencia do Director Municipal</b>
                <br />
                {{ addInfo.directoMunicipal_interino }}
              </span>
              <p style="margin-top: -9px">
                <span class="text-small" v-if="model == 'Director Interino'">
                  ({{ addInfo.directoMunicipal_interino_funcao }})
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import moment from "moment";
import { formatCurrency } from "src/utils/formatCurrency";

export default {
  setup() {
    const pdfSrc = ref(null);
    const route = useRoute();
    const dataShotForm = ref("");

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
            filename: "decBai.pdf",
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

      data.value = moment().format("D [de] MMMM [de] YYYY");
      dataShotForm.value = moment().format("DD/MM/YYYY");

      dataNascimento.value = moment(dados.value[0].data_nascimento).format(
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
      dataShotForm,
    };
    q;
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
.text-small {
  font-size: small;
}
.tab {
  margin-left: 40px;
}
</style>
