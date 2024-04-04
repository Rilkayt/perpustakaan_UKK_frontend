import indexView from "./index.vue";
import listBooks from "./views/listBooks.vue";

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
    ],
  },
];

export default routes;
