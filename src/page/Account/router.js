import indexView from "./index.vue";
import account from "./views/account.vue";

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
];

export default routes;
