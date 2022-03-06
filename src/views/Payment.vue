<template>
  <div class="payment">
    <div v-if="payStatus">恭喜您,支付成功</div>
    <div v-else>很遗憾,支付失败</div>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import qs from 'qs'
export default {
  name: 'Payment',
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
          url: '/api/successPayment',
          method: 'POST',
          headers: {
            token: true,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify(data)
        })
        .then((res) => {
          if (res.code == 2) {
            this.payStatus = true
          }
        })
    }
  }
}
</script>

<style></style>
