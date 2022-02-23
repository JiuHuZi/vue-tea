<template>
  <div class="search-list">
    <div class="headers">
      <Header></Header>
      <ul>
        <li v-for="(item, index) in searchList.data" :key="index" @click="changeTab(index)">
          <div :class="searchList.currentIndex == index ? 'active' : ''">{{ item.name }}</div>
          <div class="search-filter" v-if="index != 0">
            <i class="iconfont icon-arrow_up_fat" :class="item.status == 1 ? 'active' : ''"></i>
            <i class="iconfont icon-arrow_down_fat" :class="item.status == 2 ? 'active' : ''"></i>
          </div>
        </li>
      </ul>
    </div>
    <section ref="sectionMain">
      <div>
        <ul v-if="goodsList.length">
          <li v-for="(item, index) in goodsList" :key="index">
            <img v-lazy="item.imgUrl" alt="" />
            <h3>{{ item.name }}</h3>
            <div class="price">
              <div>
                <span>￥</span><b>{{ item.price }}</b>
              </div>
              <div>立即购买</div>
            </div>
          </li>
        </ul>
        <h5 v-else>暂无数据……</h5>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/search/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import BetterScroll from 'better-scroll'
export default {
  name: 'search-list',
  components: { Header, Tabbar },
  data() {
    return {
      oBetterScroll: '',
      goodsList: [],
      searchList: {
        currentIndex: 0,
        data: [
          // status:0 都不亮  status:1 上箭头亮    status:2 下箭头亮
          // key -> 数据库的键值
          { name: '综合', key: 'complete' },
          { name: '价格', status: 0, key: 'price' },
          { name: '销量', status: 0, key: 'num' }
        ]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      http
        .$axios({
          url: '/api/goods/shopList',
          params: {
            searchName: this.$route.query.key,
            ...this.orderBy
          }
        })
        .then((res) => {
          this.goodsList = res
          // console.log(res)
        })

      // 当 DOM 加载完毕再执行
      this.$nextTick(() => {
        new BetterScroll(this.$refs.sectionMain)
      })
    },
    changeTab(index) {
      this.searchList.currentIndex = index
      // 点击的下标对应数据的哪个
      let item = this.searchList.data[index]
      // 取消所有的状态值 == 都变成 0
      this.searchList.data.forEach((v, i) => {
        if (i != index) {
          v.status = 0
        }
      })

      // 当前点击的改变状态
      if (index == this.searchList.currentIndex) {
        item.status = item.status == 1 ? 2 : 1
      }

      // 发送请求进行数据排序
      this.getData()
    }
  },
  watch: {
    $route() {
      this.getData()
    }
  },
  computed: {
    orderBy() {
      // 知道当前是哪个对象
      let obj = this.searchList.data[this.searchList.currentIndex]
      // 针对于状态，判断是升序还是降序
      let val = obj.status == 1 ? 'asc' : 'desc'
      return { [obj.key]: val }
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.headers ul {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  font-size: 16px;
}
.headers ul li {
  display: flex;
  align-items: center;
}
.headers ul li > div {
  padding: 0 3px;
}
.headers ul li .search-filter {
  display: flex;
  flex-direction: column;
}
section {
  flex: 1;
  overflow: hidden;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 50%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 170px;
        height: 170px;
      }
    }
  }
}
section ul li img[lazy='loading'] {
  background-color: #f7f7f7;
}
section ul li h3 {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #222;
  font-weight: 500;
}
section ul li .price {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px 0;
}
section ul li .price div:last-child {
  color: #fff;
  background-color: red;
  padding: 3px 6px;
  border-radius: 6px;
}
section ul li .price div:first-child span {
  color: red;
  font-size: 12px;
}
section ul li .price div:first-child b {
  color: red;
  font-size: 16px;
}
.active {
  color: red;
}
</style>
