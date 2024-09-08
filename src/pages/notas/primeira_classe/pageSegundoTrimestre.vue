<template>
  <q-page class="q-mt-sm">
    <q-card flat dense style="border-radius: 0" size="sm">
      <q-card-section class="row">
        <q-spinner-dots color="primary" size="2em" v-if="loading" />
        <div class="body-3 text-primary" v-else>
          <span class="text-grey-8">Disciplina: </span>
          <span class="text-red-10"
            ><b>{{ nome_disciplina }}</b></span
          >
          <p class="text-grey-8">
            Curso: <b>{{ curso }}</b>
          </p>
          <p style="margin-top: -16px" class="text-grey-8">
            Classe: <b>{{ classe }}</b>
          </p>
          <p style="margin-top: -16px" class="text-grey-8">
            Turma: <b>{{ turma }}</b>
          </p>
        </div>
        <q-space />
        <div class="body-3 text-red-10">
          <p style="margin-top: 0px" class="text-grey-8">
            Escola: <b>{{ escola }}</b>
          </p>
          <p style="margin-top: -16px" class="text-grey-8">
            Período:<b>{{ periodo }}</b>
          </p>
          <p style="margin-top: -16px" class="text-grey-8">
            Ano lectivo: <b>{{ ano_lectivo }}</b>
          </p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        [ <b class="text-red-10">{{ nome_disciplina }}</b> ] [
        <b class="text-red-9">{{ trimestre }}</b> ]
        <table class="table green-border">
          <thead>
            <tr>
              <th rowspan="2" style="width: 200px !important">Nome do aluno</th>
              <th colspan="4">I Trimestre</th>
              <th colspan="4" class="text-red-10">{{ trimestre }}</th>
            </tr>
            <tr>
              <th>MAC</th>
              <th>NPP</th>
              <th>NPT</th>
              <th>MT1</th>
              <th>MAC</th>
              <th>NPP</th>
              <th>NPT</th>
              <th>MT2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 30%">{{ nome_aluno }}</td>
              <td style="text-align: center">
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model.number="form.mac1"
                  :style="{
                    color: getColorMac(),
                  }"
                  disabled
                />
              </td>
              <td style="text-align: center">
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.npp1"
                  :style="{
                    color: getColorNpp(),
                  }"
                  disabled
                />
              </td>
              <td style="text-align: center">
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.npt1"
                  :style="{
                    color: getColorNpt(),
                  }"
                  disabled
                />
              </td>
              <td
                style="
                  width: 10%;
                  background-color: #f2f2f2;
                  font-weight: bold;
                  text-align: center;
                "
                :style="{
                  color: getColorMt1(),
                }"
              >
                <q-spinner-dots v-if="loadingNota" />
                <span v-else>{{ form.mt1 }}</span>
              </td>
              <td style="text-align: center">
                <!--Segundo Trimestre-->
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model.number="form.mac2"
                  :style="{
                    color: getColorMac2(),
                  }"
                  :disabled="loadingNota"
                />
              </td>
              <td style="text-align: center">
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.npp2"
                  :style="{
                    color: getColorNpp2(),
                  }"
                  :disabled="loadingNota"
                />
              </td>
              <td style="text-align: center">
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.npt2"
                  :style="{
                    color: getColorNpt2(),
                  }"
                  :disabled="loadingNota"
                />
              </td>
              <td
                style="
                  width: 10%;
                  background-color: #f2f2f2;
                  font-weight: bold;
                  text-align: center;
                "
                :style="{
                  color: getColorMt2(),
                }"
              >
                <q-spinner-dots v-if="loadingNota" />
                <span v-else>{{ form.mt2 }}</span>
              </td>
              <td style="width: 10%; text-align: center; border: none">
                <q-btn
                  dense
                  no-caps
                  outline
                  label="Salvar"
                  icon="mdi-content-save-outline"
                  color="green-10"
                  size="sm"
                  class="q-pr-sm"
                  @click="addNotas()"
                  :loading="loadingSaveBtn"
                  :disable="loadingSaveBtn"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { useDisciplinaStore } from "src/stores/disciplinas";
import usenotification from "src/composible/useNotify";
import { useNotasStore } from "src/stores/notas";
import { useAdd_Nota_Miniauta_Store } from "src/stores/add_notas";

import { ref, watch, onMounted } from "vue";
export default {
  name: "PrimeiraClassePagePrimeiroTrimestre",
  // configuração do componente
  props: {
    classe: { type: String, required: true },
    turma: { type: String, required: true },
    periodo: { type: String, required: true },
    ano_lectivo: { type: String, required: true },
    curso: { type: String, required: true },
    nome_aluno: { type: String, required: true },
    docenteId: { type: Number, required: true },
    idCurso: { type: Number, required: true },
    disciplina: { type: Number, required: true },
    trimestre: { type: String, required: true },
    escola: { type: String, required: true },
    infoAluno: { type: Object, required: true },
  },

  setup(props) {
    const { getDisciplinaById } = useDisciplinaStore();
    const { notifyError, notifySuccess } = usenotification();
    const nome_disciplina = ref("");
    const loading = ref(false);
    const loadingSaveBtn = ref(false);
    const {
      addNota_primeiroTrimestre,
      addNota_segundoTrimestre,
      getNotas,
      getNotaPrimeiroTrimestre,
      getNotaSegundoTrimestre,
    } = useNotasStore();
    const { add_mini_pauta } = useAdd_Nota_Miniauta_Store();
    const infoNotas = ref([]);
    const loadingNota = ref(false);

    const form = ref({
      nome_aluno: props.nome_aluno,
      mac1: 0,
      npp1: 0,
      npt1: 0,
      mt1: 0,
      mac2: 0,
      npp2: 0,
      npt2: 0,
      mt2: 0,
      classe_id: props.infoAluno.classe_id,
      turma_id: props.infoAluno.turma_id,
      periodo_id: props.infoAluno.periodo_id,
      curso_id: props.infoAluno.curso_id,
      disciplina_id: 0,
      aluno_id: props.infoAluno.id,
      docente_id: props.docenteId,
      escola_id: props.infoAluno.escola_id,
      ano_lectivo: props.ano_lectivo,
      trimestre: props.trimestre,
    });

    const form2 = ref({
      nome_aluno: props.nome_aluno,
      mac: 0,
      npp: 0,
      npt: 0,
      mt1: 0,
      classe_id: props.infoAluno.classe_id,
      turma_id: props.infoAluno.turma_id,
      periodo_id: props.infoAluno.periodo_id,
      curso_id: props.infoAluno.curso_id,
      disciplina_id: 0,
      aluno_id: props.infoAluno.id,
      docente_id: props.docenteId,
      escola_id: props.infoAluno.escola_id,
      ano_lectivo: props.ano_lectivo,
      trimestre: props.trimestre,
    });

    onMounted(() => {
      listNotasPrimeiroTrimestre(
        props.infoAluno.id,
        props.ano_lectivo,
        props.infoAluno.escola_id,
        props.disciplina,
        "I Trimestre",

        props.infoAluno.classe_id,
        props.infoAluno.turma_id,
        props.infoAluno.periodo_id,
        props.infoAluno.curso_id,
        props.docenteId
      );
      listNotasSegundoTrimestre(
        props.infoAluno.id,
        props.ano_lectivo,
        props.infoAluno.escola_id,
        props.disciplina,
        props.trimestre,

        props.infoAluno.classe_id,
        props.infoAluno.turma_id,
        props.infoAluno.periodo_id,
        props.infoAluno.curso_id,
        props.docenteId
      );
    });
    //listar notas do  I trimestre
    const listNotasPrimeiroTrimestre = async (
      idAluno,
      anoLectivo,
      escolaId,
      disciplina,
      trimestre,
      classeId,
      turmaId,
      periodoId,
      cursoId,
      docenteId
    ) => {
      loadingNota.value = true;
      await getNotaPrimeiroTrimestre(
        idAluno,
        anoLectivo,
        escolaId,
        disciplina,
        trimestre,
        classeId,
        turmaId,
        periodoId,
        cursoId,
        docenteId
      ).then((item) => {
        console.log(item.mac1Data);
        form.value.mac1 = item.mac1Data.mac1 || 0;
        form.value.npp1 = item.npp1Data.npp1 || 0;
        form.value.npt1 = item.npt1Data.npt1 || 0;
        form.value.mt1 = item.mt1Data.mt1 || 0;
      });
      loadingNota.value = false;
    };

    //listar notas do  II trimestre
    const listNotasSegundoTrimestre = async (
      idAluno,
      anoLectivo,
      escolaId,
      disciplina,
      trimestre,
      classeId,
      turmaId,
      periodoId,
      cursoId,
      docenteId
    ) => {
      console.log(idAluno, anoLectivo, escolaId, disciplina, trimestre);
      loadingNota.value = true;
      await getNotaSegundoTrimestre(
        idAluno,
        anoLectivo,
        escolaId,
        disciplina,
        trimestre,
        classeId,
        turmaId,
        periodoId,
        cursoId,
        docenteId
      ).then((item) => {
        console.log(item.mac2Data);
        form.value.mac2 = item.mac2Data.mac2 || 0;
        form.value.npp2 = item.npp2Data.npp2 || 0;
        form.value.npt2 = item.npt2Data.npt2 || 0;
        form.value.mt2 = item.mt2Data.mt2 || 0;
      });
      loadingNota.value = false;
    };

    watch(
      () => props.disciplina,
      async (newValue) => {
        loadingNota.value = true;
        listNotasSegundoTrimestre(
          props.infoAluno.id,
          props.ano_lectivo,
          props.infoAluno.escola_id,
          newValue,
          props.trimestre,
          props.infoAluno.classe_id,
          props.infoAluno.turma_id,
          props.infoAluno.periodo_id,
          props.infoAluno.curso_id,
          props.docenteId
        );
        listNotasPrimeiroTrimestre(
          props.infoAluno.id,
          props.ano_lectivo,
          props.infoAluno.escola_id,
          newValue,
          "I Trimestre",
          props.infoAluno.classe_id,
          props.infoAluno.turma_id,
          props.infoAluno.periodo_id,
          props.infoAluno.curso_id,
          props.docenteId
        );
        loadingNota.value = false;
      }
    );

    //atribbuir cor nas notas de acordo os valores atribuidos no primeiro trimestre
    const getColorMac = () => {
      if (props.curso == "Ensino primário" && form.value.mac1 < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.mac1 < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpp = () => {
      if (props.curso == "Ensino primário" && form.value.npp1 < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.npp1 < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpt = () => {
      if (props.curso == "Ensino primário" && form.value.npt1 < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.npt1 < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    const getColorMt1 = () => {
      if (props.curso == "Ensino primário" && form.value.mt1 < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.mt1 < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    //================================================================================================
    //atribbuir cor nas notas de acordo os valores atribuidos no Segundo trimestre
    const getColorMac2 = () => {
      if (props.curso == "Ensino primário" && form.value.mac2 < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.mac2 < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpp2 = () => {
      if (props.curso == "Ensino primário" && form.value.npp2 < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.npp2 < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpt2 = () => {
      if (props.curso == "Ensino primário" && form.value.npt2 < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.npt2 < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    const getColorMt2 = () => {
      if (props.curso == "Ensino primário" && form.value.mt2 < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.mt2 < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    //================================================================================================

    //calcular a média de acordo os campos que vai alterando
    watch(
      () => form.value.mac2,
      async (newValue) => {
        //const soma = (await newValue) + form.value.npp + form.value.npt;
        const mac = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const npp = parseFloat(
          form.value.npp2 === ""
            ? 0
            : form.value.npp2 >= 0
            ? form.value.npp2
            : 0
        );
        const npt = parseFloat(
          form.value.npt2 === ""
            ? 0
            : form.value.npt2 >= 0
            ? form.value.npt2
            : 0
        );

        const soma = (await mac) + npp + npt;

        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt2 = media.toFixed(2);
        } else {
          form.value.mt2 = media;
        }
      }
    );
    watch(
      () => form.value.npp2,
      async (newValue) => {
        const npp = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const mac = parseFloat(
          form.value.mac2 === ""
            ? 0
            : form.value.mac2 >= 0
            ? form.value.mac2
            : 0
        );
        const npt = parseFloat(
          form.value.npt === "" ? 0 : form.value.npt >= 0 ? form.value.npt : 0
        );

        const soma = (await npp) + mac + npt;

        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt2 = media.toFixed(2);
        } else {
          form.value.mt2 = media;
        }
      }
    );

    watch(
      () => form.value.npt2,
      async (newValue) => {
        const npt = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const mac = parseFloat(
          form.value.mac2 === ""
            ? 0
            : form.value.mac2 >= 0
            ? form.value.mac2
            : 0
        );
        const npp = parseFloat(
          form.value.npp2 === ""
            ? 0
            : form.value.npp2 >= 0
            ? form.value.npp2
            : 0
        );

        const soma = (await npp) + mac + npt;
        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt2 = media.toFixed(2);
        } else {
          form.value.mt2 = media;
        }
      }
    );

    watch(
      () => props.disciplina,
      async (newVal) => {
        loading.value = true;
        await getDisciplinaById(newVal).then((item) => {
          form.value.disciplina_id = item.id;
          form2.value.disciplina_id = item.id;
          nome_disciplina.value = item.nome_disciplina;
        });
        loading.value = false;
      }
    );
    //salvar nota
    const addNotas = async () => {
      try {
        if (form.value.disciplina_id == 0 || form.value.disciplina_id == "") {
          notifyError("Selecione uma disciplina para inserir a nota");
          return;
        } else {
          loadingSaveBtn.value = true;
          await addNota_segundoTrimestre(form.value);
          form2.value.mac = form.value.mac2;
          form2.value.npp = form.value.npp2;
          form2.value.npt = form.value.npt2;
          form2.value.mt1 = form.value.mt2;
          await add_mini_pauta(form2.value);
          listNotasSegundoTrimestre(
            props.infoAluno.id,
            props.ano_lectivo,
            props.infoAluno.escola_id,
            props.disciplina,
            props.trimestre,

            props.infoAluno.classe_id,
            props.infoAluno.turma_id,
            props.infoAluno.periodo_id,
            props.infoAluno.curso_id,
            props.docenteId
          );
          loadingSaveBtn.value = false;
        }
      } catch (error) {
        console.log(error);
      }
    };
    //===================================================================================================================
    return {
      nome_disciplina,
      loading,
      form,
      getColorMac,
      getColorNpp,
      getColorNpt,
      getColorMt1,
      getColorMac2,
      getColorNpp2,
      getColorNpt2,
      getColorMt2,
      loadingSaveBtn,
      addNotas,
      loadingNota,
    };
  },
};
</script>
<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.table.green-border th,
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

.table th,
.table td {
  border: 1px solid #106603;
  padding: 0px;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
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
