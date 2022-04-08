<template>
  <div id="cdkey">
    <van-popup v-model="show" closeable round @close="close">
      <h5>使用兑换码</h5>
      <van-form @submit="onSubmit">
        <van-field v-model="cdk" name="兑换码" label="兑换码" placeholder="兑换码" :rules="[{ required: true, message: '请填写兑换码' }]" />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import { Toast } from 'vant'
export default {
  name: 'cdkey',
  data() {
    return {
      cdk: '',
      show: true
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    onSubmit() {
      http
        .$axios({
          url: '/api/selectCDKList',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            cdk: this.cdk
          }
        })
        .then((res) => {
          console.log(res)
          if (!res.success) {
            Toast.fail(res.msg)
            this.cdk = ''
            return
          } else {
            Toast.success(res.msg)
            this.show = false
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
h5 {
  padding: 10px 0;
  text-align: center;
  font-size: 18px;
}
.van-popup--center {
  width: 90vw;
  height: 25vh;
  .van-form {
    margin-top: 20px;
    .van-button--info {
      background-color: #ff585d;
      border-color: #ff585d;
    }
  }
}
</style>
