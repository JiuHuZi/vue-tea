<template>
  <div class="integral">
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

    <section>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <li v-for="(item, index) in goodsList" :key="index" @click="goDetail(item.id)">
            <img v-lazy="item.imgUrl" alt="" />
            <h3>{{ item.name }}</h3>
            <div class="price">
              <div>
                <span>积分：</span><b>{{ item.integral }}</b>
              </div>
              <div>立即兑换</div>
            </div>
          </li>
        </van-list>
      </van-pull-refresh>
    </section>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/integral/header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
export default {
  name: 'Integral',
  components: { Header, Tabbar },
  data() {
    return {
      // 是否正在加载下一页数据，如果 loading 为 true，则不会反复触发 load 事件
      // 每当下一页数据请求回来之后，千万要记得，把 loading 改成 false
      loading: true,
      // 所有数据是否加载完毕，如果没有更多数据，一定要把 finished 改成true
      finished: false,
      // 是否正在下拉刷新
      isLoading: false,
      limit: 8,
      page: 0,
      // oBetterScroll: '',
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
  methods: {
    getData(isRefresh) {
      http
        .$axios({
          url: '/api/goods/integralList',
          params: {
            limit: this.limit,
            page: this.page,
            ...this.orderBy
          }
        })
        .then((res) => {
          console.log(res)
          if (isRefresh) {
            // 证明是下拉刷新,新数据在前,旧数据在后
            this.goodsList = [...res, ...this.goodsList]
            this.isLoading = false
          } else {
            // 如果是上拉加载更多，那么就是
            // this.goodsList = [旧数据,新数据]
            this.goodsList = [...this.goodsList, ...res]

            this.loading = false
          }

          if (res.length === 0) {
            // 证明没有下一页数据了，直接把 finished 改成 true,表示数据加载完了
            this.finished = true
          }
          // this.goodsList.unshift(...res)
          // this.goodsList = res
          this.goodsList.forEach((v) => {
            v['integral'] = v.price * 20
          })
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
      this.page = 0
      if (this.page == 0) {
        this.goodsList = []
        this.finished = false
      }
      this.getData()
    },
    goDetail(val) {
      this.$router.push(`/integralDetail?id=${val}`)
    },
    onLoad() {
      console.log('触发了 load 事件')
      // 1.让页码值 +1
      this.page++
      // 2. 重新请求接口获取数据
      this.getData()
    },
    // 下拉刷新的处理函数
    onRefresh() {
      console.log('触发 下拉刷新 事件')
      // 1.页码值 +1
      this.page++
      // 2.重新请求接口获取数据
      this.getData(true)
    }
  },
  created() {
    this.getData()
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
.integral {
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
  .van-pull-refresh {
    width: 100%;
    height: 100%;
    overflow: scroll;
    .van-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-bottom: 30px;
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
}
section .van-list li img[lazy='loading'] {
  background-color: #f7f7f7;
}
section .van-list li h3 {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #222;
  font-weight: 500;
}
section .van-list li .price {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px 0;
}
section .van-list li .price div:last-child {
  color: #fff;
  background-color: red;
  padding: 3px 6px;
  border-radius: 6px;
}
section .van-list li .price div:first-child span {
  color: red;
  font-size: 12px;
}
section .van-list li .price div:first-child b {
  color: red;
  font-size: 16px;
}
.active {
  color: red;
}
::v-deep .van-list__finished-text {
  flex: 1;
}
</style>
