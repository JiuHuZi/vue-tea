<template>
  <div id="Test">
    <h5>测试页面</h5>
    <button @click="addCoupon">添加一张兑换券</button>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
export default {
  data() {
    return {}
  },
  methods: {
    addCoupon() {
      http
        .$axios({
          url: '/api/coupon',
          method: 'post',
          headers: {
            token: true
          }
        })
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>

<style></style>
