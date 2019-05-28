import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

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
      path: "/createstore",
      component: () => import("./views/CreateStore.vue")
    },
    {
      path: "/account",
      component: () => import("./views/AccountPage.vue"),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account/updateInformation",
      component: () => import("./views/UpdateAccount.vue"),
      meta: {
        requiresAuth: true
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
      component: () => import("./views/AddressBook.vue")
    },

    {
      path: "/account/reviews",
      component: () => import("./views/ReviewHistory.vue")
    },

    {
      path: "/account/manageStore",
      component: () => import("./views/AccountStoreOwner.vue")
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
      path: '/product',
      component: ()=>import('./views/ProductPage.vue')
    },

    { path: '*', component: ()=> import('./views/NotFound.vue') },  

    { path: "*", redirect: "/404" },

    {
      path: "/helpCenter",
      name: "Help Center",
      component: () => import("./views/HelpCenter.vue"),
      beforeEnter: (to, from, next) => {
        console.log("beforeEnter called");
        let usercookie = window.$cookies.get("testcookie");
        if (usercookie == "loggedin") {
          console.log("success. going to help center");
          next();
        } else {
          next("/testComponents");
        }
      }
    },

    {
      path: "/products/store/:storename",
      component: () => import("./views/StoreFront.vue")
    },

    {
      path: "/products/item/:specificProduct",
      component: () => import("./views/SpecificProduct.vue")
    },

    {
      path: "/testComponents",
      name: "testComponents",
      component: () => import("./views/TestComponents.vue")
    },

    {
      path: "/postFormTest",
      name: "postFormTest",
      component: () => import("./components/PostProductForm.vue")
    }
  ]
});
