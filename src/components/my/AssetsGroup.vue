<template>
  <div class="AssetsGroup">
    <ul>
      <li @click="$router.push('/cart')">
        <b>{{ cartNum }}</b>
        <span>购物车</span>
      </li>
      <li @click="$router.push('/history')">
        <b>{{ historyNum }}</b>
        <span>足迹</span>
      </li>
      <li @click="lock">
        <b>{{ payTokenNum }}</b>
        <span>优惠券</span>
      </li>
      <li @click="$router.push('/start')">
        <b>{{ startNum }}</b>
        <span>收藏夹</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'vant'
import http from '@/common/api/request.js'
export default {
  name: 'AssetsGroup',
  data() {
    return {
      // 购物车数量
      cartNum: 0,
      // 足迹数量
      historyNum: 0,
      // 优惠券数量
      payTokenNum: 0,
      // 收藏商品数量·
      startNum: 0
    }
  },
  methods: {
    // 未开发的功能
    lock() {
      Toast.fail('该功能暂未开放，敬请期待')
    },
    // 初始化各项数据
    getData() {
      // 统计购物车的数量
      http
        .$axios({
          url: '/api/selectCount',
          method: 'POST',
          data: {
            phone: JSON.parse(localStorage.getItem('teauserInfo')).tel,
            table: 'goods_cart'
          }
        })
        .then((res) => {
          this.cartNum = res.data[0].cartCount
        })

      // 统计收藏商品的数量
      http
        .$axios({
          url: '/api/selectCount',
          method: 'POST',
          data: {
            phone: JSON.parse(localStorage.getItem('teauserInfo')).tel,
            table: 'start_list'
          }
        })
        .then((res) => {
          this.startNum = res.data[0].cartCount
        })

      // 统计足迹的数量
      http
        .$axios({
          url: '/api/selectHistoryCount',
          method: 'POST',
          data: {
            phone: JSON.parse(localStorage.getItem('teauserInfo')).tel
          }
        })
        .then((res) => {
          this.historyNum = res.data
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.AssetsGroup {
  position: relative;
  ul {
    display: flex;
    font-size: 16px;
    color: #fff;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      b {
        font-size: 26px;
      }
    }
  }
}
</style>
