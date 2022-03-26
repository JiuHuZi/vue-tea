<template>
  <div class="setting">
    <header>
      <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      <span>账户设置</span>
      <i></i>
    </header>
    <section>
      <div class="userInfo">
        <div class="userInfo-content">
          <img :src="userList.imgUrl" alt="" />
          <div>
            <span>{{ userList.nickName }}</span>
            <span>UID:{{ userList.id }}</span>
          </div>
        </div>
        <i class="iconfont icon-fanhui fanhui"></i>
      </div>

      <div class="address" @click="$router.push('/path')">
        <span>地址管理</span>
        <i class="iconfont icon-fanhui fanhui"></i>
      </div>

      <div class="logout" @click="Out">
        <i class="iconfont icon-tuichu" style="padding-right: 5px"></i>
        <span>退出登录</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'setting',
  data() {
    return {
      userList: {}
    }
  },
  methods: {
    ...mapMutations(['loginOut']),
    getData() {
      if (localStorage.getItem('teauserInfo') != null) {
        this.userList = JSON.parse(localStorage.getItem('teauserInfo'))
      }
    },
    Out() {
      this.loginOut()
      this.$router.replace('/my')
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.setting {
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
  section {
    height: calc(100vh - 44px);
    width: 100%;
    background-color: #f2f2f2;
    .userInfo {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      .userInfo-content {
        display: flex;
        align-items: center;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #000;
          margin: 10px 20px 10px 10px;
        }
        div {
          display: flex;
          flex-direction: column;
          font-size: 18px;
          span {
            padding: 5px 0;
          }
          span:last-child {
            color: #999;
            font-size: 14px;
          }
        }
      }
    }
    .address {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      font-size: 16px;
      border-radius: 0px 0px 20px 20px;
      span {
        padding: 0 10px;
      }
    }
    .logout {
      width: 100%;
      line-height: 50px;
      background-color: #fff;
      border-radius: 20px;
      margin: 20px 0;
      font-size: 16px;
      text-align: center;
    }
  }
  .fanhui {
    padding-left: 10px;
    font-size: 20px;
    transform: rotate(180deg);
  }
}
</style>
