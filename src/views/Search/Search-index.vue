<template>
  <div class="search-index">
    <Header></Header>
    <section>
      <div class="search-history" v-if="searchArr.length">
        <h2>
          <i class="iconfont icon-shijian"></i>
          <span>历史搜索</span>
          <span class="clear" @click="delStorage">清空历史记录</span>
        </h2>
        <ul>
          <li v-for="(item, index) in searchArr" :key="index" @click="goSearchList(item)">{{ item }}</li>
        </ul>
      </div>
      <div class="notSearchList" v-else>暂无搜索记录……</div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/search/Header.vue'

import { MessageBox } from 'mint-ui'
export default {
  name: 'search-index',
  components: {
    Tabbar,
    Header
  },
  data() {
    return {
      searchArr: []
    }
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem('searchList')) || []
  },
  methods: {
    delStorage() {
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      }).then((res) => {
        if (res == 'confirm') {
          // 删除本地存储
          localStorage.removeItem('searchList')
          // 清空数据
          this.searchArr = []
        }
      })
    },
    // 点击历史搜索，进入搜索结果页面
    goSearchList(item) {
      // console.log(item)
      // 跳转页面
      this.$router.push({
        name: 'slist',
        query: {
          key: item
        }
      })
    }
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
  position: fixed;
}
section {
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;
  position: relative;
  margin-top: 44px;
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
.notSearchList {
  font-size: 16px;
  padding: 6px;
  margin: 10px;
}
</style>
