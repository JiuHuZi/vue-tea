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
      <div class="total-price">
        <span v-if="goods[0].mode == '积分'">实付款{{ goods[0].totalPrice }}积分</span>
        <span v-if="goods[0].mode == '电子货币'">实付款￥{{ goods[0].totalPrice }}</span>
      </div>
      <div class="btn-content" :style="goods[0].order_status == '6' ? 'justify-content: space-between;' : ''">
        <i class="iconfont icon-shanchu" v-if="goods[0].order_status == '6'"></i>
        <div class="btnBox" v-if="goods[0].order_status != '0'">
          <div class="cancel" v-if="goods[0].order_status == '1'" @click="changeStatus(goods[0].order_id, 0)">取消订单</div>
          <div class="submit" v-if="goods[0].order_status != '2'">{{ btnStatus }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import http from '@/common/api/request.js'
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
              status
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
