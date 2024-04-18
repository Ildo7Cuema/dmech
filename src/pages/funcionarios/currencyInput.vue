<template>
  <q-input
    type="text"
    label="Vencimento Base"
    class="col-12"
    :rules="[(val) => !!val || 'Informe o salário base']"
    ref="inputRef"
  />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { btnConfig, inputConfig } from "src/utils/inputVisual";
import { watchDebounced } from "@vueuse/core";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number, // Vue 2: value
    options: Object,
  },
  setup(props, { emit }) {
    const { inputRef, numberValue } = useCurrencyInput(props.options, false);

    watchDebounced(
      numberValue,
      (value) => {
        console.log("Novo valor de numberValue:", value),
          emit("update:modelValue", value);
      },
      {
        debounce: 1000,
      }
    ); // Vue 2: emit('input', value)

    return { inputRef, inputConfig };
  },
};
</script>
