import { getCssVar } from "quasar";

const inputConfig = {
  color: getCssVar("primary"),
  filled: false,
  outlined: true,
  dense: true,
  rounded: false,
  "lazy-rules": true,
};

const btnConfig = {
  color: getCssVar("primary"),
  dense: true,
  flat: true,
  outlined: true,
  rounded: false,
  push: false,
  "no-caps": true,
  glossy: true,
};

export { inputConfig, btnConfig };
