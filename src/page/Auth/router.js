import indexView from "./index.vue";
import login from "./views/login.vue";
import register from "./views/register.vue";
import otpRegister from "./views/otpRegister.vue";
import forgetPassword from "./views/forgetPassword.vue";
import otpForgetPassword from "./views/otpForgetPassword.vue";
import formForgetPassword from "./views/formForgetPassword.vue";

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
        path: "otp-daftar",
        component: otpRegister,
        name: "otpRegister",
      },
      {
        path: "lupa-kata-sandi",
        component: forgetPassword,
        name: "forgetPassword",
      },
      {
        path: "otp-lupa-kata-sandi",
        component: otpForgetPassword,
        name: "otpForgetPassword",
      },
      {
        path: "form-lupa-kata-sandi",
        component: formForgetPassword,
        name: "formForgetPassword",
      },
    ],
  },
];

export default routes;
