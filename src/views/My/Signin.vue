<template>
  <div class="signin">
    <header>
      <div @click="$router.back()"><i class="iconfont icon-fanhui"></i></div>
      <div>
        <slot>
          <span>签到领积分</span>
        </slot>
      </div>
      <div @click="$router.push('/home')"><i class="iconfont icon-shouye"></i></div>
    </header>
    <section>
      <div class="sigin-title">
        <span>天天签到 赚积分</span>
        <span>已连续签到 {{ days }} 天</span>
      </div>
      <div class="sign-content">
        <ul class="rewardBox">
          <li v-for="(item, index) in rewardList" :key="index">
            <h4>{{ item.day }}</h4>
            <div class="reward-main">
              <span>{{ item.reward }}</span>
            </div>
            <div class="itemBG"></div>
          </li>
        </ul>
        <button @click="signin" :disabled="disabled" :class="isSignIn ? 'signIn' : ''">{{ isSignIn ? '今日已签到' : '签到' }}</button>
      </div>
    </section>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
export default {
  name: 'Signin',
  data() {
    return {
      days: 0,
      yesterday: '',
      today: '',
      isSignIn: false,
      disabled: true,
      rewardList: [
        { day: '01', reward: '3 积分' },
        { day: '02', reward: '4 积分' },
        { day: '03', reward: '5 积分' },
        { day: '04', reward: '8 积分' },
        { day: '05', reward: '4 积分' },
        { day: '06', reward: '5 积分' },
        { day: '07', reward: '最高 24 积分' }
      ]
    }
  },
  methods: {
    getData() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let day = new Date().getDate()
      let today = year + '-' + month + '-' + day

      let yesterday_day = day - 1 < 1 ? 1 : day - 1
      let yesterday = year + '-' + month + '-' + yesterday_day

      this.today = today
      this.yesterday = yesterday
      http
        .$axios({
          url: '/api/selectSignin',
          method: 'POST',
          data: {
            yesterday: this.yesterday,
            today: this.today
          },
          headers: {
            token: true
          }
        })
        .then((res) => {
          console.log(res)
          this.days = res.data.total_time
          this.isSignIn = !res.success
          this.disabled = !res.success
        })
    },
    signin() {
      http
        .$axios({
          url: '/api/signin',
          method: 'POST',
          data: {
            yesterday: this.yesterday,
            today: this.today
          },
          headers: {
            token: true
          }
        })
        .then((res) => {
          console.log(res)
          this.days = res.data.total_time
          this.isSignIn = res.success
          this.disabled = res.success
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.signin {
  background-color: #ff585d;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ff585d;
    width: 100%;
    height: 44px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      i {
        font-size: 22px;
        padding: 0 10px;
      }
      span {
        font-size: 18px;
      }
    }
  }
  section {
    .sigin-title {
      height: 15vh;
      width: 100%;
      background-color: #ff585d;
      text-align: center;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span:last-child {
        margin-top: 20px;
        font-size: 16px;
      }
    }
    .sign-content {
      width: 100%;
      height: 85vh;
      background-color: #fff;
      border-radius: 15px;
      z-index: 5;
      display: flex;
      align-items: center;
      flex-direction: column;
      .rewardBox {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
          width: 90px;
          height: 130px;
          display: flex;
          flex-direction: column;
          position: relative;
          margin: 10px 3px;
          overflow: hidden;
          border-radius: 15px;
          outline: 1px solid #f5f5f5;
          background-color: #f2f2f2;
          h4 {
            color: #fff;
            position: absolute;
            left: 10px;
            font-size: 30px;
          }
          .reward-main {
            width: 100%;
            height: 130px;
            z-index: 10;
            position: absolute;
            font-size: 20px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
          }
          .itemBG {
            width: 150px;
            height: 150px;
            background-color: orange;
            border-radius: 50%;
            margin-left: -35%;
            margin-top: -70%;
          }
        }
        li:last-child {
          width: 180px;
          .itemBG {
            width: 120px;
            height: 120px;
            margin-left: -10%;
            margin-top: -20%;
          }
        }
      }
      button {
        width: 96%;
        height: 60px;
        font-size: 24px;
        border-radius: 15px;
        margin-top: 20px;
        background-color: orange;
      }
      .signIn {
        background-color: #ccc;
      }
    }
  }
}
</style>
