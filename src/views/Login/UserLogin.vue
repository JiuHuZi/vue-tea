<template>
  <div class="login container">
    <Header></Header>
    <section>
      <div class="login-tel">
        <input type="text" placeholder="请输入手机号" v-model="userTel" pattern="[0-9]*" />
      </div>
      <div class="login-code">
        <input type="password" placeholder="请输入密码" v-model="userPwd" />
      </div>
      <div class="login-btn" @click="login">登录</div>
      <div class="login-tab">
        <span @click="$router.push('/login')">短信登录</span>
        <span @click="$router.push('/recovery')">找回密码</span>
        <span @click="$router.push('/register')">快速注册</span>
      </div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/Login/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
import { Toast } from 'mint-ui'
import http from '@/common/api/request.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  components: {
    Tabber,
    Header
  },
  data() {
    return {
      // 用户输入的手机号
      userTel: '',
      // 用户输入的密码
      userPwd: '',
      // 验证规则
      rules: {
        // 手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: '手机号不能为空，并且是11位数字'
        },
        // 密码验证
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: '密码不能为空，并且要求6-12位'
        }
      }
    }
  },
  methods: {
    ...mapMutations(['USER_LOGIN']),
    // 点击登录按钮
    login() {
      // 前端验证
      if (!this.validata('userTel')) return
      if (!this.validata('userPwd')) return
      // 发送请求，后端验证
      http
        .$axios({
          url: '/api/login',
          method: 'POST',
          data: {
            userTel: this.userTel,
            userPwd: this.userPwd
          }
        })
        .then((res) => {
          // 提示信息
          Toast(res.msg)
          // 登录失败
          if (!res.success) return
          // 登录成功 => 跳转页面，存储用户信息
          this.USER_LOGIN(res.data)
          // 跳转到我的页面中
          this.$router.push('/my')
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
      border-radius: 6px;
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
