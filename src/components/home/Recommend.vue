<template>
  <div class="recommend">
    <Card> </Card>
    <ul>
      <li v-for="(item, index) in recommendList" :key="index">
        <h2><img :src="item.imgUrl" alt="" /></h2>
        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.content }}</p>
          <div class="price">
            <span>￥</span>
            <b>{{ item.price }}</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from '@/components/home/Card.vue'
export default {
  name: 'Recommend',
  data() {
    return {
      recommendList: [
        { id: 1, name: '龙井1号铁罐250g', content: '鲜爽甘醇 口粮首选', price: '68', imgUrl: './images/recommend.jpeg' },
        { id: 2, name: '龙井1号铁罐250g', content: '鲜爽甘醇 口粮首选', price: '68', imgUrl: './images/recommend.jpeg' },
        { id: 3, name: '龙井1号铁罐250g', content: '鲜爽甘醇 口粮首选', price: '68', imgUrl: './images/recommend.jpeg' }
      ]
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>
.recommend ul li {
  position: relative;
}
.recommend ul li h2 {
  text-align: center;
}
.recommend ul li img {
  width: 360px;
  height: 144px;
  border-radius: 12px;
}
.recommend ul li > div {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-right: 10px;
}
.recommend ul li > div h3 {
  font-size: 12px;
}
.recommend ul li > div p {
  font-size: 16px;
}
.price {
  margin-top: 25px;
  color: red;
  text-align: right;
}
.price span {
  font-size: 14px;
}
</style>
