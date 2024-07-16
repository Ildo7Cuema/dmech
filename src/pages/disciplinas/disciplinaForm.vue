<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          :icon="isEditForm ? 'mdi-file-edit' : 'mdi-book'"
          :color="isEditForm ? 'green-9' : 'dark'"
          text-color="white"
        />
        <span class="q-ml-sm" v-if="isEditForm">Alterar {{ nome }}</span>
        <span class="q-ml-sm" v-else>Cadastro de {{ artigo2 }} {{ nome }}</span>
      </q-card-section>

      <q-form @submit.prevent="emitForm">
        <q-card-section class="row q-col-gutter-sm">
          <q-input
            v-model="form.nome_disciplina"
            :label="`Nome` + artigo1 + ` ` + nome"
            dense
            outlined
            clearable
            :placeholder="nome"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) =>
                !!val || 'Por favor informe o nome ' + artigo1 + ' ' + nome,
            ]"
          />
          <q-select
            v-model="form.curso_id"
            label="Cursos"
            dense
            outlined
            clearable
            multiple
            placeholder="Selecione um ou mais cursos"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :options="cursos"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor selecione pelo menos um curso',
            ]"
            option-value="id"
            option-label="nome_curso"
            map-options
            emit-value
          />

          <div class="col-12">
            <q-editor
              v-model="form.descricao"
              label="Descrição"
              dense
              outlined
              clearable
              placeholder="Descrição"
            />
          </div>
        </q-card-section>

        <q-card-actions class="bg-grey-3">
          <q-btn
            outline
            no-caps
            label="Cancelar"
            color="red-9"
            v-close-popup
            icon="mdi-close"
            @click="closeForm"
          />
          <q-space />
          <q-btn
            type="submit"
            outline
            no-caps
            :label="isEditForm ? 'Atualizar' : 'Cadastrar'"
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
import { ref, watch, computed } from "vue";

export default {
  props: {
    nome: String,
    cursos: Array,
    disciplina: Object,
    showModal: Boolean,
    loading: Boolean,
    isEditForm: Boolean,
  },
  emits: ["save"],
  setup(props, { emit }) {
    const form = ref({
      nome_disciplina: "",
      curso_id: [], // Inicializando como array
      escola_id: "",
      descricao: "",
    });

    const emitForm = () => {
      emit("save", { ...form.value, curso_id: [...form.value.curso_id] });
    };

    const closeForm = () => {
      form.value = {
        nome_disciplina: "",
        curso_id: [], // Resetando como array
        escola_id: "",
        descricao: "",
      };
    };

    const statusForm = ref(false);

    const artigo1 = computed(() => {
      return props.nome.endsWith("a") ? "da" : "do";
    });

    const artigo2 = computed(() => {
      return props.nome.endsWith("a") ? "nova" : "novo";
    });

    watch(
      () => props.disciplina,
      (newDisciplina) => {
        if (newDisciplina) {
          form.value = {
            ...newDisciplina,
            curso_id: Array.isArray(newDisciplina.curso_id)
              ? newDisciplina.curso_id
              : [],
          }; // Garantindo que curso_id seja um array
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
        if (!newVal) {
          closeForm(); // Utilizando o método closeForm para resetar o formulário
        }
      }
    );

    return {
      form,
      emitForm,
      artigo1,
      artigo2,
      show: ref(props.showModal),
      statusForm: ref(props.isEditForm),
      closeForm,
    };
  },
};
</script>
