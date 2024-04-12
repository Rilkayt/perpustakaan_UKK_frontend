import indexView from "./index.vue";
import listReport from "./views/listReport.vue";
import detailReport from "./views/detailReport.vue";

const routes = [
  {
    path: "/laporan",
    component: indexView,
    children: [
      {
        path: "",
        component: listReport,
        name: "listReport",
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: ":dateStart/:dateEnd",
        component: detailReport,
        name: "detailReport",
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },
];

export default routes;
