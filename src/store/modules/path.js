import { INIT_DATA } from './mutations-types'
export default {
  state: {
    list: []
  },
  mutations: {
    [INIT_DATA](state, arr) {
      state.list = arr
    }
  }
}
