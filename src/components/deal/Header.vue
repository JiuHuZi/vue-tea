<template>
  <header>
    <i class="iconfont icon-fanhui" @click="$router.push('/my')"></i>
    <div>
      <i class="iconfont icon-Magnifier"></i>
      <span>搜索订单</span>
    </div>
    <i class="iconfont icon-gengduo"></i>
  </header>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  color: #fff;
  background-color: #ff585d;
  padding: 0 10px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  i {
    font-size: 24px;
  }
  div {
    width: 70%;
    line-height: 32px;
    border-radius: 25px;
    font-size: 14px;
    background-color: #fff;
    color: #999;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    i {
      font-size: 16px;
      margin: 0 5px;
    }
  }
}
</style>
