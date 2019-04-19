import Vue from 'vue'
import App from './App.vue'

import router from "./router";

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes)
library.add(faUser);
library.add(faShoppingCart);

Vue.component("font-awesome-icon", FontAwesomeIcon);


Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


/*
render: h => h(App) is shorthand for: 

render: function (createElement) {
  return createElement(App);
}
*/
