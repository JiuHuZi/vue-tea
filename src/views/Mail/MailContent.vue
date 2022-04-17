<template>
  <div id="MailContent container">
    <Header><span>邮箱</span></Header>
    <section>
      <div class="title">
        <h5>{{ mailList.title }}</h5>
      </div>
      <span class="sender">发件人：{{ mailList.sender }}</span>
      <span class="time">时间：{{ mailList.sendTime }}</span>
      <div class="content">{{ mailList.content }}</div>
      <div class="enclosure">
        <ul>
          <li v-for="(item, index) in mailList.enclosure" :key="index" :class="enclosureColor(item.weight)">
            <img :src="item.imgUrl" alt="" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <div class="btn" @click="getEnclosure" v-if="enclosureStatus == 0">
        <i class="iconfont icon-xiazai-wenjianxiazai-25"></i>
        <span>领取</span>
      </div>
    </footer>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import Header from '@/components/integral/header.vue'
import { Toast } from 'vant'
export default {
  name: 'MailContent',
  data() {
    return {
      mailList: [],
      enclosureStatus: 0
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
          },
          data: {
            id: this.$route.query.id
          }
        })
        .then((res) => {
          // console.log(res)
          res.data.enclosure = '[' + res.data.enclosure + ']'
          this.mailList = res.data
          this.mailList.enclosure = eval(this.mailList.enclosure)
          this.mailList.enclosure.forEach((v) => {
            if (v.type == '积分') {
              v.name = v.name + '积分'
            }
          })

          // 根据奖励的权重排序
          function compare(property) {
            return function (a, b) {
              var value1 = a[property]
              var value2 = b[property]
              return value1 - value2
            }
          }
          this.mailList.enclosure.sort(compare('weight'))
          this.enclosureStatus = this.mailList.enclosureStatus
        })
    },
    // 根据权重显示不同颜色
    enclosureColor(weight) {
      if (weight == '1') {
        return 'weight1'
      } else if (weight == '2') {
        return 'weight2'
      }
    },
    // 领取奖励
    getEnclosure() {
      http
        .$axios({
          url: '/api/getEnclosure',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            enclosure: this.mailList.enclosure,
            id: this.mailList.id
          }
        })
        .then((res) => {
          // console.log(res)
          if (res.success) {
            Toast.success(res.msg)
            this.enclosureStatus = 1
          } else {
            Toast.fail(res.msg)
          }
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
section {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    h5 {
      font-size: 26px;
      padding: 10px 0;
    }
  }
  .sender {
    color: #666;
    font-size: 16px;
    padding: 0 10px 5px;
  }
  .time {
    color: #999;
    font-size: 16px;
    padding: 0 10px;
  }
  .content {
    font-size: 16px;
    min-height: 50vh;
    padding: 10px 10px 0;
    white-space: pre-line;
  }
  .enclosure {
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      // justify-content: center;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      li {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        overflow: hidden;
        margin: 0 10px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          width: 100%;
          z-index: 99;
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
        }
      }
    }
  }
}
footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .btn {
    width: 150px;
    height: 40px;
    box-shadow: 0 0 10px #999;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    font-weight: bold;
    margin-right: 20px;
    margin-bottom: 10px;
    i {
      font-size: 24px;
      padding-right: 10px;
      color: green;
    }
  }
}
.weight1 {
  background-color: orange;
}
.weight2 {
  background-color: #9b23d9;
}
</style>
