import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import VueJwtDecode from "vue-jwt-decode";
import { jwtDecode } from "jwt-decode";

import Auth from "../page/Auth";
import Dashboard from "../page/Dashboard";
import Books from "../page/Books";
import Borrow from "../page/Borrow";
import Category from "../page/Category";
import Account from "../page/Account";

const routes = [
  {
    path: "",
    component: App,
    children: [
      ...Auth.router,
      ...Dashboard.router,
      ...Books.router,
      ...Borrow.router,
      ...Category.router,
      ...Account.router,
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  // console.log("halo bang ilham");
  // console.log(to.meta.requiredAuth);
  if (to.meta.requiredAuth) {
    console.log(to.meta.requiredAuth);
    const dataAuth = JSON.parse(localStorage.getItem("token"));
    let timeNow = new Date().getTime();
    if (dataAuth !== null && dataAuth.expired > timeNow) {
      // console.log(dataAuth !== null && dataAuth.expired > timeNow);
      next();
    } else {
      localStorage.removeItem("token");
      window.location.href = "/masuk";
    }
  } else if (!to.meta.requiredAuth) {
    const dataAuth = JSON.parse(localStorage.getItem("token"));
    let timeNow = new Date().getTime();
    if (dataAuth !== null && dataAuth.expired < timeNow) {
      localStorage.removeItem("token");
      next();
    } else if (dataAuth !== null && dataAuth.expired > timeNow) {
      next("/beranda");
    } else {
      next();
    }
  }
});
export default router;
