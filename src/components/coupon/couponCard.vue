<template>
  <div class="coupon-card">
    <div class="cardBox">
      <div class="left" :class="content.isUse != '0' ? 'leftUsed' : ''">
        <span class="name">{{ content.name }}</span>
        <!-- <span class="explain">折扣说明：满10减9</span> -->
        <span class="time">{{ startAt }}-{{ endAt }}</span>
        <div class="merchant">
          <div class="merchantContent">
            <i class="iconfont icon-shouye1"></i>
            <span>九狐商城</span>
          </div>
          <i class="iconfont merchantBtn" :class="show ? 'icon-arrow_up_fat' : 'icon-arrow_down_fat'" @click="show = !show"></i>
        </div>
      </div>
      <div class="right" :class="content.isUse != '0' ? 'rightUsed' : ''">
        <div class="discountBox" v-if="content.unitDesc == '折'">
          <span>8</span>
          <span class="currency">折</span>
        </div>
        <div class="moneyBox" v-if="content.unitDesc == '元'">
          <span class="currency">￥</span>
          <span>{{ content.price / 100 }}</span>
        </div>
        <div class="useBtn" v-if="content.isUse == '0'">立即使用</div>
      </div>
    </div>

    <div class="hideBox" v-if="show">
      <p>折扣说明：{{ discountMsg }}</p>
      <p>券编号：{{ content.id }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  props: ['content'],
  computed: {
    endAt() {
      return new Date(parseInt(this.content.endAt)).toLocaleDateString().replace(/\//g, '.')
    },
    startAt() {
      return new Date(parseInt(this.content.startAt)).toLocaleDateString().replace(/\//g, '.')
    },
    discountMsg() {
      let str = ''
      if (this.content.condition != 0) {
        if (this.content.unitDesc == '元') str = `满 ${this.content.condition / 100} 元可用`
        if (this.content.unitDesc == '折') str = `满 ${this.content.condition / 100} 享 ${this.content.price} 折,最多减 ${this.content.maxDiscont} 元`
      } else {
        str = '无门槛优惠券'
      }
      return str
    }
  },
  mounted() {
    console.log(this.content)
  }
}
</script>

<style lang="less" scoped>
.coupon-card {
  .cardBox {
    width: 100%;
    height: 110px;
    margin-top: 10px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    position: relative;

    .left {
      width: 70%;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 10px 20px;
      &.leftUsed {
        color: #ccc !important;
        .time {
          color: #ccc;
        }
      }
      .name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .explain {
        margin: 5px 0;
        font-size: 12px;
        color: #999;
      }
      .time {
        font-size: 12px;
        color: #555;
      }
      .merchant {
        margin-top: 15px;
        font-size: 12px;
        display: flex;
        align-items: center;
        display: flex;
        justify-content: space-between;
        .merchantContent {
          span {
            margin-left: 5px;
          }
          i {
            font-weight: bold;
            outline: 1px solid #999;
            border-radius: 50%;
            padding: 2px;
            transform: scale(0.8);
          }
        }
        .merchantBtn {
          outline: 1px solid #ccc;
          border-radius: 50%;
          color: #999;
        }
      }
    }
    .right {
      width: 30%;
      background-image: linear-gradient(to bottom right, #f88080 0%, #ca0b0b 70%);
      color: #fff;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &.rightUsed {
        background-image: linear-gradient(#ccc, #ccc);
      }
      .discountBox,
      .moneyBox {
        .currency {
          font-size: 18px;
          font-weight: bold;
          padding-left: 3px;
        }
      }
      .useBtn {
        font-size: 12px;
        background-color: #fff;
        color: #c50808;
        padding: 2px 10px;
        border-radius: 15px;
        margin-top: 5px;
      }

      &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        border: 1px solid #ccc;
        left: 69%;
        top: -5px;
      }
      &::after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        border: 1px solid #ccc;
        left: 69%;
        bottom: -5px;
      }
    }
  }
  .hideBox {
    // width: 70%;
    min-height: 50px;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    font-size: 12px;
    box-sizing: border-box;
    padding: 10px 20px;
    p {
      padding: 2px 0;
      color: #999;
    }
  }
}
</style>
