<template>
  <!-- 待收货模块 -->
  <div class="WaitReceiving">
    <h1 v-if="list">待收货</h1>
    <van-empty image="search" description="暂无待收货" />
  </div>
</template>

<script>
export default {
  name: 'WaitReceiving',
  data() {
    return {
      list: null
    }
  }
}
</script>

<style lang="less" scoped></style>
