import api from "../../../api";

const actions = {
  // CALL API
  loginStart: async ({ commit }, data) => {
    let response = await api
      .post("/login", data)
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
