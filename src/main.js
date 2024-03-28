import { createApp } from "vue";
import "./style.css";
import router from "./routers";
import store from "./stores";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faArrowLeft);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ToastPlugin);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
