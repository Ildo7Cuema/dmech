<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row">
          <btn-back-page-vue />
          <q-space />
          <div class="col-6 text-right">
            <span class="text-body1">Orçamentos</span>
          </div>
        </div>

        <q-separator />
        <q-table
          flat
          dense
          bordered
          :rows="orcamentos"
          :columns="columns"
          row-key="name"
          class="q-mt-md"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="primary"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  <span v-html="props.row.descricao"></span>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import btnBackPageVue from "src/components/btnBack/btnBackPage.vue";
import { columns } from "./table";
import { ref, onMounted } from "vue";
import userApi from "src/composible/userApi";
import { useQuasar } from "quasar";
import usenotification from "src/composible/useNotify";
import { formatCurrency } from "src/utils/formatCurrency";

export default {
  name: "OrcamentosPage",
  components: { btnBackPageVue },
  setup() {
    const $q = useQuasar();
    const { notifyError } = usenotification();
    const { list } = userApi();
    const orcamentos = ref([]);
    const tabela = "orcamento_project";

    onMounted(() => {
      carregarOrcamento();
    });
    const carregarOrcamento = async () => {
      try {
        $q.loading.show({ message: "Carregar lista de orçamento" });
        orcamentos.value = await list(tabela);
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
      }
    };
    return {
      columns,
      orcamentos,
      tabela,
      formatCurrency,
    };
  },
};
</script>
