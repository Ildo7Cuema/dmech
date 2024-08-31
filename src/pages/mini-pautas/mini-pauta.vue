<template>
  <q-page>
    <loading-component :show="loading" />
    <loading-component2 :load="carrearMiniPauta" />
    <div class="row q-mt-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-subtitle2">
              Filtro de pesquisa de <b class="text-red">Mini-Pautas</b>
              <q-icon
                class="q-ml-md"
                size="lg"
                color="green-10"
                name="mdi-microsoft-excel"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-select
              flat
              dense
              v-model="searchForm.docente_id"
              label="Selecione o(a) Docente para filtrar sua mini-pauta"
              option-value="id"
              option-label="name"
              :options="docentes"
              emit-value
              map-options
              :rules="[
                (val) =>
                  !!val || 'Selecione um docente para buscar a mini-pauta',
              ]"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-form @submit.prevent="hendleMiniPaulta" v-if="showFilter">
      <div class="row q-mt-md bg-green-10 text-white">
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
    <mini-pauta-component
      :dataMiniPautas="miniPauta"
      :nome_docente="nome_docente"
      :genero="genero"
      v-if="showMiniPauta"
    />
  </q-page>
</template>
<script>
import { ref, onMounted, computed, watch } from "vue";
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
import { useFuncionarioStore } from "src/stores/funcionarios";
import { useTurmasProf } from "src/stores/add_turmas_profs";

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
    const { getFuncionariosEscola, getFuncionarioNameById } =
      useFuncionarioStore();
    const {
      getDocente_disciplinas,
      getDocente_classes,
      getDocente_turmas,
      getDocente_cursos,
      getDocente_periodos,
    } = useTurmasProf();

    const loading = ref(false);
    const carrearMiniPauta = ref(false);
    const showMiniPauta = ref(false);
    const showFilter = ref(false);

    const cursos = ref([]);
    const docentes = ref([]);
    const classes = ref([]);
    const turmas = ref([]);
    const periodos = ref([]);
    const disciplinas = ref([]);
    const anosLectivos = ref([]);
    const miniPauta = ref([]);
    const searchForm = ref({
      docente_id: "",
      escolaId: "",
      cursoID: "",
      classeID: "",
      turmaID: "",
      periodoID: "",
      anoLectivo: "",
      disciplinaID: "",
    });

    const nome_docente = ref("");
    const genero = ref("");

    onMounted(() => {
      escola();
    });

    //cria uma função para retornar o id da escola
    const escola = async () => {
      try {
        loading.value = true;
        await getEscolaByEmail("escolas", user.value.email).then((idEscola) => {
          searchForm.value.escolaId = idEscola;
          //carregar os fucionarios da escola
          getFuncionariosEscola(
            "funcionarios",
            user.value.user_metadata.organization_id,
            idEscola
          ).then((res) => {
            console.log(res);
            docentes.value = res;
          });
        });
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    watch(
      () => searchForm.value.docente_id,
      async (newValue) => {
        try {
          if (newValue) {
            loading.value = true;
            const { escolaId } = searchForm.value;
            //carregar cursos onde o docente leciona
            const n_cursos = await getDocente_cursos(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            cursos.value = n_cursos.map((c) => ({
              id: c.cursos.id,
              nome_curso: c.cursos.nome_curso,
            }));

            //carregar classes onde o docente leciona
            const n_classes = await getDocente_classes(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            classes.value = n_classes.map((c) => ({
              id: c.classes.id,
              nome_classe: c.classes.nome_classe,
            }));

            //carregar turmas onde o docente leciona
            const n_turmas = await getDocente_turmas(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            turmas.value = n_turmas.map((c) => ({
              id: c.turmas.id,
              nome_turma: c.turmas.nome_turma,
            }));

            //carregar periodos onde o docente leciona
            const n_periodos = await getDocente_periodos(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            periodos.value = n_periodos.map((c) => ({
              id: c.periodos.id,
              nome_periodo: c.periodos.nome_periodo,
            }));

            //carregar disciplinas onde o docente leciona
            const n_disciplinas = await getDocente_disciplinas(
              user.value.user_metadata.organization_id,
              escolaId,
              newValue
            );
            disciplinas.value = n_disciplinas.map((c) => ({
              id: c.disciplinas.id,
              nome_disciplina: c.disciplinas.nome_disciplina,
            }));

            await getAllAnoLectivo(escolaId).then((res) => {
              console.log(res);
              anosLectivos.value = res;
            });

            //buscar o nome do docente

            await getFuncionarioNameById("funcionarios", newValue).then(
              (item) => {
                console.log("Docente", item);
                nome_docente.value = item[0].name;
                genero.value = item[0].genero;
              }
            );
          }
          showFilter.value = true;
        } catch (error) {
          console.log(error.message);
        } finally {
          loading.value = false;
        }
      }
    );

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
      docentes,
      showFilter,
      nome_docente,
      genero,
    };
  },
};
</script>
