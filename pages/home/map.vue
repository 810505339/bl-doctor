<template>
  <view class="map_context">
    <view class="nav">
      <view>就诊地图</view>
      <!-- <view class="nav_rig">
        展开
        <u-icon name="arrow-right" size="16"></u-icon>
      </view>-->
    </view>
    <map scale="12" style="width: 100%; height: 300rpx; margin-top: 10rpx;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id:0, // 使用 marker点击事件 需要填写id
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '../../static/escort-service/location-blue.png'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  margin: 20rpx 20rpx 0 20rpx;
  display: flex;
  justify-content: space-between;
  .nav_rig{
    display: flex;

  }
}
</style>