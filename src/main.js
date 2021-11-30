import { createApp } from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar';
import router from "./router";
import "./assets/tailwind.css";

createApp(App)
    .use(router)
    .use(VCalendar, {})
    .mount("#app");