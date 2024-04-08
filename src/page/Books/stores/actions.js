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
  getBookById: async ({ commit }, idBook) => {
    return await api
      .get(`/books/${idBook}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getBookByIdAfterUpdate: async ({ commit }, idBook) => {
    return await api
      .get(`/books/${idBook}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  addOrUpdateCover: async ({ commit }, dataBook) => {
    console.log(dataBook);
    let formData = new FormData();
    formData.append("file", dataBook.file);
    console.log({ formData });
    return await api
      .put(
        `/books/add-book-cover/${dataBook.idBook}`,
        formData,
        true,
        "formData"
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  updateDataBook: async ({ commit }, { idBook, data }) => {
    return await api
      .put(`/books/update-book/${idBook}`, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  borrowBook: async ({ commit }, { idBook, data }) => {
    return await api
      .post(`/borrow/${idBook}`, data, true)
      .then((res) => {
        console.log("🚀 ~ returnawaitapi.post ~ res:", res);
        return res;
      })
      .catch((err) => {
        console.log("🚀 ~ returnawaitapi.post ~ err:", err);
        return err;
      });
  },
  uploadCsv: async ({ commit }, data) => {
    let formData = new FormData();
    formData.append("file", data);
    return await api
      .post("/books/add-book-data/csv", formData, true, "formData")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  addBook: async ({ commit }, data) => {
    return await api
      .post("/books/add-book-data", data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default actions;
