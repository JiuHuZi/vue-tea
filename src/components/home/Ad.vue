<template>
  <div class="ad">
    <ul>
      <li v-for="(item, index) in adList" :key="index">
        <img :src="item.imgUrl" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ad',
  props: {
    adList: Array
  }
}
</script>

<style scoped>
.ad {
  width: 100%;
  /* height: 112px; */
}
.ad img {
  width: 100%;
  height: 100%;
}
</style>
