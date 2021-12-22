<template>
  <view class="textarea">
    <view class="title">备注</view>
    <view class="text">
      <textarea :value="remarks" @input="input" class="pla-text" placeholder="有什么需要告诉陪诊人员的吗？" />
    </view>
  </view>
</template>

<script>
export default {
  props: ['remarks'],
  methods: {
    input(e) {
      this.$emit('update:remarks', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea{
  box-sizing: border-box;
  margin-top: 30rpx;
  width: 710rpx;
  background-color: #FFFFFF;
  padding: 20rpx;
  .title{
    color: rgba(80, 80, 80, 1);
    font-size: 28rpx;
    font-weight: bold;
  }
  .text{
    margin-top: 10rpx; 
    height: 200rpx;
    .pla-text{
      width: 100%;
      display: inline-block;
      font-size: 28rpx;
      color: rgba(166, 166, 166, 1);
    }
  }
}
</style>