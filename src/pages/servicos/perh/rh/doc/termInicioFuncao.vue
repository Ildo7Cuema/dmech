<template>
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
          <div class="col-12 text-center">Governo Provincial da Huíla</div>
          <div class="col-12 text-center">
            Administração Municipal do Chipindo
          </div>
          <div class="col-12 text-center">Direcção Municipal da Educação</div>
          <div class="col-12 text-center">
            <p>_________________________________________________</p>
            <p>
              <b style="font-size: 11px">(GABINETE DO DIRECTOR MUNICIPAL)</b>
            </p>
            <br />
            <b>TERMO DE INÍCIO DE FUNÇÕES{{ addInfo.tipoTermo }}</b>
            <br />
            <br />
          </div>
        </div>

        <div class="row">
          <div class="col-12" style="line-height: 1.5">
            No dia {{ data }}, compareceu no Gabinete do Senhor
            {{ addInfo.directoMunicipal }}, Director Municipal da Educação,
            <span v-if="dados[0].genero == 'Masculino'">o senhor </span
            ><span v-if="dados[0].genero == 'Femenino'">a senhora </span>
            <span v-if="dados[0].genero == 'Femenino'">a </span>
            <b>{{ dados[0].nome }}</b
            >, <span v-if="dados[0].genero == 'Masculino'">filho</span
            ><span v-if="dados[0].genero == 'Femenino'">filha</span> de
            {{ dados[0].nome_pai }} e de {{ dados[0].nome_mae }}, natural
            {{ artigoMunicipio }} {{ dados[0].municipio }} comuna
            {{ artigoComuna }} {{ dados[0].comuna }}, Município
            {{ artigoMunicipio }} {{ dados[0].municipio }}, Província
            {{ artigoProvincia }} {{ dados[0].provincia }}, nascid<span
              v-if="dados[0].genero == 'Femenino'"
              >a</span
            ><span v-if="dados[0].genero == 'Masculino'">o</span> aos,
            {{ dataNascimento }}, portadora do B.I. nº
            {{ dados[0].num_bilhete }}, emitido pelo sector de Identificação
            Civil de Luanda aos {{ dataEmissao }}, habilitad<span
              v-if="dados[0].genero == 'Masculino'"
              >o</span
            ><span v-if="dados[0].genero == 'Femenino'">a</span> com
            {{ artigoComHabiltacao }}, feita {{ artigoInstituicao }}
            {{ dados[0].instituto_formacao }}. A fim de
            <span v-if="addInfo.tipoTermo == ''">
              iniciar as suas funções como docente com a categoria de
              {{ dados[0].categorias.categoria }} cargo para qual foi
              contratado, dia {{ dataInicioFuncao }}</span
            ><span v-else
              >reconstituir o seu termo de inicio de funções como docente, com a
              categoria de {{ dados[0].categorias.categoria }}, com inicio de
              funções a {{ dataInicioFuncao }}.</span
            >
          </div>

          <div class="col-12" style="line-height: 1.5">
            <br />
            Não havendo mais nada a tratar, lavrou-se o presente
            <b>TERMO DE INÍCIO DE FUNÇÕES</b>, que vai ser assinado por todos
            quanto nele intervêm.
          </div>

          <div class="col-12" v-if="addInfo.tipoTermo != ''">
            <br />
            <br />
            Actualizado na Direcção Municipal de Educação, {{ data }}.
          </div>
          <div class="col-12 text-center" style="line-height: 1.5">
            <br />
            <br />
            <br />
            <b
              ><span v-if="dados[0].genero == 'Masculino'">O</span
              ><span v-if="dados[0].genero == 'Femenino'">A</span> Docente</b
            >
            <p>______________________________</p>
            {{ dados[0].nome }}
          </div>

          <div class="col-6 text-center" style="line-height: 1.5">
            <br />
            <br />
            <br />
            <b
              ><span v-if="model2 == 'Chefe da Secção do P.E.R.H'">
                Chefe da Secção do P.E.R.H
              </span></b
            ><b
              ><span v-if="model2 == 'Interno(a)'">
                Na Ausencia do Chefe de Sec. do P.E.R.H
              </span></b
            >
            <p>________________________________</p>
            <span v-if="model2 == 'Chefe da Secção do P.E.R.H'">
              {{ addInfo.chef_PERH }}
            </span>
            <b
              ><span v-if="model2 == 'Interno(a)'">
                {{ addInfo.chef_PERH_interino }}
              </span></b
            >
            <b
              ><span v-if="model2 == 'Interno(a)'" class="text-small">
                ({{ addInfo.chef_PERH_interino_funcao }})
              </span></b
            >
          </div>

          <div class="col-6 text-center" style="line-height: 1.5">
            <br />
            <br />
            <br />
            <b
              ><span v-if="model == 'Director Municipal'">
                O Director Municipal
              </span></b
            ><b
              ><span v-if="model == 'Director Interino'">
                Na Ausencia do Director Municipal
              </span></b
            >
            <p>________________________________</p>
            <span v-if="model == 'Director Municipal'">
              {{ addInfo.directoMunicipal }}
            </span>
            <b
              ><span v-if="model == 'Director Interino'">
                {{ addInfo.directoMunicipal_interino }}
              </span></b
            >
            <p>
              <b
                ><span v-if="model == 'Director Interino'" class="text-small">
                  ({{ addInfo.directoMunicipal_interino_funcao }})
                </span></b
              >
            </p>
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
import useApi from "src/composible/userApi";
import { useQuasar } from "quasar";
import usenotification from "src/composible/useNotify";
import { document } from "postcss";
import moment from "moment";
export default {
  setup() {
    const tabela = "funcionarios";
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
    const data = ref(null);

    // Expressão regular para verificar se a última palavra termina em "a", "ão" ou "ões"
    const terminaEmAOrao = /(\b\w+a\b|\b\w+ão\b|\b\w+ões\b)$/;

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
                "../../../../../../public/icons/ensigna.png",
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
  margin-top: -8px !important;
}
.text-small {
  font-size: small;
}
</style>
