<template>
  <div class="start container">
    <Header></Header>
    <div class="navBtn" @click="isNavBar">
      <span>{{ isNavStatus ? '取消' : '管理' }}</span>
    </div>
    <section class="wrapper">
      <van-pull-refresh v-model="isLoading" :disabled="finished">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
          <ul v-if="list.length > 0">
            <li v-for="(item, index) in list" :key="index" @click="goDetail(item.goods_id)">
              <van-checkbox @click="checkLikeItem(index)" v-model="item.checked" checked-color="#ee0a24" v-if="isNavStatus"></van-checkbox>
              <img :src="item.imgUrl" alt="" />
              <h3>{{ item.goods_name }}</h3>
              <div class="price">
                <div>
                  <span>￥</span><b>{{ item.goods_price }}</b>
                </div>
              </div>
            </li>
          </ul>
          <div v-else>暂无收藏商品，前往<router-link to="/home">首页</router-link>逛逛吧</div>
        </van-list>
      </van-pull-refresh>
    </section>
    <footer v-if="isNavStatus">
      <div class="radio">
        <van-checkbox @click="checkLikeAllFn" :value="isCheckedLikeAll" checked-color="#ee0a24">全选</van-checkbox>
      </div>
      <div class="remove" @click="delLikesFn">删除</div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/start/header.vue'
import http from '@/common/api/request.js'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Start',
  data() {
    return {
      isNavStatus: false,
      startList: [],
      loading: true,
      finished: true,
      isLoading: false
    }
  },
  components: {
    Header
  },
  methods: {
    ...mapMutations(['likeList', 'checkLikeItem', 'unCheckLikeAll']),
    ...mapActions(['checkLikeAllFn', 'delLikesFn']),
    getData() {
      http
        .$axios({
          url: '/api/startList',
          method: 'POST',
          headers: {
            token: true
          }
        })
        .then((res) => {
          if (res.success) {
            res.data.forEach((v) => {
              v['checked'] = false
            })
            this.likeList(res.data)
          }
        })
    },
    isNavBar() {
      this.isNavStatus = !this.isNavStatus
      this.unCheckLikeAll()
    },
    // 点击商品前往详情页
    goDetail(val) {
      let id = val
      this.$router.push(`/detail?id=${id}`)
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState({
      list: (state) => state.like.list,
      selectList: (state) => state.like.selectList
    }),
    ...mapGetters(['isCheckedLikeAll']),
    LikeList() {
      return this.selectList.map((id) => {
        return this.list.find((v) => v.id == id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.navBtn {
  font-size: 16px;
  color: #999;
  text-align: right;
  padding: 10px;
}
section {
  background-color: #f7f7f7;
  margin-bottom: 0px;
  margin-top: 5px;
  .van-pull-refresh {
    width: 100%;
    height: 100%;
    overflow: scroll;
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
