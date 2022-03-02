<template>
  <header>
    <i class="iconfont icon-fanhui" @click="$router.back()"></i>
    <slot>
      <span>我的地址</span>
    </slot>
    <i class="iconfont icon-kefu"></i>
  </header>
</template>

<script>
export default {
  name: 'pathHeader'
}
</script>

<style lang="less" scoped>
header {
  background-color: #ff585d;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  i {
    padding: 0 20px;
    font-size: 22px;
  }
  span {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
