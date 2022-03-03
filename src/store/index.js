import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user.js'
import cart from '@/store/modules/cart.js'
import path from '@/store/modules/path.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cart,
    path
  }
})
