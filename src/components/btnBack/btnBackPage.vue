<template>
  <q-btn
    flat
    size="ms"
    dense
    icon="mdi-arrow-left"
    label="voltar"
    @click="backPage"
    color="primary"
    class="small-text"
  ></q-btn>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Page-Recursos-Humanos",
  setup() {
    const backPage = () => {
      window.history.back();
    };
    return {
      backPage,
    };
  },
});
</script>

<style scoped>
.small-text {
  font-size: 10px; /* Tamanho de fonte menor */
}
</style>
