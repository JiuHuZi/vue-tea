<template>
  <div class="login container">
    <Header></Header>
    <section>
      <div class="login-tel">
        <input type="text" placeholder="请输入手机号" pattern="[0-9]*" />
      </div>
      <div class="login-code">
        <input type="text" placeholder="请输入验证码" pattern="[0-9]*" />
        <button>获取短信验证码</button>
      </div>
      <div class="login-btn">登录</div>
      <div class="login-tab">
        <span>密码登录</span>
        <span>快速注册</span>
      </div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/Login/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
export default {
  name: 'Login',
  components: {
    Tabber,
    Header
  }
}
</script>

<style lang="less" scoped>
section {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f5f5f5;
  div {
    width: 335px;
    height: 44px;
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
