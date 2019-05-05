import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import { library } from "@fortawesome/fontawesome-svg-core";
<<<<<<< HEAD
import { faUser, faShoppingCart, faTimes, faPencilAlt, faTrashAlt, faPlus, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
=======
import {
  faUser,
  faShoppingCart,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
>>>>>>> af5e91166634d3634098c3934890cfd0165da4fb
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
