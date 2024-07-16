<!-- Listar alunos com o q-table com um input de pesquisa no topo esquerdo e um botao de cadastro no topo direito -->
<template>
  <div>
    <br />
    <br />
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
            <q-icon name="mdi-school" size="md" /> Cursos [
            <b class="text-red-10">{{ cursoCountByEscolaId(escolaId) }}</b>
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
          label="Novo curso"
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
    <alunosForm
      v-model="showModal"
      :curso="curso"
      @save="handleSave"
      :loading="loading"
      :isEditForm="formStatus"
    />

    <showInformation v-model="showModal2" :showInformation="cursoInfo" />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
//importar o store de alunos
import { useCursoStore } from "src/stores/cursos";
import alunosForm from "./cursoForm.vue";
import showInformation from "./informationPage.vue";
import { columns } from "./table";
import userAuthUser from "src/composible/userAuthUser";

export default {
  components: {
    alunosForm,
    showInformation,
  },
  setup() {
    const loading = ref(false);
    const formStatus = ref(false);
    const { user } = userAuthUser();
    const showModal2 = ref(false);
    const {
      addCurso,
      cursoCountByEscolaId,
      deleteCursoById,
      getAllCursos,
      getCursoById,
      updateCursoById,
      getEscolaIdByEmail,
    } = useCursoStore();
    const escolaId = ref("");
    const showModal = ref(false);
    const search = ref("");
    const filter = ref("");
    const curso = ref({});
    const cursoInfo = ref({});
    const rows = ref([]);

    onMounted(() => {
      listCursos();
    });

    const listCursos = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os cursos exclusivamente da escola logada
        escolaId.value = id;
        getAllCursos(id).then((item) => {
          rows.value = item;
          loading.value = false;
        });
      });
    };

    //Mostrar modal de informação de cursos
    const information = (info) => {
      console.log(info);
      cursoInfo.value = { ...info };
      showModal2.value = true;
    };

    const edit = (cursoEdit) => {
      console.log(cursoEdit);
      curso.value = { ...cursoEdit };
      formStatus.value = true;
      showModal.value = true;
    };
    const remove = async (id) => {
      loading.value = true;
      try {
        await deleteCursoById(id);
        listCursos();
      } catch (error) {
        console.log(error);
      } finally {
        listCursos();
        loading.value = false;
      }
    };
    const formModal = (curso) => {
      formStatus.value = false;
      showModal.value = true;
    };

    const handleSave = async (emit) => {
      try {
        loading.value = true;
        emit.escola_id = escolaId.value;
        if (formStatus.value) {
          await updateCursoById(emit.id, emit);
        } else {
          await addCurso(emit);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
        listCursos();
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
      curso,
      showModal,
      handleSave,
      formStatus,
      cursoCountByEscolaId,
      escolaId,
      information,
      showModal2,
      cursoInfo,
    };
  },
};
</script>
