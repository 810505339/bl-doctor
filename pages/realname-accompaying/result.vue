<template>
  <view class="result">
    <ActiveStepBar :current="2" />
    <image src="../../static/doctor/图片 97.png"></image>
    <view class="content">
      <view class="content_con">恭喜您，已完成陪诊资格验证</view>
      <view class="content_to">您已成为陪诊服务人员，马上去接单吧！</view>
    </view>
    <u-button class="footer_btn" text="进入工作台" @click="toHome"></u-button>
    <view>
      3秒后自动跳转...
    </view>
  </view>
</template>

<script>
import ActiveStepBar from '../../components/active-step-bar/active-step-bar.vue'
export default {
  components: {
    ActiveStepBar
  },
  onLoad() {
    this.toHome(3000)
  },
  methods: {
    toHome(time = 0) {
      uni.navigateTo({
        url: '/pages/doctor/index'
      })
      // setTimeout(() => {
      //   uni.navigateTo({
      //     url: '/pages/doctor/index'
      //   })
      // },time)
    }
  }
}
</script>

<style lang="scss" scoped>
uni-page-body{
  background: #FFFFFF;
  padding: 20rpx;
}
.result{
  text-align: center;
  image{
    width: 486rpx;
    height: 364rpx;
  }
  .content{
    .content_con{
      color: rgba(80, 80, 80, 1);
      font-size: 20px;
      font-weight: bold;
    }
    .content_to{
      color: rgba(166, 166, 166, 1);
	    font-size: 14px;
    }
  }
  .footer_btn{
    background: rgba(65, 171, 133, 1);
    font-size: 16px;
    color: #FFFFFF;
    font-weight: bold;
    border-radius: 25px;
    margin-top: 10px;
    margin: 80rpx;
  }
}

</style>