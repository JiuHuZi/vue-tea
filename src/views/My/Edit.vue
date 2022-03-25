<template>
  <div class="edit container">
    <header>
      <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      <slot>
        <span>修改密码</span>
      </slot>
      <i class="iconfont icon-kefu"></i>
    </header>
    <section>
      <van-form @submit="onSubmit">
        <van-field autocomplete v-model="Opassword" type="password" name="密码" label="旧密码" placeholder="请输入旧密码" :rules="[{ required: true, pattern: /^\w{6,12}$/, message: '请填写密码，且必须是6-12位字符' }]" />
        <van-field autocomplete v-model="Npassword1" type="password1" name="密码" label="新密码" placeholder="请输入新密码" :rules="[{ required: true, pattern: /^\w{6,12}$/, message: '请填写密码，且必须是6-12位字符' }]" />
        <van-field autocomplete v-model="Npassword2" type="password2" name="密码" label="重复新密码" placeholder="重复输入新密码" :rules="[{ required: true, pattern: /^\w{6,12}$/, message: '请填写密码，且必须是6-12位字符' }]" />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Tabber from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import { Toast } from 'vant'
export default {
  name: 'EditPassword',
  components: {
    Tabber
  },
  data() {
    return {
      // 旧密码
      Opassword: '',
      // 新密码
      Npassword1: '',
      // 重复新的密码
      Npassword2: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.Npassword1 != this.Npassword2) {
        Toast('新密码两次不一致，请重新输入！')
        return true
      }
      http
        .$axios({
          url: '/api/editPassword',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            Opassword: this.Opassword,
            Npassword: this.Npassword1
          }
        })
        .then((res) => {
          Toast(res.msg)
          if (res.code == 0) {
            this.Opassword = ''
            this.Npassword1 = ''
            this.Npassword2 = ''
            return true
          }
          this.$router.push('/my')
        })
    }
  }
}
</script>

<style lang="less" scoped>
header {
  background-color: #ff585d;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  i {
    padding: 0 20px;
    font-size: 22px;
  }
  span {
    font-size: 18px;
    font-weight: 400;
  }
}
::v-deep .van-button--info {
  background-color: #ff585d;
  border-color: #ff585d;
}
</style>
