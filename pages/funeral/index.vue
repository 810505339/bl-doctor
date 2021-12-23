<template>
  <view class="funeral">
    <text class="funeral-title">入驻白龙您需要准备以下材料</text>
    <view class="funeral-list">
      <view class="title">1.入驻店铺</view>
      <view class="funeral-left">
        <view  class="img">
          <u--image :src="img1" width="115" height="75"/>
          <view class="shili">
            示例
          </view>
        </view>
        <view class="context">
          <view class="title">店铺门脸图</view>
          <view class="sub">牌匾需清洗完整<br/>反应真是门脸
          </view>
        </view>
      </view>
    </view>
    <view class="funeral-list">
      <view class="title">2.相关证件</view>
      <view>
        <view class="funeral-left">
          <view class="img">
            <u--image :src="img2"  width="115" height="75"/>
            <view class="shili">
              示例
            </view>
          </view>
          <view class="context">
            <view  class="title">身份证</view>
            <view class="sub">法定代表人/经营者身份证</view>
          </view>
        </view>
        <view class="funeral-left">
          <view class="img">
            <u--image :src="img3"  width="115" height="75"/>
            <view class="shili">
              示例
            </view>
          </view>
          <view class="context">
            <view class="title">营业执照</view>
            <view class="sub">可用监管部门认可的具有营业执照同等法律效力的证件</view>
          </view>
        </view>
      </view>
    </view>
    <view class="btn-wrap">
      <u-button class="btn" @click="toUrl">马上开店</u-button>
    </view>
  </view>
</template>

<script>

export default {
  name: "index",

  data(){
    return{
      img1:require('@/static/funeral/img1.png'),
      img2:require('@/static/funeral/img2.jpg'),
      img3:require('@/static/funeral/img3.png'),
    }
  },
  methods:{
    toUrl(){
      uni.navigateTo({
        url: '/pages/funeral/shop'
      })

    }
  }
}
</script>

<style scoped lang="scss">
.funeral{
  padding: 26rpx;
  height: 100vh;
  background: #FFFFFF;
  .btn-wrap{
    position: absolute;
    bottom: 10vh;
    width: 90vw;
    left: 50%;
    transform: translateX(-50%);
  }

  .btn{
    background: #41ab85;
    color:#ffffff;
    border-radius: 50rpx;
  }
}
.funeral-title{
  font-weight: bold;
  font-size: 32rpx;
}
.funeral-list{
  padding: 24rpx 0;

  .title{
    font-size: 28rpx;
    font-weight: bold;
  }
  .funeral-left{
    display: flex;
    padding-top: 24rpx;

    .context{
      padding-left: 20rpx;

    }
    .img{
      position: relative;
    }
    .sub{
      color:#a6a6a6;
      font-size: 24rpx;
      margin-top: 8rpx;
      width: 300rpx;
    }
  }
}
.funeral-left +.funeral-left{
  padding-top: 60rpx;
}

.shili{
  background: #41ab85;
  width: 40px;
  text-align: center;
  color:#ffffff;
  border-bottom-right-radius: 40rpx;
  position: absolute;
  top:0;
}

</style>