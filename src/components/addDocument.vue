<template>
  <q-dialog :model-value="show" persistent :full-width="$q.platform.mobile">
    <q-card style="width: 800px; max-width: 100vw">
      <q-card-section>
        <div class="text-h6">
          <q-avatar icon="mdi-file-document-multiple" />
          <span v-if="$q.platform.is.mobile" style="font-size: 14px"
            >Arquivar documento do Funcionário</span
          >
          <span v-else>Arquivar documento do Funcionário</span>
        </div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-card-section class="bg-primary">
          <span class="q-pl-sm"
            ><span class="text-white">Nome: </span>
            <b class="text-white">{{ itens.name }}</b></span
          >
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-input
            label="Carregue um documento"
            stack-label=""
            v-model="doc"
            multiple
            filled
            type="file"
            accept=".pdf"
            v-bind="{ ...inputConfig }"
            lazy-rules
            :rules="[(val) => !!val || 'Porfavor carregue um documento']"
          />
          <q-input
            v-model="form.nome_doc"
            label="Nome do Documento"
            v-bind="{ ...inputConfig }"
            lazy-rules
            :rules="[(val) => !!val || 'Porfavor informe o nome do documento']"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-gutter-sm bg-white text-teal">
          <q-btn
            icon="mdi-close"
            flat
            label="Fechar"
            v-close-popup
            @click="handClose"
          />
          <q-btn
            icon="mdi-content-save-outline"
            type="submit"
            flat
            label="Arquivar"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { formatCurrency } from "src/utils/formatCurrency";
import { inputConfig } from "src/utils/inputVisual.js";
import userApi from "src/composible/userApi";
export default {
  name: "modalDetail",
  props: {
    itens: {
      type: Object,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const funcionarios = ref([]);
    const $q = useQuasar();
    const tabela = "docFuncionario";
    const loading = ref(false);

    const { post, fileName, uploadImage } = userApi();

    const form = ref({
      nome_doc: "",
      file_name: "",
      url_documento: "",
    });

    const doc = ref([]);

    const handClose = () => {
      emit("closeModal");
    };

    onMounted(() => {
      form.value.num_bilhete = props.itens.num_bilhete;
      form.value.id_funcionario = props.itens.id;
    });
    const onSubmit = async () => {
      $q.loading.show("Salvando documento...");
      try {
        if (doc.value.length > 0) {
          await uploadImage(doc.value[0], "docFuncionarios").then((imgUrl) => {
            form.value.url_documento = imgUrl;
            form.value.file_name = fileName;
          });
        }
        const {} = form.value;
        await post(tabela, {
          ...form.value,
          id_funcionario: props.itens.id,
          num_bilhete: props.itens.num_bilhete,
        });
        $q.notify({
          color: "positive",
          position: "top",
          message: "Documento arquivado com sucesso",
          icon: "mdi-check",
        });
        handClose();
      } catch (err) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Erro ao arquivar o documento" + err.message,
          icon: "report_problem",
        });
      } finally {
        $q.loading.hide();
      }
    };
    return {
      handClose,
      funcionarios,
      formatCurrency,
      inputConfig,
      onSubmit,
      form,
      doc,
    };
  },
};
</script>
