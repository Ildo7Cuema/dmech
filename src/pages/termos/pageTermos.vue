<template>
  <q-page class="q-mt-lg">
    <q-card style="border-radius: 0% !important" class="q-pa-md">
      <b
        >Buscar termo de frequência de alunos
        <q-icon name="mdi-search-web" size="md" /></b
    ></q-card>
    <preloading :load="loading" />
    <q-card style="border-radius: 0% !important" class="q-pa-md">
      <q-form @submit.prevent="handleTermo">
        <q-row>
          <q-select
            v-model="form.ano_lectivo"
            :options="anos_lectivos"
            label="Selecione o ano lectivo"
            option-value="id"
            option-label="ano_lectivo"
            emit-value
            map-options
            v-bind="{ ...inputConfig }"
          />

          <q-select
            v-model="form.curso_id"
            :options="cursos"
            label="Selecione o curso"
            option-value="id"
            option-label="nome_curso"
            emit-value
            map-options
            v-bind="{ ...inputConfig }"
            class="q-mt-sm"
          />

          <q-select
            v-model="form.classe_id"
            :options="classes"
            label="Selecione a classe"
            option-value="id"
            option-label="nome_classe"
            emit-value
            map-options
            v-bind="{ ...inputConfig }"
            class="q-mt-sm"
          />

          <q-select
            v-model="form.name"
            :options="options"
            use-input
            option-value="id"
            option-label="name"
            input-debounce="300"
            @filter="filterOptions"
            label="Busque o aluno"
            v-bind="{ ...inputConfig }"
            class="q-mt-sm"
          />

          <q-btn
            name=""
            type="submit"
            label="Buscar"
            icon="mdi-search-web"
            v-bind="{ ...btnConfig }"
            class="q-mt-sm"
            :loading="loadingBtn"
          />
        </q-row>
      </q-form>
    </q-card>

    <print-termo
      :loading="showMiniPautaPrint"
      :dataMiniPautas="dataMiniPautas"
    />
  </q-page>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import userAuthUser from "src/composible/userAuthUser";
import { useEscolaStore } from "src/stores/escolas";
import { useCursoStore } from "src/stores/cursos";
import { useClasseStore } from "src/stores/classes";
import { useAlunosStore } from "src/stores/alunos";
import { useAnoLectivoStore } from "src/stores/ano_lectivo";
import { useAdd_Nota_Miniauta_Store } from "src/stores/add_notas";
import { btnConfig, inputConfig } from "src/utils/inputVisual";
import useSupabase from "src/boot/supabase";
import usenotification from "src/composible/useNotify";
import preloading from "src/components/loading/loadingComponent2.vue";
import printTermo from "./printTermo.vue";
export default {
  components: { preloading, printTermo },
  setup() {
    const { user } = userAuthUser();
    const { supabase } = useSupabase();
    const loading = ref(false);
    const { getEscolaByEmail } = useEscolaStore();
    const { getAllAnoLectivo } = useAnoLectivoStore();
    const { getAllClasses } = useClasseStore();
    const { getAllCursos } = useCursoStore();
    const { getAlunoByName } = useAlunosStore();
    const { getTermo } = useAdd_Nota_Miniauta_Store();
    const { notifyError } = usenotification();
    const anos_lectivos = ref([]);
    const dataMiniPautas = ref([]);
    const loadingBtn = ref(false);
    const showMiniPautaPrint = ref(false);
    const cursos = ref([]);
    const classes = ref([]);
    const form = ref({
      escola_id: 0,
      ano_lectivo: "",
      curso_id: 0,
      classe_id: 0,
      name: "",
      aluno_id: 0,
    });

    const selected = ref(null);
    const options = ref([]);
    const allOptions = ref([]);

    const fetchOptions = async (idEscola) => {
      const { data, error } = await supabase
        .from("alunos")
        .select("id, nome")
        .eq("escola_id", idEscola);

      if (error) {
        console.error(error);
      } else {
        allOptions.value = data.map((item) => item.nome);
        options.value = allOptions.value;
      }
    };

    const filterOptions = (val, update) => {
      update(() => {
        const query = val.toLowerCase();
        options.value = allOptions.value.filter((option) =>
          option.toLowerCase().includes(query)
        );
      });
    };

    onMounted(() => {
      escola();
    });

    const escola = async () => {
      try {
        loading.value = true;
        await getEscolaByEmail("escolas", user.value.email).then(
          async (idEscola) => {
            form.value.escola_id = idEscola;
            //carregar os fucionarios da escola
            anos_lectivos.value = await getAllAnoLectivo(idEscola);
            cursos.value = await getAllCursos(idEscola);
            classes.value = await getAllClasses(idEscola);

            fetchOptions(idEscola);
          }
        );
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

    const handleTermo = async () => {
      try {
        const data = await getTermo(form.value);
        loadingBtn.value = true;
        if (data == "") {
          notifyError(
            "Não existem informações para exibir o termo deste aluno com este filtro de pesquisa"
          );
          loadingBtn.value = false;
          return;
        }
        showMiniPautaPrint.value = true;
        dataMiniPautas.value = data;
        showMiniPautaPrint.value = false;
        loadingBtn.value = false;
      } catch (error) {
        loadingBtn.value = false;
      }
    };

    watch(
      () => form.value.name,
      async (newVlaue) => {
        const idAluno = await getAlunoByName(newVlaue);
        form.value.aluno_id = idAluno.id;
      }
    );

    return {
      form,
      anos_lectivos,
      cursos,
      classes,
      inputConfig,
      btnConfig,
      loading,
      selected,
      options,
      filteredOptions: options,
      filterOptions,
      handleTermo,
      loadingBtn,
      showMiniPautaPrint,
      dataMiniPautas,
    };
  },
};
</script>
