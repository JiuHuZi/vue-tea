<template>
  <!-- 未发货模块 -->
  <div class="unshipped">
    <div class="cardList" v-if="list">
      <goods-card v-for="(item, index) in list" :key="index" :goods="item" />
    </div>
    <van-empty image="search" description="您还没有相关的订单" v-else />
  </div>
</template>

<script>
import goodsCard from '@/components/deal/goodsCard.vue'
import http from '@/common/api/request.js'
export default {
  name: 'unshipped',
  data() {
    return {
      list: null
    }
  },
  components: {
    goodsCard
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      http
        .$axios({
          url: '/api/selectOrderStatus',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            type: 3
          }
        })
        .then((res) => {
          if (res.success) {
            console.log(res)
            this.list = res.data
          } else {
            console.log('没有该信息')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
