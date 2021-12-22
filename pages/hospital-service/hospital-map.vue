<template>
  <view class="map-box">
    <map class="map" style="width: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
    <cover-view class="btn" @click="show=true">导航去医院</cover-view>
    <u-modal title="提示" :content="content" :show="show" showCancelButton closeOnClickOverlay @confrim="confrim" @cancel="cancel" @close="close"></u-modal>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				content: "导航需要跳转第三方应用，是否跳转？",
				show: false,
				covers: [
					{
						width: 20,
						height: 20,
						latitude: 39.909,
						longitude: 116.39742,
						iconPath: '../../static/escort-service/location-blue.png'
					}
				]
			}
		},
		methods: {
			getLocation() {
				uni.getLocation({
					type:'gcj02',
					success: (res) => {
						this.longitude = res.longitude
						this.latitude = res.latitude
						this.covers[0].latitude = this.latitude
						this.covers[0].longitude = this.longitude
					}
				})
			},
			confrim() {
				this.show = false;
			},

			cancel() {
				this.show = false;
			},
			close() {
				this.show = false
			}

		}
	}
</script>

<style lang="scss" scoped>
	.map-box {
		height: 100%;
		width: 750rpx;
		position: relative;
		.btn {
			height: 96rpx;
			width: 282rpx;
			color: rgba(255, 255, 255, 1);
			background-color: rgba(65, 171, 133, 1);
			border-radius: 50px;
			font-size: 32rpx;
			position: relative;
			top: 30px;
			left: 50%;
			transform: translate(-50%, 0);
			text-align: center;
			line-height: 96rpx;
		}
	}
	.map{
		height: calc(100vh - 150px);
	}
</style>
