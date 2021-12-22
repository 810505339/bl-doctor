<template>
  <view class="footer-nav">
    <view>
      需付款
      <text>{{money}}元</text>
    </view>
    <view>
      <button class="primary" @click="payMoney" :disabled="active" :loading="active">付款</button>
    </view>
  </view>
</template>

<script>
export default {
  props: ['money', 'active'],
  methods: {
    payMoney() {
      this.$emit('payMoneyHandle', this.money)
    }
  }
}
</script>


<style lang="scss" scoped>
.footer-nav{
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 710rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 0 20rpx;
  height: 120rpx;
  view:nth-child(1) {
    color: #505050;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    text{
      color: #41ab85;
      margin-left: 20rpx;
      font-size: 32rpx;
    }
  }
}
.primary{
  background-color: $uni-color-primary;
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  width: 250rpx;
  border-radius: 50rpx;
}
::v-deep uni-button:after{
  border: 0px !important;
}
</style>