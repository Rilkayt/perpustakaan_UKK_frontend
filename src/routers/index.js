import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

import Auth from "../page/Auth";
import Dashboard from "../page/Dashboard";

const routes = [
  {
    path: "",
    component: App,
    children: [...Auth.router, ...Dashboard.router],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
