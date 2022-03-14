<template>
  <div class="home">
    <div class="headers">
      <div class="headers-main">
        <Header></Header>
        <ly-tab v-model="selectedId" :items="items" :options="options" @change="changeTab"> </ly-tab>
      </div>
    </div>

    <section>
      <van-pull-refresh v-model="isLoading" :disabled="finished">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
          <div v-for="(item, index) in newData" :key="index">
            <Swiper v-if="item.type == 'swiperList'" :swiperList="item.data"></Swiper>
            <Icons v-if="item.type == 'iconsList'" :iconsList="item.data"></Icons>
            <Recommend v-if="item.type == 'recommendList'" :recommendList="item.data"></Recommend>
            <Ad v-if="item.type == 'adList'" :adList="item.data"></Ad>
            <Like v-if="item.type == 'likeList'" :likeList="likeList"></Like>
          </div>
        </van-list>
      </van-pull-refresh>
    </section>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/home/Header.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import Recommend from '@/components/home/Recommend.vue'
import Like from '@/components/home/Like.vue'
import Ad from '@/components/home/Ad.vue'

// 引入插件
import http from '@/common/api/request.js'
export default {
  name: 'Home',
  components: {
    Tabbar,
    Header,
    Swiper,
    Icons,
    Recommend,
    Like,
    Ad
  },
  data() {
    return {
      // 是否正在加载下一页数据，如果 loading 为 true，则不会反复触发 load 事件
      // 每当下一页数据请求回来之后，千万要记得，把 loading 改成 false
      loading: true,
      // 所有数据是否加载完毕，如果没有更多数据，一定要把 finished 改成true
      finished: true,
      // 是否正在下拉刷新
      isLoading: false,
      selectedId: 0,
      items: [],
      newData: [],
      likeList: [],
      options: {
        activeColor: '#ff585d'
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let res = await http.$axios({
        url: '/api/index_list/0/data/1'
      })

      this.items = Object.freeze(res.topBar)
      this.newData = Object.freeze(res.data)

      // 随机生成8个商品
      let randomArr = []

      for (let i = 0; i < this.newData[3].data.length; i++) {
        let random = Math.floor(Math.random() * this.newData[3].data.length)
        if (randomArr.indexOf(random) != -1) {
          i--
          continue
        }
        randomArr.push(random)
      }
      for (let j = 0; j < 8; j++) {
        this.likeList.push(this.newData[3].data[randomArr[j]])
      }
    },
    async addData(index) {
      let res = await http.$axios({
        url: `/api/index_list/${index}/data/1`
      })

      if (res.constructor != Array) {
        this.newData = res.data
      } else {
        this.newData = res
      }
    },
    changeTab(item, index) {
      this.addData(index)
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.headers {
  width: 100%;
  height: 95px;
}
.headers-main {
  position: fixed;
  left: 0;
  top: 0;
}
::v-deep .ly-tabbar {
  box-shadow: none;
  border-bottom: none;
}
section {
  flex: 1;
  overflow: hidden;
  .van-pull-refresh {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
}
</style>
