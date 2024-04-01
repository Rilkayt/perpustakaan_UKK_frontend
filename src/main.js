import { createApp } from "vue";
import "./style.css";
import router from "./routers";
import store from "./stores";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faHouseChimney,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash, faArrowLeft, faStarOfLife, faHouseChimney);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast, { POSITION: POSITION.TOP_RIGHT, timeout: 3000 });
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");