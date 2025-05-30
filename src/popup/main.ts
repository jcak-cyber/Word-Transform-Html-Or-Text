import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import createPiniaPlugin from "../utils/pinia";

const app = createApp(App)
createPiniaPlugin(app);
app.mount("#app");
