<template>
  <div class="my container">
    <header>
      <div class="login" @click="goLogin" v-if="!loginStatus">登录 / 注册</div>
      <div class="user-info" v-else>
        <i class="iconfont icon-xinxi email"></i>

        <div>
          <div class="imgUrl" @click="changeImg">
            <img :src="userInfo.imgUrl" alt="" />
            <i class="iconfont icon-shezhi imgSet"></i>
          </div>
          <van-popup v-model="isShowImg" round position="top" :style="{ height: '30%' }">
            <van-form @submit="onSubmitImg" class="changeNameForm">
              <h5>修改头像</h5>
              <van-field name="uploader" label="文件上传">
                <template #input>
                  <van-uploader v-model="uploader" :before-read="beforeRead" :max-count="1" />
                </template>
              </van-field>
              <div style="margin: 16px">
                <van-button round block type="info" native-type="submit">提交</van-button>
              </div>
            </van-form>
          </van-popup>
        </div>

        <div>
          <div class="userName">
            <div class="userName-content">
              <van-badge :content="isMember ? '大会员' : '正式会员'" :class="isMember ? 'member' : 'notMember'" />
              <div @click="changeName">
                <span :class="isMember ? 'memberName' : ''">{{ userInfo.nickName }}</span>
                <i class="iconfont icon-xiugai"></i>
              </div>
            </div>
          </div>
          <van-popup v-model="isShowName" round position="bottom" :style="{ height: '30%' }">
            <van-form @submit="onSubmitName" class="changeNameForm">
              <h5>修改用户名</h5>
              <van-field v-model="username" name="新用户名" label="新用户名" placeholder="新用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
              <div style="margin: 16px">
                <van-button round block type="info" native-type="submit">提交</van-button>
              </div>
            </van-form>
          </van-popup>
        </div>
        <div class="uid">
          <span>UID:{{ userInfo.id }}</span>
        </div>
      </div>
    </header>

    <section>
      <div style="background-color: #fff">
        <div class="section_title" v-if="loginStatus">个人中心</div>
        <ul>
          <li v-if="loginStatus" @click="goStart">
            <div>
              <i class="iconfont icon-shoucang icons"></i>
              <span>我的收藏</span>
            </div>
            <i class="iconfont icon-fanhui go-out"></i>
          </li>
          <li v-if="loginStatus" @click="goPath">
            <div>
              <i class="iconfont icon-dizhi icons"></i>
              <span>地址管理</span>
            </div>
            <i class="iconfont icon-fanhui go-out"></i>
          </li>
          <li v-if="loginStatus" @click="goWallet">
            <div>
              <i class="iconfont icon-licai icons"></i>
              <span>我的钱包</span>
            </div>
            <i class="iconfont icon-fanhui go-out"></i>
          </li>
          <li v-if="loginStatus" @click="goEdit">
            <div>
              <i class="iconfont icon-shezhi icons"></i>
              <span>修改密码</span>
            </div>
            <i class="iconfont icon-fanhui go-out"></i>
          </li>
        </ul>
      </div>

      <div style="background-color: #fff; margin-top: 10px">
        <div class="section_title" v-if="loginStatus">优惠福利</div>
        <ul>
          <li v-if="loginStatus">
            <div>
              <i class="iconfont icon-youhuiquan icons"></i>
              <span>优惠券</span>
            </div>
            <i class="iconfont icon-fanhui go-out"></i>
          </li>
        </ul>
      </div>

      <div v-if="loginStatus" @click="loginOut" class="loginout">
        <i class="iconfont icon-tuichu" style="padding-right: 5px"></i>
        <span>退出登录</span>
      </div>
    </section>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import { Toast } from 'vant'
export default {
  name: 'My',
  components: {
    Tabbar
  },
  data() {
    return {
      isShowImg: false,
      isShowName: false,
      username: '',
      uploader: [],
      isMember: false
    }
  },
  methods: {
    ...mapMutations(['loginOut', 'USER_LOGIN']),
    goLogin() {
      this.$router.push('/login')
    },
    // 进入地址管理
    goPath() {
      this.$router.push('/path')
    },
    // 进入我的钱包
    goWallet() {
      this.$router.push('/wallet')
    },
    // 进入我的收藏
    goStart() {
      this.$router.push('/start')
    },
    // 进入修改密码
    goEdit() {
      this.$router.push('/editPassword')
    },
    getData() {
      if (localStorage.getItem('teauserInfo') != null) {
        http
          .$axios({
            url: '/api/selectUser',
            method: 'POST',
            data: {
              phone: JSON.parse(localStorage.getItem('teauserInfo')).tel
            }
          })
          .then((res) => {
            // console.log(res.data[0])
            this.USER_LOGIN(res.data[0])
            this.isMember = this.userInfo.member == '1' ? true : false
          })
      }
    },
    // 点击名字显示弹出层
    changeName() {
      this.isShowName = true
    },
    // 修改用户名
    onSubmitName() {
      http
        .$axios({
          url: '/api/updateUser',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            username: this.username
          }
        })
        .then((res) => {
          if (res.code == 200) {
            this.USER_LOGIN(res.data[0])
            this.isShowName = false
            this.username = ''
            Toast(res.msg)
          } else if (res.code == 0) {
            Toast(res.msg)
          }
        })
    },
    // 点击头像显示弹出层
    changeImg() {
      this.isShowImg = true
    },
    // 判断上传的文件是不是图片
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片')
        return false
      }
      return true
    },
    // 修改头像
    onSubmitImg(values) {
      let name = JSON.parse(localStorage.getItem('teauserInfo')).nickName
      const formData = new FormData()
      formData.append('file', values.uploader[0].file)
      formData.append('uname', name)
      fetch('/api/set', {
        method: 'post',
        body: formData
      }).then(async (res) => {
        const data = await res.json()
        if (data.code == 200) {
          http
            .$axios({
              url: '/api/updateheaderImg',
              method: 'POST',
              headers: {
                token: true
              },
              data: {
                imgUrl: data.results
              }
            })
            .then((ress) => {
              this.USER_LOGIN(ress.data[0])
              this.isShowImg = false
            })
        }
      })
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      loginStatus: (state) => state.user.loginStatus
    })
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.my {
  header {
    background-color: #b0352f;
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .email {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 26px;
      color: #fff;
      font-weight: 500;
    }
    .login {
      font-size: 16px;
      background-color: #f6ab32;
      color: #fff;
      border-radius: 6px;
      padding: 6px 20px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .imgUrl {
        position: relative;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 5px solid rgb(60, 34, 0);
        }
        .imgSet {
          z-index: 99;
          color: #fff;
          font-size: 22px;
          font-weight: bold;
          position: absolute;
          right: 0px;
          bottom: 10px;
        }
      }
      .userName {
        position: relative;
        .userName-content {
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .member {
            background-color: rgb(251, 114, 153);
            color: #fff;
          }
          .notMember {
            background-color: #ccd0d7;
            color: #99a2aa;
          }
          .van-badge {
            border: none;
            padding: 2px 5px;
            text-align: center;
            margin-right: 5px;
            margin-top: 3px;
          }
        }
        span {
          color: #fff;
          font-size: 18px;
          padding: 10px 0;
        }
        i {
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          margin-top: 5px;
        }
      }
    }
    .uid {
      position: absolute;
      right: 10px;
      bottom: 10px;
      font-size: 14px;
      color: #fff;
      opacity: 0.7;
    }
  }
  section {
    background-color: #f5f5f5;
    .section_title {
      font-size: 14px;
      color: #999;
      padding: 10px 15px;
      border-bottom: 1px solid #eee;
    }
    ul li {
      padding: 15px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      .go-out {
        transform: rotate(180deg);
      }
      div {
        display: flex;
        .icons {
          color: red;
          margin-right: 10px;
          font-size: 18px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
  .loginout {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    background-color: red;
    margin: 15px;
    border-radius: 5px;
    color: #fff;
    span {
      font-size: 16px;
    }
  }
}
.changeNameForm {
  h5 {
    text-align: center;
    padding: 10px 0;
    font-size: 20px;
  }
}
.van-button--info {
  background-color: #ff585d;
  border-color: #ff585d;
}
.memberName {
  color: #fde000 !important;
}
</style>
