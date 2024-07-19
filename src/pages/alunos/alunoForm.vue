<!-- Criar um formulario para cadastro de alunos, onde os campos sao Nome, data_nascimento, telemovel, email, morada-->
<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          :icon="isEditForm ? 'mdi-file-edit' : 'mdi-account-group'"
          :color="isEditForm ? 'green-9' : 'dark'"
          text-color="white"
        />
        <span class="q-ml-sm" v-if="isEditForm">Alterar {{ nome }}</span>
        <span class="q-ml-sm" v-else>Cadastro de {{ artigo2 }} {{ nome }}</span>
      </q-card-section>

      <q-form @submit.prevent="emitForm">
        <q-card-section class="row q-col-gutter-sm">
          <q-input
            v-model="form.nome"
            :label="`Nome` + artigo1 + ` ` + nome"
            dense
            outlined
            clearable
            :placeholder="nome"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) =>
                !!val || 'Porfavor informe o nome ' + artigo1 + ' ' + nome,
            ]"
          />
          <q-input
            v-model="form.data_nascimento"
            label="Data de nascimento"
            dense
            type="date"
            outlined
            clearable
            placeholder="Data de nascimento"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Porfavor informe a data de nascimento']"
          />
          <q-input
            v-model="form.morada"
            label="Informe a morada"
            dense
            type="text"
            outlined
            clearable
            placeholder="Morada"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Porfavor informe a morada']"
          />
          <q-input
            v-model="form.email"
            label="E-mail"
            dense
            type="text"
            outlined
            clearable
            placeholder="E-mail"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
          />
          <q-input
            v-model="form.telemovel"
            label="Nº de telemóvel"
            dense
            type="text"
            outlined
            clearable
            placeholder="Nº de telemóvel"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
          />
          <q-input
            v-model="form.natural"
            label="Nauralidade"
            dense
            type="text"
            outlined
            clearable
            placeholder="Naturalidade"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) => !!val || 'Porfavor informe a naturalidade do aluno',
            ]"
          />
          <q-input
            v-model="form.municipio"
            label="Município onde vive"
            dense
            type="text"
            outlined
            clearable
            placeholder="Município onde vive"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) => !!val || 'Porfavor informe Municipio onde o aluno vive',
            ]"
          />
          <q-input
            v-model="form.provincia"
            label="Província onde vive"
            dense
            type="text"
            outlined
            clearable
            placeholder="Província onde vive"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) =>
                !!val || 'Porfavor informe a Província onde o aluno vive',
            ]"
          />
          <q-input
            v-model="form.nome_pai"
            label="Nome do Pai"
            dense
            type="text"
            outlined
            clearable
            placeholder="Nome do Pai"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) => !!val || 'Porfavor informe o nome do pai do aluno',
            ]"
          />
          <q-input
            v-model="form.nome_mae"
            label="Nome da Mãe"
            dense
            type="text"
            outlined
            clearable
            placeholder="Nome da Mãe"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) => !!val || 'Porfavor informe o nome da mãe do aluno',
            ]"
          />
          <q-radio
            v-model="form.genero"
            label="Masculino"
            val="masculino"
            dense
            class="col-6 text-center"
          />
          <q-radio
            v-model="form.genero"
            label="Feminino"
            val="feminino"
            dense
            class="col-6 text-center"
          />

          <q-input
            v-model="form.num_doc"
            label="Nº do documento pessoal"
            dense
            type="text"
            outlined
            clearable
            placeholder="Nº do documento pessoal"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) =>
                !!val || 'Porfavor informe o número do documento pessoal',
            ]"
          />

          <q-input
            v-model="form.data_emissao"
            label="Data de emissão"
            type="date"
            dense
            outlined
            clearable
            placeholder="Data de emissão"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) =>
                !!val ||
                'Porfavor informe a data de emissão do documento pessoal',
            ]"
          />
          <q-input
            v-model="form.local_emissao"
            label="Local de emissão"
            dense
            type="text"
            outlined
            clearable
            placeholder="Local de emissão"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[
              (val) =>
                !!val ||
                'Porfavor informe o local de emissão do documento pessoal',
            ]"
          />
          <q-select
            v-model="form.ano_lectivo"
            :label="`Ano Letivo`"
            dense
            outlined
            :options="anoLectivoOptions"
            :placeholder="`Selecione o Ano Lectivo`"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Por favor selecione o Ano Letivo']"
            option-value="ano_lectivo"
            option-label="ano_lectivo"
            map-options
            emit-value
          />

          <q-select
            v-model="form.turma_id"
            :label="`Seleciione uma turma`"
            dense
            outlined
            :options="turmasOptions"
            :placeholder="`Selecione uma turma`"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Por favor selecione uma turma']"
            option-value="id"
            option-label="nome_turma"
            map-options
            emit-value
          />

          <q-select
            v-model="form.classe"
            :label="`Selecione uma classe`"
            dense
            outlined
            :options="classesOptions"
            :placeholder="`Selecione uma classe`"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Por favor selecione uma classe']"
            option-value="nome_classe"
            option-label="nome_classe"
            map-options
            emit-value
          />

          <q-select
            v-model="form.curso_id"
            :label="`Selecione um curso`"
            dense
            outlined
            :options="cursos"
            :placeholder="`Selecione um curso`"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Por favor selecione um curso']"
            option-value="id"
            option-label="nome_curso"
            map-options
            emit-value
          />
          <q-select
            v-model="form.periodo_id"
            :label="`Selecione um período`"
            dense
            outlined
            :options="periodoOptions"
            :placeholder="`Selecione um período`"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
            :rules="[(val) => !!val || 'Por favor selecione um período']"
            option-value="id"
            option-label="nome_periodo"
            map-options
            emit-value
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
    anoLectivoOptions: { type: Array },
    nivel_ensino: { type: String, required: true },
    nome: String,
    cursos: {
      type: Array,
    },
    periodo: {
      type: Object,
    },
    turmasOptions: {
      type: Array,
    },
    periodoOptions: {
      type: Array,
    },
    classesOptions: {
      type: Array,
    },
    escolaId: {
      type: Number,
      required: true,
    },
    showInfoToEdit: {
      type: Object,
      required: true,
    },
    showModal: Boolean,
    loading: Boolean,
    isEditForm: Boolean,
  },
  emits: ["save"],
  setup(props, { emit }) {
    const form = ref({
      nome: "",
      data_nascimento: "",
      morada: "",
      email: "",
      telemovel: "",
      natural: "",
      municipio: "",
      provincia: "",
      nome_pai: "",
      nome_mae: "",
      genero: "",
      num_doc: "",
      data_emissao: "",
      local_emissao: "",
      ano_lectivo: "",
      turma_id: "",
      classe: "",
      curso_id: "",
      escola_id: "",
      nivel_ensino: "",
      periodo_id: "",
    });
    const statusForm = ref(false);

    const emitForm = async () => {
      // Emit the form data using the 'emit' method
      form.value.escola_id = props.escolaId;
      form.value.nivel_ensino = props.nivel_ensino;
      await emit("save", form.value);
    };

    const closeForm = () => {
      form.value = {
        nome: "",
        data_nascimento: "",
        morada: "",
        email: "",
        telemovel: "",
        natural: "",
        municipio: "",
        provincia: "",
        nome_pai: "",
        nome_mae: "",
        genero: "",
        num_doc: "",
        data_emissao: "",
        local_emissao: "",
        ano_lectivo: "",
        turma_id: "",
        classe: "",
        curso_id: "",
        escola_id: props.escolaId,
        nivel_ensino: props.nivel_ensino,
        periodo_id: "",
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
      () => props.showInfoToEdit,
      (newInfor) => {
        if (newInfor) {
          form.value = { ...newInfor };
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

    /* watch(
      () => props.loading,
      (newVal) => {
        if (newVal != true) {
          (form.value.nome = ""),
            (form.value.data_nascimento = ""),
            (form.value.morada = ""),
            (form.value.email = ""),
            (form.value.telemovel = ""),
            (form.value.natural = ""),
            (form.value.municipio = ""),
            (form.value.provincia = ""),
            (form.value.nome_pai = ""),
            (form.value.nome_mae = ""),
            (form.value.genero = ""),
            (form.value.num_doc = ""),
            (form.value.data_emissao = ""),
            (form.value.local_emissao = ""),
            (form.value.ano_lectivo = ""),
            (form.value.turma_id = ""),
            (form.value.classe = ""),
            (form.value.curso_id = "");
        }
      }
    );*/
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
