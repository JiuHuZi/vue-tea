<template>
  <div class="payment">
    <div v-if="payStatus">恭喜您,充值成功,<router-link to="/home">返回首页</router-link></div>
    <div v-else>很遗憾,充值失败,<router-link to="/home">返回首页</router-link></div>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import qs from 'qs'
export default {
  name: 'Topup',
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
      let data = {
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no
      }

      http
        .$axios({
          url: '/api/successTopUp',
          method: 'POST',
          headers: {
            token: true,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify(data)
        })
        .then((res) => {
          console.log(res)
          if (res.code == 2) {
            this.payStatus = true
          }
        })
    }
  }
}
</script>

<style></style>
