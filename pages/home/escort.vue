<template>
  <view class="escort">
    <view class="nav_bar">
      <!-- <view @click="changeIndex(0)" :class="{active: index === 0}">综合排序</view> -->
      <view @click="changeIndex(1)" :class="{active: index === 1}">评分最高</view>
      <view @click="changeIndex(2)" :class="{active: index === 2}">订单最多</view>
      <view @click="changeIndex(3)" :class="{right_icon: true, active: index === 3}">
        <view>性质</view>
        <u-icon name="arrow-down-fill" size="14"></u-icon>
      </view>
    </view>
    <u-picker keyName="label" :show="show" :columns="columns" @confirm="confirm"></u-picker>
    <view class="content_item" v-for="item in listInfo" :key="item.id">
      <image :src="item.headimg"></image>
      <view class="detail">
        <view class="name">
          <view>{{item.realname}}</view>
          <view>已服务 {{item.order_num}}</view>
        </view>
        <view class="title">
          <view>资质认证</view>
          <view class="title_item" v-if="item.organization">{{item.organization && item.organization.title}}</view>
        </view>
        <view class="content">简介：{{item.desc}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: 1,
      columns: [
        [{label: '生活类', id: 1}, {label: '医疗类', id: 2}]
      ],
      show: false,
      star: 0,
      order: 0,
      type: 1,
      listInfo: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const {data} = await this.$axios({
        url: '/api/users/escort/list',
        data: {
          star: this.star,
          order: this.order,
          type: this.type
        }
      })
      this.listInfo = data.arr.data
    },
    changeIndex(index) {
      this.index = index
      if(index === 3) {
        this.show = true
        return
      }
      if(this.star) {
        this.star = 0
        this.order = 0
      } else {
        this.star = 1
        this.order = 1
      }
      this.getList()
    },
    confirm(item) {
      this.show = false
      this.type =item.value[0].id
      this.getList()
    }
  }
}
</script>


<style lang="scss" scoped>
.escort{
  margin: 10rpx 20rpx 0 20rpx;
  .nav_bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    view{
      flex: 1;
      height: 60rpx;
      color: #505050;
      border-radius: 32rpx;
      background: #FFFFFF;
      text-align: center;
      line-height: 60rpx;
      margin-left: 10rpx;
    }
    .right_icon{
      display: flex;
      justify-content: center;
      align-items: center;
      view {
        width: 100%;
        height: 100%;
        margin-left: 20rpx;
      }
    }
  }
  .content_item{
    margin-top: 20rpx;
    padding: 20rpx;
    background: #FFFFFF;
    display: flex;
    image{
      width: 100rpx;
      height: 80rpx;
    }
    .detail{
      margin-left: 20rpx;
      flex: 1;
      .name{
        display: flex;
        justify-content: space-between;
        align-items: center;
        view:nth-child(1) {
          color: #505050;
          font-weight: bold;
          font-size: 32rpx;
        }
        view:nth-child(2) {
          color: #505050;
          font-size: 24rpx;
        }
      }
      .title{
        display: flex;
        view{
          border: rgba(48, 153, 116, 1) solid 1px;
          color: #505050;
          font-size: 24rpx;
          border-radius: 12px;
          padding: 0 10rpx;
        }
        .title_item{
          margin-left: 10rpx
        }
      }
      .content{
        color: #505050;
        font-size: 24rpx;
      }
    }
  }
}
.active{
  background: #309974 !important;
  color: #FFFFFF !important;
  view{
    background: #309974 !important;
    color: #FFFFFF !important;
  }
}
</style>