<template>
  <div class="deal">
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in title" :key="index" :title="item.name" :to="item.url"> </van-tab>
      <router-view></router-view>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'deal',
  data() {
    return {
      active: 0,
      title: [
        { name: '未付款', url: '/deal' },
        { name: '待发货', url: '/deal/unshipped' },
        { name: '待收货', url: '/deal/waitreceiving' },
        { name: '待评价', url: '/deal/noevaluation' }
      ]
    }
  },
  created() {
    this.active = parseInt(this.$route.query.type)
  }
}
</script>
