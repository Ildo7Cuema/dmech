<template>
  <div class="row text-center">
    <p class="text-body2 text-deep-purple">{{ title }}</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  props: {
    titulo: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const title = ref("");
    onMounted(() => {
      title.value = props.titulo;
    });
    return {
      title,
    };
  },
});
</script>
