import api from "../../../api";

const actions = {
  // CALL API
  getCategory: async ({ commit }) => {
    return await api
      .get(`/category`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  addCategory: async ({ commit }, data) => {
    return await api
      .post("/category/add-category-book", data, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  deleteCategory: async ({ commit }, data) => {
    return await api
      .del(`/category/delete-category-book/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getDataByIdCategory: async ({ commit }, data) => {
    return await api
      .get(`/category/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  deleteBookInCategory: async ({ commit }, data) => {
    return await api
      .del(`/category/delete-book-from-category/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getBookToAddCategory: async ({ commit }, idCategory) => {
    return await api
      .get(`/category/list-book-not-in-category/${idCategory}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  addBookInCategory: async ({ commit }, data) => {
    return await api
      .post(`/category/add-category-book/${data.idBook}/${data.idCategory}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  searchCategory: async ({ commit }, data) => {
    return await api
      .get(`/get-data/search/kategori/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default actions;
