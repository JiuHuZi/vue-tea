<template>
  <header>
    <div class="search-return">
      <i class="iconfont icon-fanhui" @click="$router.back()"></i>
    </div>
    <div class="search-main">
      <i class="iconfont icon-Magnifier"></i>
      <form action="" onsubmit="return false">
        <input type="search" placeholder="搜索您喜欢的产品..." />
      </form>
    </div>
    <div class="search-btn" @click="goSearchList">搜索</div>
  </header>
</template>

<script>
export default {
  name: 'searchHeader',
  methods: {
    goSearchList() {
      this.$router.push({ name: 'slist' })
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
