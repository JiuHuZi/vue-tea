<template>
  <div class="path-index container">
    <Header>
      <span>添加地址</span>
    </Header>
    <section>
      <van-address-edit :area-list="areaList" show-set-default @save="onSave" />
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/path/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
import { Toast } from 'vant'
import http from '@/common/api/request.js'
export default {
  name: 'PathList',
  components: {
    Header,
    Tabber
  },
  data() {
    return {
      searchResult: [],
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
  methods: {
    // 点击保存触发
    onSave(content) {
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
          this.$router.push('/path')
        })
    }
  }
}
</script>

<style lang="less" scoped>
section {
  background-color: #f7f7f7;
  .van-address-edit {
    padding: 0;
  }
  ::v-deep .van-address-edit__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .van-button--danger {
    background-color: #ff585d;
    border-color: #ff585d;
    width: 300px;
    height: 40px;
  }
}

::v-deep .tabbar {
  border-top: 1px solid #ddd;
}
</style>
