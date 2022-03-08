<template>
  <div class="wallet container">
    <Header></Header>
    <section>
      <div class="totalMsg">
        <ul>
          <li><span>总资产（元）</span><span>100.00</span></li>
          <li><span>累计充值（元）</span><span>100.00</span></li>
          <li><span>累计消费（元）</span><span>100.00</span></li>
        </ul>
      </div>
      <div class="topUp">
        <ul>
          <li>
            <div>
              <i class="iconfont icon-shouye1"></i>
              <span>充值￥100 赠送￥10</span>
            </div>
            <div class="topUpBtn">充值</div>
          </li>
          <li>
            <div>
              <i class="iconfont icon-shouye1"></i>
              <span>充值￥1000 赠送￥100</span>
            </div>
            <div class="topUpBtn">充值</div>
          </li>
        </ul>
      </div>
    </section>
    <Tabber></Tabber>
  </div>
</template>

<script>
import Header from '@/components/wallet/header.vue'
import Tabber from '@/components/common/Tabbar.vue'
export default {
  name: 'Wallet',
  components: {
    Header,
    Tabber
  }
}
</script>

<style lang="less" scoped>
section {
  background-color: #f7f7f7;
  padding: 10px;
  .totalMsg {
    width: 100%;
    height: 80px;
    background-color: #000;
    color: orange;
    border-radius: 12px;
    font-size: 14px;
    ul {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      li {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .topUp {
    width: 100%;
    background-color: #fff;
    font-size: 16px;
    margin-top: 20px;
    border-radius: 12px;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        i {
          padding-right: 5px;
        }
        .topUpBtn {
          width: 80px;
          line-height: 30px;
          background-color: #ff585d;
          border-radius: 20px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
::v-deep .tabbar {
  border-top: 1px solid #ddd;
}
</style>
