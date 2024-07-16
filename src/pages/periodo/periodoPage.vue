<!-- Listar Periodos com o q-table com um input de pesquisa no topo esquerdo e um botao de cadastro no topo direito -->
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
            <q-icon name="mdi-school" size="md" /> Periodos [
            <b class="text-red-10">{{ periodosCountByEscolaId(escolaId) }}</b>
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
          label="Novo Periodo"
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

    <PeriodosForm
      v-model="showModal"
      :periodo="periodo"
      @save="handleSave"
      :loading="loading"
      :isEditForm="formStatus"
      :cursos="cursos"
      nome="período"
    />

    <showInformation
      v-model="showModal2"
      :showInformation="PeriodoInfo"
      nome="periodo"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
//importar o store de Periodos
import { usePeriodoStore } from "src/stores/periodos";
import { useCursoStore } from "src/stores/cursos";
import PeriodosForm from "./periodoForm.vue";
import showInformation from "./informationPage.vue";
import { columns } from "./table";
import userAuthUser from "src/composible/userAuthUser";

export default {
  components: {
    PeriodosForm,
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
      addPeriodo,
      periodosCountByEscolaId,
      deletePeriodoById,
      getAllPeriodos,
      getPeriodoById,
      updatePeriodoById,
      getEscolaIdByEmail,
    } = usePeriodoStore();

    const { getAllCursos } = useCursoStore();
    const escolaId = ref("");
    const showModal = ref(false);
    const search = ref("");
    const filter = ref("");
    const periodo = ref({});
    const cursos = ref([]);
    const PeriodoInfo = ref({});
    const rows = ref([]);

    onMounted(() => {
      listPeriodos();
      listCursos();
    });
    const listPeriodos = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Periodos exclusivamente da escola logada
        escolaId.value = id;
        getAllPeriodos(id).then((item) => {
          rows.value = item;
          loading.value = false;
        });
      });
    };

    const listCursos = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Periodos exclusivamente da escola logada
        escolaId.value = id;
        getAllCursos(id).then((item) => {
          cursos.value = item;
          loading.value = false;
        });
      });
    };

    //Mostrar modal de informação de Periodos
    const information = (info) => {
      console.log(info);
      PeriodoInfo.value = { ...info };
      showModal2.value = true;
    };

    const edit = (PeriodoEdit) => {
      console.log(PeriodoEdit);
      periodo.value = { ...PeriodoEdit };
      formStatus.value = true;
      showModal.value = true;
    };
    const remove = async (id) => {
      loading.value = true;
      try {
        await deletePeriodoById(id);
        listPeriodos();
      } catch (error) {
        console.log(error);
      } finally {
        listPeriodos();
        loading.value = false;
      }
    };
    const formModal = (Periodo) => {
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
          await updatePeriodoById(emit.id, emit);
        } else {
          await addPeriodo(emit);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
        listPeriodos();
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
      periodo,
      showModal,
      handleSave,
      formStatus,
      periodosCountByEscolaId,
      escolaId,
      information,
      showModal2,
      PeriodoInfo,
      cursos,
    };
  },
};
</script>
