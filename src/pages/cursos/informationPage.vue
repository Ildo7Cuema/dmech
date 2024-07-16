<!-- Criar um formulario para cadastro de alunos, onde os campos sao Nome, data_nascimento, telemovel, email, morada-->
<template>
  <q-dialog v-model="showInfor" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          icon="mdi-information-outline"
          color="blue-4"
          text-color="white"
          size="50px"
        />
        <span class="q-ml-sm">Mais informações do curso</span>
      </q-card-section>

      <q-card-section class="row q-col-gutter-sm">
        <p><b>Curso: </b>{{ showInformation.nome_curso }}</p>
        <p><b>Descrição: </b>{{ showInformation.descricao }}</p>
        <p><b>Duração do curso: </b>{{ showInformation.duracao }}</p>
        <p><b>Data do registo: </b>{{ momentDate }}</p>
      </q-card-section>

      <q-card-actions class="bg-grey-3">
        <q-btn
          outline
          no-caps
          label="Fechar"
          color="red-9"
          v-close-popup
          icon="mdi-close"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
export default {
  props: {
    showModal2: Boolean,
    showInformation: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const momentDate = moment(props.showInformation.created_at).format(
      "DD/MM/YYYY"
    );
    return {
      momentDate,
      showInfor: ref(props.showModal2),
    };
  },
};
</script>
