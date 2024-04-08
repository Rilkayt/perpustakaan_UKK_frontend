import indexView from "./index.vue";
import listNotYet from "./views/listNotYet.vue";
import listNotYetBack from "./views/listNotYetBack.vue";

const routes = [
  {
    path: "/daftar-pinjam",
    component: indexView,
    children: [
      {
        path: "belum-diambil",
        component: listNotYet,
        name: "listNotYet",
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: "belum-dikembalikan",
        component: listNotYetBack,
        name: "listNotYetBack",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
];

export default routes;
