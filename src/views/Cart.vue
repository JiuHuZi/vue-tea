<template>
  <div class="cart container">
    <header>
      <i class="iconfont icon-fanhui"></i>
      <span>购物车</span>
      <span>编辑</span>
    </header>

    <section>
      <div class="cart-title">
        <van-checkbox v-model="checked" checked-color="#ee0a24"></van-checkbox>
        <span>商品</span>
      </div>
      <ul>
        <li>
          <div>
            <van-checkbox v-model="checked" checked-color="#ee0a24"></van-checkbox>
          </div>
          <h2><img src="/images/goods1.jpeg" alt="" /></h2>

          <div class="goods">
            <div class="goods-title">
              <span>浅尝-金牡丹（武夷岩茶）</span>
              <i class="iconfont icon-shanchu"></i>
            </div>
            <div class="goods-price">
              <span>¥14.60</span>
              <van-stepper v-model="value" integer />
            </div>
          </div>
        </li>
      </ul>
    </section>

    <footer>
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
export default {
  name: 'Cart',
  data() {
    return {
      checked: true,
      value: 1
    }
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
