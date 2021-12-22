<template>
  <view class="accompany-service">
    <cu-custom class="text-bold" :isBack="true" bgColor='rgba(220, 241, 234, 1)'>
				<block slot="right"><image class="right-btn" @click="onShare" src="../../../static/accompany-service/onShare.png"></image></block>
		</cu-custom>
    <view class="header">
      <view class="name">{{acc.realname}}</view>
      <view class="labelContainer">
        <view class="labelItem">资质认证</view>
        <view class="labelItem" v-if="acc.organization">企业认证</view>
      </view>
      <view class="consultingService">
        <view class="consultingServiceItem">
          <text class="consultingServiceItemT1">{{acc.call_num || 0}}</text>
          <text class="consultingServiceItemT2">咨询量</text>
        </view>
        <view class="consultingServiceItem">
          <text class="consultingServiceItemT1">{{acc.star || 0}}分</text>
          <text class="consultingServiceItemT2">综合评分</text>
        </view>
      </view>
      <image class="avgator" :src="acc.headimg?acc.headimg:'../../../static/accompany-service/avgatorDefault.png'"></image>
    </view>
    <view class="content">
      <view class="contentItem" v-if="acc.good_at">
        <view class="contentItemTitle">专业擅长</view>
        <view class="contentItemText">{{acc.good_at}}</view>
      </view>
      <view class="contentItem" v-if="acc.desc">
        <view class="contentItemTitle">个人简介</view>
        <view class="contentItemText">{{acc.desc}}</view>
      </view>
      <view class="contentItem" v-if="(acc.certificate_images || [].length)">
        <view class="contentItemTitle">资质证书</view>
        <view>
          <image class="contentItemImg" :src="item" v-for="(item, index) in acc.certificate_images" :key="index"></image>
          <!-- <image class="contentItemImg" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image>
          <image class="contentItemImg" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image>
          <image class="contentItemImg" src="../../../static/accompany-service/selectDownEmptyBlack.png"></image> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      acc: {},
    }
  },
  onLoad(options) {
    let {id} = options;
    this.getDetail(id)
  },
  methods: {
    onShare() {
      console.log(123)
    },
    async getDetail(id) {
      const { data } = await this.$axios({
        url: `/api/users/escort/detail`,
        data:{
          id
        }
      })
      let {acc} = data;
      this.acc = acc;
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
  .right-btn {
    margin-right: 28rpx;
    width: 43rpx;
    height: 43rpx;
  }

  .header {
    position: relative;
    height: 189rpx;
    width: 100%;
    background-color: rgba(220, 241, 234, 1);

    .avgator {
      position: absolute;
      top: 42rpx;
      right: 31rpx;
      width: 117rpx;
      height: 117rpx;
      border-radius: 50%;
    }

    .name {
      position: absolute;
      left: 26rpx;
      top: 38rpx;
      color: rgba(80, 80, 80, 1);
      font-size: 40rpx;
      line-height: 60rpx;
      text-align: left;
      font-weight: bold;
    }

    .labelContainer {
      position: absolute;
      left: 169rpx;
      top: 45rpx;
      width: 400rpx;

      .labelItem {
        display: inline-block;
        height: 32rpx;
        color: rgba(80, 80, 80, 1);
        border-radius: 11rpx;
        font-size: 24rpx;
        line-height: 32rpx;
        border: rgba(48, 153, 116, 1) solid 2rpx;
        text-align: center;
        margin-right: 13rpx;
        padding: 0 3rpx;
      }
    }

    .consultingService {
      position: absolute;
      left: 26rpx;
      bottom: 23rpx;

      .consultingServiceItem {
        margin-right: 50rpx;
        display: inline-block;

        .consultingServiceItemT1 {
          color: rgba(65, 171, 133, 1);
          font-size: 32rpx;
          text-align: left;
          font-weight: bold;
          margin-right: 12rpx;
        }

        .consultingServiceItemT2 {
          color: rgba(80, 80, 80, 1);
          font-size: 24rpx;
          text-align: left;
        }
      }
    }
  }

  .content {
    padding: 26rpx;

    .contentItem {
      margin-top: 29rpx;

      .contentItemTitle {
        position: relative;
        margin-bottom: 16rpx;
        color: rgba(56, 56, 56, 1);
        font-size: 32rpx;
        line-height: 72rpx;
        text-align: left;
        font-weight: bold;

        &::before {
            position: absolute;
            top: 42rpx;
            left: 30rpx;
            content: "";
            width: 100rpx;
            height: 6rpx;
            background: rgba(65, 171, 133, 1);
            filter: blur(6rpx);
            z-index: 100;
        }
      }

      .contentItemText {
        color: rgba(80, 80, 80, 1);
        font-size: 28rpx;
        line-height: 150%;
        text-align: left;
      }

      .contentItemImg {
        width: 176rpx;
      	height: 176rpx;
        margin-right: 20rpx;
      }
    }
  }
}
</style>
