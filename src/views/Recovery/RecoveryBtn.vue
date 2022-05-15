<template>
  <div class="login container">
    <Header><span>找回密码</span></Header>
    <section>
      <div class="login-tel">
        <input type="text" placeholder="请输入新的密码" v-model="userPwd" />
      </div>
      <div class="login-btn" @click="submitBtn">确认修改</div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/Login/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
import { Toast } from 'mint-ui'
import http from '@/common/api/request.js'
export default {
  name: 'RecoveryBtn',
  components: {
    Tabber,
    Header
  },
  data() {
    return {
      userPwd: '',
      // 验证规则
      rules: {
        // 手机号验证
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: '密码不能为空，并且是6-12位'
        }
      }
    }
  },
  methods: {
    submitBtn() {
      if (!this.validata('userPwd')) return

      // 确认修改
      http
        .$axios({
          url: '/api/recovery',
          method: 'POST',
          data: {
            phone: this.$route.query.phone,
            pwd: this.userPwd
          }
        })
        .then((res) => {
          Toast(res.msg)
          if (res.success) {
            this.$router.push({
              path: '/login'
            })
          }
        })
    },
    // 验证信息提示
    validata(key) {
      let bool = true
      if (!this.rules[key].rule.test(this[key])) {
        // 提示信息
        Toast(this.rules[key].msg)
        bool = false
        return false
      }
      return bool
    }
  }
}
</script>

<style lang="less" scoped>
section {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f5f5f5;
  font-size: 12px;
  div {
    width: 335px;
    margin: 10px 0;
  }
  input {
    padding: 0 10px;
    line-height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .login-tel {
    margin-top: 30px;
    input {
      width: 100%;
    }
  }
  .login-code {
    display: flex;
    input {
      flex: 1;
      border-radius: 6px 0 0 6px;
    }
    button {
      padding: 0 20px;
      line-height: 44px;
      background-color: #ff585d;
      border: 0;
      color: #fff;
      border-radius: 0 6px 6px 0;
    }
  }
  .login-btn {
    background-color: #ff585d;
    line-height: 44px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    border-radius: 6px;
  }
  .login-tab {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
}
</style>
