<template>
  <q-page>
    <loading-component :show="loading" />
    <loading-component2 :load="carrearMiniPauta" />
    <q-form @submit.prevent="hendleMiniPaulta">
      <div class="row q-mt-sm bg-green-10 text-white">
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.cursoID"
            label="Seleciona o curso"
            option-value="id"
            option-label="nome_curso"
            :options="cursos"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione o curso']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.classeID"
            :options="classes"
            label="Seleciona a classe"
            option-value="id"
            option-label="nome_classe"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione a classe']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.turmaID"
            :options="turmas"
            label="Seleciona a turma"
            option-value="id"
            option-label="nome_turma"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione a turma']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.periodoID"
            :options="periodos"
            label="Seleciona o período"
            option-value="id"
            option-label="nome_periodo"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione o período']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.anoLectivo"
            :options="anosLectivos"
            label="Seleciona o ano lectivo"
            option-value="id"
            option-label="ano_lectivo"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione o ano lectivo']"
          />
        </div>
        <div class="col-2">
          <q-select
            flat
            dense
            v-model="searchForm.disciplinaID"
            :options="disciplinas"
            label="Seleciona uma disciplina"
            option-value="id"
            option-label="nome_disciplina"
            emit-value
            map-options
            dark
            :rules="[(val) => !!val || 'Selecione a disciplina']"
          />
        </div>
        <div class="col-12 flex flex-center item-center q-mb-sm">
          <q-btn
            outline
            type="submit"
            dark
            label="buscar"
            icon="mdi-text-box-search-outline"
            size="sm"
            align="center"
            class="flex item-center"
          />
        </div>
      </div>
    </q-form>
    <br />
    <mini-pauta-component :dataMiniPautas="miniPauta" v-if="showMiniPauta" />
  </q-page>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import userAuthUser from "src/composible/userAuthUser";
import { useEscolaStore } from "src/stores/escolas";

import { useCursoStore } from "src/stores/cursos";
import { useClasseStore } from "src/stores/classes";
import { useTurmaStore } from "src/stores/turmas";
import { usePeriodoStore } from "src/stores/periodos";
import { useDisciplinaStore } from "src/stores/disciplinas";
import { useAnoLectivoStore } from "src/stores/ano_lectivo";
import loadingComponent from "src/components/loading/loadingComponent.vue";
import loadingComponent2 from "src/components/loading/loadingComponent2.vue";
import { useNotasStore } from "src/stores/notas";
import usenotification from "src/composible/useNotify";
import miniPautaComponent from "src/components/mini-pautas/mini-pautasComponent.vue";
import { useMiniPautaStore } from "src/stores/mini-pautas";

export default {
  name: "MiniPauta",
  components: { loadingComponent, loadingComponent2, miniPautaComponent },
  setup() {
    const { user } = userAuthUser();
    const { getEscolaByEmail } = useEscolaStore();
    const { getAllCursos } = useCursoStore();
    const { getAllClasses } = useClasseStore();
    const { getAllTurmas } = useTurmaStore();
    const { getAllPeriodos } = usePeriodoStore();
    const { getAllDisciplinas } = useDisciplinaStore();
    const { getAllAnoLectivo } = useAnoLectivoStore();
    const { getMiniPautas } = useNotasStore();
    const { notifyError, notifySuccess } = usenotification();
    const { getNotas } = useMiniPautaStore();

    const loading = ref(false);
    const carrearMiniPauta = ref(false);
    const showMiniPauta = ref(false);

    const cursos = ref([]);
    const classes = ref([]);
    const turmas = ref([]);
    const periodos = ref([]);
    const disciplinas = ref([]);
    const anosLectivos = ref([]);
    const miniPauta = ref([]);
    const searchForm = ref({
      escolaId: "",
      cursoID: "",
      classeID: "",
      turmaID: "",
      periodoID: "",
      anoLectivo: "",
      disciplinaID: "",
    });

    onMounted(() => {
      escola();
    });

    //cria uma função para retornar o id da escola
    const escola = async () => {
      try {
        loading.value = true;
        await getEscolaByEmail("escolas", user.value.email).then((idEscola) => {
          loading.value = true;
          searchForm.value.escolaId = idEscola;
          getAllCursos(idEscola).then((res) => {
            console.log(res);
            cursos.value = res;
          });

          getAllClasses(idEscola).then((res) => {
            console.log(res);
            classes.value = res;
          });

          getAllTurmas(idEscola).then((res) => {
            console.log(res);
            turmas.value = res;
          });

          getAllPeriodos(idEscola).then((res) => {
            console.log(res);
            periodos.value = res;
          });

          getAllDisciplinas(idEscola).then((res) => {
            console.log(res);
            disciplinas.value = res;
          });

          getAllAnoLectivo(idEscola).then((res) => {
            console.log(res);
            anosLectivos.value = res;
          });
          loading.value = false;
        });
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    const hendleMiniPaulta = async () => {
      try {
        carrearMiniPauta.value = true;
        const {
          escolaId,
          cursoID,
          classeID,
          turmaID,
          periodoID,
          anoLectivo,
          disciplinaID,
        } = searchForm.value;
        await getNotas(
          escolaId,
          cursoID,
          classeID,
          turmaID,
          periodoID,
          anoLectivo,
          disciplinaID
        ).then((res) => {
          console.log(res);
          miniPauta.value = res;
        });
        showMiniPauta.value = true;
      } catch (error) {
        console.log(error.message);
      } finally {
        carrearMiniPauta.value = false;
      }
    };

    return {
      searchForm,
      cursos,
      classes,
      turmas,
      periodos,
      disciplinas,
      anosLectivos,
      loading,
      hendleMiniPaulta,
      carrearMiniPauta,
      showMiniPauta,
      miniPauta,
    };
  },
};
</script>
