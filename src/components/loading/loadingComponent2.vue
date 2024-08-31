<template>
  <div></div>
</template>

<script>
import { useQuasar } from "quasar";
import { onBeforeUnmount, watch, onMounted } from "vue";

export default {
  props: {
    load: { type: Boolean, required: true },
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
      () => props.load,
      (newValue) => {
        showMultipleGroups();
      }
    );

    const showMultipleGroups = () => {
      const first = $q.loading.show({
        group: "first",
        message: "Carregando informações do I trimestre...",
        spinnerColor: "amber",
        messageColor: "amber",
      });

      // hiding in 2s
      timer = setTimeout(() => {
        const second = $q.loading.show({
          group: "second",
          message: "Carregando informações do II trimestre...",
        });

        timer = setTimeout(() => {
          // we hide second one (only); but we will still have the first one active
          second();

          // we update 'first' group message (just highlighting how it can be done);
          // note that updating here is not required to show the remaining 'first' group
          first({
            message: "dados carregados...",
          });

          timer = setTimeout(() => {
            // we hide all that may be showing
            $q.loading.hide();
            timer = void 0;
          }, 2000);
        }, 2000);
      }, 1500);
    };

    return {};
  },
};
</script>
