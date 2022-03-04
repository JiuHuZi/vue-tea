<template>
  <div class="order container">
    <header>
      <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      <slot>
        <span>提交订单</span>
      </slot>
      <i class="iconfont icon-kefu"></i>
    </header>

    <section>
      <div class="path">
        <h3 class="path-title">收货信息</h3>
        <div class="path-content">
          <div class="path-main">
            <div>
              <span>{{ path.name }}</span>
              <span>{{ path.tel }}</span>
            </div>
            <div>
              <span>{{ path.province }}</span>
              <span>{{ path.city }}</span>
              <span>{{ path.county }}</span>
              <span>{{ path.addressDetail }}</span>
            </div>
          </div>
          <i class="iconfont icon-fanhui icons"></i>
        </div>
      </div>

      <div class="payment">
        <div class="payment-title">支付方式：</div>
        <van-radio-group v-model="radioPayment">
          <van-radio name="wx">微信支付</van-radio>
          <van-radio name="ali">支付宝支付</van-radio>
        </van-radio-group>
      </div>

      <div class="goods">
        <ul>
          <li v-for="(item, index) in goodsList" :key="index">
            <div><img :src="item.goods_imgUrl" alt="" /></div>
            <div class="goods-content">
              <h4>{{ item.goods_name }}</h4>
              <div class="goods-total">
                <span style="color: red">￥{{ item.goods_price.toFixed(2) }}</span>
                <span>×{{ item.goods_num }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <footer>
      <div class="order-total">
        <span>共</span>
        <b>{{ total.num }}</b>
        <span>件，</span>
        <span>总金额：</span>
        <em>￥{{ total.price.toFixed(2) }}</em>
      </div>
      <div class="order-topay">提交订单</div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import http from '@/common/api/request.js'
export default {
  name: 'Order',
  data() {
    return {
      radioPayment: 'wx',
      path: {},
      item: []
    }
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.list
    }),
    ...mapGetters(['total', 'defaultPath']),
    goodsList() {
      return this.item.map((id) => {
        return this.list.find((v) => v.id == id)
      })
    }
  },
  created() {
    // 选中的商品
    this.item = JSON.parse(this.$route.query.detail)

    http
      .$axios({
        url: '/api/selectAddress',
        method: 'POST',
        headers: {
          token: true
        }
      })
      .then((res) => {
        this.initData(res.data)
        // 有默认收货地址
        if (this.defaultPath.length) {
          this.path = this.defaultPath[0]
        } else {
          // 没有默认收货地址
          this.path = res.data[0]
        }
      })
  },
  methods: {
    ...mapMutations(['initData'])
  }
}
</script>

<style lang="less" scoped>
header {
  background-color: #ff585d;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  i {
    padding: 0 20px;
    font-size: 22px;
  }
  span {
    font-size: 18px;
    font-weight: 400;
  }
}

section {
  background-color: #f7f7f7;
  .path {
    .path-title {
      padding: 15px;
      font-size: 16px;
    }
    .path-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 5px 0;
      .path-main {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        div {
          padding: 5px 15px;
        }
        span {
          padding-right: 6px;
        }
      }
      .icons {
        transform: rotate(180deg);
        padding: 0 20px;
        font-size: 18px;
      }
    }
  }
  .payment {
    background-color: #fff;
    padding: 6px 10px;
    margin-top: 15px;
    font-size: 16px;
    .van-radio-group {
      display: flex;
      padding: 10px 0;
      .van-radio {
        padding-right: 10px;
      }
    }
  }
  .goods {
    background-color: #fff;
    padding: 6px 10px;
    margin-top: 15px;
    font-size: 16px;
    ul {
      width: 100%;
      li {
        display: flex;
        width: 100%;
        img {
          width: 74px;
          height: 74px;
        }
        .goods-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 15px;
          .goods-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  border-top: 1px solid #ddd;
  .order-total {
    font-size: 16px;
    padding: 0 6px;
    b {
      color: red;
    }
    em {
      color: red;
      font-size: 18px;
      font-style: normal;
    }
  }
  .order-topay {
    width: 120px;
    line-height: 45px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    background-color: #ff585d;
  }
}
</style>
