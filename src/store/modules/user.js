import { USER_LOGIN, INIT_USER } from '@/store/modules/mutations-types.js'
export default {
  state: {
    // 登录状态
    loginStatus: false,
    // token
    token: null,
    // 用户信息: 用户头像、用户昵称
    userInfo: {}
  },
  getters: {},
  mutations: {
    // 设置
    [USER_LOGIN](state, user) {
      state.loginStatus = true
      state.token = user.token
      state.userInfo = user

      // 持久化存储 ==> 本地存储
      localStorage.setItem('teauserInfo', JSON.stringify(user))
    },
    // 读取
    [INIT_USER](state) {
      let userInfo = JSON.parse(localStorage.getItem('teauserInfo'))
      if (userInfo) {
        state.loginStatus = true
        state.token = userInfo.token
        state.userInfo = userInfo
      }
    },
    // 退出登录
    loginOut(state) {
      state.loginStatus = false
      state.token = null
      state.userInfo = {}
      localStorage.removeItem('teauserInfo')
    }
  },
  actions: {}
}
