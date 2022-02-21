<template>
  <div class="search-index">
    <Header></Header>
    <section>
      <div class="search-history">
        <h2>
          <i class="iconfont icon-shijian"></i>
          <span>历史搜索</span>
          <span class="clear">清空记录</span>
        </h2>
        <ul>
          <li>茶叶</li>
          <li>茶叶</li>
          <li>茶叶</li>
          <li>茶叶</li>
          <li>茶叶</li>
          <li>茶叶</li>
          <li>茶叶</li>
        </ul>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/search/Header.vue'
export default {
  name: 'search-index',
  components: {
    Tabbar,
    Header
  }
}
</script>

<style scoped>
.search-index {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
section {
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;
}
.search-history h2 {
  padding: 20px;
  font-size: 16px;
  font-weight: 600;
  position: relative;
}
.search-history i {
  color: red;
  padding-right: 3px;
}
.search-history ul {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
}
.search-history ul li {
  border: 1px solid #ccc;
  font-size: 14px;
  padding: 3px 6px;
  margin: 10px;
}
.search-history .clear {
  position: absolute;
  right: 20px;
}
</style>
