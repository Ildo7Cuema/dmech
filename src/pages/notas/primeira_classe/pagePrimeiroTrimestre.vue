<template>
  <q-page class="q-mt-sm">
    <q-card flat dense style="border-radius: 0" size="sm">
      <q-card-section class="row">
        <div class="body-3 text-red-10">
          <b>{{ trimestre }}</b>
        </div>
        <q-space />
        <q-spinner-dots color="primary" size="2em" v-if="loading" />
        <div class="body-3 text-primary" v-else>
          <span class="text-grey-8">Disciplina: </span>
          <span class="text-red-10"
            ><b>{{ nome_disciplina }}</b></span
          >
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <table class="table green-border">
          <thead>
            <tr>
              <th>Nome do aluno</th>
              <th>MAC</th>
              <th>NPP</th>
              <th>NPT</th>
              <th>MT1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 30%">{{ nome_aluno }}</td>
              <td>
                <input
                  type="number"
                  v-model.number="form.mac"
                  :style="{
                    color: getColorMac(),
                  }"
                />
              </td>
              <td>
                <input
                  type="number"
                  v-model="form.npp"
                  :style="{
                    color: getColorNpp(),
                  }"
                />
              </td>
              <td>
                <input
                  type="number"
                  v-model="form.npt"
                  :style="{
                    color: getColorNpt(),
                  }"
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
                {{ form.mt1 }}
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
    disciplina: { type: Number, required: true },
    trimestre: { type: String, required: true },
  },

  setup(props) {
    const { getDisciplinaById } = useDisciplinaStore();
    const nome_disciplina = ref("");
    const loading = ref(false);
    const form = ref({
      nome_aluno: props.nome_aluno,
      mac: 0,
      npp: 0,
      npt: 0,
      mt1: 0,
    });

    onMounted(() => {
      loading.value;
    });

    //atribbuir cor nas notas de acordo os valores atribuidos
    const getColorMac = () => {
      if (props.curso == "Ensino primário" && form.value.mac < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpp = () => {
      if (props.curso == "Ensino primário" && form.value.npp < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpt = () => {
      if (props.curso == "Ensino primário" && form.value.npt < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };

    const getColorMt1 = () => {
      if (props.curso == "Ensino primário" && form.value.mt1 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };

    //calcular a média de acordo os campos que vai alterando
    watch(
      () => form.value.mac,
      async (newValue) => {
        const soma = (await newValue) + form.value.npp + form.value.npt;
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
        const soma = (await newValue) + form.value.mac + form.value.npt;
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
        const soma = (await newValue) + form.value.mac + form.value.npp;
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
          nome_disciplina.value = item.nome_disciplina;
        });
        loading.value = false;
      }
    );
    //===================================================================================================================
    return {
      nome_disciplina,
      loading,
      form,
      getColorMac,
      getColorNpp,
      getColorNpt,
      getColorMt1,
    };
  },
};
</script>
<style scoped>
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
