import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.

    {
        path: '/',
        component: () => import('./views/Home.vue')
      },
    {
      path: '/account',
      component: () => import('./views/AccountPage.vue'),
      props: true,
      
    },
    {
      path: '/account/updateInformation',
      component: ()=> import('./views/UpdateAccount.vue')
    },

    {
      path: '/account/orders',
      component: ()=>import('./views/OrderHistory.vue'),
      children:[
        {
          path: '',
          component: ()=>import('./components/OrderList.vue'),
          props: true
        },
        {
          path: ':id',
          component: ()=>import('./components/OrderDisplay.vue'),
          props: true
        }
      ]
    },


    {
      path: '/account/addressBook',
      component: ()=>import('./views/AddressBook.vue')
    },
    // if no matching route, redirect to 404, which is rendered by the NotFound.vue
  

    { path: '*', component: ()=> import('./views/NotFound.vue') },  

  ]
})
