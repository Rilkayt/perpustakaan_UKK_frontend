import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

import Auth from "../page/Auth";

const routes = [
  {
    path: "",
    component: App,
    children: [...Auth.router],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
