<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <topo-name-page-vue :titulo="titulo" />
        <btn-back-page-vue />
        <q-separator />
        <div class="row q-gutter-sm q-pa-md flex-center">
          <q-btn
            icon="mdi-view-grid-outline"
            v-bind="{ ...btnConfig }"
            label="Área do Plano"
            :to="{ name: 'pagePlano' }"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
          />
          <q-btn
            icon="mdi-finance"
            v-bind="{ ...btnConfig }"
            label="Área de Estatística"
            :to="{ name: 'areaEstatistica' }"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
          />
          <q-btn
            icon="mdi-account-group"
            v-bind="{ ...btnConfig }"
            label="Área de Recursos Humanos"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
            @click="servicesRH"
          />
          <q-btn
            icon="mdi-file-document-edit-outline"
            v-bind="{ ...btnConfig }"
            label="Secretaria Geral"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
            :to="{ name: 'dservico' }"
          />
          <q-btn
            icon="mdi-inbox-full"
            v-bind="{ ...btnConfig }"
            label="Áres de património"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import btnBackPageVue from "src/components/btnBack/btnBackPage.vue";
import { defineComponent } from "vue";
import topoNamePageVue from "src/components/topoNamePage/topoNamePage.vue";
import { btnConfig } from "src/utils/inputVisual";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Page-Recursos-Humanos",
  components: { btnBackPageVue, topoNamePageVue },
  setup() {
    const titulo =
      "Secção Municipal de Planeamento Estatística e Recursos Humanos";
    const backPage = () => {
      window.history.back();
    };
    const router = useRouter();

    const servicesRH = () => {
      router.push({ name: "service_do_rh" });
    };
    return {
      backPage,
      titulo,
      btnConfig,
      servicesRH,
    };
  },
});
</script>

<style scoped>
.small-text {
  font-size: 10px; /* Tamanho de fonte menor */
}
</style>
