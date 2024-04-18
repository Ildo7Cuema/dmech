import { boot } from "quasar/wrappers";
import { ToWords } from "to-words";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const toWords = new ToWords({
  localeCode: "pt-BR",
  converterOptions: {
    currency: false,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  },
});

export const toWordsKey = Symbol("toWords");
export default boot(async ({ app }) => {
  // something to do
  app.provide(toWordsKey, toWords);
});
