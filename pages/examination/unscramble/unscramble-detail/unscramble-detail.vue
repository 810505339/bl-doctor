<template>
<view>
  <cu-custom class="text-bold" :isBack="true" bgcolor="#f3f4f8">
    <block slot="content">报告解读</block>
  </cu-custom>
  <view class="accompany-service">
    <view class="header">
      <view class="header-top">
        <view class="header-top-left">
          <view class="header-top-left-name">
            <view class="header-top-left-name-name">{{dataInfo.realname}}</view>
            <view class="header-top-left-name-title">{{dataInfo.title.title}} {{dataInfo.sections.join('、')}}</view>
          </view> 
          <view class="header-top-left-detail">
            <view class="header-top-left-detail-hospital">{{dataInfo.hospital.title}}</view>
            <view class="header-top-left-detail-level">{{dataInfo.hospital.level}}</view>
          </view>
        </view>
        <image class="avgator" :src="dataInfo.face_image"></image>
      </view>
      <view class="consultingService">
        <view class="consultingServiceItem">
          <text class="consultingServiceItemT1">{{dataInfo.call_num}}</text>
          <text class="consultingServiceItemT2">咨询量</text>
        </view>
        <view class="consultingServiceItem">
          <text class="consultingServiceItemT1">{{dataInfo.fans}}</text>
          <text class="consultingServiceItemT2">粉丝数</text>
        </view>
        <view class="consultingServiceItem">
          <text class="consultingServiceItemT1">{{dataInfo.star_avg}}分</text>
          <text class="consultingServiceItemT2">综合评分</text>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="contentItem">
         <view class="contentItemTitle">主攻技术</view>
         <view class="progress">
           {{dataInfo.technology}}
         </view>
      </view>
      <view class="contentItem">
        <view class="contentItemTitle">专业擅长</view>
        <view class="contentItemText">{{dataInfo.disease}}</view>
      </view>
      <view class="contentItem">
        <view class="contentItemTitle">个人简介</view>
        <view class="contentItemText">{{dataInfo.desc}}</view>
      </view>
      <view class="contentItem">
        <view class="contentItemTitle">执业点</view>
        <view class="header-top-left-detail">
          <view class="header-top-left-detail-hospital">{{dataInfo.hospital.title}}</view>
          <view class="header-top-left-detail-level">{{dataInfo.hospital.level}}</view>
        </view>
      </view>
      <view class="contentItem">
        <view class="contentItemTitle">医疗职业许可证登记号</view>
        <view class="header-top-left-detail">
          {{dataInfo.register_number }}
        </view>
      </view>
      <view class="contentItem">
        <view class="contentItemTitle">执业证书</view>
        <view>
          <image class="contentItemImg" :src="dataInfo.licensed"></image>
          <image class="contentItemImg" :src="dataInfo.certificate"></image>
          <image class="contentItemImg" :src="dataInfo.technology_certificate"></image>
        </view>
      </view>
    </view>
    <view class="foot">
      <view class="foot-left">{{dataInfo.ordinary_price}}元/次</view>
      <view class="pay" @click="jump">去支付</view>
    </view>
  </view>
</view>

</template>

<script>
export default {
  data() {
    return {
      id:'',
      dataInfo:[]
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getContext()
  },
  methods: {
    async getContext() {
      const { data } = await this.$axios({
        url: `/api/users/doctor/detail?id=${this.id}`
      })
      this.dataInfo = data.data
    },
    jump(){
      uni.navigateTo({
        url:`/pages/zjwz/zjhz/toOrder?user_id=${this.dataInfo.user_id}`
      })
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
  .header {
    height: 370rpx;
    width: 100%;
    background-color: rgba(220, 241, 234, 1);
    &-top{
      padding: 114rpx 30rpx 0;
      display: flex;
      justify-content: space-between;
      &-left{
        display: flex;
        flex-direction: column;
        &-name{
          display: flex;
          padding-top: 10rpx;
          &-name{
            color: rgba(80, 80, 80, 1);
            font-size: 42rpx;
            line-height: 73rpx;
            font-weight: bold;
          }
          &-title{
            color: rgba(128, 128, 128, 1);
            font-size: 26rpx;
            line-height: 39rpx;
            margin-left: 26rpx;
            padding-top: 20rpx;
          }
        }
        &-detail{
          display: flex;
          margin-top: 2rpx;
          &-hospital{
            color: rgba(80, 80, 80, 1);
            font-size: 30rpx;
            line-height: 45rpx;
          }
          &-level{
            padding: 0 4rpx;
            color: rgba(255, 255, 255, 1);
            background-color: rgba(65, 171, 133, 1);
            border-radius: 10rpx;
            font-size: 26rpx;
            line-height: 44rpx;
            margin-left: 12rpx;
          }
        }
      }
      .avgator{
        width: 122rpx;
        height: 122rpx;
        display: block;
      }
    }
    .consultingService{
      margin-top: 54rpx;
      display: flex;
      .consultingServiceItem{
        &:nth-child(1){
          padding-left: 30rpx;
          margin-right: 44rpx;
        }        
        &:nth-child(2){
          margin-right: 36rpx;
        }
        .consultingServiceItemT1{
          margin-right: 10rpx;
          color: rgba(65, 171, 133, 1);
          font-size: 34rpx;
          line-height: 50rpx;
          font-weight: bold;
        }
        .consultingServiceItemT2{
          padding-top: 14rpx;
          color: rgba(80, 80, 80, 1);
          font-size: 26rpx;
          line-height: 57rpx;
        }
      }
    }
  }

  .content {
    padding: 26rpx 26rpx 126rpx;
    .contentItem {
      margin-top: 29rpx;
      .progress{
        height: 22px;
        &-left{
          width: 80px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
          color: rgba(80, 80, 80, 1);
          font-size: 30rpx;
          font-weight: bold;
          margin-right: 20rpx;
          display: inline-block;
        }
        &-centent{
          display: inline-block;
          width: 390rpx;
          position: relative;
          top: -2rpx;
        }
        &-right{
          display: inline-block;
          margin-left: 6rpx;
          line-height: 44rpx;
          color: rgba(80, 80, 80, 1);
	        font-size: 30rpx;
          position: relative;
          top: -6rpx;
        }
      }
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
  .foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    display: flex;
    background: #fff;
    &-left{
      width: 508rpx;
      color: rgba(80, 80, 80, 1);
      font-size: 30rpx;
      line-height: 44rpx;
      font-weight: bold;
      padding: 28rpx 0 28rpx 50rpx;
    }
    .pay{
      width: 242rpx;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(65, 171, 133, 1);
      font-size: 34rpx;
      line-height: 100rpx;
      text-align: center;
      font-weight: bold;

    }
  }
}
</style>
