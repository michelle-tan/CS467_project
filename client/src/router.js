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
        name: 'Home',
        component: () => import('./views/Home.vue')
      },
    {
      path: '/customerPage',
      name: 'Customer Page',
      component: () => import('./views/CustomerPage.vue')
    },
    

    // if no matching route, redirect to 404, which is rendered by the NotFound.vue
    {   
      path: '/404', 
      component: ()=> import('./views/NotFound.vue') 
    },  

    { path: '*', redirect: '/404' },  

  ]
})
