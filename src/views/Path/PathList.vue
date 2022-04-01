<template>
  <div class="path-index container">
    <van-popup v-model="isShow" closeable @close="close">
      <div>
        <div class="title">
          <span v-if="pathStatus">添加收货地址</span>
          <span v-else>编辑收货地址</span>
        </div>
        <van-address-edit :area-list="areaList" show-set-default @save="onAdd" v-if="pathStatus" />
        <van-address-edit v-else :address-info="AddressInfo" :area-list="areaList" show-delete show-set-default @save="onUpdate" @delete="onDelete" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import http from '@/common/api/request.js'
import { areaList } from '@vant/area-data'
export default {
  name: 'PathList',
  data() {
    return {
      AddressInfo: {},
      areaList,
      isShow: true
      // pathStatus: false,
    }
  },
  props: ['pathStatus', 'addInfo'],
  created() {
    this.AddressInfo = this.addInfo
    this.AddressInfo.areaCode = this.addInfo.areaCode
    this.AddressInfo.isDefault = this.AddressInfo.isDefault == 1 ? true : false
  },

  methods: {
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
      console.log(content)
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
    },
    close() {
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
