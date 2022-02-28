<template>
  <div class="cart container">
    <header>
      <i class="iconfont icon-fanhui" @click="$router.push('/home')"></i>
      <span>购物车</span>
      <span>编辑</span>
    </header>

    <section v-if="list.length">
      <div class="cart-title">
        <van-checkbox v-model="checked" checked-color="#ee0a24"></van-checkbox>
        <span>商品</span>
      </div>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="check">
            <van-checkbox v-model="checked" checked-color="#ee0a24"></van-checkbox>
          </div>
          <h2><img :src="item.goods_imgUrl" alt="" /></h2>

          <div class="goods">
            <div class="goods-title">
              <span>{{ item.goods_name }}</span>
              <i class="iconfont icon-shanchu"></i>
            </div>
            <div class="goods-price">
              <span>¥{{ item.goods_price }}</span>
              <van-stepper v-model="item.goods_num" integer />
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section v-else>
      <h5>
        暂无数据，
        <router-link to="/home">去首页逛逛</router-link>
      </h5>
    </section>

    <footer v-if="list.length">
      <div class="radio">
        <van-checkbox v-model="checked" checked-color="#ee0a24"></van-checkbox>
      </div>
      <div class="total">
        <div>共有 <span class="total-active">1</span> 件商品</div>
        <div>
          <span>总计：</span>
          <span class="total-active">￥128.00 + 0茶币</span>
        </div>
      </div>
      <div class="order">去结算</div>
    </footer>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Cart',
  data() {
    return {
      checked: true
    }
  },
  methods: {
    ...mapMutations(['cartList']),
    async getData() {
      let res = await http.$axios({
        url: '/api/selectCart',
        method: 'POST',
        headers: {
          token: true
        }
      })
      // console.log(res)
      this.cartList(res.data)
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.list
    })
  }
}
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 44px;
  background-color: #ff585d;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    font-size: 22px;
    padding: 0 20px;
  }
  span {
    font-size: 18px;
    padding: 0 20px;
  }
}

section {
  background-color: #f5f5f5;
  .cart-title {
    padding: 20px;
    display: flex;
    span {
      padding: 0 15px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      background-color: #fff;
      padding: 6px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 3px 0;
      .check {
        padding-right: 10px;
      }
      h2 {
        width: 74;
        height: 74px;
        padding: 0 10px;
        img {
          width: 74px;
          height: 74px;
        }
      }
      .goods {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-left: 0.4rem;
        font-size: 0.32rem;
        .goods-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          i {
            font-size: 22px;
          }
        }
        .goods-price {
          padding: 15px 0;
          font-size: 16px;
          color: red;
        }
        ::v-deep .van-stepper {
          text-align: right;
        }
      }
    }
  }
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-top: 1px solid #eee;
  .radio {
    padding: 0 15px;
  }
  .total {
    flex: 1;
    font-size: 12px;
    .total-active {
      color: red;
    }
  }
  .order {
    width: 120px;
    height: 100%;
    line-height: 1.28rem;
    color: #fff;
    text-align: center;
    font-size: 16px;
    background-color: #ff585d;
  }
}
</style>
