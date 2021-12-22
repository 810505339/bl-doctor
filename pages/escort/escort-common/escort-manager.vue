<template>
  <view class="activity">
    <uni-list>
      <uni-list-item title="代取报告" :rightText="rightText + '元'" link @click="getReport"></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
// 代取报告
export default {
  props: {
    rightText: {
      type: String,
      default: '10'
    }
  },
  methods: {
    getReport() {
      this.$emit('update:visible', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.activity{
  margin-top: 20rpx;
}
</style>