<template>
  <view class="my_agree">
    <checkbox-group @change="changeGroup" class="group">
      <label>
        <checkbox :checked="checked" />
      </label>
    </checkbox-group>
    <view>
      <text @click="goAgreement(0)">《用户协议》</text>
      <text @click="goAgreement(1)">《隐私权政策》</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  },
  methods: {
    changeGroup(value) { // 勾选协议
      if(!value.target.value.length) {
        uni.showToast({
          title: '请阅读并同意协议'
        })
      }
    },
    goAgreement(agree) { // 进入协议
      uni.navigateTo({
        url: '/pages/login/agreement?agree=' + agree
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my_agree{
  margin-top: 40rpx;
  display: flex;
  
  .group{
    width: 10rpx;
    display: inline-block;
  }
  text{
    margin-left: 20rpx;
    color: #41ab85;
  }
}
::v-deep .uni-checkbox-input{
  width: 30rpx;
  height: 30rpx;
}
</style>