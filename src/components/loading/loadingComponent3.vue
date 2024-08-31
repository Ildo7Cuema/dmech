<template>
  <div></div>
</template>

<script>
import { useQuasar } from "quasar";
import { onBeforeUnmount, watch, onMounted } from "vue";

export default {
  props: {
    loadShowPrint: { type: Boolean, required: true },
  },
  setup(props) {
    const $q = useQuasar();
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    watch(
      () => props.loadShowPrint,
      (newValue) => {
        console.log("newValue", newValue);
        showLoading();
      }
    );

    const showLoading = () => {
      $q.loading.show({
        message: "Carregando o modo de impressão. Por favor aguarde...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });

      // hiding in 3s
      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 3000);
    };

    return {};
  },
};
</script>
