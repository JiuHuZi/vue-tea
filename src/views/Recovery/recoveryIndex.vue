<template>
  <div class="login container">
    <Header><span>找回密码</span></Header>
    <section>
      <div class="login-tel">
        <input type="text" placeholder="请输入手机号" v-model="userTel" pattern="[0-9]*" />
      </div>
      <div class="login-code">
        <input type="text" placeholder="请输入验证码" v-model="userCode" pattern="[0-9]*" />
        <button @click="sendCode" :disabled="disabled">{{ codeMsg }}</button>
      </div>
      <div class="login-btn" @click="next">下一步</div>
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
  name: 'RecoveryIndex',
  components: {
    Tabber,
    Header
  },
  data() {
    return {
      code: '',
      disabled: false,
      userCode: '',
      userTel: '',
      codeNum: 6,
      codeMsg: '获取短信验证码',
      // 验证规则
      rules: {
        // 手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: '手机号不能为空，并且是11位数字'
        }
      }
    }
  },
  methods: {
    // 点击获取短信验证码按钮
    sendCode() {
      // 手机号不正确
      if (!this.validata('userTel')) return

      // 手机号正确
      // 请求短信验证码接口
      http
        .$axios({
          url: '/api/code',
          method: 'POST',
          data: {
            phone: this.userTel
          }
        })
        .then((res) => {
          // console.log(res)
          if (res.success) {
            this.code = res.data
          }
        })

      // 禁用按钮
      this.disabled = true

      // 倒计时
      let timer = setInterval(() => {
        --this.codeNum
        this.codeMsg = `重新发送 ${this.codeNum}`
      }, 1000)

      // 判断什么时候停止定时器
      setTimeout(() => {
        clearInterval(timer)
        this.codeNum = 6
        this.disabled = false
        this.codeMsg = '获取短信验证码'
      }, 6000)
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
    },
    // 点击下一步
    async next() {
      // 判断验证码是否正确
      if (this.code != this.userCode) {
        Toast('验证码不正确')
        return
      }
      // 判断是否有输入手机号
      if (this.userTel == '') {
        Toast('请输入手机号')
        return
      }

      // 告诉后端，用户输入的手机号，存在吗？
      let res = await http.$axios({
        url: '/api/selectUser',
        method: 'POST',
        data: {
          phone: this.userTel
        }
      })
      // console.log(res)
      if (!res.success) {
        Toast(res.msg)
        return
      }

      this.$router.push({
        name: 'btn',
        query: {
          phone: this.userTel
        }
      })
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
