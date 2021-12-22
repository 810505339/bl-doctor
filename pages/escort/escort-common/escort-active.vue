<template>
  <view class="activity">
    <uni-list>
      <uni-list-item title="优惠券" :rightText="price ? `${price}`+'元' : '未使用优惠券'" link @click="getActivity"></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
export default {
  props: {
    price: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    getActivity() {
      uni.navigateTo({
        url: '/pages/escort/activity-dec/activity-des?url=' + this.url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.activity{
  margin-top: 20rpx;
}
</style>