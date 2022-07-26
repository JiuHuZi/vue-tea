import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 公共 css 文件
import '@/assets/css/common.css'
// 字体图标 css 文件
import '@/assets/css/iconfont.css'
// 淘宝无线适配
import '@/assets/js/flexible.js'

// ly-tab 插件
import LyTab from 'ly-tab'

// 全局引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 全局引入 vant
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(LyTab)
Vue.use(MintUI)
Vue.use(Vant)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
