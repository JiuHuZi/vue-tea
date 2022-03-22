<template>
  <div class="wallet container">
    <Header></Header>
    <section>
      <div class="totalMsg">
        <ul>
          <li>
            <span>总资产（元）</span>
            <span>{{ totalList.total_money }}</span>
          </li>
          <li>
            <span>累计充值（元）</span>
            <span>{{ totalList.Total_top_up }}</span>
          </li>
          <li>
            <span>累计消费（元）</span>
            <span>{{ totalList.total_consumption }}</span>
          </li>
        </ul>
      </div>
      <div class="totalMsg" style="margin-top: 5px">
        <ul>
          <li>
            <span>我的积分</span>
            <span>{{ totalList.integral }}</span>
          </li>
          <li>
            <span>优惠券</span>
            <span>0张</span>
          </li>
        </ul>
      </div>
      <div class="topUp">
        <ul>
          <li>
            <div>
              <i class="iconfont icon-shouye1"></i>
              <span>充值￥100 赠送 10积分</span>
            </div>
            <div class="topUpBtn" @click="topUp(100)">充值</div>
          </li>
          <li>
            <div>
              <i class="iconfont icon-shouye1"></i>
              <span>充值￥1000 赠送 100积分</span>
            </div>
            <div class="topUpBtn" @click="topUp(1000)">充值</div>
          </li>
        </ul>
      </div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/wallet/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import qs from 'qs'
export default {
  name: 'Wallet',
  data() {
    return {
      totalList: {}
    }
  },
  components: {
    Header,
    Tabber
  },
  methods: {
    getData() {
      http
        .$axios({
          url: '/api/selectwallet',
          method: 'POST',
          headers: {
            token: true
          }
        })
        .then((res) => {
          if (!res.success) return
          this.totalList = res.data
        })
    },
    topUp(val) {
      let name = ''
      if (val == 100) {
        name = '充值￥100 赠送 10积分'
      } else if (val == 1000) {
        name = '充值￥1000 赠送 100积分'
      }

      http
        .$axios({
          url: '/api/addWalletOrder',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            goods_name: name,
            goods_price: val
          }
        })
        .then((res) => {
          console.log(res.data)
          if (!res.success) return

          // 支付传递的参数
          let dataOrder = {
            orderId: res.data.order_id,
            name: res.data.goods_name,
            price: res.data.goods_price
          }

          http
            .$axios({
              url: '/api/topUp',
              method: 'POST',
              headers: {
                token: true,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: qs.stringify(dataOrder)
            })
            .then((res) => {
              console.log(res)
              if (!res.success) return
              // 打开支付包支付的页面
              window.location.href = res.paymentUrl
            })
        })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
section {
  background-color: #f7f7f7;
  padding: 10px;
  .totalMsg {
    width: 100%;
    height: 80px;
    background-color: #000;
    background-image: linear-gradient(60deg, #222931 30%, #1b1f24 100%);
    color: #daa520;
    border-radius: 12px;
    font-size: 14px;
    ul {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      li {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .topUp {
    width: 100%;
    background-color: #fff;
    font-size: 16px;
    margin-top: 20px;
    border-radius: 12px;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        i {
          padding-right: 5px;
        }
        .topUpBtn {
          width: 80px;
          line-height: 30px;
          background-color: #ff585d;
          border-radius: 20px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
::v-deep .tabbar {
  border-top: 1px solid #ddd;
}
</style>
