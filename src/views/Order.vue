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
        <div class="path-content" @click="goPath">
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

      <div class="discounts">
        <span class="discounts-title">折扣</span>
        <span class="discounts-msg">{{ discountTitle }}</span>
      </div>

      <!-- 优惠券单元格 -->
      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
      <!-- 优惠券列表 -->
      <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px">
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :show-exchange-bar="false" :disabled-coupons="disabledCoupons" @change="onChange" />
      </van-popup>

      <div class="goods">
        <ul>
          <li v-for="(item, index) in goodsList" :key="index">
            <div><img :src="item.goods_imgUrl" alt="" /></div>
            <div class="goods-content">
              <h4>{{ item.goods_name }}</h4>
              <div class="goods-total">
                <span style="color: red">￥{{ item.goods_price }}</span>
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
        <em>￥{{ total.price }}</em>
      </div>
      <div class="order-topay" @click="goPayment">提交订单</div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import http from '@/common/api/request.js'
import { Toast } from 'vant'
import bus from '@/common/bus.js'
import qs from 'qs'

export default {
  name: 'Order',
  data() {
    return {
      radioPayment: 'wx',
      path: {},
      item: [],
      total: {
        num: 0,
        price: 0
      },
      // 优惠券参数
      chosenCoupon: -1,
      // 可用的优惠券
      coupons: [],
      // 不可用的优惠券
      disabledCoupons: [],
      showList: false,
      oldPrice: 0,
      couponID: null
    }
  },
  computed: {
    ...mapState({
      order_id: (state) => state.order.order_id,
      selectList: (state) => state.cart.selectList
    }),
    ...mapGetters(['defaultPath']),
    discountMsg() {
      let discounts = 1
      let member = this.$route.query.member
      if (member == '1') {
        discounts = 0.9
      } else if (member == '2') {
        discounts = 0.85
      } else if (member == '3') {
        discounts = 0.8
      } else if (member == '4') {
        discounts = 0.75
      }
      return discounts
    },
    discountTitle() {
      let message = '无优惠'
      if (this.discountMsg == 0.9) {
        message = '月度会员9折'
      } else if (this.discountMsg == 0.85) {
        message = '季度会员85折'
      } else if (this.discountMsg == 0.8) {
        message = '年度会员8折'
      } else if (this.discountMsg == 0.75) {
        message = '百年大会员75折'
      }
      return message
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例,将值传入fromPath
      vm.fromPath = from.path
      // console.log(to)
      // console.log(from)
    })
  },
  updated() {
    this.OrderUserInfo()
  },
  created() {
    this.goodsList = JSON.parse(this.$route.query.goodsList)
    function toFix(num1) {
      if (typeof num1 == 'undefined') {
        return num1
      } else {
        return Number(num1.toFixed(2))
      }
    }
    this.goodsList.goods_price = toFix(this.goodsList.goods_price)
    this.selectAddress()
  },
  mounted() {},
  methods: {
    ...mapMutations(['initData', 'initOrder', 'cleaerSelectList']),
    // 查询到地址
    selectAddress() {
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
    // 选择收货地址
    goPath() {
      this.$router.push({
        path: '/path',
        query: {
          type: 'select'
        }
      })
    },
    // 查询订单
    selectOrder() {
      http
        .$axios({
          url: '/api/selectOrder',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            order_id: this.order_id
          }
        })
        .then((res) => {
          // 存储订单号
          this.initOrder(res.data)
          let numArr = res.data[0].goods_num.split(',')
          let num = 0
          numArr.forEach((v) => {
            num += parseInt(v)
          })
          this.total = {
            price: (parseFloat(res.data[0].goods_price).toFixed(2) * this.discountMsg).toFixed(2),
            num
          }
          this.oldPrice = (parseFloat(res.data[0].goods_price).toFixed(2) * this.discountMsg).toFixed(2)
        })
    },
    // 提交订单
    goPayment() {
      // 判断是否选择了收货地址
      if (!this.path) {
        Toast.fail('请填写收货地址')
        return
      }

      // console.log(this.fromPath)
      if (this.fromPath == '/detail') {
        this.cleaerSelectList()
      }

      // 发送请求  ==> 1.修改订单状态  2.删除购物车数据
      http
        .$axios({
          url: '/api/submitOrder',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            order_id: this.order_id,
            shopArr: this.selectList,
            coupon_id: this.couponID
          }
        })
        .then((res) => {
          let newArr = []
          this.goodsList.forEach((v) => {
            newArr.push(v.goods_name)
          })

          // 支付传递的参数
          let dataOrder = {
            orderId: this.order_id,
            name: newArr.join(''),
            price: this.total.price
          }

          if (res.success) {
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
              })
          }
        })
    },
    // 存储订单的用户信息
    OrderUserInfo() {
      if (Object.keys(this.path).length == 0) return
      // console.log(this.path)
      http.$axios({
        url: '/api/orderUserInfo',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          path: this.path,
          order_id: this.order_id
        }
      })
    },
    // 优惠券方法
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
      this.total.price = this.oldPrice
      if (index == -1) {
        this.total.price = this.oldPrice
      } else {
        this.couponID = this.coupons[index].id
        if (this.coupons[index].unitDesc == '折') {
          // 优惠券减多少元
          let value = (this.oldPrice - (this.coupons[index].valueDesc * this.oldPrice) / 10) * 100
          // 判断是否有最多减多少元
          if (this.coupons[index].maxDiscount != null && value > this.coupons[index].maxDiscount) {
            value = this.coupons[index].maxDiscount
          }
          // 显示减多少元
          this.coupons[index].value = value
          // 最后总价
          this.total.price -= this.coupons[index].value / 100
          this.total.price = this.total.price.toFixed(2)
        } else {
          this.total.price -= this.coupons[index].valueDesc.toFixed(2)
        }
      }
    },
    // 查询用户的优惠券
    getCouponList() {
      http
        .$axios({
          url: '/api/selectCoupon',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            path: this.path,
            order_id: this.order_id
          }
        })
        .then((res) => {
          // console.log('优惠券', res)
          if (res.success) {
            // 可用的优惠券
            let arr = []
            // 不可用的优惠券
            let disabled = []
            let condition = 0
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].isUse == '0') {
                // 不可用原因
                res.data[i].reason = ''
                // 优惠券金额文案
                if (res.data[i].unitDesc == '元') {
                  res.data[i].valueDesc = res.data[i].value / 100
                } else if (res.data[i].unitDesc == '折') {
                  res.data[i].valueDesc = res.data[i].value
                }

                if (res.data[i].condition == 0) {
                  condition = 0
                  if (res.data[i].maxDiscount == null) {
                    res.data[i].condition = `无使用门槛`
                  } else {
                    res.data[i].condition = `无使用门槛\n最多优惠 ${res.data[i].maxDiscount / 100} 元`
                  }
                } else {
                  condition = res.data[i].condition / 100
                  if (res.data[i].maxDiscount == null) {
                    res.data[i].condition = `满${res.data[i].condition / 100}可用`
                  } else {
                    res.data[i].condition = `满${res.data[i].condition / 100}可用\n最多优惠${res.data[i].maxDiscount / 100} 元`
                  }
                }

                if (condition > this.oldPrice) {
                  res.data[i].reason = '购买金额少于满减条件'
                  disabled.push(res.data[i])
                } else {
                  arr.push(res.data[i])
                }
              }

              if (i + 1 == res.data.length) {
                if (arr.length == 0) return
                this.coupons = arr
                this.disabledCoupons = disabled
              }
            }
          }
        })
    }
  },
  // 使用了keepalive且再次进入生命周期
  activated() {
    bus.$on(
      'selectPath',
      function (data) {
        this.path = JSON.parse(data)
      }.bind(this)
    )
    // 选中的商品id号
    this.item = JSON.parse(this.$route.query.detail)
    this.goodsList = JSON.parse(this.$route.query.goodsList)

    this.selectOrder()

    this.getCouponList()
    this.chosenCoupon = -1
  },
  // 离开keepalive触发事件
  deactivated() {
    this.getCouponList()
    this.chosenCoupon = -1
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
  position: fixed;
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
  margin-top: 45px;
  margin-bottom: 45px;
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
    .payment-title {
      font-weight: bold;
    }
    .van-radio-group {
      display: flex;
      padding: 10px 0;
      .van-radio {
        padding-right: 10px;
      }
    }
  }
  .discounts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 5px 16px;
    background-color: #fff;
    // .discounts-title {
    //   font-weight: bold;
    // }
    .discounts-msg {
      color: #999;
      font-size: 14px;
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
  position: fixed;
  bottom: 0;
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
