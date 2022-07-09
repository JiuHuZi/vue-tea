<template>
  <div class="coupon-used">
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
          if (res.success) {
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].isUse == '1') {
                arr.push(res.data[i])
              }
              if (i + 1 == res.data.length) {
                if (arr.length == 0) return
                this.couponList = arr
              }
            }
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.coupon-used {
  box-sizing: border-box;
  padding: 5px 10px;
}
</style>
