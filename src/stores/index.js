import { createStore } from "vuex";

// store in page
import Auth from "../page/Auth";
import Dashboard from "../page/Dashboard";
import Books from "../page/Books";
import Borrow from "../page/Borrow";
import Category from "../page/Category";

const store = createStore({
  modules: {
    Auth: Auth.stores,
    Dashboard: Dashboard.stores,
    Books: Books.stores,
    Borrow: Borrow.stores,
    Category: Category.stores,
  },
});

export default store;
