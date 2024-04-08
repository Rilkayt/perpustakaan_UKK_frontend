import indexView from "./index.vue";
import listBooks from "./views/listBooks.vue";
import addBook from "./views/addBook.vue";
import detailBook from "./views/detailBook.vue";

const routes = [
  {
    path: "/buku",
    component: indexView,
    children: [
      {
        path: "",
        component: listBooks,
        name: "listBooks",
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: "tambah-buku",
        component: addBook,
        name: "addBook",
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: "detail-buku/:idBuku",
        component: detailBook,
        name: "detailBook",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
];

export default routes;
