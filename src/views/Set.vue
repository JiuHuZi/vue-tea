<template>
  <div id="set">
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
  </div>
</template>

<script>
import http from '@/common/api/request.js'
export default {
  name: 'Set',
  data() {
    return {
      username: '',
      uploader: []
    }
  },
  methods: {
    onSubmit(values) {
      console.log(values.uploader[0].file)
      const formData = new FormData()
      formData.append('file', values.uploader[0].file)

      http
        .$axios({
          url: '/api/set',
          method: 'POST',
          headers: {
            token: true
          }
        })
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
