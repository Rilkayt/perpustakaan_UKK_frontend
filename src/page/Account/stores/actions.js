import api from "../../../api";

const actions = {
  // CALL API
  getAccount: async ({ commit }) => {
    return await api
      .get("/get-data/account", true)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updateImage: async ({ commit }, data) => {
    let formData = new FormData();
    formData.append("file", data);
    return await api
      .put("/account/update-image", formData, true, "formData")
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updateData: async ({ commit }, data) => {
    return await api
      .put(`/account/update-data-user`, data, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  sendOtpEmail: async ({ commit }, data) => {
    return await api
      .post(`/account/send-otp`, data, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  checkEmail: async ({ commit }, data) => {
    return await api
      .get(`/account/check-email/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updateEmail: async ({ commit }, data) => {
    return await api
      .put(`/account/update-email/${data.email}/${data.otp}`, {}, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  checkTelp: async ({ commit }, data) => {
    return await api
      .get(`/account/check-telp/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updateTelp: async ({ commit }, data) => {
    return await api
      .put(`/account/update-telp/${data}`, {}, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  checkPass: async ({ commit }, data) => {
    return await api
      .get(`/account/check-password/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  checkOtpPass: async ({ commit }, data) => {
    return await api
      .get(`/account/check-otp-password/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updatePass: async ({ commit }, data) => {
    return await api
      .put(`/account/update-password/${data}`, {}, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  addEmployee: async ({ commit }, data) => {
    return await api
      .post(`/register/add-employee/`, data, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getEmployee: async ({ commit }) => {
    return await api
      .get("/get-data/employee", true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updateEmployee: async ({ commit }, data) => {
    return await api
      .put(`/account/update-employee`, data, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  deleteEmployee: async ({ commit }, data) => {
    return await api
      .del(`/account/delete-employee/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  addModerator: async ({ commit }, data) => {
    return await api
      .post(`/register/add-moderator/`, data, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getModerator: async ({ commit }) => {
    return await api
      .get("/get-data/moderator", true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updateModerator: async ({ commit }, data) => {
    return await api
      .put(`/account/update-moderator`, data, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  deleteModerator: async ({ commit }, data) => {
    return await api
      .del(`/account/delete-moderator/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default actions;
