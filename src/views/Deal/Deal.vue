<template>
  <div class="deal container">
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
import Header from '@/components/deal/Header.vue'
export default {
  name: 'deal',
  data() {
    return {
      active: 0,
      title: [
        { name: '全部', url: '/deal' },
        { name: '未付款', url: '/deal/arrearage' },
        { name: '待发货', url: '/deal/unshipped' },
        { name: '待收货', url: '/deal/waitreceiving' },
        { name: '待评价', url: '/deal/noevaluation' }
      ]
    }
  },
  components: {
    Header
  },
  created() {
    this.active = parseInt(this.$route.query.type)
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  width: 100vw;
  position: fixed;
  top: 44px;
  z-index: 10;
}
section {
  background-color: #f2f2f2;
  height: 100vh;
  width: 100vw;
  margin-bottom: 0;
  overflow: auto;
  margin-top: 90px;
}
</style>
