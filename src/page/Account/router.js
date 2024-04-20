import indexView from "./index.vue";
import account from "./views/account.vue";
import listEmployee from "./views/listEmployee.vue";
import listModerator from "./views/listModerator.vue";

const routes = [
  {
    path: "/akun",
    component: indexView,
    children: [
      {
        path: "",
        component: account,
        name: "account",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
  {
    path: "/moderator",
    component: indexView,
    children: [
      {
        path: "",
        component: listModerator,
        name: "listModerator",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
  {
    path: "/petugas",
    component: indexView,
    children: [
      {
        path: "",
        component: listEmployee,
        name: "listEmployee",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
];

export default routes;
