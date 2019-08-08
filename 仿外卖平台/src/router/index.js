import Vue from 'vue'
import Router from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/msite'},
    {path: '/msite',component: Msite,},
    {path: '/search', component: Search,},
    {path: '/order',component: Order,},
    {path: '/profile',component: Profile,},
    {path: '/login',component: Login,},
  ]
})
