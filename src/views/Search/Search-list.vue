<template>
  <div class="search-list">
    <div class="headers">
      <Header></Header>
      <ul>
        <li>
          <div>综合</div>
        </li>
        <li>
          <div>价格</div>
          <div class="search-filter">
            <i class="iconfont icon-arrow_up_fat"></i>
            <i class="iconfont icon-arrow_down_fat"></i>
          </div>
        </li>
        <li>
          <div>销量</div>
          <div class="search-filter">
            <i class="iconfont icon-arrow_up_fat"></i>
            <i class="iconfont icon-arrow_down_fat"></i>
          </div>
        </li>
      </ul>
    </div>
    <section>
      <ul>
        <li>
          <img src="@/assets/images/goods1.jpg" alt="" />
          <h3>赛事茶-第三届武夷山茶叶交易会暨仙店杯-优质奖肉桂160g</h3>
          <div class="price">
            <div><span>￥</span><b>238</b></div>
            <div>立即购买</div>
          </div>
        </li>
        <li>
          <img src="@/assets/images/goods1.jpg" alt="" />
          <h3>赛事茶-第三届武夷山茶叶交易会暨仙店杯-优质奖肉桂160g</h3>
          <div class="price">
            <div><span>￥</span><b>238</b></div>
            <div>立即购买</div>
          </div>
        </li>
        <li>
          <img src="@/assets/images/goods1.jpg" alt="" />
          <h3>赛事茶-第三届武夷山茶叶交易会暨仙店杯-优质奖肉桂160g</h3>
          <div class="price">
            <div><span>￥</span><b>238</b></div>
            <div>立即购买</div>
          </div>
        </li>
      </ul>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/search/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
export default {
  name: 'search-list',
  components: { Header, Tabbar }
}
</script>

<style scoped>
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
}
section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
section ul li {
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
section ul li img {
  width: 170px;
  height: 170px;
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
</style>
