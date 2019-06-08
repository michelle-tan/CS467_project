import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* method that will authenticate the user before routing to certain pages */
function getLoginStatus() {
  let usercookie = window.$cookies.get("loginToken");
  if (usercookie == "loggedin") {
    console.log(usercookie);
    return true;
  } else {
    console.log("got false");
    console.log(usercookie);
    return false;
  }
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    {
      path: "/",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/createstore",
      component: () => import("./views/CreateStore.vue")
    },
    {
      path: "/account",
      component: () => import("./views/AccountPage.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        getLoginStatus() ? next() : next("/unauthorized");
      }
    },
    {
      path: "/account/updateInformation",
      component: () => import("./views/UpdateAccount.vue"),
      beforeEnter: (to, from, next) => {
        getLoginStatus() ? next() : next("/unauthorized");
      }
    },

    {
      path: "/account/orders",
      component: () => import("./views/OrderHistory.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          component: () => import("./components/OrderList.vue"),
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: ":id",
          component: () => import("./components/OrderDisplay.vue"),
          props: true,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },

    {
      path: "/account/addressBook",
      component: () => import("./views/AddressBook.vue"),
      beforeEnter: (to, from, next) => {
        getLoginStatus() ? next() : next("/unauthorized");
      }
    },

    {
      path: "/account/reviews",
      component: () => import("./views/ReviewHistory.vue"),
      beforeEnter: (to, from, next) => {
        getLoginStatus() ? next() : next("/unauthorized");
      }
    },

    {
      path: "/account/manageStore",
      component: () => import("./views/AccountStoreOwner.vue"),
      beforeEnter: (to, from, next) => {
        getLoginStatus() ? next() : next("/unauthorized");
      }
    },

    {
      path: "/cart",
      component: () => import("./views/Cart.vue")
    },

    {
      path: "/checkout",
      component: () => import("./views/Checkout.vue")
    },

    {
      path: "/product",
      component: () => import("./views/ProductPage.vue")
    },

    { path: "*", component: () => import("./views/NotFound.vue") },

    { path: "*", redirect: "/404" },

    {
      path: "/unauthorized",
      component: () => import("./views/NotAuth.vue")
    },

    {
      path: "/helpCenter",
      name: "Help Center",
      component: () => import("./views/HelpCenter.vue")
    },

    {
      path: "/products/store/:storename",
      component: () => import("./views/StoreFront.vue")
    },

    {
      path: "/products/item/:productid",
      component: () => import("./views/SpecificProduct.vue")
    },

    {
      path: "/products/searchResults",
      component: () => import("./views/ProductSearch.vue"),
      props: true
    },

    {
      path: "/testComponents",
      name: "testComponents",
      component: () => import("./views/TestComponents.vue")
    }
  ]
});
