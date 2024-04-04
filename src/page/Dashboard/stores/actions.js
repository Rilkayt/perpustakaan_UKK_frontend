import api from "../../../api";

const actions = {
  // CALL API
  getDashboard: async ({ commit }) => {
    return await api
      .get("/get-data/dashboard", true)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default actions;
