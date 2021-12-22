<template>
  <view>
    <uni-list>
      <uni-list-item v-for="(item,index) in activeList" :key="item.id" :disabled="item.use === 1">
        <template #body>
          <view :class="{active: active === index, active_body: true}" @click="chooseAcvtive(item,index)">
            <view class="body_left">
              <view class="tit">{{item.title}}</view>
              <view>{{item.msg}}</view>
              <view>有效时间：{{item.updated_at}}</view>
            </view>
            <view>{{item.use === 1 ? '已使用' : `${item.price}`+'元'}}</view>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
    <view class="btn">
      <button class="primary" v-if="activeList.length !== 0" :disabled="activeList.length === 0" @click="useActiveHandle">使用优惠券</button>
      <button class="primary" v-else :disabled="activeList.length === 0" @click="useActiveHandle">暂无优惠券可使用</button>
    </view>
  </view>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const { mapMutations } = createNamespacedHelpers('escort-service')
export default {
  data() {
    return {
      active: '',
      activeInfo: {},
      activeList: []
    }
  },
  mounted() {
    this.getActiveList()
    const {url} = this.$route.query
    if(url) {
      this.url = url
    }
  },
  methods: {
    ...mapMutations(['change_active_info']), 
    async getActiveList() {
      const {data} = await this.$axios({
        url: '/api/users/coupon/accompanying'
      })
      this.activeList = data.list
    },
    chooseAcvtive(item, index) {
      if(item.use !== 1) {
        this.active = index
        this.activeInfo = item
      }
    },
    useActiveHandle() {
      // 使用优惠券
      this.change_active_info(this.activeInfo)
      // uni.redirectTo({
      //   url: this.url
      // })
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn{
  margin-top: 120rpx;
}
.active_body{
  width: 750rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .body_left{
    font-size: 28rpx;
    color: #505050;
    .tit{
      font-size: 32rpx;
      color: black;
    }
  }
}
.active{
  background: rgba(255,0,0,0.3);
  padding: 20rpx;
}
.primary{
  background: #41ab85;
  color: #FFFFFF;
}
</style>