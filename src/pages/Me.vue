<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <cards-dashboard
              tabela="funcionarios"
              titulo="Total de funcionarios"
              icon="mdi-account-tie"
              colorIcon="grey-9"
              :total="funcionarioCount"
            />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <cards-dashboard
              class="col-xs-12 col-sm-12 col-md-4 col-lg-4"
              tabela="escolas"
              titulo="Total de escolas"
              icon="mdi-school"
              colorIcon="blue-7"
              :total="escolasCount"
            />
          </div>

          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <cards-dashboard
              class="col-xs-12 col-sm-12 col-md-4 col-lg-4"
              tabela="escolas"
              titulo="Total de categorias"
              icon="mdi-shape"
              colorIcon="red-7"
              :total="categoriasCount"
            />
          </div>
        </div>

        <charts-dashboard class="q-mt-lg" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import userAuthUser from "src/composible/userAuthUser";
import cardsDashboard from "src/components/dashboard/cards/dashboardCards.vue";
import chartsDashboard from "src/components/dashboard/charts/chartsDashboard.vue";

import { ref, computed, onMounted } from "vue";
import { useFuncionarioStore } from "src/stores/funcionarios.js";
import { useEscolaStore } from "src/stores/escolas.js";
import { useCategoriaStore } from "src/stores/categorias.js";
import { storeToRefs } from "pinia";

export default {
  name: "mePage",
  components: { cardsDashboard, chartsDashboard },
  setup() {
    const { user } = userAuthUser();
    const funcionarioStore = useFuncionarioStore();
    const escolasStore = useEscolaStore();
    const categoriaStore = useCategoriaStore();
    const { funcionarioCount } = storeToRefs(funcionarioStore);
    const { escolasCount } = storeToRefs(escolasStore);
    const { categoriasCount } = storeToRefs(categoriaStore);

    onMounted(() => {
      getAllFuncionarios();
      getAllEscolas();
      getAllCategorias();
    });

    const getAllFuncionarios = () => {
      const store = useFuncionarioStore();
      store.getFuncionarios("funcionarios");
    };
    const getAllEscolas = () => {
      const store = useEscolaStore();
      store.getEscolas("escolas");
    };
    const getAllCategorias = () => {
      const store = useCategoriaStore();
      store.getCategorias("categorias");
    };

    return {
      user,
      funcionarioCount,
      escolasCount,
      categoriasCount,
    };
  },
};
</script>
