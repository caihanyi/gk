import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sign from '../views/Sign.vue'
import Login from '../components/Login.vue'
import Map from '../components/Map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Map',
    name: 'Map',
    component: Map
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
