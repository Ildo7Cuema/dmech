<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <p class="text-body1">Área de estatística</p>
        <btn-back-page-vue />
        <q-separator />
        <div class="row justify-center q-gutter-sm q-mt-sm q-pa-md">
          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <cards-dashboard
              label="Escolas"
              tabela="escolas"
              color="blue-5"
              icon="mdi-school-outline"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <cards-dashboard
              label="Funcionários"
              tabela="funcionarios"
              color="green-5"
              icon="mdi-account-tie"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <cards-dashboard
              label="Orçamentos"
              tabela="orcamento_project"
              color="blue-grey-5"
              icon="mdi-shopping"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import btnBackPageVue from "src/components/btnBack/btnBackPage.vue";
import cardsDashboard from "src/components/cardsDashboard/cardsDashboard.vue";

export default {
  name: "AreaEstatisticaPage",
  components: { btnBackPageVue, cardsDashboard },
  setup() {
    return {};
  },
};
</script>
