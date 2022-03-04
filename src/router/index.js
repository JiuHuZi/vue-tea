import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My.vue')
  },
  {
    path: '/search',
    name: 'Search',
    children: [
      { path: '/', name: 'index', component: () => import('@/views/Search/Search-index.vue') },
      { path: 'slist', name: 'slist', component: () => import('@/views/Search/Search-list.vue') }
    ],
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {
      keepAlive: true // 此组件需要被缓存
    },
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/userlogin',
    name: 'UserLogin',
    component: () => import('@/views/Login/UserLogin.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Login/Register.vue')
  },
  {
    path: '/recovery',
    name: 'Recovery',
    children: [
      { path: '/', name: 'recoveryindex', component: () => import('@/views/Recovery/recoveryIndex.vue') },
      { path: 'btn', name: 'btn', component: () => import('@/views/Recovery/RecoveryBtn.vue') }
    ],
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/path',
    name: 'Path',
    children: [
      { path: '/', name: 'pathindex', component: () => import('@/views/Path/PathIndex.vue') },
      { path: 'pathlist', name: 'pathlist', component: () => import('@/views/Path/PathList.vue') }
    ],
    component: () => import('@/views/Path.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
