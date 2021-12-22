<template>
  <view class="package-content">
    <block v-for="(item,index) in list" :key="index">
      <view class="goods-card" @tap="jumpDetail(item)">
        <image :src="item.img_url" class="good-img"></image>
        <view class="good-introduce">
          <view class="good-name">
              <view class="goods-name-left">{{item.title}}</view>
              <view class="goods-name-right">{{item.distance}}km</view>
          </view>
          <view class="good-hospital">{{item.hospital_title}}</view>
          <view class="good-tag-list">
            <view class="good-tag-list-item" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</view>
          </view>
          <view class="good-info">
            <view class="good-price">￥{{item.physical_exam}}起</view>
            <view class="good-appointments">{{item.appointment_num}}人已约</view>
          </view>
        </view>
      </view>
    </block>
  </view>

</template>
<script>
export default {
  props:{
    list: {
      type: Array,
      default: [],
    },
  },
  methods: {
    jumpDetail(item){
      this.$emit('jumpDetail',item)
    }
  }
};
</script>
<style lang="scss" scoped>
.package-content{
  padding: 0 16rpx;
  background-color: #ffffff;
}
.goods-card{
      display: flex;
padding:16rpx 0 ;
      border-bottom: 1rpx solid #a6a6a6;
      &:nth-last-child(1){
        border-bottom: none;
      }
      .good-img{
        width: 166rpx;
        height: 166rpx;
        display: block;
      }
      .good-introduce{
        display: flex;
        flex-direction: column;
        margin-left: 22rpx;
        position: relative;
        .good-name{
          display: flex;
          justify-content:space-between ;
          width: 526rpx;
          .goods-name-left{
            font-size: 28rpx;
            line-height: 42rpx;
          }
          .goods-name-right{
            color: rgba(80, 80, 80, 1);
            font-size: 30rpx;
            line-height: 45rpx;
          }
        }
        .good-hospital{
          color: #a6a6a6;
          font-size: 24rpx;
        }
        .good-tag-list{
          display: flex;
          margin-top: 4rpx;
          &-item{
            box-sizing: border-box;
            color: #41ab85;
            font-size: 20rpx;
            border: 1rpx solid #41ab85;
            border-radius: 32rpx;
            padding: 6rpx 10rpx;
            margin-right: 16rpx;
            &:nth-last-child(1){
              margin-right: none;
            }
          }
        }
        .good-info{
          display: flex;
          justify-content: space-between;
          width: 526rpx;
          position: absolute;
          bottom: 0;
          left: 0;
          .good-price{
            line-height: 48rpx;
            color: #ff5733;
            font-size: 32rpx;
          }
          .good-appointments{
            color:#a6a6a6;
            font-size: 28rpx;
            line-height: 42rpx;
          }
        }
      }
    }
</style>
