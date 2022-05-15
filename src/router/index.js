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
      title: '九狐茶叶商城',
      keepAlive: true // 此组件需要被缓存
    }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/My.vue'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/search',
    name: 'Search',
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/Search/Search-index.vue'),
        meta: {
          title: '搜索'
        }
      },
      {
        path: 'slist',
        name: 'slist',
        component: () => import('@/views/Search/Search-list.vue'),
        meta: {
          title: '搜索'
        }
      }
    ],
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {
      title: '商品详情',
      keepAlive: true // 此组件需要被缓存
    },
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/userlogin',
    name: 'UserLogin',
    component: () => import('@/views/Login/UserLogin.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Login/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/recovery',
    name: 'Recovery',
    children: [
      {
        path: '/',
        name: 'recoveryindex',
        component: () => import('@/views/Recovery/recoveryIndex.vue'),
        meta: {
          title: '找回密码'
        }
      },
      {
        path: 'btn',
        name: 'btn',
        component: () => import('@/views/Recovery/RecoveryBtn.vue'),
        meta: {
          title: '找回密码'
        }
      }
    ],
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/path',
    name: 'Path',
    children: [
      {
        path: '/',
        name: 'pathindex',
        component: () => import('@/views/Path/PathIndex.vue'),
        meta: {
          title: '我的地址'
        }
      },
      {
        path: 'pathlist',
        name: 'pathlist',
        component: () => import('@/views/Path/PathList.vue'),
        meta: {
          title: '我的地址'
        }
      }
    ],
    component: () => import('@/views/My/Path.vue')
  },
  {
    path: '/order',
    name: 'Order',
    meta: {
      title: '我的订单',
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
    component: () => import('@/views/My/Wallet.vue'),
    meta: {
      title: '我的钱包'
    }
  },
  {
    path: '/topUp',
    name: 'Topup',
    component: () => import('@/views/Topup.vue')
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('@/views/My/Collect.vue'),
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: '/integral',
    name: 'Integral',
    component: () => import('@/views/Integral.vue'),
    meta: {
      title: '积分商城'
    }
  },
  {
    path: '/integralDetail',
    name: 'IntegralDetail',
    meta: {
      title: '商品详情',
      keepAlive: true // 此组件需要被缓存
    },
    component: () => import('@/views/Integral/Detail.vue')
  },
  {
    path: '/integralOrder',
    name: 'IntegralOrder',
    meta: {
      title: '我的订单',
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
    component: () => import('@/views/My/Edit.vue'),
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/My/Setting.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/My/History.vue'),
    meta: {
      title: '足迹'
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('@/views/My/Signin.vue'),
    meta: {
      title: '签到'
    }
  },
  {
    path: '/mailindex',
    name: 'MailIndex',
    component: () => import('@/views/Mail/MailIndex.vue'),
    meta: {
      title: '邮箱'
    }
  },
  {
    path: '/mailcontent',
    name: 'Mailcontent',
    component: () => import('@/views/Mail/MailContent.vue'),
    meta: {
      title: '邮箱'
    }
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('@/views/Vip/Vip.vue'),
    meta: {
      title: '会员中心'
    }
  },
  {
    path: '/vipstatus',
    name: 'Vipstatus',
    component: () => import('@/views/Vip/Vipstatus.vue')
  },
  {
    path: '/deal',
    name: 'Deal',
    children: [
      {
        path: '/',
        name: 'Arrearage',
        component: () => import('@/views/Deal/Arrearage.vue'),
        meta: {
          title: '未付款'
        }
      },
      {
        path: 'unshipped',
        name: 'Unshipped',
        component: () => import('@/views/Deal/Unshipped.vue'),
        meta: {
          title: '待发货'
        }
      },
      {
        path: 'waitreceiving',
        name: 'WaitReceiving',
        component: () => import('@/views/Deal/WaitReceiving.vue'),
        meta: {
          title: '待收货'
        }
      },
      {
        path: 'noevaluation',
        name: 'NoEvaluation',
        component: () => import('@/views/Deal/NoEvaluation.vue'),
        meta: {
          title: '待评价'
        }
      }
    ],
    component: () => import('@/views/Deal/Deal.vue')
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
