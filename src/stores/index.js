import { createStore } from "vuex";

// store in page
import Auth from "../page/Auth";

const store = createStore({
  modules: {
    Auth: Auth.stores,
  },
});

export default store;
