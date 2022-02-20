<template>
  <header>
    <div class="logo"><img src="@/assets/images/logo.png" alt="" /></div>
    <div class="search" @click="goSearch">
      <i class="iconfont icon-Magnifier"></i>
      <span>搜您喜欢的……</span>
    </div>
    <div>
      <i class="iconfont icon-kefu kefu"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goSearch() {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
header {
  background-color: #ff585d;
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
header .logo {
  width: 75px;
  height: 44px;
  display: flex;
  align-items: center;
}
header .logo img {
  width: 100%;
  height: 34px;
}
.search {
  width: 246px;
  height: 30px;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
}
.search i {
  padding: 16px;
  color: #ccc;
}
.search span {
  font-size: 14px;
  color: #ccc;
}
.kefu {
  color: #fff;
  font-size: 26px;
  text-align: center;
  display: flex;
}
</style>
