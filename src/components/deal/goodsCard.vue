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
      <!-- {{ product }} -->
      <van-card v-for="(item, index) in product" :key="index" :num="item.num" :price="item.price.toFixed(2)" desc="预计7天内发货" :title="item.name" :thumb="item.imgUrl" />
      <div class="total-price">
        <span v-if="goods.mode == '积分'">实付款{{ goods.goods_price }}积分</span>
        <span v-if="goods.mode == '电子货币'">实付款￥{{ goods.goods_price }}</span>
      </div>
      <div class="btn-content">
        <i class="iconfont icon-shanchu"></i>
        <div class="submit" v-if="goods.order_status != '2'">{{ btnStatus }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
export default {
  name: 'goodsCard',
  props: {
    goods: {
      type: Object
    }
  },
  data() {
    return {
      product: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      http
        .$axios({
          url: '/api/selectGoods',
          method: 'POST',
          data: {
            goods: this.goods
          }
        })
        .then((res) => {
          console.log(res.data)
          this.product = res.data
        })
    }
  },
  computed: {
    btnStatus() {
      let status = ''
      switch (this.goods.order_status) {
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
      switch (this.goods.order_status) {
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
      justify-content: space-between;
      margin: 10px 0;
      i {
        font-size: 18px;
      }
      .submit {
        background-color: red;
        color: #fff;
        padding: 5px 20px;
        border-radius: 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
