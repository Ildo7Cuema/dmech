<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import userAuthUser from "./composible/userAuthUser";
export default defineComponent({
  name: "App",

  setup() {
    const { isLoggidIn } = userAuthUser();
    const router = useRouter();
    onMounted(() => {
      if (isLoggidIn) {
        router.push({ name: "admin" });
      }
    });

    return {};
  },
});
</script>
src/boot/supabase
