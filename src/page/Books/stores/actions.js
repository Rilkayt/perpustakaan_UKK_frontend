import api from "../../../api";

const actions = {
  // CALL API
  getListBook: async () => {
    return await api
      .get("/get-data/books?skip=0&take=20", true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  deleteBookStart: async ({ commit }, uuidBook) => {
    console.log(uuidBook);
    return await api
      .del(`/books/delete-book/${uuidBook}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default actions;
