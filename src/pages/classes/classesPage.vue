<!-- Listar Classes com o q-table com um input de pesquisa no topo esquerdo e um botao de cadastro no topo direito -->
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
            <q-icon name="mdi-school" size="md" /> Classes [
            <b class="text-red-10">{{ classesCountByEscolaId(escolaId) }}</b>
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
          label="Nova Classe"
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

    <ClassesForm
      v-model="showModal"
      @saveClasse="handleSave"
      :loading="loading"
      :isEditForm="formStatus"
      :cursos="cursos"
      :classes="classes"
      nome="classe"
      :disciplinas="disciplinas"
    />

    <showInformation
      v-model="showModal2"
      :showInformation="ClasseInfo"
      :classesEdisciplinas="classesDisciplinaInfo"
      nome="classe"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
//importar o store de Classe
import { useClasseStore } from "src/stores/classes";
import { useCursoStore } from "src/stores/cursos";
import { useDisciplinaStore } from "src/stores/disciplinas";
import ClassesForm from "./classesForm.vue";
import showInformation from "./informationPage.vue";
import { columns } from "./table";
import userAuthUser from "src/composible/userAuthUser";

export default {
  components: {
    ClassesForm,
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
      addClasse,
      classesCountByEscolaId,
      deleteClasseById,
      getAllClasses,
      getClasseById,
      updateClasseById,
      getEscolaIdByEmail,
      getClassesDisciplinas,
    } = useClasseStore();

    const { getAllDisciplinas } = useDisciplinaStore();

    const { getAllCursos } = useCursoStore();
    const escolaId = ref("");
    const showModal = ref(false);
    const search = ref("");
    const filter = ref("");
    const classe = ref({});
    const disciplinas = ref([]);
    const cursos = ref([]);
    const classesDisciplinaInfo = ref([]);
    const classes = ref([
      {
        id: 0,
        nome: "1ª Classe",
      },
      {
        id: 1,
        nome: "2ª Classe",
      },
      {
        id: 2,
        nome: "3ª Classe",
      },
      {
        id: 3,
        nome: "4ª Classe",
      },
      {
        id: 4,
        nome: "5ª Classe",
      },
      {
        id: 5,
        nome: "6ª Classe",
      },
      {
        id: 6,
        nome: "7ª Classe",
      },
      {
        id: 7,
        nome: "8ª Classe",
      },
      {
        id: 8,
        nome: "9ª Classe",
      },
      {
        id: 9,
        nome: "10ª Classe",
      },
      {
        id: 10,
        nome: "11ª Classe",
      },
      {
        id: 11,
        nome: "12ª Classe",
      },
      {
        id: 12,
        nome: "13ª Classe",
      },
    ]);
    const ClasseInfo = ref({});
    const rows = ref([]);

    onMounted(() => {
      listClasses();
      listCursos();
    });
    const listClasses = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Classes exclusivamente da escola logada
        escolaId.value = id;
        getAllDisciplinas(escolaId.value).then((item) => {
          disciplinas.value = item;
        });
        getAllClasses(id).then((item) => {
          rows.value = item;
          loading.value = false;
        });
      });
    };

    const listCursos = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Classes exclusivamente da escola logada
        escolaId.value = id;
        getAllCursos(id).then((item) => {
          cursos.value = item;
          loading.value = false;
        });
      });
    };

    //Mostrar modal de informação de Classes
    const information = async (info) => {
      ClasseInfo.value = { ...info };
      await getClassesDisciplinas(info.id).then((item) => {
        classesDisciplinaInfo.value = item;
      });
      showModal2.value = true;
    };

    const edit = (ClasseEdit) => {
      console.log(ClasseEdit);
      classes.value = { ...ClasseEdit };
      formStatus.value = true;
      showModal.value = true;
    };
    const remove = async (id) => {
      loading.value = true;
      try {
        await deleteClasseById(id);
        listClasses();
      } catch (error) {
        console.log(error);
      } finally {
        listClasses();
        loading.value = false;
      }
    };
    const formModal = (Classe) => {
      formStatus.value = false;
      showModal.value = true;
    };

    const handleSave = async (emit) => {
      console.log(emit);
      try {
        loading.value = true;
        emit.escola_id = escolaId.value;
        if (formStatus.value) {
          await updateClasseById(emit.id, emit);
        } else {
          await addClasse(emit);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
        listClasses();
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
      classe,
      showModal,
      handleSave,
      formStatus,
      classesCountByEscolaId,
      escolaId,
      information,
      showModal2,
      ClasseInfo,
      classes,
      disciplinas,
      classesDisciplinaInfo,
      cursos,
    };
  },
};
</script>
