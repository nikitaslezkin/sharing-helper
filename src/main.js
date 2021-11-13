import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from "./store/index.js";
import utils from "./plugins/utils";
import vuetify from './plugins/vuetify'
import router from './router/index'
import {axios} from './plugins/http-axios';
import moment from 'moment';
import '@mdi/font/css/materialdesignicons.css'
import YmapPlugin from 'vue-yandex-maps'

Vue.use(Vuex)

const settings = {
    apiKey: '',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}

Vue.use(YmapPlugin, settings)

Vue.prototype.$moment = moment;
Vue.prototype.$utils = utils;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
    store,
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
