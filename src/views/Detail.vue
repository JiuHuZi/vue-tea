<template>
  <div class="detail">
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
      <h1>浓郁豆香龙井1号</h1>
      <div>外形一般但入口顺且浓郁</div>
    </div>
    <div class="goods-price">
      <div class="oprice">
        <span>￥</span>
        <b>68</b>
      </div>
      <div class="pprice">
        <span>价格：</span>
        <del>128</del>
      </div>
    </div>

    <footer>
      <div class="add-cart">加入购物车</div>
      <div>立即购买</div>
    </footer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Detail',
  components: {
    swiper,
    swiperSlide
  },
  // props: {
  //   swiperList: Array
  // },
  data() {
    return {
      swiperOption: {
        autoplay: 3000,
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      swiperList: [{ imgUrl: '/images/goods-list1.jpeg' }, { imgUrl: '/images/goods-list2.png' }, { imgUrl: '/images/goods-list3.jpeg' }, { imgUrl: '/images/goods-list4.jpeg' }, { imgUrl: '/images/goods-list5.jpeg' }]
    }
  }
}
</script>

<style lang="less" scoped>
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
  padding: 20px 10px;
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
</style>
