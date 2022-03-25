<template>
  <div class="AssetsGroup">
    <ul>
      <li @click="$router.push('/cart')">
        <b>0</b>
        <span>购物车</span>
      </li>
      <li @click="lock">
        <b>3</b>
        <span>足迹</span>
      </li>
      <li @click="lock">
        <b>7</b>
        <span>优惠券</span>
      </li>
      <li @click="$router.push('/start')">
        <b>0</b>
        <span>收藏夹</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'AssetsGroup',
  methods: {
    // 未开发的功能
    lock() {
      Toast.fail('该功能暂未开发，敬请期待')
    }
  }
}
</script>

<style lang="less" scoped>
.AssetsGroup {
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
