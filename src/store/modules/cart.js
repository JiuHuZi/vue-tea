import { CART_LIST, CHECK_ALL, UN_CHECK_ALL, CHECK_ITEM } from './mutations-types.js'
import { Toast, Dialog } from 'vant'
import http from '@/common/api/request.js'
export default {
  state: {
    // 是购物车的数据
    list: [],
    // 选中的数据
    selectList: []
  },
  getters: {
    isCheckedAll(state) {
      return state.list.length == state.selectList.length
    },
    total(state) {
      let total = {
        num: 0,
        price: 0
      }
      state.list.forEach((v) => {
        if (v.checked) {
          total.price += v.goods_price * v.goods_num
          total.num += parseInt(v.goods_num)
        }
      })
      return total
    }
  },
  mutations: {
    [CART_LIST](state, cartArr) {
      state.list = cartArr

      cartArr.forEach((v) => {
        state.selectList.push(v.id)
      })
    },
    // 全选
    [CHECK_ALL](state) {
      state.selectList = state.list.map((v) => {
        v.checked = true
        return v.id
      })
    },
    // 全不选
    [UN_CHECK_ALL](state) {
      state.list.forEach((v) => {
        v.checked = false
      })
      state.selectList = []
    },
    // 单选
    [CHECK_ITEM](state, index) {
      let id = state.list[index].id
      let i = state.selectList.indexOf(id)

      if (i > -1) {
        // 能在 selectList 里面找到对应的 id，那就删除
        return state.selectList.splice(i, 1)
      } else {
        // 如果之前没有选中，那就给 selectList 增加一个 id 进去
        return state.selectList.push(id)
      }
    },
    // 删除
    delGoods(state) {
      state.list = state.list.filter((v) => {
        return state.selectList.indexOf(v.id) == -1
      })
    }
  },
  actions: {
    checkAllFn({ commit, getters }) {
      getters.isCheckedAll ? commit('unCheckAll') : commit('checkAll')
    },
    // 删除操作
    delGoodsFn({ commit, state }, id) {
      // 如果点击编辑后，没有选中商品，则提示信息
      if (state.selectList.length == 0) {
        Toast('请选择商品')
      }

      let arrCart = []

      Dialog.confirm({
        title: '确定要删除这些商品吗'
      }).then(() => {
        // console.log(id)

        if (typeof id == 'number') {
          // 单个删除
          arrCart = [id]
          let index = state.list.findIndex((v) => {
            return v.id == id
          })
          state.list.splice(index, 1)
        } else {
          // 多选删除
          arrCart = state.selectList

          commit('delGoods')
          // 全不选
          commit('unCheckAll')
        }

        http
          .$axios({
            url: '/api/deleteCart',
            method: 'POST',
            data: {
              arrId: arrCart
            }
          })
          .then((res) => {
            console.log(res)
          })
      })
    }
  }
}
