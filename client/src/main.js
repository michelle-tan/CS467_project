import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';

import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faShoppingCart, faTimes, faPencilAlt, faTrashAlt, faPlus, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes);
library.add(faUser);
library.add(faShoppingCart);
library.add(faPencilAlt)
library.add(faTrashAlt)
library.add(faPlus)
library.add(faStar)
library.add(farStar) // far is the empty version of the star icon
library.add(faStarHalfAlt)
axios.defaults.withCredentials = true
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");


/*
render: h => h(App) is shorthand for: 

render: function (createElement) {
  return createElement(App);
}
*/
