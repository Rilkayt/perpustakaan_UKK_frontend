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
};

export default actions;
