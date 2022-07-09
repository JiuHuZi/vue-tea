<template>
  <div class="goodsCard">
    <div class="store_status">
      <div class="store">
        <i class="iconfont icon-shouye1"></i>
        <span>九狐商城</span>
        <i class="iconfont icon-fanhui fanhui"></i>
      </div>
      <span class="status">{{ PayStatus }}</span>
    </div>
    <div class="goods_content">
      <van-card v-for="(item, index) in goods" :key="index" :num="item.num" :price="item.price.toFixed(2)" desc="预计7天内发货" :title="item.name" :thumb="item.imgUrl" />
      <div class="order_id_box">
        <span>订单号：</span>
        <span>{{ goods[0].order_id }}</span>
      </div>
      <div class="total-price">
        <span v-if="goods[0].mode == '积分'">实付款{{ goods[0].totalPrice }}积分</span>
        <span v-if="goods[0].mode == '电子货币'">实付款￥{{ goods[0].totalPrice }}</span>
      </div>
      <div class="btn-content" :style="goods[0].order_status == '6' ? 'justify-content: space-between;' : ''">
        <i class="iconfont icon-shanchu" v-if="goods[0].order_status == '6'"></i>
        <div class="btnBox" v-if="['1', '3', '4', '5'].includes(goods[0].order_status)">
          <div class="cancel" v-if="goods[0].order_status == '1'" @click="changeStatus(goods[0].order_id, 0)">取消订单</div>
          <div class="submit" v-if="goods[0].order_status != '2'" @click="changeStatus(goods[0].order_id, goods[0].order_status)">{{ btnStatus }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import http from '@/common/api/request.js'
import qs from 'qs'
export default {
  name: 'goodsCard',
  props: {
    goods: {
      type: Array
    }
  },
  methods: {
    changeStatus(id, status) {
      // console.log(id, status)
      if (status == 0) {
        Dialog.confirm({
          title: '取消订单',
          message: `是否取消 ${id} 的订单`
        })
          .then(() => {
            http
              .$axios({
                url: '/api/changeOrderStatus',
                method: 'POST',
                headers: {
                  token: true
                },
                data: {
                  id,
                  status
                }
              })
              .then((res) => {
                console.log(res)
                if (res.success) {
                  location.reload()
                }
              })
          })
          .catch(() => {
            return true
          })
      } else if (status == 3) {
        Toast.success('已提醒商家尽快发货！')
      } else if (status == 1) {
        // console.log(this.goods)
        let name = ''
        this.goods.forEach((value) => {
          // console.log(value)
          name += value.name
        })
        console.log(name)

        // 支付传递的参数
        let dataOrder = {
          orderId: this.goods[0].order_id,
          name,
          price: this.goods[0].totalPrice
        }

        // 去支付
        http
          .$axios({
            url: '/api/payment',
            method: 'POST',
            headers: {
              token: true,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            // qs 是增加安全性的序列化
            data: qs.stringify(dataOrder)
          })
          .then((res) => {
            if (res.success) {
              // 打开支付包支付的页面
              window.location.href = res.paymentUrl
            }
            console.log(res)
          })
      } else {
        http
          .$axios({
            url: '/api/changeOrderStatus',
            method: 'POST',
            headers: {
              token: true
            },
            data: {
              id,
              status: parseInt(status) + 1
            }
          })
          .then((res) => {
            console.log(res)
            if (res.success) {
              location.reload()
            }
          })
      }
    }
  },
  computed: {
    btnStatus() {
      let status = ''
      switch (this.goods[0].order_status) {
        case '1':
          status = '前往支付'
          break
        case '3':
          status = '提醒发货'
          break
        case '4':
          status = '确认收货'
          break
        case '5':
          status = '评价'
          break
      }
      return status
    },
    PayStatus() {
      let status = ''
      switch (this.goods[0].order_status) {
        case '1':
          status = '暂未支付'
          break
        case '3':
          status = '买家已付款'
          break
        case '4':
          status = '卖家已发货'
          break
        case '5':
          status = '交易完成'
          break
        case '0':
          status = '买家已取消订单'
          break
        case '6':
          status = '买家已完成评价'
          break
      }
      return status
    }
  }
}
</script>

<style lang="less" scoped>
.goodsCard {
  width: 96vw;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 0 10px;
  margin: 10px auto 10px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 15px;
  .store_status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .store {
      display: flex;
      align-items: center;
      .icon-shouye1 {
        font-size: 20px;
      }
      span {
        margin: 10px 0 10px 10px;
      }
      .fanhui {
        display: inline-block;
        transform: rotate(180deg);
      }
    }
    .status {
      color: #fb5f04;
    }
  }
  .goods_content {
    .order_id_box {
      padding: 8px 16px;
      font-size: 14px;
      span:first-child {
        color: #666;
      }
    }
    .total-price {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 10px 0;
    }
    .btn-content {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 10px 0;
      i {
        font-size: 18px;
      }
      .btnBox {
        display: flex;
        justify-content: center;
        align-items: center;
        .submit {
          background-color: red;
          color: #fff;
          padding: 5px 20px;
          border-radius: 15px;
          font-size: 14px;
          margin-left: 10px;
        }
        .cancel {
          // background-color: red;
          border: 1px solid #d66107;
          padding: 5px 20px;
          border-radius: 15px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
