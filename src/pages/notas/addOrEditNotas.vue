<template>
  <q-page>
    <br />
    <br />
    <!-- <br />
    <br />
    <q-card
      flat
      dense
      class="my-card bg-green-4 text-white"
      style="border-radius: 0"
    >
      <q-card-section class="row">
        <div class="col-12 text-h6 text-center">Insersão de notas</div>
        <div class="col-12 text-subtitle2 text-center">
          Aluno/a: <span class="text-red-10">{{ infoAluno.nome }}</span>
        </div>
        <div class="col-12">
          Curso:
          <span class="text-dark bold">{{ infoAluno.cursos.nome_curso }}</span>
        </div>
        <div class="col-12">
          Instituição:
          <span class="text-dark">{{ infoAluno.escola.name }}</span>
        </div>
      </q-card-section>

      <q-card-section class="q-mt-0">
        <div class="row q-mt-0">
          <div class="col">
            Turma:
            <span class="text-dark">{{ infoAluno.turmas.nome_turma }}</span>
          </div>
          <div class="col">
            Classe:
            <span class="text-dark">{{ infoAluno.classes.nome_classe }}</span>
          </div>
          <div class="col">
            Período:
            <span class="text-dark">{{ infoAluno.periodo.nome_periodo }}</span>
          </div>
          <div class="col">
            Ano lectivo:
            <span class="text-dark">{{ infoAluno.ano_lectivo }}</span>
          </div>
        </div>
      </q-card-section>
    </q-card>-->

    <div class="row q-gutter-sm q-mt-sm bg-green-10 text-white">
      <div class="col-3">
        <q-select
          flat
          dense
          label="Seleciona um trimestre"
          v-model="form.trimestre"
          :options="selectTrimestre"
          emit-value
          map-options
          dark
        />
      </div>
      <div class="col-3">
        <div class="col-3">
          <q-select
            flat
            dense
            label="Seleciona uma disciplina"
            v-model="form.disciplina_id"
            :options="selectDisciplinas"
            option-value="id"
            option-label="nome"
            emit-value
            map-options
            dark
          />
        </div>
      </div>
    </div>

    <primeiroTrimestre
      v-if="form.trimestre == 'I Trimestre'"
      :classe="infoAluno.classes.nome_classe"
      :turma="infoAluno.turmas.nome_turma"
      :periodo="infoAluno.periodo.nome_periodo"
      :ano_lectivo="infoAluno.ano_lectivo"
      :curso="infoAluno.cursos.nome_curso"
      :nome_aluno="infoAluno.nome"
      :idCurso="infoAluno.classes.id"
      :disciplina="form.disciplina_id"
      :trimestre="form.trimestre"
      :escola="infoAluno.escola.name"
      :infoAluno="infoAluno"
    />
    <segundoTrimestre
      v-if="form.trimestre == 'II Trimestre'"
      :classe="infoAluno.classes.nome_classe"
      :turma="infoAluno.turmas.nome_turma"
      :periodo="infoAluno.periodo.nome_periodo"
      :ano_lectivo="infoAluno.ano_lectivo"
      :curso="infoAluno.cursos.nome_curso"
      :nome_aluno="infoAluno.nome"
      :idCurso="infoAluno.classes.id"
      :disciplina="form.disciplina_id"
      :trimestre="form.trimestre"
      :escola="infoAluno.escola.name"
      :infoAluno="infoAluno"
    />
    <terceiroTrimestre
      v-if="form.trimestre == 'III Trimestre'"
      :classe="infoAluno.classes.nome_classe"
      :turma="infoAluno.turmas.nome_turma"
      :periodo="infoAluno.periodo.nome_periodo"
      :ano_lectivo="infoAluno.ano_lectivo"
      :curso="infoAluno.cursos.nome_curso"
      :nome_aluno="infoAluno.nome"
      :idCurso="infoAluno.classes.id"
      :disciplina="form.disciplina_id"
      :trimestre="form.trimestre"
      :escola="infoAluno.escola.name"
      :infoAluno="infoAluno"
    />
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useClasseStore } from "src/stores/classes";

import primeiroTrimestre from "./primeira_classe/pagePrimeiroTrimestre.vue";
import segundoTrimestre from "./primeira_classe/pageSegundoTrimestre.vue";
import terceiroTrimestre from "./primeira_classe/pageTerceiroTrimestre.vue";

export default {
  components: { primeiroTrimestre, segundoTrimestre, terceiroTrimestre },
  setup(props) {
    const route = useRoute();
    const { getClassesDisciplinas } = useClasseStore();
    const selectDisciplinas = ref([]);
    const form = ref({
      trimestre: "",
      disciplina_id: 0,
    });

    const selectTrimestre = ref([
      "I Trimestre",
      "II Trimestre",
      "III Trimestre",
    ]);

    onMounted(() => {
      getDisciplinas();
    });

    const infoAluno = computed(() => {
      return JSON.parse(route.params.info);
    });

    const getDisciplinas = async () => {
      try {
        const disciplinas = await getClassesDisciplinas(
          infoAluno.value.classes.id
        );
        selectDisciplinas.value = disciplinas.map((d) => ({
          id: d.disciplinas.id,
          nome: d.disciplinas.nome_disciplina,
        }));
      } catch (error) {
        console.error("Falha ao buscar disciplinas:", error);
      }
    };
    return {
      route,
      infoAluno,
      selectTrimestre,
      form,
      selectDisciplinas,
      getDisciplinas,
    };
  },
};
</script>

<style scoped>
.my-card {
  border-radius: 0;
}
</style>
