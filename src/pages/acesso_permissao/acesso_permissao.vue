<template>
  <q-layout>
    <q-separator />
    <list-user />
  </q-layout>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import listUser from "./listUser.vue";
export default {
  name: "Acesso-Permissao",
  components: { listUser },
  setup() {
    return {};
  },
};
</script>
