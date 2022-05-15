<template>
  <div class="mail-index container">
    <Header><span>邮箱</span></Header>
    <section>
      <div v-if="mailList == ''" style="text-align: center">
        <span style="font-size: 12px; color: #999">———————— 邮箱空空如也 ————————</span>
      </div>
      <ul v-else>
        <li v-for="(item, index) in mailList" :key="index" @click="goMailContent(item)" :class="item.mailStatus == 1 ? 'readed' : ''">
          <h5>{{ item.title }}</h5>
          <div class="msg">
            <div class="sender">
              <i class="iconfont icon-wode-wode"></i>
              <span>{{ item.sender }}</span>
            </div>
            <span class="time">{{ item.sendTime }}</span>
          </div>
          <div class="goMail">
            <span>邮件详情</span>
            <i class="iconfont icon-fanhui"></i>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import Header from '@/components/integral/header.vue'
export default {
  name: 'MailIndex',
  data() {
    return {
      mailList: []
    }
  },
  components: {
    Header
  },
  methods: {
    getData() {
      http
        .$axios({
          url: '/api/selectmail',
          method: 'POST',
          headers: {
            token: true
          }
        })
        .then((res) => {
          // console.log(res.data)

          this.mailList = res.data
        })
    },
    goMailContent(item) {
      this.$router.push({
        path: '/mailcontent',
        query: { id: item.id }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.mail-index {
  background-color: #f0eef0;
  section {
    margin-bottom: 0;
    overflow: scroll;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 8px;
      box-sizing: border-box;
      li {
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        border-radius: 10px;
        h5 {
          font-size: 22px;
          padding: 10px 0 5px;
        }
        .msg {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          color: #999;
          border-bottom: 1px solid #ccc;
          .sender {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 10px;
            i {
              font-size: 14px;
            }
          }
          .time {
            padding-right: 10px;
          }
        }
        .goMail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          i {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .readed {
    opacity: 0.5;
  }
}
</style>
