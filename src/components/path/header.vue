<template>
  <header>
    <i class="iconfont icon-fanhui" @click="goBack"></i>
    <slot>
      <span>我的地址</span>
    </slot>
    <i class="iconfont icon-kefu"></i>
  </header>
</template>

<script>
export default {
  name: 'pathHeader',
  methods: {
    goBack() {
      if (this.$route.name == 'pathlist') {
        this.$router.replace('/path')
      } else if (this.$route.fullPath == '/path?type=select') {
        this.$router.back()
      } else {
        this.$router.push('/my')
      }
    }
  }
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
