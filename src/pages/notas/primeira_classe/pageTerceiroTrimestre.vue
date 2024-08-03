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
      <div class="row">
        <div class="col-12 text-center text-h6">
          Inserindo nota do "<b class="text-red-10">{{ trimestre }}</b
          >"
        </div>
      </div>
      <q-separator />
      <q-card-section>
        {{ isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina) }}
        <table class="table green-border">
          <thead>
            <tr>
              <th rowspan="2" style="width: 200px !important">Nome do aluno</th>
              <th colspan="4">I Trimestre</th>
              <th colspan="4">II Trimestre</th>
              <th colspan="4" class="text-red-10">{{ trimestre }}</th>
              <th rowspan="2">MFD</th>
              <th
                rowspan="2"
                v-if="
                  !isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)
                "
              >
                NE
              </th>
              <th
                colspan="3"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                EXAME O/E
              </th>
              <th rowspan="2">NF</th>
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
              <th>MAC</th>
              <th>NPP</th>
              <th>NPT</th>
              <th>MT3</th>
              <th
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                NEE
              </th>
              <th
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                NEO
              </th>
              <th
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                MEC
              </th>
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
                  disabled
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
                  disabled
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
                  color: getColorMt2(),
                }"
              >
                <q-spinner-dots v-if="loadingNota" />
                <span v-else>{{ form.mt2 }}</span>
              </td>
              <td style="text-align: center">
                <!--Segundo Trimestre-->
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.mac3"
                  :style="{
                    color: getColorMac3(),
                  }"
                />
              </td>
              <td style="text-align: center">
                <!--Segundo Trimestre-->
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.npp3"
                  :style="{
                    color: getColorNpp3(),
                  }"
                />
              </td>
              <td style="text-align: center">
                <!--Segundo Trimestre-->
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.npt3"
                  :style="{
                    color: getColorNpt3(),
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
                  color: getColorMt3(),
                }"
              >
                <q-spinner-dots v-if="loadingNota" />
                <span v-else>{{ form.mt3 }}</span>
              </td>
              <td
                style="
                  width: 10%;
                  background-color: #f2f2f2;
                  font-weight: bold;
                  text-align: center;
                "
                :style="{
                  color: getColorMfd(),
                }"
              >
                <q-spinner-dots v-if="loadingNota" />
                <span v-else>{{ form.mfd }}</span>
              </td>
              <td
                style="text-align: center"
                v-if="
                  !isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)
                "
              >
                <!--Segundo Trimestre-->
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.ne"
                  :style="{
                    color: getColorNe(),
                  }"
                />
              </td>
              <td
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                <!--Segundo Trimestre-->
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.nee"
                  :style="{
                    color: getColorNee(),
                  }"
                />
              </td>
              <td
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                <!--Segundo Trimestre-->
                <q-spinner-dots v-if="loadingNota" />
                <input
                  v-else
                  type="number"
                  v-model="form.neo"
                  :style="{
                    color: getColorNeo(),
                  }"
                />
              </td>
              <td
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
                style="
                  width: 10%;
                  background-color: #f2f2f2;
                  font-weight: bold;
                  text-align: center;
                "
                :style="{
                  color: getColorMec(),
                }"
              >
                <q-spinner-dots v-if="loadingNota" />
                <span v-else>{{ form.mec }}</span>
              </td>
              <td
                style="
                  width: 10%;
                  background-color: #f2f2f2;
                  font-weight: bold;
                  text-align: center;
                "
                :style="{
                  color: getColorMf(),
                }"
              >
                <q-spinner-dots v-if="loadingNota" />
                <span v-else>{{ form.mf }}</span>
              </td>
              <td style="width: 10%; text-align: center; border: none">
                <q-btn
                  dense
                  no-caps
                  outline
                  icon="mdi-content-save-outline"
                  color="green-10"
                  size="sm"
                  class="flex item-center"
                  @click="addNotas()"
                  :loading="loadingSaveBtn"
                  :disable="loadingSaveBtn"
                  align="center"
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

import { ref, watch, onMounted, computed } from "vue";
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
      getNotaTerceiroTrimestre,
    } = useNotasStore();
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
      mac3: 0,
      npp3: 0,
      npt3: 0,
      mt3: 0,
      mfd: 0,
      ne: 0,
      nee: 0,
      neo: 0,
      mec: 0,
      mf: 0,
      classe_id: props.infoAluno.classe_id,
      turma_id: props.infoAluno.turma_id,
      periodo_id: props.infoAluno.periodo_id,
      curso_id: props.infoAluno.curso_id,
      disciplina_id: 0,
      aluno_id: props.infoAluno.id,
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
        props.infoAluno.curso_id
      );
      listNotasSegundoTrimestre(
        props.infoAluno.id,
        props.ano_lectivo,
        props.infoAluno.escola_id,
        props.disciplina,
        "II Trimestre",

        props.infoAluno.classe_id,
        props.infoAluno.turma_id,
        props.infoAluno.periodo_id,
        props.infoAluno.curso_id
      );
      listNotasTerceiroTrimestre(
        props.infoAluno.id,
        props.ano_lectivo,
        props.infoAluno.escola_id,
        props.disciplina,
        props.trimestre,

        props.infoAluno.classe_id,
        props.infoAluno.turma_id,
        props.infoAluno.periodo_id,
        props.infoAluno.curso_id
      );

      form.value.mfd = mediaMFD;
      form.value.mec = mediaMEC;
      form.value.mf = mediaFinal;
    });

    const mediaMFD = computed(() => {
      const mt1 = parseFloat(form.value.mt1 || 0);
      const mt2 = parseFloat(form.value.mt2 || 0);
      const mt3 = parseFloat(form.value.mt3 || 0);

      const soma = mt1 + mt2 + mt3;
      const media = soma / 3;
      return media.toFixed(2);
    });

    const mediaMEC = computed(() => {
      const nee = parseFloat(form.value.nee || 0);
      const neo = parseFloat(form.value.neo || 0);

      const soma = nee + neo;
      const media = soma / 2;
      return media.toFixed(2);
    });

    const mediaFinal = computed(() => {
      if (isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina.value)) {
        const mfd = parseFloat(form.value.mfd || 0);
        const mec = parseFloat(form.value.mec || 0);
        const soma = mfd * 0.4 + mec * 0.6;
        return soma.toFixed(0);
      } else {
        const mfd = parseFloat(form.value.mfd || 0);
        const ne = parseFloat(form.value.ne || 0);
        const soma = mfd * 0.4 + ne * 0.6;
        return soma.toFixed(0);
      }
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
      cursoId
    ) => {
      console.log(idAluno, anoLectivo, escolaId, disciplina, trimestre);
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
        cursoId
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
      cursoId
    ) => {
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
        cursoId
      ).then((item) => {
        console.log(item.mac2Data);
        form.value.mac2 = item.mac2Data.mac2 || 0;
        form.value.npp2 = item.npp2Data.npp2 || 0;
        form.value.npt2 = item.npt2Data.npt2 || 0;
        form.value.mt2 = item.mt2Data.mt2 || 0;
      });
      loadingNota.value = false;
    };
    //listar notas do  III trimestre
    const listNotasTerceiroTrimestre = async (
      idAluno,
      anoLectivo,
      escolaId,
      disciplina,
      trimestre,
      classeId,
      turmaId,
      periodoId,
      cursoId
    ) => {
      console.log(idAluno, anoLectivo, escolaId, disciplina, trimestre);
      loadingNota.value = true;
      await getNotaTerceiroTrimestre(
        idAluno,
        anoLectivo,
        escolaId,
        disciplina,
        trimestre,
        classeId,
        turmaId,
        periodoId,
        cursoId
      ).then((item) => {
        console.log(item.mac3Data);
        form.value.mac3 = item.mac3Data.mac3 || 0;
        form.value.npp3 = item.npp3Data.npp3 || 0;
        form.value.npt3 = item.npt3Data.npt3 || 0;
        form.value.mt3 = item.mt3Data.mt3 || 0;
      });
      loadingNota.value = false;
    };

    watch(
      () => props.disciplina,
      async (newValue) => {
        loadingNota.value = true;
        listNotasPrimeiroTrimestre(
          props.infoAluno.id,
          props.ano_lectivo,
          props.infoAluno.escola_id,
          newValue,
          "I Trimestre",
          props.infoAluno.classe_id,
          props.infoAluno.turma_id,
          props.infoAluno.periodo_id,
          props.infoAluno.curso_id
        );
        listNotasSegundoTrimestre(
          props.infoAluno.id,
          props.ano_lectivo,
          props.infoAluno.escola_id,
          newValue,
          "II Trimestre",
          props.infoAluno.classe_id,
          props.infoAluno.turma_id,
          props.infoAluno.periodo_id,
          props.infoAluno.curso_id
        );
        listNotasTerceiroTrimestre(
          props.infoAluno.id,
          props.ano_lectivo,
          props.infoAluno.escola_id,
          newValue,
          props.trimestre,
          props.infoAluno.classe_id,
          props.infoAluno.turma_id,
          props.infoAluno.periodo_id,
          props.infoAluno.curso_id
        );

        loadingNota.value = false;
      }
    );

    //atribbuir cor nas notas de acordo os valores atribuidos no primeiro trimestre
    const getColorMac = () => {
      if (props.curso == "Ensino primário" && form.value.mac1 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpp = () => {
      if (props.curso == "Ensino primário" && form.value.npp1 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpt = () => {
      if (props.curso == "Ensino primário" && form.value.npt1 < 4.44) {
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
    //================================================================================================
    //atribbuir cor nas notas de acordo os valores atribuidos no Segundo trimestre
    const getColorMac2 = () => {
      if (props.curso == "Ensino primário" && form.value.mac2 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpp2 = () => {
      if (props.curso == "Ensino primário" && form.value.npp2 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpt2 = () => {
      if (props.curso == "Ensino primário" && form.value.npt2 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };

    const getColorMt2 = () => {
      if (props.curso == "Ensino primário" && form.value.mt2 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    //================================================================================================
    //atribbuir cor nas notas de acordo os valores atribuidos no Terceiro trimestre
    const getColorMac3 = () => {
      if (props.curso == "Ensino primário" && form.value.mac3 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpp3 = () => {
      if (props.curso == "Ensino primário" && form.value.npp3 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNpt3 = () => {
      if (props.curso == "Ensino primário" && form.value.npt3 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };

    const getColorMt3 = () => {
      if (props.curso == "Ensino primário" && form.value.mt3 < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorMfd = () => {
      if (props.curso == "Ensino primário" && form.value.mfd < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNe = () => {
      if (props.curso == "Ensino primário" && form.value.ne < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNee = () => {
      if (props.curso == "Ensino primário" && form.value.nee < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorNeo = () => {
      if (props.curso == "Ensino primário" && form.value.neo < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorMec = () => {
      if (props.curso == "Ensino primário" && form.value.mec < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    const getColorMf = () => {
      if (props.curso == "Ensino primário" && form.value.mf < 4.44) {
        return "red";
      } else {
        return "blue";
      }
    };
    //================================================================================================

    //calcular a média de acordo os campos que vai alterando

    watch(
      () => form.value.mac3,
      async (newValue) => {
        const mac = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const npp = parseFloat(
          form.value.npp3 === ""
            ? 0
            : form.value.npp3 >= 0
            ? form.value.npp3
            : 0
        );
        const npt = parseFloat(
          form.value.npt3 === ""
            ? 0
            : form.value.npt3 >= 0
            ? form.value.npt3
            : 0
        );

        const soma = (await mac) + npp + npt;

        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt3 = media.toFixed(2);
          form.value.mfd = mediaMFD;
        } else {
          form.value.mt3 = media;
          form.value.mfd = mediaMFD;
        }
      }
    );

    watch(
      () => form.value.npp3,
      async (newValue) => {
        const npp = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const mac = parseFloat(
          form.value.mac3 === ""
            ? 0
            : form.value.mac3 >= 0
            ? form.value.mac3
            : 0
        );
        const npt = parseFloat(
          form.value.npt3 === ""
            ? 0
            : form.value.npt3 >= 0
            ? form.value.npt3
            : 0
        );

        const soma = (await mac) + npp + npt;

        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt3 = media.toFixed(2);
          form.value.mfd = mediaMFD;
        } else {
          form.value.mt3 = media;
          form.value.mfd = mediaMFD;
        }
      }
    );

    watch(
      () => form.value.npt3,
      async (newValue) => {
        const npt = parseFloat(
          newValue === "" ? 0 : newValue >= 0 ? newValue : 0
        );

        const mac = parseFloat(
          form.value.mac3 === ""
            ? 0
            : form.value.mac3 >= 0
            ? form.value.mac3
            : 0
        );
        const npp = parseFloat(
          form.value.npp3 === ""
            ? 0
            : form.value.npp3 >= 0
            ? form.value.npp3
            : 0
        );

        const soma = (await mac) + npp + npt;

        const media = soma / 3;
        if (media.toString().length > 5) {
          form.value.mt3 = media.toFixed(2);
          form.value.mfd = mediaMFD;
        } else {
          form.value.mt3 = media;
          form.value.mfd = mediaMFD;
        }
      }
    );

    watch(
      () => form.value.nee,
      async (newValue) => {
        form.value.mec = mediaMEC;
      }
    );
    watch(
      () => form.value.neo,
      async (newValue) => {
        form.value.mec = mediaMEC;
      }
    );

    watch(
      () => form.value.mfd,
      async (newValue) => {
        form.value.mf = mediaFinal;
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

    //salvar nota
    const addNotas = async () => {
      try {
        if (form.value.disciplina_id == 0 || form.value.disciplina_id == "") {
          notifyError("Selecione uma disciplina para inserir a nota");
          return;
        } else {
          loadingSaveBtn.value = true;
          await addNota_segundoTrimestre(form.value);
          listNotasSegundoTrimestre(
            props.infoAluno.id,
            props.ano_lectivo,
            props.infoAluno.escola_id,
            props.disciplina,
            props.trimestre,

            props.infoAluno.classe_id,
            props.infoAluno.turma_id,
            props.infoAluno.periodo_id,
            props.infoAluno.curso_id
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
      getColorMac3,
      getColorNpp3,
      getColorNpt3,
      getColorMt3,
      getColorMfd,
      getColorNe,
      getColorNee,
      getColorNeo,
      getColorMf,
      getColorMec,
      loadingSaveBtn,
      addNotas,
      loadingNota,
      mediaMFD,
      isLinguaPortuguesaOrEstrangeira,
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
