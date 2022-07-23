import { Indicator } from 'mint-ui'
import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router/index.js'
export default {
  common: {
    method: 'GET',
    data: {},
    params: [],
    headers: {},
    timeout: 10000
  },
  $axios(options = {}) {
    let apiUrl = null
    // 判断是开发环境还是市场环境
    if (process.env.VUE_APP_ENV === 'dev') {
      apiUrl = options.url
    } else {
      apiUrl = process.env.VUE_APP_BASE_API + options.url
    }

    options.method = options.method || this.common.method
    options.data = options.data || this.common.data
    options.params = options.params || this.common.params
    options.headers = options.headers || this.common.headers
    options.timeout = options.timeout || this.common.timeout
    options.url = apiUrl
    // console.log('options.url' + options.url)
    // 请求前，显示加载中
    Indicator.open('加载中...')

    // 是否是登录状态
    if (options.headers.token) {
      options.headers.token = store.state.user.token
      if (!options.headers.token) {
        Indicator.close()
        router.push('/login')
      }
    }

    setTimeout(() => {
      Indicator.close()
    }, options.timeout)

    return axios(options).then((v) => {
      let data = v.data.data

      // 如果 token 过期，重新登陆
      if (data.code == 1000) {
        Indicator.close()
        return router.push('/login')
      }

      return new Promise((res, rej) => {
        if (!v) return rej()
        // 结束，关闭加载中
        setTimeout(() => {
          Indicator.close()
        }, 200)
        res(data)
      })
    })
  }
}
