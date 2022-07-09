<template>
  <div class="coupon">
    <Header></Header>
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in title" :key="index" :title="item.name" :to="item.url"> </van-tab>
    </van-tabs>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Header from '@/components/coupon/header.vue'
export default {
  name: 'Coupon',
  data() {
    return {
      active: 0,
      title: [
        { name: '全部', url: '/coupon' },
        { name: '未使用', url: '/coupon/unused' },
        { name: '已使用', url: '/coupon/useed' },
        { name: '已过期', url: '/coupon/overdue' }
      ]
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
.coupon {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  header {
    position: fixed;
  }
  .van-tabs {
    position: fixed;
    top: 44px;
    width: 100%;
    background-color: #fff;
    z-index: 9;
  }
  section {
    margin-top: 90px;
  }
}
</style>
