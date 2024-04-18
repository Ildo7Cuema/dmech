import { createApp } from "vue";
import App from "src/App.vue";
import { inputConfig } from "src/utils/inputVisual.js";

const app = createApp(App);
app.config.globalProperties.$inputConfig = inputConfig;
