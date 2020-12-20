import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import localConfig from "./plugins/config";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import RappidPlugin from '@/plugins/rappid'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/bootstrap.theme.min.css'

Vue.use(localConfig);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(RappidPlugin);
Vue.use(Vuelidate)

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

