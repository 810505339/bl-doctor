<template>
  <view class="examination-report-content">
    <block v-for="(item, index) in list" :key="index">
      <view class="item">
        <image class="left" :src="item.face_image"></image>
        <view class="right">
          <view class="right-top">
            <view class="right-top-box">
              <view class="right-top-box-name">{{ item.realname }}</view>
              <view class="right-top-box-rank">{{ item.title.title }}</view>
              <view class="right-top-box-rank">{{item.ducation.title}}</view>
            </view>
            <view class="right-top-right">
              <view class="dorp"></view>
              <view class="on-line">{{ item.chat_status ? '在线' : '离开' }}</view>
            </view>
          </view>
          <view class="hospital-del">
            <view class="level" v-if="needVisible">{{ item.hospital.level }}</view>
            <view class="hospital">{{ item.hospital.title }}</view>
            <view class="department">{{ item.department }}</view>
          </view>
          <view class="introduce">擅长：{{ item.disease }}</view>
          <view v-if="needVisible" class="main_tec">
            <u-icon name="thumb-up-fill" color="#41ab85" size="15"></u-icon>
            <text>主攻技术</text>
            <text class="main_tec_item" v-for="(text,index) in item.technology.split(',')" :key="index">{{text}}</text>
          </view>
          <view class="bottom">
            <view class="bottom-item">
              <view class="lable">咨询量</view>
              <view class="value">{{ item.call_num }}</view>
            </view>
            <view class="bottom-item">
              <view class="lable">粉丝数</view>
              <view class="value">{{ item.fans }}</view>
            </view>
            <view class="bottom-item">
              <view class="lable">综合评分</view>
              <view class="value">{{ item.star_avg }}</view>
            </view>
          </view>
          <view v-if="needVisible" class="need_money">
            <view>普通会诊{{item.ordinary_price}}¥</view>
            <view>专家会诊{{item.specialist_price}}¥</view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    needVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.examination-report-content {
  width: 720rpx;
  margin: 10rpx auto;
  .item {
    display: flex;
    padding: 32rpx 12rpx 22rpx;
    margin-top: 20rpx;
    background: #FFFFFF;
    .left {
      display: block;
      width: 98rpx;
      height: 98rpx;
    }
    .right {
      margin-left: 24rpx;
      &-top {
        display: flex;
        height: 48rpx;
        width: 534rpx;
        align-items: center;
        justify-content: space-between;
        &-box {
          display: flex;
          align-items: center;
          &-name {
            color: #505050;
            font-size: 32rpx;
            line-height: 48rpx;
            margin-right: 16rpx;
            font-weight: bold;
          }
          &-rank {
            color: #a6a6a6;
            font-size: 24rpx;
            margin-left: 10rpx;
          }
        }
        &-right {
          display: flex;
          align-items: center;
          .dorp {
            background: #309974;
            width: 16rpx;
            height: 16rpx;
            border-radius: 10rpx;
          }
          .on-line {
            font-size: 24rpx;
            margin-left: 4rpx;
            color: #505050;
          }
        }
      }
      .hospital-del {
        display: flex;
        height: 36rpx;
        align-items: center;
        margin-top: 10rpx;
        .level{
          background: #309974;
          color: #FFFFFF;
          border-radius: 10rpx;
          font-size: 20rpx;
        }
        .hospital {
          color: #505050;
          font-size: 24rpx;
          line-height: 36rpx;
          margin-left: 20rpx;
        }
        .department {
          margin-left: 22rpx;
          color: #505050;
          font-size: 24rpx;
          line-height: 36rpx;
        }
      }
      .introduce {
        margin-top: 10rpx;
        color: #505050;
        font-size: 20rpx;
        line-height: 30rpx;
        width: 534rpx;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .bottom {
        margin-top: 12rpx;
        display: flex;
        height: 36rpx;
        align-items: center;
        &-item {
          display: flex;
          color: #505050;
          font-size: 24rpx;
          margin-left: 40rpx;
          &:nth-child(1) {
            margin-left: 0;
          }
          .lable {
            margin-right: 12rpx;
            font-size: 24rpx;
          }
          .value {
            color: #41ab85;
            font-size: 24rpx;
          }
        }
      }
    }
  }
}
.need_money{
  margin-top: 10rpx;
  display: flex;
  view{
    border-radius: 32rpx;
    border: rgba(65, 171, 133, 1) solid 1px;
    font-size: 24rpx;
    text-align: center;
    color: #505050;
    margin-top: 10rpx;
    padding: 0 20rpx;
  }
  view:nth-child(2) {
    margin-left: 20rpx;
  }
}
.main_tec{
  margin: 10rpx 0;
  display: flex;
  font-size: 16rpx;
  justify-content: flex-start;
  flex-wrap: wrap;
  text{
    color: black;
    font-weight: bold;
  }
  .main_tec_item{
    font-size: 16rpx;
    background-color: rgba(243, 244, 248, 1);
    border-radius: 32rpx;
    padding: 0 10rpx;
    color: #505050;
  }
}
</style>
