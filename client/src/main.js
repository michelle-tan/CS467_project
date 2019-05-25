import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueCookies from "vue-cookies";

// bootstrap
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faShoppingCart,
  faTimes,
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faStar,
  faStarHalfAlt,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes);
library.add(faUser);
library.add(faShoppingCart);
library.add(faPencilAlt);
library.add(faTrashAlt);
library.add(faPlus);
library.add(faStar);
library.add(farStar); // far is the empty version of the star icon
library.add(faStarHalfAlt);
library.add(faMapMarkerAlt);
axios.defaults.withCredentials = true;
Vue.component("font-awesome-icon", FontAwesomeIcon);

// vue.use
Vue.use(BootstrapVue);
Vue.use(VueCookies);
Vue.config.productionTip = false;

// define this.$hostname in one place for testing/production
Object.defineProperty(Vue.prototype, "$hostname", {
  value: "http://localhost:3000"
});

// The vue instance
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
