<template>
  <div class="home">
    <Header></Header>
    <ly-tab v-model="selectedId" :items="items" :options="options"> </ly-tab>
    <section>
      <Swiper></Swiper>
      <Icons></Icons>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/home/Header.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
export default {
  name: 'Home',
  components: {
    Tabbar,
    Header,
    Swiper,
    Icons
  },
  data() {
    return {
      selectedId: 0,
      items: [{ label: '推荐' }, { label: '大红袍' }, { label: '铁观音' }, { label: '绿茶' }, { label: '普洱' }, { label: '单枞茶' }, { label: '花茶' }, { label: '茶具' }],
      options: {
        activeColor: '#ff585d'
      }
    }
  }
}
</script>
<style scoped>
.ly-tab {
  position: fixed;
  top: 44px;
  left: 0;
}
::v-deep .ly-tabbar {
  box-shadow: none;
  border-bottom: none;
}
</style>
