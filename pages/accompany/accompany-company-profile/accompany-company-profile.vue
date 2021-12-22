<template>
  <view class="accompany-service">
    <view class="accompany-service-item">
      <view class="accompany-service-item-font1">{{data.title}}</view>
      <!-- <view class="accompany-service-item-font3">注册于2021年3月21日</view> -->
      <view class="accompany-service-item-font3">注册于{{data.atime}}</view>
    </view>
    <view class="accompany-service-item">
      <view class="accompany-service-item-font2">企业法人</view>
      <view class="accompany-service-item-font3">
        {{data.legal_person}}
        <text class="accompany-service-item-font3 green">身份已认证</text>
      </view>
    </view>
    <view class="accompany-service-item" v-if="(data.images || []).length>0">
      <view class="accompany-service-item-font2">公司环境</view>
      <view>
        <image class="accompany-service-item-img" :src="item" v-for="(item, index) in data.images" :key="index"></image>
        <!-- <image class="accompany-service-item-img" src="../../../static/accompany-service/banner-bg.png"></image>
        <image class="accompany-service-item-img" src="../../../static/accompany-service/banner-bg.png"></image>
        <image class="accompany-service-item-img" src="../../../static/accompany-service/banner-bg.png"></image>
        <image class="accompany-service-item-img" src="../../../static/accompany-service/banner-bg.png"></image> -->
      </view>
    </view>
    <view class="accompany-service-item">
      <view class="accompany-service-item-font2">公司介绍</view>
      <rich-text class="accompany-service-item-font3" :nodes="data.content"></rich-text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  onLoad(options) {
    let {id} = options;
    this.getDetail(id)
  },
  methods: {
    searchBlur(value) {
      console.log(value)
    },
    async getDetail(id) {
      const { data } = await this.$axios({
        url: `/api/escort/organization_detail`,
        data:{
          id
        }
      })
      this.data = data.data;
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-color: #f3f4f8;
}
.accompany-service {
  width: 100%;
  padding: 23rpx;
  box-sizing: border-box;

  .accompany-service-item {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 19rpx;
    background-color: rgba(255, 255, 255, 1);
    padding: 25rpx;

    .accompany-service-item-font1 {
      color: rgba(80, 80, 80, 1);
      font-size: 36rpx;
      line-height: 150%;
      text-align: left;
      font-weight: bold;
      margin-bottom: 12rpx;
    }

    .accompany-service-item-font3 {
      color: rgba(80, 80, 80, 1);
      font-size: 28rpx;
      line-height: 150%;
      text-align: left;

      &.green {
        color: rgba(65, 171, 133, 1);
        margin-left: 14rpx;
      }
    }

    .accompany-service-item-font2 {
      color: rgba(80, 80, 80, 1);
      font-size: 32rpx;
      line-height: 150%;
      text-align: left;
      font-weight: bold;
      margin-bottom: 18rpx;
    }

    .accompany-service-item-img {
      width: 152rpx;
      height: 152rpx;
      margin-right: 20rpx;
    }
  }
}
</style>
