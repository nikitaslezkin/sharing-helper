import Vue from 'vue';
import Vuex from 'vuex';
import account from "./modules/account";
import order from "./modules/order";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        order
    }
});
