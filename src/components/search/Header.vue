<template>
  <header>
    <div class="search-return">
      <i class="iconfont icon-fanhui" @click="$router.back()"></i>
    </div>
    <div class="search-main">
      <i class="iconfont icon-Magnifier"></i>
      <form action="" onsubmit="return false" @keyup.enter="goSearchList">
        <input type="search" placeholder="搜索您喜欢的产品..." v-model="searchVal" />
      </form>
    </div>
    <div class="search-btn" @click="goSearchList">搜索</div>
  </header>
</template>

<script>
export default {
  name: 'searchHeader',
  data() {
    return {
      searchVal: this.$route.query.key || '',
      searchArr: []
    }
  },
  methods: {
    goSearchList() {
      // 如果搜索的关键字是没有的，那就直接 return
      if (!this.searchVal) return

      // 判断之前有没有搜索的本地存储
      if (!localStorage.getItem('searchList')) {
        // 没有
        localStorage.setItem('searchList', '[]')
      } else {
        // 之前有
        this.searchArr = JSON.parse(localStorage.getItem('searchList'))
      }

      // 增加数据
      this.searchArr.unshift(this.searchVal)
      // ES6去重
      let newArr = new Set(this.searchArr)

      // 给本地存储赋值
      localStorage.setItem('searchList', JSON.stringify(Array.from(newArr)))

      // 路径如果没有变化，不跳转页面
      if (this.searchVal === this.$route.query.key) return

      // 跳转页面
      this.$router.push({
        name: 'slist',
        query: {
          key: this.searchVal
        }
      })
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff585d;
  color: #fff;
}
.search-return,
.search-btn {
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.search-return i {
  font-size: 28px;
}
.search-btn {
  font-size: 16px;
  line-height: 44px;
}
.search-main {
  background-color: #fff;
  border-radius: 12px;
  width: 7rem;
  height: 30px;
  display: flex;
  align-items: center;
}
.search-main i {
  padding: 0 10px;
  color: #666;
}
.search-main form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.search-main form input {
  width: 100%;
}
</style>
