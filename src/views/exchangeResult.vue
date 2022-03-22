<template>
  <div class="payment">
    <div v-if="payStatus">恭喜您,兑换成功,<router-link to="/home">返回首页</router-link></div>
    <div v-else>很遗憾,兑换失败,<router-link to="/home">返回首页</router-link></div>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
// import qs from 'qs'
export default {
  name: 'successExchange',
  data() {
    return {
      payStatus: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // console.log(this.$route.query.order_id)
      let order_id = this.$route.query.order_id
      http
        .$axios({
          url: '/api/successExchange',
          method: 'POST',
          data: {
            order_id
          }
        })
        .then((res) => {
          if (res.code == 200) {
            this.payStatus = true
          }
        })
    }
  }
}
</script>

<style></style>
