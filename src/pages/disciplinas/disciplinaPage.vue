<!-- Listar Disciplinas com o q-table com um input de pesquisa no topo esquerdo e um botao de cadastro no topo direito -->
<template>
  <div>
    <q-table
      flat
      dense
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      class="q-mt-lg"
    >
      <template v-slot:top-left>
        <!--criar Titulo-->
        <span>
          <div class="">
            <q-icon name="mdi-book" size="md" /> Disciplinas [
            <b class="text-red-10">{{
              disciplinasCountByEscolaId(escolaId)
            }}</b>
            ]
          </div>
        </span>
      </template>
      <template v-slot:top-right>
        <q-input
          color="primary"
          v-model="filter"
          lable="Pesquisar"
          placeholder="Pesquisar"
          dense
          outlined
          class="q-mr-md"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn
          outline
          color="primary"
          :disable="loading"
          label="Novo disciplina"
          @click="formModal"
          no-caps
          icon="mdi-database-plus"
          :filter="filter"
        />
      </template>
      <template v-slot:body-cell-options="props">
        <q-td :props="props">
          <!--<q-btn
            flat
            dense
            icon="mdi-file-edit-outline"
            color="green-9"
            @click="edit(props.row)"
            size="sm"
          />-->
          <q-btn
            flat
            dense
            icon="mdi-delete-outline"
            color="red-9"
            @click="remove(props.row.id)"
            :loading="loading"
            size="sm"
          />
          <q-btn
            flat
            dense
            icon="mdi-information-outline"
            color="grey-9"
            @click="information(props.row)"
            size="sm"
          />
        </q-td>
      </template>
    </q-table>

    <DisciplinasForm
      v-model="showModal"
      :disciplina="disciplina"
      @save="handleSave"
      :loading="loading"
      :isEditForm="formStatus"
      :cursos="cursos"
      nome="disciplina"
    />

    <showInformation
      v-model="showModal2"
      :showInformation="DisciplinaInfo"
      :disciplinasCursos="disciplinasCursos"
      nome="disciplina"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
//importar o store de Disciplinas
import { useDisciplinaStore } from "src/stores/disciplinas";
import { useCursoStore } from "src/stores/cursos";
import DisciplinasForm from "./disciplinaForm.vue";
import showInformation from "./informationPage.vue";
import { columns } from "./table";
import userAuthUser from "src/composible/userAuthUser";

export default {
  components: {
    DisciplinasForm,
    showInformation,
  },
  setup() {
    const loading = ref(false);
    const formStatus = ref(false);
    const { user } = userAuthUser();
    const showModal2 = ref(false);
    const data = new Date();
    const fullYear = data.getFullYear();
    const {
      addDisciplina,
      disciplinasCountByEscolaId,
      deleteDisciplinaById,
      getAllDisciplinas,
      getDisciplinaById,
      updateDisciplinaById,
      getEscolaIdByEmail,
      disciplinaCursos,
    } = useDisciplinaStore();

    const { getAllCursos } = useCursoStore();
    const escolaId = ref("");
    const showModal = ref(false);
    const search = ref("");
    const filter = ref("");
    const disciplina = ref({});
    const cursos = ref([]);
    const DisciplinaInfo = ref({});
    const rows = ref([]);
    const disciplinasCursos = ref([]);

    onMounted(() => {
      listDisciplinas();
      listCursos();
    });
    const listDisciplinas = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Disciplinas exclusivamente da escola logada
        escolaId.value = id;
        getAllDisciplinas(id).then((item) => {
          rows.value = item;
          loading.value = false;
        });
      });
    };

    const listCursos = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Disciplina exclusivamente da escola logada
        escolaId.value = id;
        getAllCursos(id).then((item) => {
          cursos.value = item;
          loading.value = false;
        });
      });
    };

    //Mostrar modal de informação de Disciplinas
    const information = async (info) => {
      console.log(info);
      DisciplinaInfo.value = { ...info };
      await disciplinaCursos(info.id).then((item) => {
        disciplinasCursos.value = item;
      });
      showModal2.value = true;
    };

    const edit = (DisciplinaEdit) => {
      console.log(DisciplinaEdit);
      disciplina.value = { ...DisciplinaEdit };
      formStatus.value = true;
      showModal.value = true;
    };
    const remove = async (id) => {
      loading.value = true;
      try {
        await deleteDisciplinaById(id);
        listDisciplinas();
      } catch (error) {
        console.log(error);
      } finally {
        listDisciplinas();
        loading.value = false;
      }
    };
    const formModal = (disciplina) => {
      formStatus.value = false;
      showModal.value = true;
    };

    const handleSave = async (emit) => {
      console.log(emit);
      try {
        loading.value = true;
        emit.escola_id = escolaId.value;
        emit.ano = fullYear;
        if (formStatus.value) {
          await updateDisciplinaById(emit.id, emit);
        } else {
          await addDisciplina(emit);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
        listDisciplinas();
      }
    };
    return {
      rows,
      columns,
      search,
      filter,
      loading,
      edit,
      remove,
      formModal,
      disciplina,
      showModal,
      handleSave,
      formStatus,
      disciplinasCountByEscolaId,
      escolaId,
      information,
      showModal2,
      DisciplinaInfo,
      cursos,
      disciplinasCursos,
    };
  },
};
</script>
