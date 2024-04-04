import { createStore } from "vuex";

// store in page
import Auth from "../page/Auth";
import Dashboard from "../page/Dashboard";
import Books from "../page/Books";

const store = createStore({
  modules: {
    Auth: Auth.stores,
    Dashboard: Dashboard.stores,
    Books: Books.stores,
  },
});

export default store;
