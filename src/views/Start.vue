<template>
  <div class="start container">
    <Header></Header>
    <section>
      <ul>
        <li>
          <van-checkbox :value="true" checked-color="#ee0a24"></van-checkbox>
          <img src="/images/goods/goods1.jpeg" alt="" />
          <h3>11111</h3>
          <div class="price">
            <div><span>￥</span><b>123</b></div>
          </div>
        </li>
        <li>
          <van-checkbox :value="true" checked-color="#ee0a24"></van-checkbox>
          <img src="/images/goods/goods1.jpeg" alt="" />
          <h3>11111</h3>
          <div class="price">
            <div><span>￥</span><b>123</b></div>
          </div>
        </li>
        <li>
          <van-checkbox :value="true" checked-color="#ee0a24"></van-checkbox>
          <img src="/images/goods/goods1.jpeg" alt="" />
          <h3>11111</h3>
          <div class="price">
            <div><span>￥</span><b>123</b></div>
          </div>
        </li>
      </ul>
    </section>
    <footer>
      <div class="radio">
        <van-checkbox :value="isCheckedAll" checked-color="#ee0a24">全选</van-checkbox>
      </div>
      <div class="remove">删除</div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/start/header.vue'
export default {
  name: 'Start',
  data() {
    return {
      isCheckedAll: false
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
section {
  background-color: #f7f7f7;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 50%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .van-checkbox {
        position: absolute;
        left: 10px;
        top: 5px;
      }
      img {
        width: 170px;
        height: 170px;
      }
    }
  }
}
section ul li h3 {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #222;
  font-weight: 500;
}
section ul li .price {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px 0;
}
section ul li .price div:first-child span {
  color: red;
  font-size: 12px;
}
section ul li .price div:first-child b {
  color: red;
  font-size: 18px;
}

footer {
  width: 100%;
  height: 45px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    margin: 0 10px;
  }
  .remove {
    width: 100px;
    line-height: 35px;
    background-color: #ee0a24;
    border-radius: 15px;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
}
::v-deep .van-checkbox__label {
  font-size: 16px;
}
</style>
