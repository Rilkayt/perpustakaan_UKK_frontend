import indexView from "./index.vue";
import login from "./views/login.vue";
import register from "./views/register.vue";
import otpRegister from "./views/otpRegister.vue";

const routes = [
  {
    path: "/",
    component: indexView,
    children: [
      {
        path: "masuk",
        component: login,
        name: "login",
      },
      {
        path: "daftar",
        component: register,
        name: "register",
      },
      {
        path: "otp-register",
        component: otpRegister,
        name: "otpRegister",
      },
    ],
  },
];

export default routes;
