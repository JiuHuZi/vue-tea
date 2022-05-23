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
            let list = res.data
            http
              .$axios({
                url: '/api/selectGoods',
                method: 'POST',
                data: { list }
              })
              .then((ress) => {
                // console.log(ress)
                this.list = ress.data
              })
          } else {
            console.log('失败')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
