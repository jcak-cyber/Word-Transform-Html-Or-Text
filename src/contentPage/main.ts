import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

export const insertContent = (id: string) => {
  const app = createApp(App);
  app.mount(`#${id}`);
};
