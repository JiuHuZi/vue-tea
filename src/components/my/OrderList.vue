<template>
  <div class="orderList">
    <h4>我的交易</h4>
    <ul>
      <li @click="goArrearage">
        <i class="iconfont icon-daifukuan" style="font-weight: bold"></i>
        <span>待付款</span>
      </li>
      <li @click="goUnshipped">
        <i class="iconfont icon-icon2"></i>
        <span>待发货</span>
      </li>
      <li @click="goWaitReceiving">
        <i class="iconfont icon-daishouhuo"></i>
        <span>待收货</span>
      </li>
      <li @click="goNoEvaluation">
        <i class="iconfont icon-daipingjia"></i>
        <span>待评价</span>
      </li>
      <li @click="lock">
        <i class="iconfont icon-shouhoutuikuan"></i>
        <span>退换/售后</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'OrderList',
  methods: {
    // 前往未付款页
    goArrearage() {
      this.$router.push({
        path: '/deal/arrearage',
        query: {
          type: 1
        }
      })
    },
    // 未发货
    goUnshipped() {
      this.$router.push({
        path: '/deal/unshipped',
        query: {
          type: 2
        }
      })
    },
    // 未收货
    goWaitReceiving() {
      this.$router.push({
        path: '/deal/waitreceiving',
        query: {
          type: 3
        }
      })
    },
    // 未评价
    goNoEvaluation() {
      this.$router.push({
        path: '/deal/noevaluation',
        query: {
          type: 4
        }
      })
    },
    // 未开发的功能
    lock() {
      Toast.fail('该功能暂未开放，敬请期待')
    }
  }
}
</script>

<style lang="less" scoped>
.orderList {
  width: 96vw;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 25px;
  left: calc(50% - 96vw / 2);
  background-color: #fff;
  border-radius: 15px;
  font-size: 14px;
  margin-top: -10px;
  h4 {
    font-size: 18px;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 10px;
    letter-spacing: 2px;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 5px;
      i {
        padding-bottom: 5px;
        font-size: 26px;
        font-weight: 500;
      }
    }
  }
}
</style>
