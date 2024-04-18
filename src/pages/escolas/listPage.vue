<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row" v-if="$q.platform.is.desktop && escolas != null">
          <q-table
            :rows="escolas"
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
                label="Cadastrar nova escola"
                :to="{ name: 'form-escola' }"
                v-bind="{ ...btnConfig }"
              />
              <download-excel
                :data="escolas"
                :fields="fields"
                worksheet="Escolas"
                name="Escolas.xls"
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
                  color="info"
                  dense
                  size="sm"
                  @click="alterarItem(props.row)"
                >
                  <q-tooltip>Alterar</q-tooltip>
                </q-btn>
                <q-btn
                  icon="mdi-delete-outline"
                  color="negative"
                  dense
                  size="sm"
                  @click="deletarItem(props.row)"
                  ><q-tooltip>Apagar</q-tooltip></q-btn
                >
              </q-td>
            </template>
          </q-table>
        </div>

        <div
          class="flex flex-center text-body1 text-center"
          v-if="$q.platform.is.desktop && escolas == null"
        >
          <q-btn flat color="red">
            De momento não tens nenhuma escola cadastrada
          </q-btn>
        </div>

        <!-- List for mobile -->
        <q-list bordered v-if="$q.platform.is.mobile && escolas != null">
          <div
            class="row text-body3 text-h5 flex-center q-pa-lg bg-secondary text-white"
          >
            <q-btn flat icon="mdi-school-outline" label="Escolas" />
          </div>
          <q-separator />
          <q-item
            v-for="escola in escolas"
            :key="escola.id"
            class="q-mb-sm"
            clickable
            v-ripple
            @click="alterarItem(escola)"
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="mdi-school-outline"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ escola.nome }}</q-item-label>
              <q-item-label caption lines="1"
                >Nº da escola:
                <strong class="secondary">{{ escola.numero }}</strong>
              </q-item-label>
              <q-item-label caption lines="1"
                >Nº do decreto:
                <strong class="secondary">{{ escola.num_decreto }}</strong>
              </q-item-label>
            </q-item-section>
            <q-separator />
          </q-item>
        </q-list>

        <div
          class="flex flex-center text-body1 text-center"
          v-if="$q.platform.is.mobile && escolas == null"
        >
          <q-btn color="red">
            De momento não tens nenhuma escola cadastrada
          </q-btn>
        </div>

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
            :to="{ name: 'form-escola' }"
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
import { btnConfig, inputConfig } from "src/utils/inputVisual";
import { fields } from "./fieldsExport";
import JsonExcel from "vue-json-excel3";
export default defineComponent({
  components: { DownloadExcel: JsonExcel },
  setup() {
    const escolas = ref([]);
    const { list, remove } = userApi();
    const router = useRouter();
    const filter = ref("");
    const $q = useQuasar();
    const table = "escolas";
    const { notifyError, notifySuccess } = usenotification();

    const listarEscolas = async () => {
      Loading.show({ message: "Carregado escolas" });
      try {
        escolas.value = await list(table);
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
          message: `tens a certeza que pretendes eliminar ${item.nome} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          Loading.show({ message: "Apagando escola..." });
          await remove(table, item.id);
          listarEscolas();
          notifySuccess("Escola apagada com sucesso");
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const alterarItem = (item) => {
      router.push({ name: "form-escola", params: { id: item.id } });
    };

    onMounted(() => {
      listarEscolas();
    });

    return {
      columns,
      alterarItem,
      deletarItem,
      escolas,
      btnConfig,
      inputConfig,
      fields,
      filter,
    };
  },
});
</script>
<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 80px !important;
}
</style>
