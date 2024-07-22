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
        <p><b>Nome completo: </b>{{ showInformation.nome }}</p>
        <br />
        <p><b>Nome do Pai: </b>{{ showInformation.nome_pai }}</p>
        <br />
        <p><b>Nome da maê: </b>{{ showInformation.nome_mae }}</p>
        <br />
        <p><b>Nº do documento: </b>{{ showInformation.num_doc }}</p>
        <br />
        <p><b>Morada:</b>{{ showInformation.morada }}</p>
        <p><b>Natural:</b>{{ showInformation.natural }}</p>
        <p><b>Município:</b>{{ showInformation.municipio }}</p>
        <p><b>Província:</b>{{ showInformation.provincia }}</p>
        <p><b>Nível de ensino:</b>{{ showInformation.nivel_ensino }}</p>
        <p><b>Turma:</b>{{ showInformation.turmas.nome_turma }}</p>
        <p><b>Classe:</b>{{ showInformation.classe }}</p>
        <p><b>Período:</b>{{ showInformation.periodo.nome_periodo }}</p>
        <br />
        <p><b>Escola onde frequenta:</b>{{ showInformation.escola.name }}</p>
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
