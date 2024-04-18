<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <topo-name-page-vue titulo="Área de Recursos humanos" />
        <btn-back-page-vue />
        <div class="row justify-center q-gutter-sm">
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <q-btn
              class="full-width q-pa-lg"
              icon="mdi-shape-plus"
              label="Categorias"
              v-bind="{ ...btnConfig }"
              :to="{ name: 'categorias' }"
            ></q-btn>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <q-btn
              class="full-width q-pa-lg text-center"
              icon="mdi-school-outline"
              label="Escolas"
              v-bind="{ ...btnConfig }"
              :to="{ name: 'escolas' }"
            ></q-btn>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <q-btn
              class="full-width q-pa-lg"
              icon="mdi-account-tie"
              label="Funcionário"
              v-bind="{ ...btnConfig }"
              :to="{ name: 'funcionarios' }"
            ></q-btn>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <q-btn
              class="full-width q-pa-lg"
              icon="mdi-file-document-outline"
              label="Documentos"
              v-bind="{ ...btnConfig }"
              :to="{ name: 'docRH' }"
            ></q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import btnBackPageVue from "src/components/btnBack/btnBackPage.vue";
import topoNamePageVue from "src/components/topoNamePage/topoNamePage.vue";
import { btnConfig } from "src/utils/inputVisual";
export default {
  components: { topoNamePageVue, btnBackPageVue },
  setup(props) {
    return {
      btnConfig,
    };
  },
};
</script>
