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

Vue.config.productionTip = false

Vue.use(LyTab)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
