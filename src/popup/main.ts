import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import createPiniaPlugin from "../stores/deploy/createPinia";

const app = createApp(App)
createPiniaPlugin(app);
app.mount("#app");
