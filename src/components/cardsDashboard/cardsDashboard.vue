<template>
  <q-card class="my-card" bordered>
    <q-skeleton v-if="loading" height="50px" />
    <q-card-section horizontal v-else>
      <div class="col flex flex-center text-body1 text-h6">
        {{ count }} - {{ label }}
      </div>
      <q-card-actions vertical class="justify-around q-px-md">
        <q-btn flat :color="color" :icon="icon" />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import userApi from "src/composible/userApi";
import userAuthUser from "src/composible/userAuthUser";
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: "mdi-database-outline",
    },
    tabela: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: "red",
    },
  },
  name: "cardsDashboard",
  setup(props) {
    const { fetchCount } = userApi();
    const { user } = userAuthUser();
    const count = ref(0);
    const loading = ref(false);

    onMounted(async () => {
      try {
        loading.value = true;
        const response = await fetchCount(props.tabela, user.value.id);
        count.value = response.count;
      } catch (error) {
      } finally {
        loading.value = false;
      }
    });
    return { count, loading };
  },
};
</script>
