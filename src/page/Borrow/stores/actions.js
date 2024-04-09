import api from "../../../api";

const actions = {
  // CALL API
  getListPinjam: async ({ commit }, data) => {
    return await api
      .get(
        `/get-data/borrow/${data.tipe}?skip=${data.skip}&take=${data.take}`,
        true
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  changeStatus: async ({ commit }, data) => {
    return await api
      .put(`/borrow/change-status/${data.idPinjam}/${data.tipe}`, {}, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getListRiwayatPinjam: async ({ commit }, data) => {
    return api
      .get(`/borrow/user-list?take=${data.take}&skip=${data.skip}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default actions;
