import api from "../../../api";

const actions = {
  // CALL API
  getListBook: async ({ commit }, data) => {
    return await api
      .get(`/get-data/books?skip=${data.skip}&take=${data.take}`, true)
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
  getBookByIdInDetail: async ({ commit }, data) => {
    return await api
      .get(`/books/${data.idBook}/${data.idUser}`, true)
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
  addCollection: async ({ commit }, idBook) => {
    return await api
      .post(`/collection/add-collection/${idBook}`, {}, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  deleteCollection: async ({ commit }, idBook) => {
    return await api
      .del(`/collection/delete-collection/${idBook}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  addUlasan: async ({ commit }, data) => {
    let idBook = data.idBook;
    let dataUlasan = {
      pesan: data.message,
      rating: data.rating,
    };
    return await api
      .post(`/ulasan/add-ulasan/${idBook}/3`, dataUlasan, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getKoleksi: async ({ commit }, data) => {
    return await api
      .get(`/get-data/collections?skip=${data.skip}&take=${data.take}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  searchBook: async ({ commit }, data) => {
    return await api
      .get(`/get-data/search/buku/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  searchKoleksi: async ({ commit }, data) => {
    return await api
      .get(`/get-data/search/koleksi/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  filterBook: async ({ commit }, data) => {
    return await api
      .get(`/get-data/filter/buku/${data}`, true)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default actions;
