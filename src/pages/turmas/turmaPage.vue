<!-- Listar turmas com o q-table com um input de pesquisa no topo esquerdo e um botao de cadastro no topo direito -->
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
            <q-icon name="mdi-school" size="md" /> Turmas [
            <b class="text-red-10">{{ turmasCountByEscolaId(escolaId) }}</b>
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
          label="Nova Turma"
          @click="formModal"
          no-caps
          icon="mdi-database-plus"
          :filter="filter"
        />
      </template>
      <template v-slot:body-cell-options="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            icon="mdi-file-edit-outline"
            color="green-9"
            @click="edit(props.row)"
            size="sm"
          />
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

    <turmasForm
      v-model="showModal"
      :Turma="Turma"
      @save="handleSave"
      :loading="loading"
      :isEditForm="formStatus"
      :cursos="cursos"
      :escolaId="escolaId"
    />

    <showInformation
      v-model="showModal2"
      :showInformation="TurmaInfo"
      nome="turma"
    />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
//importar o store de turmas
import { useTurmaStore } from "src/stores/turmas";
import { useCursoStore } from "src/stores/cursos";
import turmasForm from "./turmaForm.vue";
import showInformation from "./informationPage.vue";
import { columns } from "./table";
import userAuthUser from "src/composible/userAuthUser";

export default {
  components: {
    turmasForm,
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
      addTurma,
      turmasCountByEscolaId,
      deleteTurmaById,
      getAllTurmas,
      getTurmaById,
      updateTurmaById,
      getEscolaIdByEmail,
    } = useTurmaStore();

    const { getAllCursos } = useCursoStore();
    const escolaId = ref(0);
    const showModal = ref(false);
    const search = ref("");
    const filter = ref("");
    const Turma = ref({});
    const cursos = ref([]);
    const TurmaInfo = ref({});
    const rows = ref([]);

    onMounted(() => {
      listTurmas();
      listCursos();
    });

    const listTurmas = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Turmas exclusivamente da escola logada
        escolaId.value = id;
        getAllTurmas(id).then((item) => {
          rows.value = item;
          loading.value = false;
        });
      });
    };

    const listCursos = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Turmas exclusivamente da escola logada
        escolaId.value = id;
        getAllCursos(id).then((item) => {
          cursos.value = item;
          loading.value = false;
        });
      });
    };

    //Mostrar modal de informação de Turmas
    const information = (info) => {
      console.log(info);
      TurmaInfo.value = { ...info };
      showModal2.value = true;
    };

    const edit = (TurmaEdit) => {
      console.log(TurmaEdit);
      Turma.value = { ...TurmaEdit };
      formStatus.value = true;
      showModal.value = true;
    };
    const remove = async (id) => {
      loading.value = true;
      try {
        await deleteTurmaById(id);
        listTurmas();
      } catch (error) {
        console.log(error);
      } finally {
        listTurmas();
        loading.value = false;
      }
    };
    const formModal = (Turma) => {
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
          await updateTurmaById(emit.id, emit);
        } else {
          await addTurma(emit);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
        listTurmas();
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
      Turma,
      showModal,
      handleSave,
      formStatus,
      turmasCountByEscolaId,
      escolaId,
      information,
      showModal2,
      TurmaInfo,
      cursos,
    };
  },
};
</script>
