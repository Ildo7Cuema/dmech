<template>
  <div>
    <loadingComponent2 v-if="loading" />
    <q-dialog
      :model-value="show"
      persistent
      :full-width="$q.platform.mobile"
      v-else
    >
      <q-card style="width: 800px; max-width: 100vw">
        <q-card-section>
          <div class="text-h6">
            <q-avatar icon="mdi-cog-outline" />
            <span v-if="$q.platform.is.mobile" style="font-size: 14px"
              >Atribuir cargo ao docente</span
            >
            <span v-else>Atribuir cargo ao docente</span>
          </div>
        </q-card-section>

        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-card-section class="bg-primary">
            <span class="q-pl-sm"
              ><span class="text-white">Nome: </span>
              <b class="text-white">{{ itens.name }}</b></span
            >
          </q-card-section>

          <q-card-section class="q-gutter-sm">
            <div class="col-12">
              <span><b>Tem um cargo na Instituição?</b></span>
              <div class="q-gutter-sm">
                <q-select
                  v-model="form.cargo"
                  :options="areas_de_chefia"
                  option-label="name"
                  label="Selecione um cargo na qual foi indicado ou nomeado"
                  :rules="[(val) => !!val || 'Porfavor informe o cargo']"
                  v-bind="{ ...inputConfig }"
                />

                <q-select
                  v-if="form.cargo == 'Director de turma'"
                  v-model="form.cargo_director_turma_id"
                  :options="turmas_prof"
                  option-value="id"
                  option-label="nome_turma"
                  map-options
                  emit-value
                  label="Selecione a turma onde o docente é Director"
                  filled
                  v-bind="{ ...inputConfig }"
                  :rules="[
                    (val) =>
                      !!val || 'Selecione a turma onde o docente é Director',
                  ]"
                />
                <q-select
                  v-if="form.cargo == 'Coordenador de classe'"
                  v-model="form.cargo_coordenador_classe_id"
                  :options="classes_prof"
                  option-value="id"
                  option-label="nome_classe"
                  map-options
                  emit-value
                  label="Selecione a classe onde o docente é Coordenador"
                  filled
                  v-bind="{ ...inputConfig }"
                  :rules="[
                    (val) =>
                      !!val ||
                      'Selecione a classe onde o docente é Coordenador',
                  ]"
                />
                <q-select
                  v-if="form.cargo == 'Coordenador de curso'"
                  v-model="form.cargo_coordenador_curso_id"
                  :options="cursos_prof"
                  option-value="id"
                  option-label="nome_curso"
                  map-options
                  emit-value
                  label="Selecione o curso que o docente é Coordenador"
                  filled
                  v-bind="{ ...inputConfig }"
                  :rules="[
                    (val) =>
                      !!val || 'Selecione o curso que o docente é Coordenador',
                  ]"
                />

                <q-select
                  v-if="form.cargo == 'Coordenador de disciplina'"
                  v-model="form.cargo_coordenador_disciplina_id"
                  :options="disciplinasEscola"
                  option-value="id"
                  option-label="nome_disciplina"
                  map-options
                  emit-value
                  label="Selecione a disciplina que o docente coordena"
                  filled
                  v-bind="{ ...inputConfig }"
                  :rules="[
                    (val) =>
                      !!val || 'Selecione a disciplina que o docente coordena',
                  ]"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-gutter-sm bg-white text-teal">
            <q-btn
              icon="mdi-close"
              flat
              label="Fechar"
              v-close-popup
              @click="handClose"
            />
            <q-btn
              icon="mdi-content-save-outline"
              type="submit"
              flat
              label="Salvar atribuição de cargo"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { formatCurrency } from "src/utils/formatCurrency";
import { inputConfig } from "src/utils/inputVisual.js";
import userApi from "src/composible/userApi";
import { useDisciplinaStore } from "src/stores/disciplinas";
import { useCursoStore } from "src/stores/cursos";
import { useTurmaStore } from "src/stores/turmas";
import { usePeriodoStore } from "src/stores/periodos";
import { useClasseStore } from "src/stores/classes";
import loadingComponent2 from "./loading/loadingComponent2.vue";
import { useTurmasProf } from "src/stores/add_turmas_profs";

export default {
  name: "modalAddTurmas",
  components: { loadingComponent2 },
  props: {
    itens: {
      type: Object,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const funcionarios = ref([]);
    const $q = useQuasar();
    const loading = ref(false);
    const { getAllDisciplinas } = useDisciplinaStore();
    const { getAllClasses } = useClasseStore();
    const { getAllCursos } = useCursoStore();
    const { getAllTurmas } = useTurmaStore();
    const { getAllPeriodos } = usePeriodoStore();
    const escolaID = ref(0);
    const { add_turmas_prof } = useTurmasProf();

    const { post, fileName, uploadImage, addCargo } = userApi();
    const disciplinas_prof = ref([]);
    const classes_prof = ref([]);
    const cursos_prof = ref([]);
    const turmas_prof = ref([]);
    const periodos_prof = ref([]);
    const form = ref({
      dme_id: 0,
      escola_id: 0,
      docente_id: 0,
      disciplina_id: [],
      cursos_id: [],
      classes_id: [],
      turmas_id: [],
      periodos_id: [],
      cargo: "",
      cargo_director_turma_id: null,
      cargo_coordenador_classe_id: null,
      cargo_coordenador_curso_id: null,
      cargo_coordenador_disciplina_id: null,
    });

    const areas_de_chefia = ref([
      "Coordenador de curso",
      "Coordenador de classe",
      "Coordenador de disciplina",
      "Coordenador das actividades extra-escolar",
      "Chefe de secretaria",
      "Director de turma",
    ]);

    watch(
      () => props.itens,
      async (newVal) => {
        if (newVal) {
          console.log(newVal);
          try {
            loading.value = false;
            disciplinas_prof.value = await getAllDisciplinas(newVal.escola_id);
            classes_prof.value = await getAllClasses(newVal.escola_id);
            turmas_prof.value = await getAllTurmas(newVal.escola_id);
            cursos_prof.value = await getAllCursos(newVal.escola_id);
            periodos_prof.value = await getAllPeriodos(newVal.escola_id);
            form.value.dme_id = newVal.user_id;
            form.value.escola_id = newVal.escola_id;
            form.value.docente_id = newVal.id;
          } catch (error) {
            console.log(error);
          } finally {
            loading.value = false;
          }
        }
      },
      { immediate: true }
    );

    const handClose = () => {
      emit("closeModal");
    };
    /*
    onMounted(async () => {
      await nextTick();
      try {
        listDisciplinasEscola(escolaID.value);
        listClassesEscola(escolaID.value);
        listTurmasEscola(escolaID.value);
        listCursosEscola(escolaID.value);
        listPeriodoEscola(escolaID.value);
      } catch (error) {
        console.log(error);
      }
    });

    const listDisciplinasEscola = async (id) => {
      disciplinas_prof.value = await getAllDisciplinas(id);
      console.log(disciplinas_prof.value);
    };

    const listClassesEscola = async (id) => {
      classes_prof.value = await getAllClasses(id);
    };

    const listTurmasEscola = async (id) => {
      turmas_prof.value = await getAllTurmas(id);
    };

    const listCursosEscola = async (id) => {
      cursos_prof.value = await getAllCursos(id);
    };

    const listPeriodoEscola = async (id) => {
      periodos_prof.value = await getAllPeriodos(id);
    };
    */
    const onSubmit = async () => {
      $q.loading.show("Salvando documento...");
      try {
        await addCargo(form.value);
        $q.notify({
          color: "positive",
          position: "top",
          message: "O Docente foi atribuida com sucesso as turmas",
          icon: "mdi-check",
        });
        handClose();
      } catch (err) {
        console.log(err);
        $q.notify({
          color: "negative",
          position: "top",
          message: "Erro ao atribuir cargo" + err,
          icon: "report_problem",
        });
      } finally {
        $q.loading.hide();
      }
    };
    return {
      handClose,
      funcionarios,
      formatCurrency,
      inputConfig,
      onSubmit,
      form,
      disciplinas_prof,
      classes_prof,
      cursos_prof,
      turmas_prof,
      periodos_prof,
      loading,
      areas_de_chefia,
    };
  },
};
</script>
