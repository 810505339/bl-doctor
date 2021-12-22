<template>
  <view class="wrap">
    <view class="title">{{needle.title}}</view>
    <view>
      <u-parse :content="needle.content"></u-parse>
    </view>
  </view>
</template>

<script>
import url from "@/api/medical";

export default {
  name: "needle-details",
  data() {
    return {
      needle: {}
    }
  },
  methods: {
    async getNeedleDetail(id) {
      const {data} = await this.$axios({url: url.needleDetail, data: {id}})
      this.needle = data.data
      console.log(this.needle)

    }
  },
  onLoad({id}) {
    this.getNeedleDetail(id)
  }
}
</script>

<style scoped lang="scss">
uni-page-body{
  background: #ffffff;
}
.wrap{
  padding: 28rpx;
}
.title{
  padding-bottom: 14rpx;
}
</style>