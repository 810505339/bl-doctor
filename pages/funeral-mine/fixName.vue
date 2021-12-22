<template>
  <div>
    <input placeholder="输入新昵称" class="input" type="text" />
    <button class="confirm">确认修改</button>
  </div>
</template>


<style lang="scss">
  .input {
    padding: 0 24rpx;
    margin-top: 16rpx;
    height: 84rpx;
    // top: 19rpx;
    color: rgba(56, 56, 56, 1);
    background-color: rgba(255, 255, 255, 1);
    font-size: 32rpx;
    line-height: 150%;
    // text-align: center;
    font-weight: bold;    
  }
  .confirm {
    width: 656rpx;
    height: 72rpx;
    left: 16rpx;
    // top: 124rpx;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(65, 171, 133, 1);
    border-radius: 36rpx;
    font-size: 32rpx;
    // line-height: 150%;
    // text-align: center;
    font-weight: bold;    
    margin: 28rpx auto 0;
    display: flex;
    justify-content: center;
    align-items: center;

  }
</style>