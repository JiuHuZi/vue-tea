<template>
  <header>
    <div @click="$router.back()"><i class="iconfont icon-fanhui"></i></div>
    <div class="title">
      <slot>
        <span>会员中心</span>
      </slot>
    </div>
    <div @click="$router.push('/signin')">
      <span>每日签到</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'WalletHeader'
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e162b;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
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
      &:last-child {
        padding-right: 10px;
        font-size: 14px;
      }
    }
  }
  .title {
    padding-left: 45px;
    font-weight: bold;
    span {
      font-size: 18px !important;
    }
  }
}
</style>
