<!-- TODO
    
    * make search bar work
    * uncomplicate registration form
-->

<template>
  <b-navbar toggleable="sm" type="dark" variant="info">
    <b-navbar-toggle class="order-1 mr-4 toggle" target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand class="order-2" @click.native="collapseIsVisible = false" to="/">Kuma</b-navbar-brand>

    <b-collapse class="order-4 order-sm-3" id="nav-collapse" is-nav v-model="collapseIsVisible">
      <hr>
      <!-- Searchbar -->
      <b-navbar-nav>
        <b-nav-form>
          <b-input-group>
            <!-- v-show is because it seems that there's lag when closing the collapse and opening the drawer-->
            <b-form-input
              @keydown.native="handleSearch"
              placeholder="Search (comma separated)"
              v-model="searchString"
            />
            <b-input-group-append>
              <b-button>
                <font-awesome-icon @click="handleSearch" icon="search"/>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-nav-form>

        <!-- Links -->
        <b-navbar-nav class="my-auto">
          <b-nav-item to="/about">About Kuma</b-nav-item>
          <b-nav-item to="/createstore" @click.native="collapseIsVisible = false">Sell on Kuma</b-nav-item>
        </b-navbar-nav>

        <!-- Account Info Dropdown -->
        <b-nav-item-dropdown v-if="sessionData.loggedIn" right>
          <template slot="button-content">
            <font-awesome-icon icon="user"/>
            <span>{{sessionData.userinfo.username}}</span>
          </template>
          <b-dropdown-item to="/account">Account</b-dropdown-item>
          <b-dropdown-item to="#" @click.prevent="logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>

        <!-- Login / Signup button and modal (render if not logged in) -->
        <div v-else>
          <b-button class="my-2" v-b-modal.authModal>
            <font-awesome-icon icon="user"/>Log In / Sign Up
          </b-button>
          <b-modal id="authModal" centered v-model="showModal">
            <!--Modal title changes whether logging in or registering -->
            <div v-if="showingLoginForm" slot="modal-title">
              Log In or
              <b-link @click.prevent="toggleForm">Register</b-link>
            </div>
            <div v-else slot="modal-title">
              <b-link @click.prevent="toggleForm">Log In</b-link>or Register
            </div>

            <!-- Version of UserInfoForm shown is bound to value of this.showingLoginForm -->
            <LoginForm
              v-show="showingLoginForm"
              @logged-in="propagateUpdateSessionData"
              :showFailure="!showModal"
              :sessionData="sessionData"
            />

            <RegistrationForm
              v-show="!showingLoginForm"
              @logged-in="propagateUpdateSessionData"
              :showFailure="!showModal"
              :sessionData="sessionData"
            />

            <!-- removes default buttons from modal -->
            <div slot="modal-footer"/>
          </b-modal>
        </div>
      </b-navbar-nav>
    </b-collapse>

    <!--- CART -->
    <b-navbar-nav class="order-3 order-sm-4">
      <b-button @click="showCartDrawer=true; collapseIsVisible = false" style="margin-left:5px">
        <font-awesome-icon icon="shopping-cart"/>
        <span>Cart</span>
        <span v-if="sessionData.cart.length">( {{ sessionData.cart.length }} )</span>
      </b-button>
      <div class="sidebar sidebar-left sidebar-animate" :style="drawerWidth">
        <div class="text-center h3">Your Cart:</div>
        <hr>

        <font-awesome-icon
          v-show="showCartDrawer"
          icon="times"
          class="closebtn"
          @click="showCartDrawer=false"
        />
        <div class="d-flex flex-column" style="padding:5px" justify-items-center>
          <ShoppingCart :cart="sessionData.cart" @deleteCartItem="propagateUpdateSessionData"/>
          <hr>
          <PriceSummary ref="priceSummary" subtotalOnly :cart="sessionData.cart"/>
          <b-button @click="showCartDrawer=false" to="/cart">View Cart and Checkout</b-button>
        </div>
      </div>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import RegistrationForm from "./RegistrationForm.vue";
import ShoppingCart from "./ShoppingCart.vue";
import Axios from "axios";
import PriceSummary from "./PriceSummary";

export default {
  components: {
    LoginForm,
    RegistrationForm,
    ShoppingCart,
    PriceSummary
  },

  props: {
    sessionData: Object
  },

  data: () => {
    return {
      showModal: false,
      showingLoginForm: true,
      searchString: "",
      collapseIsVisible: false,
      serachArray: [],
      showCartDrawer: false
    };
  },

  methods: {
    toggleForm() {
      if (this.showingLoginForm) {
        this.showingLoginForm = false;
      } else {
        this.showingLoginForm = true;
      }
    },
    handleSearch(event) {
      //if keydown was enterkey
      if (event.which === 13 && this.searchString !== "") {
        event.preventDefault();
        // seems this encodes the querystring VV
        // TODO update the path here
        //this.$router.push("/?search=" + this.searchString);
        //console.log("Enter was hit");
        this.serachArray = this.searchString.split(", ");

        this.$router.push({
          path: `/products/searchResults`,
          query: { tagArray: this.serachArray }
        });

        this.searchString = "";
      } else if (event.which === 13 && this.searchString === "") {
        // do nothing
        event.preventDefault();
      }
    },
    logout: function() {
      Axios({
        method: "Get",
        url: this.$hostname + "/logout"
      })
        .then(response => {
          if (response.status === 200) {
            this.sessionData.loggedIn = false;
            this.$cookies.remove("loginToken");
            this.info = response;
            this.$router.push("/");
            this.$emit("update:sessionData", {
              cart: [],
              userinfo: {
                username: null,
                firstName: null,
                lastName: null,
                email: null,
                isSeller: false,
                user_id: null,
                storesOwned: [],
                profileimage: null
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // use this to propagate changes up to App
    propagateUpdateSessionData(value) {
      console.log(value);
      this.showModal = false;
      this.$emit("update:sessionData", value);
    }
  },

  computed: {
    calcSubtotal() {
      var subtotal = 0;
      for (var item in this.sessionData.cart) {
        subtotal +=
          this.sessionData.cart[item].price * this.sessionData.cart[item].qty;
      }
      return subtotal.toFixed(2);
    },
    drawerWidth() {
      if (this.showCartDrawer) {
        return "right:0";
      } else return "right:-300px";
    }
  }
};
</script>

<style>
.cart-dropdown {
  width: 21rem;
}

.sidebar {
  height: 100%; /* 100% Full-height */
  position: fixed; /* Stay in place */
  width: 300px;
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  background-color: whitesmoke; /* Black*/

  padding-top: 20px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

.sidebar .closebtn {
  position: inherit;
  top: 1em;
  right: 2em;
}

@media only screen and (max-width: 600px) {
  .hideOnSmallScreen {
    visibility: hidden;
  }
}
</style>

