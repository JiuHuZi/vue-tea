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
      <div class="add-path" @click="goList('add')">添加地址</div>

      <van-popup v-model="show" closeable>
        <div class="title">
          <span v-if="pathStatus">添加收货地址</span>
          <span v-else>编辑收货地址</span>
        </div>
        <van-address-edit :area-list="areaList" show-set-default @save="onAdd" v-if="pathStatus" />
        <van-address-edit v-else :address-info="AddressInfo" :area-list="areaList" show-delete show-set-default @save="onUpdate" @delete="onDelete" />
      </van-popup>
    </section>

    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/path/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import { Toast } from 'vant'
import { mapMutations, mapState } from 'vuex'
import bus from '@/common/bus.js'

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
      AddressInfo: {},
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          120100: '天津市'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          120101: '塘沽区'
          // ....
        }
      }
    }
  },
  components: {
    Header,
    Tabber
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
        this.pathStatus = false
        this.AddressInfo = options
        this.AddressInfo.areaCode = options.areaCode
        this.AddressInfo.isDefault = this.AddressInfo.isDefault == 1 ? true : false
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
    // 点击保存触发  => 增加
    onAdd(content) {
      content.isDefault = content.isDefault == true ? 1 : 0
      http
        .$axios({
          url: '/api/addAddress',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            ...content
          }
        })
        .then((res) => {
          if (!res.success) return
          Toast(res.msg)
          this.show = false
          this.$router.go(0)
        })
    },
    // 删除
    onDelete(content) {
      http
        .$axios({
          url: '/api/deleteAddress',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            id: content.id
          }
        })
        .then((res) => {
          if (!res.success) return
          Toast(res.msg)
          this.show = false
          this.$router.go(0)
        })
    },
    // 点击保存触发  => 修改
    onUpdate(content) {
      content.isDefault = content.isDefault == true ? 1 : 0
      http
        .$axios({
          url: '/api/updateAddress',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            ...content
          }
        })
        .then((res) => {
          if (!res.success) return
          Toast(res.msg)
          this.show = false
          this.$router.go(0)
        })
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
