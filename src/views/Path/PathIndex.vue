<template>
  <div class="path-index container">
    <Header></Header>
    <section>
      <van-pull-refresh v-model="isLoading" :disabled="finished">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
          <ul v-if="list.length">
            <li v-for="(item, index) in list" :key="index" @click="goList(item)">
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
        </van-list>
      </van-pull-refresh>
      <div class="add-path" @click="goList('add')">+</div>

      <path-list v-if="show" @close="close" :pathStatus="pathStatus" :addInfo="addInfo"></path-list>
    </section>

    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/path/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import { mapMutations, mapState } from 'vuex'
import bus from '@/common/bus.js'
import pathList from '@/views/Path/PathList.vue'
export default {
  name: 'PathIndex',
  data() {
    return {
      loading: true,
      finished: true,
      isLoading: false,
      pathStatus: false,
      pathRouterStatus: false,
      show: false,
      addInfo: {}
    }
  },
  components: {
    Header,
    Tabber,
    pathList
  },
  methods: {
    ...mapMutations(['initData']),
    goList(options) {
      if (options == 'add') {
        this.pathStatus = true
      } else {
        if (this.pathRouterStatus) {
          bus.$emit('selectPath', JSON.stringify(options))
          this.$router.back()
          return
        }
        this.addInfo = options
        this.pathStatus = false
      }
      this.show = true
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
        })
    },
    close(status) {
      this.show = status
    }
  },
  created() {
    // 从订单页进来的
    if (this.$route.query.type == 'select') {
      this.pathRouterStatus = true
    }

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
  .van-pull-refresh {
    width: 100%;
    height: 100%;
    overflow: scroll;

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
  }
  .add-path {
    background-color: #ff585d;
    color: #fff;
    width: 70px;
    line-height: 70px;
    font-size: 40px;
    text-align: center;
    border-radius: 50%;
    margin: 10px auto;
    position: fixed;
    right: 10px;
    bottom: 70px;
  }
}
::v-deep .van-address-edit {
  padding: 0;
}
::v-deep .van-address-edit__buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
::v-deep .van-button--danger {
  background-color: #ff585d;
  border-color: #ff585d;
}
::v-deep .van-button {
  width: 300px;
  height: 40px;
}

::v-deep .van-popup {
  width: 85vw;
  border-radius: 15px;
  .title {
    text-align: center;
    font-size: 18px;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
}

::v-deep .tabbar {
  border-top: 1px solid #ddd;
}
</style>
