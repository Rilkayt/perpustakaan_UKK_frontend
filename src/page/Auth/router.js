import indexView from "./index.vue";
import login from "./views/login.vue";
import register from "./views/register.vue";
import otpRegister from "./views/otpRegister.vue";
import forgetPassword from "./views/forgetPassword.vue";
import otpForgetPassword from "./views/otpForgetPassword.vue";
import formForgetPassword from "./views/formForgetPassword.vue";
import welcome from "./views/welcome.vue";

const routes = [
  {
    path: "/",
    component: indexView,
    children: [
      {
        path: "masuk",
        component: login,
        name: "login",
        meta: {
          requiredAuth: false,
        },
      },
      {
        path: "daftar",
        component: register,
        name: "register",
        meta: {
          requiredAuth: false,
        },
      },
      {
        path: "otp-daftar",
        component: otpRegister,
        name: "otpRegister",
        meta: {
          requiredAuth: false,
        },
      },
      {
        path: "lupa-kata-sandi",
        component: forgetPassword,
        name: "forgetPassword",
        meta: {
          requiredAuth: false,
        },
      },
      {
        path: "otp-lupa-kata-sandi",
        component: otpForgetPassword,
        name: "otpForgetPassword",
        meta: {
          requiredAuth: false,
        },
      },
      {
        path: "form-lupa-kata-sandi",
        component: formForgetPassword,
        name: "formForgetPassword",
        meta: {
          requiredAuth: false,
        },
      },
    ],
  },
  {
    path: "/",
    component: indexView,
    children: [
      {
        path: "selamat-datang",
        component: welcome,
        name: "welcome",
        meta: {
          requiredAuth: false,
        },
      },
    ],
  },
];

export default routes;
