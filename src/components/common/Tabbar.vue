<template>
  <div class="tabbar">
    <ul>
      <li v-for="(item, index) in routerList" :key="index" @click="switchTab(item.path)">
        <img :src="item.path == $route.path ? item.selected : item.active" alt="" />
        <span :class="item.path == $route.path ? 'active' : ''">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      routerList: [
        {
          title: '首页',
          path: '/home',
          active: './images/home.png',
          selected: './images/home-select.png'
        },
        {
          title: '分类',
          path: '/list',
          active: './images/list.png',
          selected: './images/list-select.png'
        },
        {
          title: '购物车',
          path: '/cart',
          active: './images/cart.png',
          selected: './images/cart-select.png'
        },
        {
          title: '我的',
          path: '/my',
          active: './images/my.png',
          selected: './images/my-select.png'
        }
      ]
    }
  },
  methods: {
    switchTab(path) {
      // 判断是否点击了同个路由
      if (this.$route.path == path) return
      // 对应跳转页面
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped>
.active{color:red}
.tabbar{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  z-index: 999;
}
.tabbar ul{
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  align-items: center;
}
.tabbar ul li{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabbar ul li img{
  width: 31px;
  height: 31px;
}
.tabbar ul li span{
  font-size: 16px;
}
</style>
