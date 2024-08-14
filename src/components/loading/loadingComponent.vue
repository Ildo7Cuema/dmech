<template>
  <div class="q-pa-md"></div>
</template>

<script>
import { useQuasar } from "quasar";
import { onBeforeUnmount, watch } from "vue";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
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
      () => props.show,
      (newValue) => {
        showLoading();
      }
    );

    const showLoading = () => {
      $q.loading.show({
        message:
          'alguns dados importante estão em <b>progresso</b>.<br><span class="text-amber text-italic">Por favor aguarde...</span>',
        html: true,
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
