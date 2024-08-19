<!-- Criar um formulario para cadastro de alunos, onde os campos sao Nome, data_nascimento, telemovel, email, morada-->
<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          :icon="isEditForm ? 'mdi-file-edit' : 'mdi-school'"
          :color="isEditForm ? 'green-9' : 'dark'"
          text-color="white"
        />
        <span class="q-ml-sm" v-if="isEditForm">Alterar Turma</span>
        <span class="q-ml-sm" v-else>Cadastro de nova Turma</span>
      </q-card-section>

      <q-form @submit.prevent="emitForm">
        <q-card-section class="row q-col-gutter-sm">
          {{ escolaId }}
          <q-input
            v-model="form.nome_turma"
            label="Nome da Turma"
            dense
            outlined
            clearable
            placeholder="Nome"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Porfavor informe o nome do Turma']"
          />
          <q-select
            v-model="form.curso_id"
            label="Curso"
            dense
            outlined
            clearable
            placeholder="Selecione um curso"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :options="cursos"
            :rules="[(val) => !!val || 'Por favor selecione um curso']"
            option-value="id"
            option-label="nome_curso"
            map-options
            emit-value
          />
          <q-input
            type="number"
            v-model="form.num_sala"
            label="Número da Sala"
            dense
            outlined
            clearable
            placeholder="Número da Sala"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Por favor informe o número da sala']"
          />
        </q-card-section>

        <q-card-actions class="bg-grey-3">
          <q-btn
            outline
            no-caps
            label="Cancelar"
            color="red-9"
            v-close-popup
            icon="mdi-close"
            @click="closeForm()"
          />
          <q-space />
          <q-btn
            type="submit"
            outline
            no-caps
            :label="isEditForm ? 'Actualizar' : 'Cadastrar'"
            color="green-10"
            :icon="isEditForm ? 'mdi-update' : 'mdi-database-plus'"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useCursoStore } from "src/stores/cursos";
import { useFuncionarioStore } from "src/stores/funcionarios";

export default {
  props: {
    cursos: {
      type: Array,
    },
    Turma: {
      type: Object,
    },
    escolaId: { type: Number, required: true },
    showModal: Boolean,
    loading: Boolean,
    isEditForm: Boolean,
  },
  emits: ["save"],
  setup(props, { emit }) {
    const funcionarios = ref([]);
    const { getFuncionarios } = useFuncionarioStore();
    const form = ref({
      nome_turma: "",
      curso_id: "",
      escola_id: "",
      num_sala: "",
      ano: "",
    });
    const statusForm = ref(false);

    onMounted(() => {
      getFuncList();
    });

    const getFuncList = async () => {
      try {
        await getFuncionarios("funcionarios", props.escolaId).then((item) => {
          funcionarios.value = item;
          console.log(funcionarios.value);
        });
      } catch (error) {}
    };

    const emitForm = () => {
      // Emit the form data using the 'emit' method
      emit("save", form.value);
    };

    const closeForm = () => {
      form.value = {
        nome_turma: "",
        curso_id: "",
        escola_id: "",
        num_sala: "",
        ano: "",
      };
      statusForm.value = false;
    };

    watch(
      () => props.Turma,
      (newTurma) => {
        if (newTurma) {
          form.value = { ...newTurma };
          statusForm.value = true;
        }
      },
      { immediate: true }
    );

    watch(
      () => props.showModal,
      (newVal) => {
        show.value = newVal;
      }
    );

    watch(
      () => props.isEditForm,
      (newVal) => {
        statusForm.value = newVal;
      }
    );

    watch(
      () => props.loading,
      (newVal) => {
        if (newVal != true) {
          form.value.nome_turma = "";
          form.value.escola_id = "";
          form.value.curso_id = "";
          form.value.ano = "";
        }
      }
    );
    return {
      form,
      emitForm,
      show: ref(props.showModal),
      statusForm: ref(props.isEditForm),
      closeForm,
      funcionarios,
    };
  },
};
</script>
