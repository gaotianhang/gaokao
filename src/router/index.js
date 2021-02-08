import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Details from '@/components/Details'
import Collection from '@/components/Collection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    }, {
      path: '/Details/:id',
      name: 'Details',
      component: Details
    }, {
      path: '/Collection',
      name: 'Collection',
      component: Collection
    }
  ]
})
