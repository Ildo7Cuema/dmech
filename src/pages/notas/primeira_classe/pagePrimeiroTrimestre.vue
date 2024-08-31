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
              <th rowspan="2">Nome do aluno</th>
              <th colspan="4">{{ trimestre }}</th>
            </tr>
            <tr>
              <th>MAC</th>
              <th>NPP</th>
              <th>NPT</th>
              <th>MT1</th>
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
                  v-model.number="form.mac"
                  :style="{
                    color: getColorMac(),
                  }"
                  :disabled="loadingNota"
                />
              </td>
              <td style="text-align: center">
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.npp"
                  :style="{
                    color: getColorNpp(),
                  }"
                  :disabled="loadingNota"
                />
              </td>
              <td style="text-align: center">
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.npt"
                  :style="{
                    color: getColorNpt(),
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
                  color: getColorMt1(),
                }"
              >
                <q-spinner-dots v-if="loadingNota" />
                <span v-else>{{ form.mt1 }}</span>
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
                {{ form.docente_id }}
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
    idCurso: { type: Number, required: true },
    docenteId: { type: Number, required: true },
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
    const { addNota_primeiroTrimestre, getNotas, getNotaPrimeiroTrimestre } =
      useNotasStore();
    const infoNotas = ref([]);
    const loadingNota = ref(false);

    const form = ref({
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
      listNotas(
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

    const listNotas = async (
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
      console.log(docenteId);
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
        form.value.mac = item.mac1Data.mac1 || 0;
        form.value.npp = item.npp1Data.npp1 || 0;
        form.value.npt = item.npt1Data.npt1 || 0;
        form.value.mt1 = item.mt1Data.mt1 || 0;
      });
      loadingNota.value = false;
    };

    watch(
      () => props.disciplina,
      async (newValue) => {
        loadingNota.value = true;
        listNotas(
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
        loadingNota.value = false;
      }
    );

    //atribbuir cor nas notas de acordo os valores atribuidos
    const getColorMac = () => {
      if (props.curso == "Ensino primário" && form.value.mac < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.mac < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpp = () => {
      if (props.curso == "Ensino primário" && form.value.npp < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.npp < 9.45)
      ) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpt = () => {
      if (props.curso == "Ensino primário" && form.value.npt < 4.44) {
        return "red";
      } else if (
        props.curso == "I Ciclo" ||
        (props.curso == "II Ciclo" && form.value.npt < 9.45)
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

    //calcular a média de acordo os campos que vai alterando
    watch(
      () => form.value.mac,
      async (newValue) => {
        //const soma = (await newValue) + form.value.npp + form.value.npt;
        const mac = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const npp = parseFloat(
          form.value.npp === "" ? 0 : form.value.npp >= 0 ? form.value.npp : 0
        );
        const npt = parseFloat(
          form.value.npt === "" ? 0 : form.value.npt >= 0 ? form.value.npt : 0
        );

        const soma = (await mac) + npp + npt;

        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt1 = media.toFixed(2);
        } else {
          form.value.mt1 = media;
        }
      }
    );
    watch(
      () => form.value.npp,
      async (newValue) => {
        const npp = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const mac = parseFloat(
          form.value.mac === "" ? 0 : form.value.mac >= 0 ? form.value.mac : 0
        );
        const npt = parseFloat(
          form.value.npt === "" ? 0 : form.value.npt >= 0 ? form.value.npt : 0
        );

        const soma = (await npp) + mac + npt;

        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt1 = media.toFixed(2);
        } else {
          form.value.mt1 = media;
        }
      }
    );

    watch(
      () => form.value.npt,
      async (newValue) => {
        const npt = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const mac = parseFloat(
          form.value.mac === "" ? 0 : form.value.mac >= 0 ? form.value.mac : 0
        );
        const npp = parseFloat(
          form.value.npp === "" ? 0 : form.value.npp >= 0 ? form.value.npp : 0
        );

        const soma = (await npp) + mac + npt;
        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt1 = media.toFixed(2);
        } else {
          form.value.mt1 = media;
        }
      }
    );

    watch(
      () => props.disciplina,
      async (newVal) => {
        loading.value = true;
        await getDisciplinaById(newVal).then((item) => {
          form.value.disciplina_id = item.id;
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
          await addNota_primeiroTrimestre(form.value);
          listNotas(
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
