<!-- Listar Alunos com o q-table com um input de pesquisa no topo esquerdo e um botao de cadastro no topo direito -->
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
            <q-icon name="mdi-school" size="md" /> Alunos [
            <b class="text-red-10">{{ AlunosCountByEscolaId(escolaId) }}</b>
            ]
          </div>
        </span>
      </template>
      <template v-slot:top-right>
        <q-select
          color="primary"
          v-model="filter"
          label="Ano lectivo"
          :options="yearOptions"
          dense
          outlined
          class="q-mr-sm"
          option-value="ano_lectivo"
          option-label="ano_lectivo"
          map-options
          emit-value
          style="min-width: 180px"
        />
        <q-input
          color="primary"
          v-model="filter"
          lable="Pesquisar"
          placeholder="Pesquisar"
          dense
          outlined
          class="q-mr-sm"
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
          label="Novo aluno"
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

    <AlunosForm
      v-model="showModal"
      :aluno="aluno"
      @save="handleSave"
      :loading="loading"
      :isEditForm="formStatus"
      :cursos="cursos"
      nome="período"
      :anoLectivoOptions="yearOptions"
      :nivel_ensino="nivel_de_ensino"
    />

    <showInformation
      v-model="showModal2"
      :showInformation="AlunoInfo"
      nome="aluno"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
//importar o store de Alunos
import { useAlunosStore } from "src/stores/alunos";
import { useCursoStore } from "src/stores/cursos";
import { useEscolaStore } from "src/stores/escolas";
import AlunosForm from "./alunoForm.vue";
import showInformation from "./informationPage.vue";
import { columns } from "./table";
import userAuthUser from "src/composible/userAuthUser";

export default {
  components: {
    AlunosForm,
    showInformation,
  },
  setup() {
    const loading = ref(false);
    const formStatus = ref(false);
    const { user } = userAuthUser();
    const showModal2 = ref(false);
    const data = new Date();
    const fullYear = data.getFullYear();
    const yearOptions = ref([]);
    const nivel_de_ensino = ref("");
    const {
      addAluno,
      AlunosCountByEscolaId,
      deleteAlunoById,
      getAllAlunos,
      getAlunoById,
      updateAlunoById,
      getEscolaIdByEmail,
      getAnoLectivoIdByEscolaId,
      addOrUpdateAnoLectivo,
    } = useAlunosStore();

    const { getAllCursos } = useCursoStore();
    const escolaId = ref("");
    const showModal = ref(false);
    const search = ref("");
    const filter = ref("");
    const aluno = ref({});
    const cursos = ref([]);
    const AlunoInfo = ref({});
    const rows = ref([]);

    onMounted(() => {
      listAlunos();
      listCursos();
    });
    const listAlunos = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((id) => {
        //pega todos os Alunos exclusivamente da escola logada
        escolaId.value = id;
        //verifica se o ano lectivo ja foi criado
        addOrUpdateAnoLectivo(id);

        //pega todos os anos lectivo exclusivamente a escola logada
        getAllAnoLectivo(id);

        getAllAlunos(id).then((item) => {
          rows.value = item;
          loading.value = false;
        });
      });
    };

    const listCursos = () => {
      loading.value = true;
      //primeiro pega o id da escola por intermedio do email
      getEscolaIdByEmail(user.value.email).then((item) => {
        //pega todos os Alunos exclusivamente da escola logada
        escolaId.value = item[0].id;
        nivel_de_ensino.value = item[0].nivel_ensino;
        getAllCursos(id).then((item) => {
          cursos.value = item;
          loading.value = false;
        });
      });
    };

    //Mostrar modal de informação de Alunos
    const information = (info) => {
      console.log(info);
      AlunoInfo.value = { ...info };
      showModal2.value = true;
    };

    const edit = (AlunoEdit) => {
      console.log(AlunoEdit);
      aluno.value = { ...AlunoEdit };
      formStatus.value = true;
      showModal.value = true;
    };
    const remove = async (id) => {
      loading.value = true;
      try {
        await deleteAlunoById(id);
        listAlunos();
      } catch (error) {
        console.log(error);
      } finally {
        listAlunos();
        loading.value = false;
      }
    };
    const formModal = (Aluno) => {
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
          await updateAlunoById(emit.id, emit);
        } else {
          await addAluno(emit);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
        listAlunos();
      }
    };

    const getAllAnoLectivo = (escolaId) => {
      getAnoLectivoIdByEscolaId(escolaId).then((item) => {
        console.log(item);
        yearOptions.value = item;
      });
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
      aluno,
      showModal,
      handleSave,
      formStatus,
      AlunosCountByEscolaId,
      escolaId,
      information,
      showModal2,
      AlunoInfo,
      cursos,
      getAllAnoLectivo,
      yearOptions,
      nivel_de_ensino,
    };
  },
};
</script>
