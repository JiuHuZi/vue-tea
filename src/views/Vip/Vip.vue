<template>
  <div class="vip container">
    <Header></Header>
    <section>
      <div class="vipContent" :class="vipStatus">
        <!-- 会员卡片 -->
        <div class="vipCard">
          <div class="vipCardContent">
            <div class="cardTop">
              <div class="title">
                <i class="iconfont icon-huiyuan1"></i>
                <em>{{ userList.vipName }}</em>
              </div>
              <img :src="userList.vipImg" alt="" />
            </div>
            <div class="subheading">
              <span>{{ overtime != '' ? overtime + ' 到期' : '暂无记录' }}</span>
              <div>
                <span>已节省</span>
                <i class="save">{{ saveCost }}元</i>
                <i class="iconfont icon-fanhui fanhui"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- 会员权益 -->
        <div class="interests">
          <div class="interestsContent" :style="isInterests ? 'height:100%' : 'height:130px'">
            <ul>
              <li v-for="(item, index) in interestsList" :key="index">
                <div>
                  <i class="iconfont" :class="item.icon"></i>
                </div>
                <span>{{ item.title }}</span>
                <span>{{ item.subhead }}</span>
              </li>
            </ul>
            <div class="more" @click="isInterests = !isInterests">
              <i class="iconfont icon-fanhui" :style="isInterests ? 'transform: rotate(90deg);' : ''"></i>
            </div>
          </div>
        </div>
        <!-- 购买模块 -->
        <div class="payContent">
          <div class="name">
            <span>尊敬的{{ userList.nickName }}</span>
          </div>
          <div class="priceBox">
            <div class="payScroll">
              <ul>
                <li v-for="(item, index) in vipPriceList" :key="index" :class="{ active: index == currentIndex }" @click="changeCurrentIndex(index)">
                  <span class="vipName">{{ item.name }}</span>
                  <div class="nowPrice">
                    <i>￥</i><span>{{ item.newPrice }}</span>
                  </div>
                  <span v-if="item.oldPrice">
                    <del>￥{{ item.oldPrice }}</del>
                  </span>
                </li>
              </ul>
            </div>
            <p class="describe">
              {{ describeList[currentIndex] }}
            </p>
            <div class="payBtn" @click="buyVip(currentIndex)">立即以{{ vipPriceList[currentIndex].newPrice }}元开通</div>
            <div class="agreement">
              <input type="checkbox" v-model="isAgreement" />
              <router-link to="#" class="link">《大会员协议》</router-link>
            </div>
          </div>
          <div class="orderNav">
            <ul>
              <li @click="lock">
                <div class="icon">
                  <i class="iconfont icon-liwuhuodong"></i>
                </div>
                <div>
                  <span>赠送好友</span>
                  <span>与好友一起干杯</span>
                </div>
              </li>
              <li @click="lock">
                <div class="icon">
                  <i class="iconfont icon-yuechi"></i>
                </div>
                <div>
                  <span>激活码开通</span>
                  <span>免费开通大会员</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/vip/header.vue'
import http from '@/common/api/request.js'
import qs from 'qs'
import { Toast } from 'vant'
export default {
  name: 'vip',
  data() {
    return {
      isInterests: false,
      vipPriceList: [
        { name: '年度大会员', newPrice: 216, oldPrice: 300 },
        { name: '季度大会员', newPrice: 60, oldPrice: 75 },
        { name: '月度大会员', newPrice: 25 }
      ],
      describeList: ['12个月大会员，限时优惠价18元/月', '3个月大会员，限时优惠价20元/月', '1个月大会员，限时优惠价25元/月'],
      currentIndex: 0,
      isAgreement: false,
      userList: {},
      overtime: ''
    }
  },
  components: {
    Header
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取用户信息
    getData() {
      if (localStorage.getItem('teauserInfo') != null) {
        this.userList = JSON.parse(localStorage.getItem('teauserInfo'))
        let vipName = ''
        let vipImg = ''
        if (this.userList.member == '0') {
          vipName = '正式会员'
          vipImg = '/images/vip0.png'
        } else if (this.userList.member == '1') {
          vipName = '月度会员'
          vipImg = '/images/vip1.png'
        } else if (this.userList.member == '2') {
          vipName = '季度会员'
          vipImg = '/images/vip2.png'
        } else if (this.userList.member == '3') {
          vipName = '年度会员'
          vipImg = '/images/vip3.png'
        } else if (this.userList.member == '4') {
          vipName = '百年会员'
          vipImg = '/images/vip4.png'
        }
        this.userList.vipName = vipName
        this.userList.vipImg = vipImg

        http
          .$axios({
            url: '/api/selectVipStatus',
            method: 'POST',
            headers: {
              token: true
            }
          })
          .then((res) => {
            if (res.success) {
              this.overtime = res.data.overtime
            }
          })

        console.log(this.userList)
      }
    },
    // 选择套餐
    changeCurrentIndex(index) {
      this.currentIndex = index
    },
    // 购买vip
    buyVip(current) {
      if (!this.isAgreement) return Toast.fail('请勾选《大会员协议》再继续操作！')

      http
        .$axios({
          url: '/api/addOrdervip',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            current
          }
        })
        .then((res) => {
          console.log(res)
          if (!res.success) return

          // 支付传递的参数
          let dataOrder = {
            orderId: res.data.order_id,
            name: res.data.goods_name,
            price: res.data.goods_price
          }

          http
            .$axios({
              url: '/api/buyvip',
              method: 'POST',
              headers: {
                token: true,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: qs.stringify(dataOrder)
            })
            .then((res) => {
              console.log(res)
              if (!res.success) return
              // 打开支付包支付的页面
              window.location.href = res.paymentUrl
            })
        })
    },
    // 未开发的功能
    lock() {
      Toast.fail('该功能暂未开放，敬请期待')
    }
  },
  computed: {
    vipStatus() {
      let vipStatus = ''
      if (this.userList.member == '1') {
        vipStatus = 'vip1'
      } else if (this.userList.member == '2') {
        vipStatus = 'vip2'
      } else if (this.userList.member == '3') {
        vipStatus = 'vip3'
      } else if (this.userList.member == '4') {
        vipStatus = 'vip4'
      }
      return vipStatus
    },
    saveCost() {
      let price = 0
      if (this.userList.member == '1') {
        price = 100
      } else if (this.userList.member == '2') {
        price = 300
      } else if (this.userList.member == '3') {
        price = 800
      } else if (this.userList.member == '4') {
        price = 800
      }
      return price
    },
    interestsList() {
      let list = [
        { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
        { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
        { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
        { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
        { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
        { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
        { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
        { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' }
      ]
      if (this.userList.member == '1') {
        list = [
          { icon: ' icon-youhuajiasu', title: '身份升级', subhead: '纵享尊贵' },
          { icon: 'icon-zhekouka', title: '9折', subhead: '商品会员价' },
          { icon: 'icon-clothes-full', title: '专属挂件', subhead: '独具一格' },
          { icon: 'icon-xiugainicheng', title: '颜色昵称', subhead: '独具一格' },
          { icon: 'icon-huiyuan1', title: '优惠券', subhead: '价格更实惠' },
          { icon: 'icon-cunqianguan', title: '额外积分', subhead: '签到额外积分' },
          { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
          { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' }
        ]
      } else if (this.userList.member == '2') {
        list = [
          { icon: ' icon-youhuajiasu', title: '身份升级', subhead: '纵享尊贵' },
          { icon: 'icon-zhekouka', title: '85折', subhead: '商品会员价' },
          { icon: 'icon-clothes-full', title: '专属挂件', subhead: '独具一格' },
          { icon: 'icon-xiugainicheng', title: '颜色昵称', subhead: '独具一格' },
          { icon: 'icon-huiyuan1', title: '优惠券', subhead: '价格更实惠' },
          { icon: 'icon-cunqianguan', title: '额外积分', subhead: '签到额外积分' },
          { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
          { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' }
        ]
      } else if (this.userList.member == '3') {
        list = [
          { icon: ' icon-youhuajiasu', title: '身份升级', subhead: '纵享尊贵' },
          { icon: 'icon-zhekouka', title: '8折', subhead: '商品会员价' },
          { icon: 'icon-clothes-full', title: '专属挂件', subhead: '独具一格' },
          { icon: 'icon-xiugainicheng', title: '颜色昵称', subhead: '独具一格' },
          { icon: 'icon-huiyuan1', title: '优惠券', subhead: '价格更实惠' },
          { icon: 'icon-cunqianguan', title: '额外积分', subhead: '签到额外积分' },
          { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
          { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' }
        ]
      } else if (this.userList.member == '4') {
        list = [
          { icon: ' icon-youhuajiasu', title: '身份升级', subhead: '纵享尊贵' },
          { icon: 'icon-zhekouka', title: '75折', subhead: '商品会员价' },
          { icon: 'icon-clothes-full', title: '专属挂件', subhead: '独具一格' },
          { icon: 'icon-xiugainicheng', title: '颜色昵称', subhead: '独具一格' },
          { icon: 'icon-huiyuan1', title: '优惠券', subhead: '价格更实惠' },
          { icon: 'icon-cunqianguan', title: '额外积分', subhead: '签到额外积分' },
          { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' },
          { icon: 'icon-xiugaimima', title: '未解锁', subhead: '敬请期待' }
        ]
      }
      return list
    }
  }
}
</script>

<style lang="less" scoped>
section {
  overflow: scroll;
  background-color: #1e162b;
  margin-bottom: 0;
  .vipContent {
    height: 50vh;
    padding: 10px;
    box-sizing: border-box;
    .vipCard {
      height: 170px;
      margin-top: 10px;
      border-radius: 40px;
      // box-shadow: 0 0 5px #ccc;
      background-image: linear-gradient(to top right, #999 30%, #999 100%);
      .vipCardContent {
        display: flex;
        flex-direction: column;
        padding: 20px 25px;
        .cardTop {
          position: relative;
          img {
            width: 150px;
            height: 150px;
            position: absolute;
            right: 0;
            top: -40px;
          }
          .title {
            display: flex;
            align-items: center;
            i {
              font-size: 40px;
              background-image: linear-gradient(to top right, #555 0%, #555 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            em {
              font-size: 30px;
              font-weight: bold;
              background-image: linear-gradient(to top right, #555 0%, #555 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
        .subheading {
          display: flex;
          flex-direction: column;
          padding-top: 20px;
          font-size: 14px;
          color: #ccc;
          div {
            color: #ccc;
            display: flex;
            align-items: center;
            margin-top: 10px;
            i {
              font-weight: bold;
              font-style: normal;
              color: #ccc;
            }
            .save {
              padding-left: 5px;
            }
            .fanhui {
              transform: rotate(180deg);
              color: #ccc;
            }
          }
        }
      }
    }
    .interests {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      box-sizing: border-box;
      .interestsContent {
        width: 100%;
        height: 130px;
        background-color: #232031;
        border-radius: 15px;
        // overflow: hidden;
        position: relative;
        ul {
          height: 85%;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          padding-top: 15px;
          // padding-bottom: 15px;
          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 25%;
            padding-bottom: 20px;
            div {
              width: 50px;
              height: 50px;
              border-radius: 20px;
              background-color: #333244;
              display: flex;
              justify-content: center;
              align-items: center;
              i {
                font-size: 30px;
                background-image: linear-gradient(to top right, #555 10%, #555 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .icon-xiugaimima {
                font-weight: bold;
              }
            }
            span {
              margin-top: 5px;
              font-size: 14px;
              color: #555;
              &:last-child {
                color: #4c4959;
              }
            }
          }
        }
        .more {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          position: absolute;
          bottom: -18px;
          right: calc(50% - 30px);
          width: 60px;
          height: 30px;
          border-radius: 50%;
          background-color: #1e162b;
          i {
            transform: rotate(-90deg);
            font-weight: bold;
            font-size: 20px;
          }
        }
      }
    }
    .payContent {
      background-color: #fff;
      width: 100%;
      min-height: 50vh;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      // overflow: auto;
      .name {
        width: 100%;
        font-size: 18px;
        padding-top: 20px;
        span {
          padding-left: 30px;
          position: relative;
          font-weight: bold;
        }
        span::before {
          content: '';
          width: 8px;
          height: 20px;
          background-image: linear-gradient(to top right, #ffc387 30%, #ff6702 100%);
          position: absolute;
          left: 15px;
          top: 0;
          border-radius: 5px;
          margin-top: -2px;
        }
      }
      .priceBox {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        border-bottom: 3px solid #ccc;
        .payScroll {
          width: 100%;
          height: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          // align-items: center;
          ul {
            width: 100%;
            display: flex;
            li {
              min-width: 100px;
              height: 100px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              text-align: center;
              border-radius: 15px;
              border: 2px solid #ccc;
              margin-left: 15px;
              .vipName {
                font-weight: bold;
              }
              span {
                font-size: 16px;
                padding: 5px 0;
              }
              del {
                color: #999;
              }
              .nowPrice {
                font-size: 24px;
                font-weight: bold;

                i {
                  font-style: initial;
                  font-size: 14px;
                }
                span {
                  font-size: 24px;
                }
              }
            }
            .active {
              border-color: #ffa355;
              .nowPrice {
                color: #f2486a;
              }
            }
          }
        }
        .describe {
          font-size: 14px;
          padding-left: 15px;
          color: #999;
        }
        .payBtn {
          margin: 10px auto;
          font-size: 18px;
          width: 90%;
          line-height: 50px;
          text-align: center;
          border-radius: 15px;
          background-image: linear-gradient(to right, #ffc387 30%, #db7938 100%);
          color: brown;
          font-weight: bold;
        }
        .agreement {
          display: flex;
          align-items: center;
          font-size: 14px;
          padding-left: 15px;
          .link {
            color: #999;
          }
        }
      }
      .orderNav {
        width: 100%;
        ul {
          display: flex;
          flex-wrap: wrap;
          padding: 15px 5px;
          li {
            flex: 1;
            border: 1px solid #ccc;
            margin: 0 5px;
            padding: 15px 0;
            border-radius: 5px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .icon {
              width: 50px;
              line-height: 50px;
              border-radius: 50%;
              background-color: #f1f1f1;
              text-align: center;
              i {
                font-size: 40px;
                color: #f2486a;
              }
            }
            div {
              display: flex;
              flex-direction: column;
              font-size: 14px;
              span:last-child {
                color: #999;
              }
            }
          }
        }
      }
    }
  }
}

.vip1 {
  .vipCard {
    background-image: linear-gradient(to top right, #fff1eb 30%, #ace0f9 100%) !important;
    box-shadow: 0 0 5px #ccc !important;
    .title {
      i,
      em {
        background-image: linear-gradient(to top right, #2792ff 30%, #0269ff 100%) !important;
      }
    }
    .subheading {
      span {
        color: #79afff !important;
      }
      div {
        color: #78ccf3 !important;
        .save {
          color: #2792ff !important;
        }
        .fanhui {
          color: #78ccf3 !important;
        }
      }
    }
  }
  .interestsContent {
    ul {
      li {
        i {
          background-image: linear-gradient(to top right, #fff1eb 10%, #ace0f9 100%) !important;
        }
        span:nth-of-type(1) {
          color: #fff !important;
        }
      }
    }
  }
}

.vip2 {
  .vipCard {
    background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%) !important;
    box-shadow: 0 0 5px #ab15fc !important;
    .title {
      i,
      em {
        background-image: linear-gradient(to right, #7256ef 5%, #9039f3 100%) !important;
      }
    }
    .subheading {
      span {
        color: #9039f3 !important;
      }
      div {
        color: #7d5cea !important;
        .save {
          color: #a20ddf !important;
        }
        .fanhui {
          color: #7d5cea !important;
        }
      }
    }
  }
  .interestsContent {
    ul {
      li {
        i {
          background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%) !important;
        }
        span:nth-of-type(1) {
          color: #e6dee9 !important;
        }
      }
    }
  }
}

.vip3 {
  .vipCard {
    background-image: linear-gradient(120deg, #fece7a 0%, #ecb248 50%, #fccd78 100%) !important;
    box-shadow: 0 0 5px #fcdd15 !important;
    .title {
      i,
      em {
        background-image: linear-gradient(90deg, #c87a26 0%, #c06b0b 40%) !important;
      }
    }
    .subheading {
      span {
        color: #f37439 !important;
      }
      div {
        color: #ea805c !important;
        .save {
          color: #f24115 !important;
        }
        .fanhui {
          color: #ea805c !important;
        }
      }
    }
  }
  .interestsContent {
    ul {
      li {
        i {
          background-image: linear-gradient(120deg, #f1d6a9 0%, #fcdea6 50%, #f1d6a9 100%) !important;
        }
        span:nth-of-type(1) {
          color: #f1d6a9 !important;
        }
      }
    }
  }
}

.vip4 {
  .vipCard {
    background-image: linear-gradient(to right, #434343 0%, black 100%) !important;
    box-shadow: 0 0 5px #fbff00 !important;
    .title {
      i,
      em {
        background-image: linear-gradient(160deg, #edd9b6 0%, #ffae19 50%, #f9d592 100%) !important;
      }
    }
    .subheading {
      span {
        color: #7c6235;
      }
      div {
        span {
          color: #d4a453 !important;
        }
        .save {
          color: #ba8500 !important;
        }
        .fanhui {
          color: #d4a453 !important;
        }
      }
    }
  }
  .interestsContent {
    ul {
      li {
        i {
          background-image: linear-gradient(160deg, #edd9b6 0%, #fec04e 50%, #f9d592 100%) !important;
        }
        span:nth-of-type(1) {
          color: #fec04e !important;
        }
      }
    }
  }
}
</style>
