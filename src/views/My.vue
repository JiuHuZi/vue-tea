<template>
  <div class="my container">
    <header>
      <div class="login" @click="goLogin" v-if="!loginStatus">登录 / 注册</div>
      <div class="user-info" v-else>
        <img :src="userInfo.imgUrl" alt="" />
        <span>{{ userInfo.nickName }}</span>
      </div>
    </header>
    <section>
      <div class="section_title" v-if="loginStatus">个人中心</div>
      <ul>
        <li v-if="loginStatus" @click="goStart">
          <div>
            <i class="iconfont icon-shoucang icons"></i>
            <span>我的收藏</span>
          </div>
          <i class="iconfont icon-fanhui go-out"></i>
        </li>
        <li v-if="loginStatus" @click="goPath">
          <div>
            <i class="iconfont icon-dizhi icons"></i>
            <span>地址管理</span>
          </div>
          <i class="iconfont icon-fanhui go-out"></i>
        </li>
        <li v-if="loginStatus" @click="goWallet">
          <div>
            <i class="iconfont icon-licai icons"></i>
            <span>我的钱包</span>
          </div>
          <i class="iconfont icon-fanhui go-out"></i>
        </li>

        <li v-if="loginStatus" @click="loginOut">
          <div>
            <i class="iconfont icon-tuichu icons"></i>
            <span>退出登录</span>
          </div>
          <i class="iconfont icon-fanhui go-out"></i>
        </li>
      </ul>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Tabbar from '@/components/common/Tabbar.vue'
export default {
  name: 'My',
  components: {
    Tabbar
  },
  methods: {
    ...mapMutations(['loginOut']),
    goLogin() {
      this.$router.push('/login')
    },
    // 进入地址管理
    goPath() {
      this.$router.push('/path')
    },
    // 进入我的钱包
    goWallet() {
      this.$router.push('/wallet')
    },
    // 进入我的收藏
    goStart() {
      this.$router.push('/start')
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      loginStatus: (state) => state.user.loginStatus
    })
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
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      span {
        color: #fff;
        font-size: 18px;
        padding: 20px 0;
      }
    }
  }
  section {
    .section_title {
      font-size: 14px;
      color: #999;
      padding: 10px 15px;
      border-bottom: 1px solid #eee;
    }
    ul li {
      padding: 15px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .go-out {
        transform: rotate(180deg);
      }
      div {
        .icons {
          color: red;
          margin-right: 10px;
          font-size: 18px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
