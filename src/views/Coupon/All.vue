<template>
  <div class="coupon-all">
    <div v-if="couponList">
      <div v-for="(item, index) in couponList" :key="index">
        <coupon-card :content="item"></coupon-card>
      </div>
    </div>
    <van-empty image="search" description="暂无优惠券" v-else />
  </div>
</template>

<script>
import couponCard from '@/components/coupon/couponCard.vue'
import http from '@/common/api/request.js'
export default {
  data() {
    return {
      couponList: null
    }
  },
  components: {
    couponCard
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      http
        .$axios({
          url: '/api/selectCoupon',
          method: 'POST',
          headers: {
            token: true
          }
        })
        .then((res) => {
          console.log(res)
          if (res.success) {
            if (res.data.length == 0) return
            this.couponList = res.data.sort((a, b) => {
              return a.isUse - b.isUse
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.coupon-all {
  box-sizing: border-box;
  padding: 5px 10px;
}
</style>
