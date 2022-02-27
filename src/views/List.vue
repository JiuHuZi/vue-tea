<template>
  <div class="list">
    <header v-show="isShow">
      <div class="returns"><i class="iconfont icon-fanhui"></i></div>
      <div class="search" @click="$router.push('/search')"><i class="iconfont icon-Magnifier"></i> <span>搜您喜欢的……</span></div>
      <div class="go-home"><i class="iconfont icon-shouye"></i></div>
    </header>
    <section>
      <div class="list-l" ref="left">
        <ul class="l-item">
          <li :class="{ active: index == currentIndex }" v-for="(item, index) in leftData" :key="index" @click="goScroll(index)">{{ item.name }}</li>
        </ul>
      </div>

      <div class="list-r" ref="right">
        <div class="right-main">
          <ul v-for="(item, index) in rightData" :key="index" class="shop-list">
            <li v-for="(k, i) in item" :key="i">
              <h2>{{ k.name }}</h2>
              <ul class="r-content">
                <li v-for="(j, idx) in k.list" :key="idx">
                  <img :src="j.imgUrl" alt="" />
                  <span>{{ j.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import BetterScroll from 'better-scroll'
export default {
  name: 'List',
  data() {
    return {
      isShow: true,
      // 左侧数据
      leftData: [],
      // 右侧数据
      rightData: [],
      // 右侧滑动
      rightBScroll: '',
      // 承载右侧每一块的高度值
      allHeight: [],
      // 右侧滚动距离
      scrollY: ''
    }
  },
  components: {
    Tabbar
  },
  async created() {
    let res = await http.$axios({
      url: '/api/goods/list'
    })

    let leftArr = []
    let rightArr = []

    res.forEach((v) => {
      leftArr.push({
        id: v.id,
        name: v.name
      })
      rightArr.push(v.data)
    })

    this.leftData = leftArr
    this.rightData = rightArr

    // 当 DOM 加载完毕再执行
    this.$nextTick(() => {
      // 左侧滑动
      new BetterScroll(this.$refs.left, {
        // 解决better-scroll 的默认取消 click 事件
        click: true
      })
      // 右侧滑动
      this.rightBScroll = new BetterScroll(this.$refs.right, {
        click: true,
        probeType: 3,
        bounce: false
      })
      // 统计右侧所有板块高度值，并且放入数组中
      let heitht = 0
      this.allHeight.push(heitht)
      // 获取右侧每一块的高度值
      let uls = this.$refs.right.getElementsByClassName('shop-list')
      // 把 DOM 对象转换成真正的数组
      Array.from(uls).forEach((v) => {
        heitht += v.clientHeight
        this.allHeight.push(heitht)
      })

      // 得到右侧滚动的值
      this.rightBScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)

        if (Math.abs(pos.y) >= 50) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      })
    })
  },
  methods: {
    goScroll(index) {
      // console.log(index)
      this.rightBScroll.scrollTo(0, -this.allHeight[index], 300)
    }
  },
  computed: {
    currentIndex() {
      return this.allHeight.findIndex((item, index) => {
        return this.scrollY >= item && this.scrollY < this.allHeight[index + 1]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    background-color: #ff585d;
    .returns {
      padding: 0 20px;
      height: 100%;
      display: flex;
      align-items: center;
      i {
        color: #fff;
        font-size: 22px;
      }
    }
    .search {
      flex: 1;
      background-color: #fff;
      border-radius: 15px;
      padding: 0 10px;
      height: 30px;
      display: flex;
      align-items: center;
      i {
        font-size: 18px;
        color: #666;
      }
      span {
        font-size: 14px;
        color: #666;
        padding: 0 10px;
      }
    }
    .go-home {
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 28px;
        color: #fff;
        line-height: 44px;
      }
    }
  }
  section {
    flex: 1;
    overflow: hidden;
    display: flex;
    .list-l {
      width: 93px;
      background-color: #fff;
      border-right: 1px solid #eee;
      overflow: hidden;
      .l-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        li {
          width: 100%;
          // line-height: 50px;
          margin: 20px 0;
          padding: 3px 0;
          text-align: center;
          font-size: 16px;
          &.active {
            border-left: 6px solid #b54f4a;
            color: red;
          }
        }
      }
    }
    .list-r {
      flex: 1;
      overflow: hidden;
      .shop-list {
        text-align: center;
        h2 {
          font-size: 24px;
          font-weight: 400;
          padding: 20px 0;
        }
        .r-content {
          display: flex;
          flex-wrap: wrap;
          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.3%;
            padding: 10px 0;
            img {
              width: 53px;
              height: 53px;
            }
            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  ::v-deep .tabbar {
    border-top: 1px solid #eee;
  }
  .right-main {
    padding-bottom: 70vh;
  }
}
</style>
