import indexView from "./index.vue";
import dashboardPage from "./views/dashboard.vue";

const routes = [
  {
    path: "/beranda",
    component: indexView,
    children: [
      {
        path: "",
        component: dashboardPage,
        name: "dashboardPage",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
];

export default routes;
