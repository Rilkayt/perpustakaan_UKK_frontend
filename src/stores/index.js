import { createStore } from "vuex";

// store in page
import Auth from "../page/Auth";
import Dashboard from "../page/Dashboard";

const store = createStore({
  modules: {
    Auth: Auth.stores,
    Dashboard: Dashboard.stores,
  },
});

export default store;
