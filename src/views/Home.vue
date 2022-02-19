<template>
  <div class="home">
    <div class="headers">
      <div class="headers-main">
        <Header></Header>
        <ly-tab v-model="selectedId" :items="items" :options="options"> </ly-tab>
      </div>
    </div>
    <section class="wrapper">
      <div>
        <Swiper></Swiper>
        <Icons></Icons>
        <Recommend></Recommend>
        <Like></Like>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/home/Header.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import Recommend from '@/components/home/Recommend.vue'
import Like from '@/components/home/Like.vue'

// 引入插件
import BetterScroll from 'better-scroll'
export default {
  name: 'Home',
  components: {
    Tabbar,
    Header,
    Swiper,
    Icons,
    Recommend,
    Like
  },
  data() {
    return {
      selectedId: 0,
      items: [{ label: '推荐' }, { label: '大红袍' }, { label: '铁观音' }, { label: '绿茶' }, { label: '普洱' }, { label: '单枞茶' }, { label: '花茶' }, { label: '茶具' }],
      options: {
        activeColor: '#ff585d'
      }
    }
  },
  mounted() {
    new BetterScroll('.wrapper', {
      movable: true,
      zoom: true
    })
  }
}
</script>
<style scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.headers {
  width: 100%;
  height: 95px;
}
.headers-main {
  position: fixed;
  left: 0;
  top: 0;
}
::v-deep .ly-tabbar {
  box-shadow: none;
  border-bottom: none;
}
section {
  flex: 1;
  overflow: hidden;
}
</style>
