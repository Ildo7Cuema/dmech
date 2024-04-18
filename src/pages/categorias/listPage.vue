<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row" v-if="$q.platform.is.desktop">
          <q-table
            :rows="categorias"
            flat
            bordered
            :columns="columns"
            row-key="id"
            class="col-12"
            virtual-scroll
            :filter="filter"
          >
            <template v-slot:top>
              <q-input
                class=""
                type="text"
                label="Pesquisar"
                v-bind="{ ...inputConfig }"
                v-model="filter"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-magnify" />
                </template>
              </q-input>

              <q-space />

              <q-btn
                v-if="$q.platform.is.desktop"
                icon="mdi-plus"
                label="Cadastrar nova categoria"
                v-bind="{ ...btnConfig }"
                :to="{ name: 'form-categoria' }"
              />

              <download-excel
                :data="categorias"
                :fields="fields"
                worksheet="Categorias"
                name="categorias.xls"
                class="q-ml-md"
              >
                <q-btn
                  icon="mdi-file-excel"
                  label="Exportar uma lista"
                  v-bind="{ ...btnConfig }"
                />
              </download-excel>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-sm text-center">
                <q-btn
                  icon="mdi-pencil-outline"
                  color="primary"
                  dense
                  size="sm"
                  @click="alterarItem(props.row)"
                >
                  <q-tooltip>Alterar</q-tooltip>
                </q-btn>
                <q-btn
                  icon="mdi-delete-outline"
                  color="secondary"
                  dense
                  size="sm"
                  @click="deletarItem(props.row)"
                  ><q-tooltip>Apagar</q-tooltip></q-btn
                >
              </q-td>
            </template>
          </q-table>
        </div>

        <!-- List for mobile -->
        <q-list bordered v-if="$q.platform.is.mobile">
          <div
            class="row text-body3 text-h5 flex-center q-pa-lg bg-secondary text-white"
          >
            <q-btn flat icon="mdi-shape-outline" label="Categorias" />
          </div>
          <q-item
            v-for="categoria in categorias"
            :key="categoria.id"
            class="q-mb-sm"
            clickable
            v-ripple
            @click="alterarItem(categoria)"
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="mdi-shape" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ categoria.categoria }}</q-item-label>
            </q-item-section>
            <q-separator />
          </q-item>
        </q-list>

        <q-page-sticky
          class="margin-bottom"
          position="bottom-right"
          :offset="[18, 18]"
          v-if="$q.platform.is.mobile"
        >
          <q-btn
            fab
            icon="mdi-plus"
            color="primary"
            :to="{ name: 'form-categoria' }"
          />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import userApi from "src/composible/userApi";
import usenotification from "src/composible/useNotify";
import { Loading, useQuasar } from "quasar";
import { columns } from "./table";
import { formatCurrency } from "src/utils/formatCurrency";
import { inputConfig, btnConfig } from "src/utils/inputVisual";
import JsonExcel from "vue-json-excel3";
import { fields } from "./fieldsExport";
export default defineComponent({
  components: { DownloadExcel: JsonExcel },
  setup() {
    const categorias = ref([]);
    const { list, remove } = userApi();
    const router = useRouter();
    const $q = useQuasar();
    const filter = ref("");
    const table = "categorias";
    const { notifyError, notifySuccess } = usenotification();

    const listarCategorias = async () => {
      Loading.show({ message: "Carregado categorias" });
      try {
        categorias.value = await list(table);
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const deletarItem = async (item) => {
      try {
        $q.dialog({
          title: "Confirmação",
          message: `tens a certeza que pretendes eliminar a categoria ${item.categoria} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          Loading.show({ message: "Apagando categoria..." });
          await remove(table, item.id);
          listarCategorias();
          notifySuccess("categoria apagada com sucesso");
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const alterarItem = (item) => {
      router.push({ name: "form-categoria", params: { id: item.id } });
    };

    onMounted(() => {
      listarCategorias();
    });

    return {
      columns,
      alterarItem,
      formatCurrency,
      deletarItem,
      categorias,
      btnConfig,
      inputConfig,
      filter,
      fields,
    };
  },
});
</script>
<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 80px !important;
}
</style>
