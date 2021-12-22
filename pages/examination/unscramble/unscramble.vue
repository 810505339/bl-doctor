<template>
<view>
  <cu-custom class="text-bold" :isBack="true" bgcolor="#f3f4f8">
    <block slot="content">报告解读</block>
  </cu-custom>
  <view class="examination-report">
    <view class="report-top">
      <image class="top-img" src="/static/examination/unscramble.jpg"></image>
      <view class="report-top-content">
        <view class="text1">名医解读</view>
        <view class="text2">在线名师为您详细解读</view>
      </view>
    </view>
    <UnDeatil :list="list" @jump="jump"></UnDeatil>
  </view>
</view>

</template>

<script>
import UnDeatil from './detail.vue'
export default {
  components: {
    UnDeatil
  },
  data () {
    return {
      list: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(){
      const {data} = await this.$axios({
        url:'/api/users/doctor/report'
      })
      this.list = data.list
    },
    jump(item){
      uni.navigateTo({
        url:`/pages/examination/unscramble/unscramble-detail/unscramble-detail?id=${item.id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.examination-report{
  .report-top{
    position: relative;
    .top-img{
      width: 100%;
      height: 300rpx;
      display: block;
    }
    &-content{
      position: absolute;
      top:94rpx;
      left: 402rpx;
      .text1{
        font-size: 48rpx;
        line-height: 72rpx;
        color:#505050;
        font-weight: bold;
      }
      .text2{
        font-size: 24rpx;
        line-height: 36rpx;
        color: #808080;
      }
    }
  }
}
  
</style>
