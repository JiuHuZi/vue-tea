import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '九狐茶叶商城'
    }
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
    component: () => import('@/views/My/Path.vue')
  },
  {
    path: '/order',
    name: 'Order',
    meta: {
      keepAlive: true // 此组件需要被缓存
    },
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/Payment.vue')
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('@/views/My/Wallet.vue')
  },
  {
    path: '/topUp',
    name: 'Topup',
    component: () => import('@/views/Topup.vue')
  },
  {
    path: '/start',
    name: 'Start',
    component: () => import('@/views/My/Start.vue')
  },
  {
    path: '/integral',
    name: 'Integral',
    component: () => import('@/views/Integral.vue')
  },
  {
    path: '/integralDetail',
    name: 'IntegralDetail',
    meta: {
      keepAlive: true // 此组件需要被缓存
    },
    component: () => import('@/views/Integral/Detail.vue')
  },
  {
    path: '/integralOrder',
    name: 'IntegralOrder',
    meta: {
      keepAlive: true // 此组件需要被缓存
    },
    component: () => import('@/views/Integral/Order.vue')
  },
  {
    path: '/successExchange',
    name: 'successExchange',
    component: () => import('@/views/exchangeResult.vue')
  },
  {
    path: '/editPassword',
    name: 'EditPassword',
    component: () => import('@/views/My/Edit.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/My/Setting.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/My/History.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let nextRoute = ['Payment', 'Cart', 'Path', 'Order', 'pathindex', 'pathlist']
  // 是否是登录中
  let userInfo = JSON.parse(localStorage.getItem('teauserInfo'))

  // 当前进入的页面是不是需要验证的页面
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!userInfo) {
      router.push('/login')
    }
  }
  next()
})

export default router
