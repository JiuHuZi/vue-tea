<template>
  <div class="my container">
    <header>
      <div class="login" @click="goLogin">登录 / 注册</div>
    </header>
    <section>
      <ul>
        <li>地址管理</li>
      </ul>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
export default {
  name: 'My',
  components: {
    Tabbar
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  header {
    background-color: #b0352f;
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    .login {
      font-size: 16px;
      background-color: #f6ab32;
      color: #fff;
      border-radius: 6px;
      padding: 6px 20px;
    }
  }
  section {
    ul li {
      padding: 15px;
      font-size: 16px;
    }
  }
}
</style>
