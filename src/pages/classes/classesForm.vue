<!-- Criar um formulario para cadastro de alunos, onde os campos sao Nome, data_nascimento, telemovel, email, morada-->
<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          :icon="isEditForm ? 'mdi-file-edit' : 'mdi-clock-outline'"
          :color="isEditForm ? 'green-9' : 'dark'"
          text-color="white"
        />
        <span class="q-ml-sm" v-if="isEditForm">Alterar {{ nome }}</span>
        <span class="q-ml-sm" v-else>Cadastro de {{ artigo2 }} {{ nome }}</span>
      </q-card-section>

      <q-form @submit.prevent="emitForm">
        <q-card-section class="row q-col-gutter-sm">
          <q-select
            v-model="form.nome_classe"
            :label="`Classes`"
            dense
            outlined
            clearable
            multiple
            :options="classes"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor selecione pelo menos uma classe',
            ]"
            option-value="nome"
            option-label="nome"
            map-options
            emit-value
            class="col-12"
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
import { ref, watch, onMounted, computed } from "vue";

export default {
  props: {
    nome: String,
    classes: {
      type: Array,
    },
    periodo: {
      type: Object,
    },
    showModal: Boolean,
    loading: Boolean,
    isEditForm: Boolean,
  },
  emits: ["save"],
  setup(props, { emit }) {
    const form = ref({
      nome_classe: [],
      escola_id: "",
    });
    const statusForm = ref(false);

    const emitForm = () => {
      // Emit the form data using the 'emit' method
      emit("save", form.value);
    };

    const closeForm = () => {
      form.value = {
        nome_classe: [],
        escola_id: "",
      };
      statusForm.value = false;
    };

    const artigo1 = computed(() => {
      if (props.nome.endsWith("a")) {
        return "da";
      } else {
        return "do";
      }
    });

    const artigo2 = computed(() => {
      if (props.nome.endsWith("a")) {
        return "nova";
      } else {
        return "novo";
      }
    });

    watch(
      () => props.periodo,
      (newPeriodo) => {
        if (newPeriodo) {
          form.value = { ...newPeriodo };
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
          form.value.nome_periodo = "";
          form.value.escola_id = "";
          form.value.descricao = "";
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
