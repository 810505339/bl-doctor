<template>
  <view class="steps">
    <view class="my_steps">
      <view :class="{my_steps_item_1: true}">
        <view>1</view>
        <view>填写信息</view>
      </view>
      <view :class="{line: true, line_active: current === 2}"></view>
      <view :class="{my_steps_item_2: true, active: current === 2}">
        <view>2</view>
        <view>通过验证</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    stepList: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.steps{
  padding-top: 10px;
}
.my_steps{
  display: flex;
  justify-content: center;
  align-items: center;
  .my_steps_item_1{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    view:nth-child(1) {
      width: 70rpx;
      height: 70rpx;
      background: rgba(65, 171, 133, 1);
      border-radius: 100%;
      color: #fff;
      text-align: center;
      line-height: 70rpx;
      font-size: 16px;
    }
  }
  .line{
    width: 33%;
    height: 2px;
    background: rgba(166, 166, 166, 1);
    position: relative;
    top: -20rpx;
  }
  .line_active{
    background: rgba(65, 171, 133, 1);
  }
  .my_steps_item_2{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    view:nth-child(1) {
      width: 70rpx;
      height: 70rpx;
      background: rgba(166, 166, 166, 1);
      border-radius: 100%;
      color: #fff;
      text-align: center;
      line-height: 70rpx;
      font-size: 16px;
    }
  }
  .active{
    view:nth-child(1) {
      background: rgba(65, 171, 133, 1);
    }
  }
}
</style>