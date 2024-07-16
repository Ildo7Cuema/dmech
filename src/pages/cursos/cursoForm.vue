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
        <span class="q-ml-sm" v-if="isEditForm">Alterar curso</span>
        <span class="q-ml-sm" v-else>Cadastro de novo curso</span>
      </q-card-section>

      <q-form @submit.prevent="emitForm">
        <q-card-section class="row q-col-gutter-sm">
          <q-input
            v-model="form.nome_curso"
            label="Nome do curso"
            dense
            outlined
            clearable
            placeholder="Nome"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Porfavor informe o nome do curso']"
          />
          <div class="col-12">
            <q-editor
              v-model="form.descricao"
              label="Descrição"
              dense
              outlined
              clearable
              placeholder="Descrição"
              :rules="[
                (val) => !!val || 'Porfavor escreva a descrição do curso',
              ]"
            />
          </div>
          <q-input
            v-model="form.duracao"
            label="Duração do curso"
            dense
            outlined
            clearable
            placeholder="Duração"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Porfavor informe a duração do curso']"
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
import { ref, watch } from "vue";
export default {
  props: {
    curso: {
      type: Object,
      default: () => ({
        nome_curso: "",
        descricao: "",
        duracao: "",
      }),
    },
    showModal: Boolean,
    loading: Boolean,
    isEditForm: Boolean,
  },
  emits: ["save"],
  setup(props, { emit }) {
    const form = ref({
      nome_curso: "",
      descricao: "",
      duracao: "",
      escola_id: "",
    });

    const statusForm = ref(false);

    const emitForm = () => {
      // Emit the form data using the 'emit' method
      emit("save", form.value);
    };

    const closeForm = () => {
      form.value = {
        nome_curso: "",
        descricao: "",
        duracao: "",
        escola_id: "",
      };
      statusForm.value = false;
    };

    watch(
      () => props.curso,
      (newCurso) => {
        if (newCurso) {
          form.value = { ...newCurso };
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
          form.value.nome_curso = "";
          form.value.descricao = "";
          form.value.duracao = "";
          form.value.escola_id = "";
        }
      }
    );
    return {
      form,
      emitForm,
      show: ref(props.showModal),
      statusForm: ref(props.isEditForm),
      closeForm,
    };
  },
};
</script>
