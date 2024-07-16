<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div
          class="row q-col-gutter-sm"
          v-if="user.user_metadata.role != 'Docente'"
        >
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <cards-dashboard
              v-if="user.email == 'ildocuema@gmail.com'"
              class="col-xs-12 col-sm-12 col-md-4 col-lg-4"
              tabela="escolas"
              titulo="Total de utilizador"
              icon="mdi-account-group"
              colorIcon="red-7"
              :total="countUtilizadores"
            />
          </div>
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
        </div>

        <charts-dashboard
          class="q-mt-lg"
          v-if="user.user_metadata.role != 'Docente'"
        />
        <!-- Informações de dashboard de Docentes -->
        <div
          class="row q-col-gutter-sm"
          v-if="user.user_metadata.role == 'Docente'"
        >
          <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <!-- <cards-dashboard /> -->
            <span>Informações não definida para Dashboard</span>
          </div>
        </div>
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
import { useUtilizadores } from "src/stores/utilizadores.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import usenotification from "src/composible/useNotify";

export default {
  name: "mePage",
  components: { cardsDashboard, chartsDashboard },
  setup() {
    const { user } = userAuthUser();
    const funcionarioStore = useFuncionarioStore();
    const escolasStore = useEscolaStore();
    const categoriaStore = useCategoriaStore();
    const utilizadorStore = useUtilizadores();
    const router = useRouter();
    const { notifyError, notifySuccess } = usenotification();

    const { funcionarioCount } = storeToRefs(funcionarioStore);
    const { escolasCount } = storeToRefs(escolasStore);
    const { categoriasCount } = storeToRefs(categoriaStore);
    const { countUtilizadores } = storeToRefs(utilizadorStore);

    onMounted(() => {
      console.log(user.value);
      verifyAccessPainel();
      getAllFuncionarios();
      getAllEscolas();
      getAllCategorias();
      getAllUsers();
    });

    const getAllFuncionarios = () => {
      const store = useFuncionarioStore();
      store.getFuncionarios("funcionarios", isDiferentID.value);
    };
    const getAllEscolas = () => {
      const store = useEscolaStore();
      store.getEscolas("escolas", isDiferentID.value);
    };
    const getAllCategorias = () => {
      const store = useCategoriaStore();
      store.getCategorias("categorias", isDiferentID.value);
    };

    const getAllUsers = () => {
      const store = useUtilizadores();
      store.utilizadoresList();
    };

    const isDiferentID = computed(() => {
      if (user.value.id != user.value.user_metadata.organization_id) {
        console.log(user.value.user_metadata.organization_id);
        return user.value.user_metadata.organization_id;
      } else {
        return user.value.id;
      }
    });

    //Verifica o painel onde este usuário vai acessar
    const verifyAccessPainel = () => {
      //depois de fazer o login verifica se o usuário é uma escola, professor, aluno ou encarregado de educacao
      if (
        user.value.user_metadata.role === "Admin-Escola" ||
        user.value.user_metadata.role === "Docente" ||
        user.value.user_metadata.role === "Estudante" ||
        user.value.user_metadata.role === "Encarregado"
      ) {
        router.push({ name: "gestao-escolar" });
        notifySuccess("Autorizado com sucesso");
      } else {
        router.push({ name: "admin" });
        notifySuccess("Autorizado com sucesso");
      }
    };

    return {
      user,
      funcionarioCount,
      escolasCount,
      categoriasCount,
      countUtilizadores,
      getAllUsers,
      isDiferentID,
    };
  },
};
</script>
