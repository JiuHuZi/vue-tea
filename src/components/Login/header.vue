<template>
  <header>
    <div @click="$router.back()"><i class="iconfont icon-fanhui"></i></div>
    <div>
      <slot>
        <span>登录</span>
      </slot>
    </div>
    <div><i class="iconfont icon-shouye"></i></div>
  </header>
</template>

<script>
export default {
  name: 'LoginHeader'
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff585d;
  width: 100%;
  height: 44px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    i {
      font-size: 22px;
      padding: 0 10px;
    }
    span {
      font-size: 18px;
    }
  }
}
</style>
