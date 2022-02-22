<template>
  <div class="like">
    <Card><span>猜你喜欢</span></Card>
    <ul>
      <li v-for="(item, index) in likeList" :key="index">
        <h2><img v-lazy="item.imgUrl" /></h2>
        <h3>{{ item.name }}</h3>
        <div class="price">
          <span>￥</span>
          <b>{{ item.price }}</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from '@/components/home/Card.vue'
export default {
  name: 'Like',
  props: {
    likeList: Array
  },
  components: {
    Card
  }
}
</script>

<style scoped>
.like ul {
  display: flex;
  flex-wrap: wrap;
}
.like ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.like h3 {
  width: 176px;
  font-size: 14px;
  font-weight: 400;
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
}
.like img {
  width: 176px;
  height: 176px;
}
.price {
  width: 176px;
  text-align: left;
  padding: 0 6px 6px;
  color: red;
  margin-top: -5px;
}
.price span {
  font-size: 12px;
}
.price b {
  font-size: 16px;
  font-weight: bold;
}
img[lazy='loading'] {
  background-color: #f7f7f7;
}
</style>
