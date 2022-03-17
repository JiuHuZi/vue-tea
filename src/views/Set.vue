<template>
  <div class="set container">
    <header>
      <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      <slot>
        <span>我的地址</span>
      </slot>
      <i class="iconfont icon-kefu"></i>
    </header>
    <section>
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="uploader" />
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
import Tabber from '@/components/common/Tabbar.vue'
export default {
  name: 'Set',
  data() {
    return {
      username: '',
      uploader: []
    }
  },
  methods: {
    ...mapMutations(['USER_LOGIN']),
    onSubmit(values) {
      const formData = new FormData()
      formData.append('file', values.uploader[0].file)
      formData.append('uname', this.username)
      fetch('/api/set', {
        method: 'post',
        body: formData
      }).then(async (res) => {
        const data = await res.json()
        if (data.code == 200) {
          http
            .$axios({
              url: '/api/updateUser',
              method: 'POST',
              headers: {
                token: true
              },
              data: {
                imgUrl: data.results,
                username: this.username
              }
            })
            .then((ress) => {
              if (ress.code == 200) {
                this.USER_LOGIN(ress.data[0])
                this.$router.push('/my')
                return
              } else if (ress.code == 0) {
                Toast(ress.msg)
                return
              }
            })
        }
      })
    }
  },
  components: {
    Tabber
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
.van-form {
  padding: 20px 0;
}
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.van-button--info {
  background-color: #ff585d;
  border-color: #ff585d;
}
</style>
