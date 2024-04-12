const mutations = {
  addListBook: (state, payload) => {
    state.listBook = state.listBook.concat(payload);
  },
};

export default mutations;
