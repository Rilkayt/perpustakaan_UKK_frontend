import indexView from "./index.vue";
import seeCategory from "./views/seeCategory.vue";
import bookCategory from "./views/bookCategory.vue";
import addBookCategory from "./views/addBookInCategory.vue";

const routes = [
  {
    path: "/kategori",
    component: indexView,
    children: [
      {
        path: "",
        component: seeCategory,
        name: "seeCategory",
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: "detail/:id/:name",
        component: bookCategory,
        name: "bookCategory",
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: "tambah-buku-kategori/:idCategory/:nameCategory",
        component: addBookCategory,
        name: "addBookCategory",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
];

export default routes;
