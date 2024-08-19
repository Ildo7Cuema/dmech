<template>
  <q-select
    v-if="perfil !== 'Admin-Escola'"
    :options="options"
    option-label="name"
    label="Selecione o nivel de acesso"
    v-bind="{ ...inputConfig }"
    lazy-roles
    :roles="[(val) => !!val || 'Selecione um nível de acesso']"
  />
  <q-select
    v-else
    :options="options2"
    option-label="name"
    label="Selecione o nivel de acesso"
    v-bind="{ ...inputConfig }"
    lazy-roles
    :roles="[(val) => !!val || 'Selecione um nível de acesso']"
  />
</template>
<script>
import { inputConfig } from "src/utils/inputVisual";
import { ref } from "vue";
export default {
  props: {
    emailAccess: {
      type: String,
      require: true,
    },
    perfil: { type: String, required: true },
  },

  setup() {
    const options = ref([
      "Secretaria-DME",
      "RH-DME",
      "Docente",
      "Estudante",
      "Encarregado",
    ]);

    const options2 = ref(["Docente", "Estudante", "Encarregado"]);

    return { options, inputConfig, options2 };
  },
};
</script>
