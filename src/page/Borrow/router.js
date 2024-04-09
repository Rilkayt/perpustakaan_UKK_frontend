import indexView from "./index.vue";
import listNotYet from "./views/listNotYet.vue";
import listNotYetBack from "./views/listNotYetBack.vue";
import listDoneBack from "./views/listDoneBack.vue";
import listBorrowInUser from "./views/listBorrowInUser.vue";

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
      {
        path: "sudah-dikembalikan",
        component: listDoneBack,
        name: "listDoneBack",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
  {
    path: "/peminjaman",
    component: listBorrowInUser,
    name: "listBorrowInUser",
    meta: {
      requiredAuth: true,
    },
  },
];

export default routes;
