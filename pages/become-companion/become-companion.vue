<template>
  <view>
    <rich-text :nodes="nodes"></rich-text>
    <view class="footer_btn">
      <u-button type="default" text="我不同意" @click="goBack"></u-button>
      <u-button type="primary" text="阅读并同意" @click="toNext"></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      nodes: ''
    }
  },
  onLoad() {
    this.getContent()
  },
  methods: {
    async getContent() {
      const {data} = await this.$axios({
        url: '/api/index/settle_in'
      })
      this.nodes = data.data.content
    },
    goBack() {

    },
    toNext() {
      // 去实名认证
      uni.navigateTo({
        url: '/pages/realname-accompaying/realname-accompaying'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
uni-page-body{
  background: #FFFFFF;
  padding: 0 20rpx;
}
.footer_btn{
  display: flex;
  justify-content: center;
  align-items: center;
  .u-button{
    flex: 1;
    border: 1px solid #ccc;
    margin-right: 10rpx;
  }
}
</style>