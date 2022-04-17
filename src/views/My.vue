<template>
  <div class="my container">
    <header>
      <div class="login" @click="goLogin" v-if="!loginStatus">登录 / 注册</div>
      <div class="user-info" v-else>
        <div class="headerNav">
          <div class="setting">
            <i class="iconfont icon-shezhi" @click="$router.push('/setting')"></i>
          </div>
          <div class="setting mail">
            <i class="redIcon" v-if="hasMail"></i>
            <i class="iconfont icon-xinxi xinxi" @click="$router.push('/mailindex')"></i>
          </div>
        </div>

        <div class="userInfoContent">
          <div class="border">
            <img :src="userInfo.borderImg" alt="" class="header-border" @click="changeImg" />
            <div class="imgUrl" @click="changeImg">
              <img :src="userInfo.imgUrl" alt="" />
              <i class="iconfont icon-shezhi imgSet"></i>
            </div>

            <van-popup v-model="isShowImg" round position="top" :style="{ height: '35%' }">
              <van-tabs v-model="active">
                <van-tab title="更换头像框">
                  <div>
                    <ul class="border-list">
                      <li v-for="(item, index) in borderList" :key="index" @click="changeBorder(item)">
                        <img :src="item.imgUrl" alt="" />
                        <span>{{ item.name }}</span>
                      </li>
                    </ul>
                  </div>
                </van-tab>
                <van-tab title="更换头像">
                  <van-form @submit="onSubmitImg" class="changeNameForm">
                    <h5>修改头像</h5>
                    <van-field name="uploader" label="文件上传">
                      <template #input>
                        <van-uploader v-model="uploader" :accept="'image/*'" :max-count="1" />
                      </template>
                    </van-field>
                    <div style="margin: 16px">
                      <van-button round block type="info" native-type="submit">提交</van-button>
                    </div>
                  </van-form>
                </van-tab>
              </van-tabs>
            </van-popup>
          </div>

          <div class="info-content" v-if="loginStatus">
            <div class="userName">
              <div class="userName-content">
                <div @click="changeName">
                  <span :class="isMember ? 'memberName' : ''">{{ userInfo.nickName }}</span>
                  <i class="iconfont icon-xiugai"></i>
                </div>
                <div @click="lock">
                  <van-badge :content="isMember ? '大会员' : '正式会员'" :class="isMember ? 'member' : 'notMember'" />
                </div>
              </div>
            </div>
            <van-popup v-model="isShowName" round position="bottom" :style="{ height: '30%' }">
              <van-form @submit="onSubmitName" class="changeNameForm">
                <h5>修改用户名</h5>
                <van-field v-model="username" name="新用户名" label="新用户名" placeholder="新用户名" maxlength="8" :rules="[{ required: true, message: '请填写用户名' }]" />
                <div style="margin: 16px">
                  <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
              </van-form>
            </van-popup>
            <div class="uid">
              <span>UID:{{ userInfo.id }}</span>
            </div>
          </div>
        </div>
      </div>
      <assets-group v-if="loginStatus"></assets-group>
      <order-list v-if="loginStatus"></order-list>
    </header>

    <section>
      <div class="make-money" v-if="loginStatus">
        <h3>天天赚钱</h3>
        <ul>
          <li @click="$router.push('/signin')">
            <div class="imgBox">
              <img src="../assets/images/sigininLogo.gif" alt="" class="signImg" />
            </div>
            <div>
              <h4>签到领积分</h4>
              <span>积分兑换商品</span>
            </div>
          </li>
          <li @click="lock">
            <div class="imgBox">
              <img src="/images/goods-list1.jpeg" alt="" />
            </div>
            <div>
              <h4>优惠券大厅</h4>
              <span>支付立减优惠</span>
            </div>
          </li>
        </ul>
      </div>
      <nav-box v-if="loginStatus"></nav-box>
    </section>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Tabbar from '@/components/common/Tabbar.vue'
import http from '@/common/api/request.js'
import { Toast } from 'vant'
import assetsGroup from '@/components/my/AssetsGroup.vue'
import orderList from '@/components/my/OrderList.vue'
import navBox from '@/components/my/NavBox.vue'
import emoji from 'emoji-regex'
export default {
  name: 'My',
  components: {
    Tabbar,
    assetsGroup,
    orderList,
    navBox
  },
  data() {
    return {
      isShowImg: false,
      isShowName: false,
      username: '',
      uploader: [],
      isMember: false,
      active: 0,
      borderList: [],
      hasMail: false
    }
  },
  methods: {
    ...mapMutations(['USER_LOGIN']),
    goLogin() {
      this.$router.push('/login')
    },
    getData() {
      if (localStorage.getItem('teauserInfo') != null) {
        // 存储用户信息
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

        // 查询是否有未读信息
        http
          .$axios({
            url: '/api/selectUnreadMail',
            method: 'POST',
            headers: {
              token: true
            }
          })
          .then((ress) => {
            if (ress.data.count != 0) {
              this.hasMail = true
            }
          })
      }
    },
    // 点击名字显示弹出层
    changeName() {
      this.isShowName = true
    },
    // 修改用户名
    onSubmitName() {
      let match = emoji().exec(this.username)
      // console.log(match[0])
      if (match != null) {
        Toast.fail('存在 emoji 符号，请重试')
        return
      }
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
      if (this.active == 0) {
        http
          .$axios({
            url: '/api/selectBorderList'
          })
          .then((res) => {
            // console.log(res)
            this.borderList = res.data
          })
      }
    },
    // 修改头像
    onSubmitImg(values) {
      var u = navigator.userAgent
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      if (isIOS) {
        Toast.fail('IOS 系统该功能暂未开放，敬请期待')
        return
      }

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
    },
    // 点击头像框修改头像
    changeBorder(value) {
      http
        .$axios({
          url: '/api/updateBorder',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            imgUrl: value.imgUrl,
            borderID: value.id
          }
        })
        .then((res) => {
          if (res.success) {
            this.USER_LOGIN(res.data[0])
            Toast.success(res.msg)
          } else {
            Toast.fail(res.msg)
          }
          this.isShowImg = false
        })
    },
    // 未开发的功能
    lock() {
      Toast.fail('该功能暂未开放，敬请期待')
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
  overflow: scroll;
  header {
    background-color: rgb(254, 81, 85);
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 99;
    .login {
      width: 33vw;
      line-height: 30px;
      text-align: center;
      font-size: 16px;
      background-color: #f6ab32;
      color: #fff;
      border-radius: 6px;
      padding: 6px 20px;
      margin: calc(200px / 2) auto;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      padding-top: 20px;
      position: relative;
      .headerNav {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        top: 0;

        .setting {
          display: flex;
          margin-top: 5px;
          color: #fff;
          font-weight: 500;
          padding-right: 10px;
          position: relative;
          i {
            font-size: 26px;
          }
          .xinxi {
            transform: rotateY(180deg);
          }
        }
        .mail {
          .redIcon {
            position: absolute;
            right: 25%;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: red;
            z-index: 5;
          }
        }
      }
      .userInfoContent {
        display: flex;

        .border {
          position: relative;
          left: 0;
          width: 130px;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          .header-border {
            position: absolute;
            top: 1px;
            // left: 0;
            width: 125px;
            height: 125px;
            z-index: 10;
          }
          .imgUrl {
            position: absolute;
            img {
              width: 90px;
              height: 90px;
              border-radius: 50%;
              // border: 5px solid rgb(60, 34, 0);
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
        }
        .info-content {
          padding: 10px 5px;
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
                margin-left: 5px;
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
          .uid {
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
  }
  section {
    position: relative;
    background-color: #f5f5f5;
    overflow: initial;
    margin-bottom: 50px;
    margin-top: 10px;
    .make-money {
      width: 96vw;
      margin: 25px auto 0;
      background-color: #fff;
      border-radius: 15px;
      h3 {
        font-size: 18px;
        letter-spacing: 2px;
        padding-left: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      ul {
        display: flex;
        justify-content: center;
        height: 58px;
        width: 100%;
        font-size: 12px;
        padding-bottom: 10px;
        li {
          display: flex;
          align-items: center;
          width: 150px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin: 3px 10px;
          padding: 3px;
          .imgBox {
            width: 46px;
            height: 46px;
            margin-right: 10px;
            overflow: hidden;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .signImg {
              width: 90px;
              height: 90px;
              position: relative;
              left: -52%;
              top: -56%;
            }
          }
          div {
            display: flex;
            flex-direction: column;
            h4 {
              font-size: 14px;
              padding-bottom: 3px;
            }
            span {
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
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
.border-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  li {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    img {
      width: 80px;
      height: 80px;
    }
    span {
      font-size: 16px;
      text-align: center;
    }
  }
}
::v-deep .van-tabs__wrap {
  width: 100%;
  position: fixed;
}
::v-deep .van-tabs__content {
  padding-top: 44px;
}
</style>
