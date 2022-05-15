<template>
  <!-- 未付款模块 -->
  <div class="arrearage">
    <h1 v-if="list">未付款</h1>
    <van-empty image="search" description="暂无未付款" />
  </div>
</template>

<script>
export default {
  name: 'arrearage',
  data() {
    return {
      list: null
    }
  }
}
</script>

<style lang="less" scoped></style>
