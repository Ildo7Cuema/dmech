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
          v-model="anoLectivoSelect"
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
        <q-btn
          outline
          color="grey-7"
          :disable="loadingDownload"
          label="Baixar lista"
          @click="printList"
          no-caps
          icon="cloud_download"
          :filter="filter"
          class="q-ml-sm"
          :loading="loadingDownload"
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
          <q-btn
            flat
            dense
            icon="mdi-microsoft-excel"
            color="green-9"
            @click="addOrEditNotas(props.row)"
            size="sm"
            title="Mini-pautas-edit"
          />
        </q-td>
      </template>
    </q-table>

    <AlunosForm
      v-model="showModal"
      :showInfoToEdit="aluno"
      @save="handleSave"
      :loading="loading"
      :isEditForm="formStatus"
      :cursos="cursos"
      nome="aluno"
      :anoLectivoOptions="yearOptions"
      :nivel_ensino="nivel_de_ensino"
      :turmasOptions="turmasOptions"
      :classesOptions="classesOptions"
      :periodoOptions="periodoOptions"
      :escolaId="escolaId"
    />

    <showInformation
      v-model="showModal2"
      :showInformation="AlunoInfo"
      nome="aluno"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import ExcelJS from "exceljs";
// Importar o store de Alunos
import { useAlunosStore } from "src/stores/alunos";
import { useCursoStore } from "src/stores/cursos";
import { useEscolaStore } from "src/stores/escolas";
import AlunosForm from "./alunoForm.vue";
import showInformation from "./informationPage.vue";
import { columns } from "./table";
import userAuthUser from "src/composible/userAuthUser";
import { useTurmaStore } from "src/stores/turmas";
import { useClasseStore } from "src/stores/classes";
import { usePeriodoStore } from "src/stores/periodos";
import { useRouter } from "vue-router";

export default {
  components: {
    AlunosForm,
    showInformation,
  },
  setup() {
    const loading = ref(false);
    const loadingDownload = ref(false);
    const formStatus = ref(false);
    const { user } = userAuthUser();
    const showModal2 = ref(false);
    const data = new Date();
    const fullYear = data.getFullYear();
    const yearOptions = ref([]);
    const turmasOptions = ref([]);
    const classesOptions = ref([]);
    const periodoOptions = ref([]);
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

    const anoLectivoSelect = ref("");

    const { getAllPeriodos } = usePeriodoStore();
    const { getAllTurmas } = useTurmaStore();
    const { getAllClasses } = useClasseStore();
    const { getAllCursos } = useCursoStore();
    const escolaId = ref(0);
    const showModal = ref(false);
    const search = ref("");
    const filter = ref("");
    const aluno = ref({});
    const cursos = ref([]);
    const AlunoInfo = ref({});
    const rows = ref([]);
    const router = useRouter();

    onMounted(async () => {
      const escola = await getEscolaIdByEmail(user.value.email);
      escolaId.value = escola[0].id;
      listAlunos(escola[0].id);
      nivel_de_ensino.value = escola[0].nivel_ensino;
      addOrUpdateAnoLectivo(escola[0].id);
      rows.value = await getAllAlunos(escola[0].id);
      turmasOptions.value = await getAllTurmas(escola[0].id);
      await getAllAnoLectivo(escola[0].id);
      getAllClasses(escola[0].id).then((item) => {
        classesOptions.value = item;
      });
      cursos.value = await getAllCursos(escola[0].id);
      periodoOptions.value = await getAllPeriodos(escola[0].id);
    });

    const listAlunos = async (idEscola) => {
      try {
        rows.value = await getAllAlunos(idEscola);
      } catch (error) {
        console.log(error);
      }
    };

    // Mostrar modal de informação de Alunos
    const information = (info) => {
      AlunoInfo.value = { ...info };
      showModal2.value = true;
    };

    const edit = (AlunoEdit) => {
      aluno.value = { ...AlunoEdit };
      formStatus.value = true;
      showModal.value = true;
    };
    const remove = async (id) => {
      loading.value = true;
      try {
        await deleteAlunoById(id);
        listAlunos(escolaId.value);
      } catch (error) {
        console.log(error);
      } finally {
        listAlunos(escolaId.value);
        loading.value = false;
      }
    };
    const formModal = (Aluno) => {
      formStatus.value = false;
      showModal.value = true;
    };

    const handleSave = async (emit) => {
      try {
        loading.value = true;
        if (formStatus.value) {
          await updateAlunoById(emit.id, emit);
          listAlunos(escolaId.value);
        } else {
          console.log(emit);
          await addAluno(emit);
          listAlunos(escolaId.value);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    const getAllAnoLectivo = (escolaId) => {
      getAnoLectivoIdByEscolaId(escolaId).then((item) => {
        yearOptions.value = item;
      });
    };

    // Computed property to filter rows
    const filteredRows = computed(() => {
      console.log(anoLectivoSelect.value);
      if (!filter.value && !anoLectivoSelect.value) {
        return rows.value;
      }
      return rows.value.filter((row) => {
        return (
          (row.nome.toLowerCase().includes(filter.value.toLowerCase()) ||
            row.turmas.nome_turma
              .toLowerCase()
              .includes(filter.value.toLowerCase()) ||
            row.turmas.num_sala
              .toLowerCase()
              .includes(filter.value.toLowerCase()) ||
            row.periodo.nome_periodo
              .toLowerCase()
              .includes(filter.value.toLowerCase()) ||
            row.ano_lectivo
              .toLowerCase()
              .includes(filter.value.toLowerCase())) &&
          row.ano_lectivo.includes(anoLectivoSelect.value)
        );
      });
    });
    const printList = async () => {
      loadingDownload.value = true;
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Alunos");

      // Add headers
      worksheet.addRow(["Turma", "Classe", "Ano lectivo"]);

      worksheet.addRow([
        filteredRows.value[0].turmas.nome_turma,
        filteredRows.value[0].classes.nome_classe,
        filteredRows.value[0].ano_lectivo,
      ]);

      worksheet.addRow(["Cod.", "Nome completo", "Idade"]);

      // Add data rows
      filteredRows.value.forEach((row) => {
        worksheet.addRow([
          row.id,
          row.nome,
          new Date().getFullYear() -
            new Date(row.data_nascimento).getFullYear(),
          /* row.turmas.nome_turma,
          row.classe,*/
        ]);
      });

      // Generate the file
      await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "alunos.xlsx";
        a.click();
        URL.revokeObjectURL(url);

        loadingDownload.value = false;
      });
    };

    const addOrEditNotas = (info) => {
      console.log(info);
      const infoString = JSON.stringify(info);
      router.push({ name: "addOrEditNota", params: { info: infoString } });
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
      turmasOptions,
      classesOptions,
      periodoOptions,
      printList,
      filteredRows,
      anoLectivoSelect,
      loadingDownload,
      addOrEditNotas,
    };
  },
};
</script>
