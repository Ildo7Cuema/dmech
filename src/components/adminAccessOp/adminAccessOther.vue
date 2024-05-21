<template>
  <q-select
    :options="options"
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
  },

  setup() {
    const options = ref([
      "Secretaria-DME",
      "RH-DME",
      "Docente",
      "Estudante",
      "Encarregado",
    ]);

    return { options, inputConfig };
  },
};
</script>
