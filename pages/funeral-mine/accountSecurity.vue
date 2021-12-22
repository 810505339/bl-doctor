<template>
  <div class="wrap" @click="jumpUrl('/pages/funeral-mine/checkPhone')">
    <span>手机号</span>
    <div class="label-jump">
      {{phoneNumber}}
      <img src="/static/mine/right.svg" width="22rpx" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '+86 133****3333',
    }
  },
  methods: {
    jumpUrl(url){
      console.log('url',)
      uni.navigateTo({
        url
      })       
    }
  },
}
</script>

<style lang="scss">
  .wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    height: 41*2rpx;
    width: 100%;
    margin-top: 8rpx;
    padding-left: 16rpx;
    .label-jump{
    display: flex;
    align-items: center;    
    padding-right: 16rpx;

    }
  }
</style>