<template>
  <q-page class="q-mt-lg">
    <q-card style="border-radius: 0% !important" class="q-pa-md">
      <b
        >Buscar termo de frequência de alunos
        <q-icon name="mdi-search-web" size="md" /></b
    ></q-card>
    <q-card style="border-radius: 0% !important" class="q-pa-md">
      <q-form>
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
            v-model="form.curso"
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
            v-model="form.classe"
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
          />
        </q-row>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import userAuthUser from "src/composible/userAuthUser";
import { useEscolaStore } from "src/stores/escolas";
import { useCursoStore } from "src/stores/cursos";
import { useClasseStore } from "src/stores/classes";
import { useAnoLectivoStore } from "src/stores/ano_lectivo";
import { btnConfig, inputConfig } from "src/utils/inputVisual";
import useSupabase from "src/boot/supabase";
export default {
  setup() {
    const { user } = userAuthUser();
    const { supabase } = useSupabase();
    const loading = ref(false);
    const { getEscolaByEmail } = useEscolaStore();
    const { getAllAnoLectivo } = useAnoLectivoStore();
    const { getAllClasses } = useClasseStore();
    const { getAllCursos } = useCursoStore();
    const anos_lectivos = ref([]);
    const cursos = ref([]);
    const classes = ref([]);
    const form = ref({
      escola_id: "",
      ano_lectivo: "",
      curso: "",
      classe: "",
      name: "",
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
            console.log(anos_lectivos.value);
          }
        );
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };

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
    };
  },
};
</script>
