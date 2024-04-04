import { createApp } from "vue";
import "./style.css";
import router from "./routers";
import store from "./stores";
import App from "./App.vue";
import moment from "moment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleUp,
  faArrowLeft,
  faBars,
  faBook,
  faBoxArchive,
  faChartLine,
  faCircleCheck,
  faCircleInfo,
  faCircleMinus,
  faClock,
  faFile,
  faHouseChimney,
  faInfo,
  faList,
  faStar,
  faStarOfLife,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEye,
  faEyeSlash,
  faArrowLeft,
  faStarOfLife,
  faHouseChimney,
  faBook,
  faBoxArchive,
  faAngleDown,
  faAngleUp,
  faCircleMinus,
  faCircleCheck,
  faClock,
  faList,
  faChartLine,
  faBars,
  faXmark,
  faCircleInfo,
  faInfo,
  faStar,
  faFile
);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast, { POSITION: POSITION.TOP_RIGHT, timeout: 3000 });
app.use(moment);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
