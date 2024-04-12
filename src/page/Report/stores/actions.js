import api from "../../../api";

const actions = {
  // CALL API
  getListLaporan: async ({ commit }) => {
    return await api
      .get("/report/list-data-report", true)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getDetail: async ({ commit }, data) => {
    return await api
      .get(`/report/in-mounth/${data.start}/${data.end}`, true)
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
