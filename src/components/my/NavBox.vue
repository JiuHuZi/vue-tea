<template>
  <div class="navBox">
    <div class="title">
      <h3>推荐工具</h3>
      <div @click="lock">
        <h3>更多</h3>
        <i class="iconfont icon-fanhui"></i>
      </div>
    </div>
    <div class="navlist">
      <ul>
        <li @click="lock">
          <i class="iconfont icon-kefu"></i>
          <span>客服中心</span>
        </li>
        <li @click="goStart">
          <i class="iconfont icon-shoucang"></i>
          <span>我的收藏</span>
        </li>
        <li @click="goPath">
          <i class="iconfont icon-dizhi"></i>
          <span>地址管理</span>
        </li>
        <li @click="goWallet">
          <i class="iconfont icon-qianbao"></i>
          <span>我的钱包</span>
        </li>
        <li @click="goEdit">
          <i class="iconfont icon-xiugaimima"></i>
          <span>修改密码</span>
        </li>
        <li @click="lock">
          <i class="iconfont icon-youhuiquan"></i>
          <span>领券中心</span>
        </li>
        <li @click="lock">
          <i class="iconfont icon-qiandao" style="font-weight: bold"></i>
          <span>签到送礼</span>
        </li>
        <li @click="lock">
          <i class="iconfont icon-huiyuan" style="font-weight: bold"></i>
          <span>大会员中心</span>
        </li>
        <li @click="lock">
          <i class="iconfont icon-daipingjia"></i>
          <span>我的评价</span>
        </li>
        <li @click="lock">
          <i class="iconfont icon-tubiao_dingdan" style="font-weight: bold"></i>
          <span>全部订单</span>
        </li>
        <li @click="lock">
          <i class="iconfont icon-xinxi"></i>
          <span>我的消息</span>
        </li>
        <li @click="goSetting">
          <i class="iconfont icon-shezhi"></i>
          <span>设置</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'NavBox',
  methods: {
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
    // 加入设置
    goSetting() {
      this.$router.push('/setting')
    },
    // 未开发的功能
    lock() {
      Toast.fail('该功能暂未开放，敬请期待')
    }
  }
}
</script>

<style lang="less" scoped>
.navBox {
  width: 96vw;
  height: 285px;
  background-color: #fff;
  margin: 15px auto;
  border-radius: 15px;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 20px 20px;
    h3 {
      font-size: 18px;
      letter-spacing: 2px;
    }
    div {
      display: flex;
      align-items: center;
      h3 {
        color: #999;
        font-weight: 400;
        font-size: 16px;
        letter-spacing: 0px;
      }
      i {
        font-size: 12px;
        transform: rotate(180deg);
      }
    }
  }
  .navlist {
    width: 100%;
    height: 100%;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      li {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
        i {
          font-size: 30px;
          padding-bottom: 8px;
          font-weight: 550;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
