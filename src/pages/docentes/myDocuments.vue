<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row h5 text-primary">
          <div class="text-bold">
            <q-icon name="mdi-folder-account" size="lg" /> MEUS DOCUMENTOS
          </div>
          <q-space />
          <div class="text-bold">Total: {{ myDocumentCount }}</div>
        </div>
        <q-separator />
        <q-table
          grid
          flat
          bordered
          title="Repositório de documentos pessoais"
          :rows="computedDocs"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Procurar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card flat bordered>
                <q-card-section class="text-center">
                  Documento
                  <br />
                  <q-icon name="mdi-file-pdf" size="lg" color="red-10" />
                  <br />
                  <strong>{{ props.row.nome_doc }}</strong>
                </q-card-section>
                <q-separator />
                <q-card-section
                  class="flex flex-center"
                  :style="{ fontSize: props.row.calories / 2 + 'px' }"
                >
                  <q-btn
                    :loading="loading"
                    label="Apagar"
                    dense
                    icon="mdi-delete-circle-outline"
                    no-caps
                    flat
                    color="red-10"
                    @click="apagarFile(props.row.id, props.row.file_name)"
                  />
                  <q-btn
                    :loading="loading"
                    label="Baixar"
                    dense
                    icon="mdi-cloud-download-outline"
                    no-caps
                    flat
                    color="green-10"
                    @click="downloadFile(props.row.file_name)"
                  />
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useDocumentStore } from "src/stores/myDocument.js";
import { storeToRefs } from "pinia";
import { columns } from "./table";
import usenotification from "src/composible/useNotify";
import { useQuasar } from "quasar";
export default {
  name: "page-Document-Docente",
  setup(props) {
    const filter = ref("");
    const docs = ref([]);
    const $q = useQuasar();
    const documentStore = useDocumentStore();
    const { myDocumentCount, myDocument } = storeToRefs(documentStore);
    const { notifyError, notifySuccess } = usenotification();
    const loading = ref(false);
    onMounted(() => {
      getAllMyDocument();
    });

    const computedDocs = computed(() => {
      return myDocument.value;
    });

    const getAllMyDocument = () => {
      const store = useDocumentStore();
      store.getMyDocument();
      docs.value = myDocument.value;
    };

    const downloadFile = async (fileName) => {
      try {
        $q.loading.show({ message: "Aguarda enquanto descarrega o documento" });
        const store = useDocumentStore();
        await store.downloadFile(fileName);
        notifySuccess("Documento descarregado do sucesso");
      } catch (error) {
        notifyError("Não foi possível descarregar o documento");
      } finally {
        $q.loading.hide();
      }
    };

    const apagarFile = async (id, fileName) => {
      $q.dialog({
        title: "Confirme",
        message: "Tens a certeza que pretendes apagar este documento?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          // console.log('>>>> OK')
          $q.loading.show({ message: "Aguarda enquanto apaga" });
          const store = useDocumentStore();
          await store.deleteFile(id, fileName);
          $q.loading.hide();
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };
    return {
      downloadFile,
      computedDocs,
      myDocumentCount,
      myDocument,
      filter,
      columns,
      apagarFile,
      loading,
    };
  },
};
</script>
