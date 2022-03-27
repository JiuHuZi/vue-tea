<template>
  <div class="history">
    <Header><span>我的足迹</span></Header>
    <section class="wrapper">
      <van-pull-refresh v-model="isLoading" :disabled="finished">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
          <div v-for="(time, index) in list" :key="index" class="historyList">
            <h3>{{ time.grouptype }}</h3>
            <ul>
              <li v-for="(item, i) in time.arrdata" :key="i">
                <div class="goods-img">
                  <img :src="item.imgUrl" alt="" />
                </div>
                <div class="goods-msg">
                  <span>{{ item.goods_name }}</span>
                  <span>￥{{ item.goods_price }}</span>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
      </van-pull-refresh>
    </section>
  </div>
</template>

<script>
import Header from '@/components/start/header.vue'
import http from '@/common/api/request.js'
export default {
  name: 'history',
  data() {
    return {
      list: [],
      loading: true,
      finished: true,
      isLoading: false
    }
  },
  components: {
    Header
  },
  methods: {
    getData() {
      http
        .$axios({
          url: '/api/selectHistory',
          method: 'POST',
          data: {
            phone: JSON.parse(localStorage.getItem('teauserInfo')).tel
          }
        })
        .then((res) => {
          let arr = res.data

          var map = {},
            dest = []
          for (var i = 0; i < arr.length; i++) {
            var ai = arr[i]
            // console.log(ai)
            if (!map[ai.history_time]) {
              dest.push({
                grouptype: ai.history_time,
                arrdata: [ai]
              })

              map[ai.history_time] = ai
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j]
                if (dj.grouptype == ai.history_time) {
                  dj.arrdata.unshift(ai)
                  break
                }
              }
            }
          }

          var obj = {}
          var result = []
          for (let k = 0; k < dest.length; k++) {
            for (let i = 0; i < dest[k].arrdata.length; i++) {
              if (!obj[dest[k].arrdata[i].goods_id]) {
                result.push(dest[k].arrdata[i])
                obj[dest[k].arrdata[i].goods_id] = true
              }
            }
            dest[k].arrdata = result
            result = []
            obj = {}
          }
          this.list = dest
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.history {
  background-color: #f2f2f2;
  height: 100vh;
  .historyList {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin-top: 10px;
    h3 {
      margin-bottom: 8px;
      padding: 0 15px;
    }
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      li {
        width: 33.33vw;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        .goods-img {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 120px;
            height: 120px;
            border-radius: 12px;
          }
        }
        .goods-msg {
          display: flex;
          flex-direction: column;
          width: 98%;
          padding: 0 10px;
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:last-child {
            color: red;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
