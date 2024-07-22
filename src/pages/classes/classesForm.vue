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

      <q-form>
        <q-card-section class="row q-col-gutter-sm">
          <q-select
            v-model="form.nome_classe"
            :label="`Classes`"
            dense
            outlined
            clearable
            :options="classes"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor selecione uma classe',
            ]"
            option-value="nome"
            option-label="nome"
            map-options
            emit-value
            class="col-12"
          />
          <q-select
            v-model="form.curso_id"
            :label="`Curso`"
            dense
            outlined
            clearable
            :options="cursos"
            option-value="id"
            option-label="nome_curso"
            map-options
            emit-value
            class="col-12"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor selecione pelo menos um curso',
            ]"
          />
          <q-select
            v-model="form.disciplina_id"
            :label="`Disciplina`"
            dense
            outlined
            multiple
            clearable
            :options="disciplinas"
            option-value="id"
            option-label="nome_disciplina"
            map-options
            emit-value
            class="col-12"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor selecione pelo menos uma disciplina',
            ]"
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
            @click="emitForm()"
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
      required: true,
    },
    cursos: { type: Array, required: true },
    disciplinas: {
      type: Array,
      required: true,
    },
    showModal: Boolean,
    loading: Boolean,
    isEditForm: Boolean,
  },
  emits: ["saveClasse"],
  setup(props, { emit }) {
    const form = ref({
      nome_classe: "",
      disciplina_id: [],
      escola_id: "",
      curso_id: "",
    });
    const statusForm = ref(false);

    const emitForm = () => {
      // Emit the form data using the 'emit' method
      emit("saveClasse", form.value);
    };

    const closeForm = () => {
      form.value = {
        nome_classe: "",
        disciplina_id: [],
        escola_id: "",
        curso_id: "",
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
      () => props.showModal,
      (newVal) => {
        show.value = newVal;
      }
    );

    watch(
      () => props.classes,
      (newClasse) => {
        if (newClasse) {
          form.value = {
            ...newClasse,
          }; // Garantindo que curso_id seja um array
        }
      },
      { immediate: true }
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
