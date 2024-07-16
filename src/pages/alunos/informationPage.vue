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
        <span class="q-ml-sm">Mais informações {{ artigo }} {{ nome }}</span>
      </q-card-section>

      <q-card-section class="row q-col-gutter-sm">
        <p><b>Período: </b>{{ showInformation.nome_periodo }}</p>
        <br />
        <p><b>Nome da escola:</b>{{ showInformation.escola.name }}</p>
        <br />
        <p>
          <b>Descrição: </b>
        </p>
        <br />
        <p><b>Data de registo:</b> {{ momentDate }}</p>
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
import { ref, computed } from "vue";
import moment from "moment";
export default {
  props: {
    nome: String,
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
    const artigo = computed(() => {
      if (props.nome.endsWith("a")) {
        return "da";
      } else {
        return "do";
      }
    });
    return {
      momentDate,
      artigo,
      showInfor: ref(props.showModal2),
    };
  },
};
</script>
