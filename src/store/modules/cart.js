import { CART_LIST } from './mutations-types.js'
export default {
  state: {
    list: []
  },
  getters: {},
  mutations: {
    [CART_LIST](state, cartArr) {
      state.list = cartArr
    }
  },
  actions: {}
}
