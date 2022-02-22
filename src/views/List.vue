<template>
  <div class="list">
    <header>
      <div class="returns"><i class="iconfont icon-fanhui"></i></div>
      <div class="search"><i class="iconfont icon-Magnifier"></i> <span>搜您喜欢的……</span></div>
      <div class="go-home"><i class="iconfont icon-shouye"></i></div>
    </header>
    <section>
      <div class="list-l">
        <ul class="l-item">
          <li class="active">推荐</li>
          <li>推荐</li>
          <li>推荐</li>
          <li>推荐</li>
        </ul>
      </div>
      <div class="list-r">
        <ul>
          <li class="shop-list">
            <h2>推荐</h2>
            <ul class="r-content">
              <li>
                <img src="@/assets/images/list1.jpeg" alt="" />
                <span>铁观音</span>
              </li>
              <li>
                <img src="@/assets/images/list1.jpeg" alt="" />
                <span>铁观音</span>
              </li>
              <li>
                <img src="@/assets/images/list1.jpeg" alt="" />
                <span>铁观音</span>
              </li>
              <li>
                <img src="@/assets/images/list1.jpeg" alt="" />
                <span>铁观音</span>
              </li>
              <li>
                <img src="@/assets/images/list1.jpeg" alt="" />
                <span>铁观音</span>
              </li>
              <li>
                <img src="@/assets/images/list1.jpeg" alt="" />
                <span>铁观音</span>
              </li>
              <li>
                <img src="@/assets/images/list1.jpeg" alt="" />
                <span>铁观音</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '@/components/common/Tabbar.vue'
export default {
  name: 'List',
  components: {
    Tabbar
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
        font-size: 34px;
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
          line-height: 50px;
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
}
</style>
