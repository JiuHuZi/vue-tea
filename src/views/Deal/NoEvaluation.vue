<template>
  <!-- 待评价模块 -->
  <div class="NoEvaluation">
    <h1 v-if="list">待评价</h1>
    <van-empty image="search" description="暂无待评价" />
  </div>
</template>

<script>
export default {
  name: 'NoEvaluation',
  data() {
    return {
      list: null
    }
  }
}
</script>

<style lang="less" scoped></style>
