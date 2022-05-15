<template>
  <!-- 未发货模块 -->
  <div class="unshipped">
    <h1 v-if="list">未发货</h1>
    <van-empty image="search" description="暂无待发货" />
  </div>
</template>

<script>
export default {
  name: 'unshipped',
  data() {
    return {
      list: null
    }
  }
}
</script>

<style lang="less" scoped></style>
