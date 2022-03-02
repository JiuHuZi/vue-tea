<template>
  <div class="path-index container">
    <Header></Header>
    <section>
      <ul>
        <li @click="goList">
          <div class="path-main">
            <div>
              <span>张三</span>
              <span>13144274876</span>
            </div>
            <div>
              <span class="active">[默认]</span>
              <span>天津 天津市 和平区 3434</span>
            </div>
          </div>

          <i class="iconfont icon-fanhui path-icon"></i>
        </li>
      </ul>
      <div class="add-path" @click="goList">添加地址</div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/path/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
export default {
  name: 'PathIndex',
  components: {
    Header,
    Tabber
  },
  methods: {
    goList() {
      this.$router.push({
        name: 'pathlist'
      })
    }
  }
}
</script>

<style lang="less" scoped>
section {
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  ul {
    width: 100%;
    li {
      background-color: #fff;
      margin: 6px 0;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .path-main {
        div {
          padding: 8px 0;
          display: flex;
          align-items: center;
          span {
            font-size: 16px;
            padding-right: 15px;
          }
        }
      }
      .path-icon {
        transform: rotate(180deg);
        font-size: 25px;
      }
      .active {
        color: #b0352f;
      }
    }
  }
  .add-path {
    background-color: #b0352f;
    color: #fff;
    width: 120px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    border-radius: 6px;
    margin: 10px auto;
  }
}

::v-deep .tabbar {
  border-top: 1px solid #ddd;
}
</style>
