<template>
  <div class="detail">
    <header>
      <div class="header-return" v-show="isShow">
        <div @click="$router.back()">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div>
          <i class="iconfont icon-shouye"></i>
        </div>
      </div>
      <div class="header-bar" v-show="!isShow" :style="styleOption">
        <div @click="$router.back()">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div>
          <span>商品详情</span>
          <span>商品评价</span>
        </div>
        <div>
          <i class="iconfont icon-shouye"></i>
        </div>
      </div>
    </header>

    <section ref="wrapper">
      <div>
        <div class="swiper-main">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in swiperList" :key="index">
              <img :src="item.imgUrl" alt="" />
            </swiper-slide>
          </swiper>
          <!-- 以下看需要添加 -->
          <div class="swiper-pagination"></div>
        </div>

        <div class="goods-name">
          <h1>{{ goods.name }}</h1>
          <div>外形一般但入口顺且浓郁</div>
        </div>
        <div class="goods-price">
          <div class="oprice">
            <span>积分：</span>
            <b>{{ goods.price * 10 }}</b>
          </div>
        </div>

        <div class="detail-list">
          <img :src="goods.imgUrl" alt="" />
          <img :src="goods.imgUrl" alt="" />
        </div>
      </div>
    </section>

    <footer>
      <div class="leftBtn">
        <div class="cart" @click="$router.push('/cart')">
          <i class="iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </div>
        <div class="start" :style="isStart ? 'color:red' : 'color:#000'" @click="startBtn">
          <i class="iconfont icon-shoucang"></i>
          <span>{{ isStart ? '已收藏' : '收藏' }}</span>
        </div>
      </div>
      <div class="rightBtn">
        <!-- <div class="add-cart" @click="addCart">加入购物车</div> -->
        <div @click="exchange">立即兑换</div>
      </div>
    </footer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BetterScroll from 'better-scroll'
import http from '@/common/api/request.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Detail',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      id: 0,
      goods: {},
      styleOption: {},
      BetterScroll: '',
      isShow: true,
      isStart: false,
      swiperOption: {
        autoplay: 3000,
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      swiperList: [],
      newList: []
    }
  },
  mounted() {
    this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
      probeType: 3,
      click: true,
      // 取消 better-scroll 回弹效果
      bounce: false
    })

    this.BetterScroll.on('scroll', (pos) => {
      let posY = Math.abs(pos.y)
      let opacity = posY / 180

      opacity = opacity > 1 ? 1 : opacity

      this.styleOption = {
        opacity: opacity
      }

      if (posY >= 50) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    })
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  activated() {
    // 判断当前的 URL 的 id 是否与之前的 id 一致
    if (this.$route.query.id != this.id) {
      this.getData()
      this.id = this.$route.query.id
    }
  },
  methods: {
    ...mapMutations(['initOrder']),
    async getData() {
      let id = this.$route.query.id

      let res = await http.$axios({
        url: '/api/goods/id',
        params: { id }
      })
      // console.log(res)

      this.goods = res

      this.swiperList = [{ imgUrl: '/images/goods-list1.jpeg' }, { imgUrl: '/images/goods-list2.png' }, { imgUrl: '/images/goods-list3.jpeg' }, { imgUrl: '/images/goods-list4.jpeg' }, { imgUrl: '/images/goods-list5.jpeg' }]
      this.swiperList.unshift({ imgUrl: res.imgUrl })
      // 查看该商品是否收藏过
      http
        .$axios({
          url: '/api/selectLike',
          method: 'POST',
          data: {
            goodsId: id
          },
          headers: {
            token: true
          }
        })
        .then((res) => {
          if (res.code == 200) {
            this.isStart = true
          } else if (res.code == 210) {
            this.isStart = false
          }
        })
      let newArr = [
        {
          goods_id: this.goods.id,
          goods_name: this.goods.name,
          goods_imgUrl: this.goods.imgUrl,
          goods_num: 1,
          goods_price: this.goods.price * 10
        }
      ]
      // console.log(newArr)
      this.newList = newArr
    },
    // 点击兑换
    exchange() {
      // 生成一个订单
      http
        .$axios({
          url: '/api/addOrder',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            arr: this.newList,
            mode: '积分'
          }
        })
        .then((res) => {
          // console.log(res)
          if (!res.success) return
          res.data[0]['goods_imgUrl'] = this.goods.imgUrl
          res.data[0]['goods_id'] = this.goods.id
          this.initOrder(res.data)
          this.$router.push({
            path: '/integralOrder',
            query: {
              detail: JSON.stringify([res.data[0].goods_id]),
              goodsList: JSON.stringify([res.data[0]])
            }
          })
        })
    },
    // 点击收藏
    startBtn() {
      this.isStart = !this.isStart
      let id = this.$route.query.id
      http.$axios({
        url: '/api/like',
        method: 'POST',
        data: {
          goodsId: id,
          goodsName: this.goods.name,
          goodsPrice: this.goods.price,
          imgUrl: this.goods.imgUrl,
          isStart: this.isStart
        },
        headers: {
          token: true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.swiper-main {
  width: 100%;
  height: 375px;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 375px;
  }
  .swiper-pagination {
    width: 100%;
    bottom: 10px;
    text-align: right;
    color: #fff;
    font-size: 16px;
    left: -20px;
  }
}

.goods-name {
  padding: 20px 10px;
  border-bottom: 1px solid #eee;
  h1 {
    font-size: 20px;
    font-weight: 500;
  }
  div {
    font-size: 14px;
    color: #999;
    padding: 5px 0;
  }
}

.goods-price {
  padding: 10px;
  .oprice {
    color: red;
    span {
      font-size: 12px;
    }
    b {
      font-size: 0.75rem;
    }
  }
  .pprice {
    color: #999;
    font-size: 14px;
  }
}

header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 44px;
  z-index: 999;
  .header-return {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    div {
      width: 34px;
      height: 34px;
      margin: 0 10px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        color: #fff;
        font-size: 24px;
      }
    }
  }
  .header-bar {
    background-color: #fff;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    span {
      padding: 0 10px;
    }
    i {
      font-size: 22px;
      padding: 0 10px;
    }
  }
}

.detail-list {
  img {
    width: 100%;
    height: 550px;
  }
}

section {
  flex: 1;
  overflow: hidden;
}
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 49px;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  .leftBtn {
    flex: 1;
    div {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      color: #000;
      i {
        font-size: 24px;
      }
      span {
        font-size: 14px;
      }
    }
  }
  .rightBtn {
    flex: 2;
  }
  div {
    width: 50%;
    height: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    &.add-cart {
      background-color: #ff9500;
    }
  }
}
</style>
