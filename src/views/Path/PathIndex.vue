<template>
  <div class="path-index container">
    <Header></Header>
    <section>
      <ul v-if="list.length">
        <li @click="goList" v-for="(item, index) in list" :key="index">
          <div class="path-main">
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.tel }}</span>
            </div>
            <div>
              <span class="active" v-if="item.isDefault == 1">[默认]</span>
              <span>{{ item.province }} {{ item.city }} {{ item.county }} {{ item.addressDetail }}</span>
            </div>
          </div>

          <i class="iconfont icon-fanhui path-icon"></i>
        </li>
      </ul>
      <h5 style="text-align: center" v-else>暂无数据，请添加地址</h5>
      <div class="add-path" @click="goList">添加地址</div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/path/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'PathIndex',
  components: {
    Header,
    Tabber
  },
  methods: {
    ...mapMutations(['initData']),
    goList() {
      this.$router.push({
        name: 'pathlist'
      })
    },
    getData() {
      http
        .$axios({
          url: '/api/selectAddress',
          method: 'POST',
          headers: {
            token: true
          }
        })
        .then((res) => {
          this.initData(res.data)
          console.log(res.data)
        })
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState({
      list: (state) => state.path.list
    })
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
