const mutations = {
  addDataRegister: (state, payload) => {
    state.dataRegister = payload;
  },
  deleteDataRegister: (state) => {
    state.dataRegister = {};
  },

  addEmailUser: (state, payload) => {
    state.emailUser = payload;
  },

  addOtpForget: (state, payload) => {
    state.otpForget = payload;
  },
};

export default mutations;
