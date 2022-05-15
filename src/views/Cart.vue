<template>
  <div class="cart container">
    <header>
      <i class="iconfont icon-fanhui" @click="$router.push('/home')"></i>
      <span>购物车</span>
      <span @click="isNavBar" v-text="isNavState ? '完成' : '编辑'"></span>
    </header>

    <section v-if="list.length">
      <div class="cart-title">
        <van-checkbox @click="checkAllFn" :value="isCheckedAll" checked-color="#ee0a24"></van-checkbox>
        <span>商品</span>
      </div>
      <van-pull-refresh v-model="isLoading" :disabled="finished">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <div class="check">
                <van-checkbox @click="checkItem(index)" v-model="item.checked" checked-color="#ee0a24"></van-checkbox>
              </div>
              <h2><img :src="item.goods_imgUrl" alt="" /></h2>

              <div class="goods">
                <div class="goods-title">
                  <span>{{ item.goods_name }}</span>
                  <i class="iconfont icon-shanchu" @click="delGoodsFn(item.id)"></i>
                </div>
                <div class="goods-price">
                  <span>¥{{ item.goods_price }}</span>
                  <van-stepper @change="changeNum($event, item)" v-model="item.goods_num" integer />
                </div>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </section>
    <section v-else>
      <h5>
        暂无数据，
        <router-link to="/home">去首页逛逛</router-link>
      </h5>
    </section>

    <footer v-if="list.length">
      <div class="radio">
        <van-checkbox @click="checkAllFn" :value="isCheckedAll" checked-color="#ee0a24"></van-checkbox>
      </div>
      <div class="total" v-show="!isNavState">
        <div>
          共有 <span class="total-active">{{ total.num }}</span> 件商品
        </div>
        <div>
          <span>总计：</span>
          <span class="total-active">￥{{ total.price.toFixed(2) }}</span>
        </div>
      </div>
      <div class="order" v-if="!isNavState" @click="goOrder">去结算</div>
      <div class="order" v-if="isNavState" @click="delGoodsFn">删除</div>
    </footer>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'Cart',
  data() {
    return {
      loading: true,
      finished: true,
      isLoading: false,
      isNavState: false
    }
  },
  methods: {
    ...mapMutations(['cartList', 'checkItem', 'initOrder']),
    ...mapActions(['checkAllFn', 'delGoodsFn']),
    async getData() {
      let res = await http.$axios({
        url: '/api/selectCart',
        method: 'POST',
        headers: {
          token: true
        }
      })

      res.data.forEach((v) => {
        v['checked'] = true
      })

      this.cartList(res.data)
    },
    // 点击编辑或者完成按钮
    isNavBar() {
      this.isNavState = !this.isNavState
    },
    // 修改数量
    changeNum(value, item) {
      // 当前购物车商品的ID以及，修改后的数量 ==> 传递给后端
      // value 就是修改后的数量
      // item.id 就是购物车商品的id
      http.$axios({
        url: '/api/updateNum',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id: item.id,
          num: value
        }
      })
    },
    // 去结算
    goOrder() {
      if (this.selectList.length == 0) {
        Toast('至少选择1件商品')
        return
      }

      let newList = []
      this.list.forEach((item) => {
        this.selectList.filter((v) => {
          if (v == item.id) {
            newList.push(item)
          }
        })
      })
      // console.log(newList)
      // 生成一个订单
      http
        .$axios({
          url: '/api/addOrder',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            arr: newList,
            mode: '电子货币'
          }
        })
        .then((res) => {
          if (!res.success) return
          // 存储订单号
          this.initOrder(res.data)
          // 进入提交订单页面
          this.$router.push({
            path: 'Order',
            query: {
              detail: JSON.stringify(this.selectList),
              goodsList: JSON.stringify(this.goodsList),
              member: JSON.parse(localStorage.getItem('teauserInfo')).member
            }
          })
        })
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.list,
      selectList: (state) => state.cart.selectList
    }),
    ...mapGetters(['isCheckedAll', 'total']),
    goodsList() {
      return this.selectList.map((id) => {
        return this.list.find((v) => v.id == id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 45px;
  background-color: #ff585d;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
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
  margin-bottom: 50px;
  margin-top: 45px;
  .cart-title {
    padding: 10px 20px;
    display: flex;
    position: fixed;
    top: 45px;
    width: 100%;
    z-index: 2;
    background-color: #fff;
    span {
      padding: 0 15px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .van-pull-refresh {
    margin-top: 35px;
    width: 100%;
    height: 100%;
    overflow: scroll;
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
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 48px;
  width: 100%;
  border-top: 1px solid #eee;
  background-color: #fff;
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
