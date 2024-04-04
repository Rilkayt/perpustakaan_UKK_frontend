import api from "../../../api";

const actions = {
  // CALL API
  loginStart: async ({ commit }, data) => {
    let response = await api
      .post("/login", data, false)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
  getSchool: async ({ commit }) => {
    let response = await api
      .get("/register/school", false)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return response;
  },
  checkUserRegister: async ({ commit }, data) => {
    let response = await api
      .post("/register/check-user", data, false)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return response;
  },
  registerStart: async ({ commit }, data) => {
    let response = await api
      .post("/register", data, false)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return response;
  },
  sendOtp: async ({ commit }, data) => {
    let response = await api
      .post("/register/send-otp", data, false)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return response;
  },
  checkEmail: async ({ commit }, email) => {
    let response = await api
      .get(`/login/check-email/${email}`, false)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
  sendOtpForgetPassword: async ({ commit }, email) => {
    let response = await api
      .get(`/login/send-otp-forget-password/${email}`, false)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
  checkOtpForgetPassword: async ({ commit }, otp) => {
    let response = await api
      .get(`/login/checkOtpForget/${otp}`, false)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
  changePasswordStart: async ({ commit }, data) => {
    if (data.otp == "") {
      return "otp tidak ada";
    }
    let response = api
      .put(
        `/login/change-password/${data.email}`,
        { password: data.password },
        false
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return response;
  },
};

export default actions;
