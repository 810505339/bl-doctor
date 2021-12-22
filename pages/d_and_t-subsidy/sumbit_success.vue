<template>
	<view>
		<u-navbar back-text=" " safeAreaInsetTop title-bold back-icon-color="rgba(153, 153, 153, 1)" @leftClick="back"
			back-icon-name="arrow-left" title="提交成功" title-color="rgba(80, 80, 80, 1)" :border-bottom="false">
		</u-navbar>
		<view class="imgGroup">
			<u--image src="/static/d_and_t-subsidy/success.svg" shape="circle" width="196rpx" height="196rpx">
			</u--image>
		</view>
		<view class="tip_title">
			补贴申请提交成功
		</view>
		<view class="tip_content">
			您的申请已提交至后台，审核人员会为您尽快处理
		</view>
		<view class="btn" @click="navigate">
			查看补贴进度
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			navigate(){
				uni.navigateTo({
					url:'/pages/d_and_t-subsidy/subsidy_progress'
				})
			},
			back() {
				uni.navigateBack({})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.imgGroup {
		margin: auto;
		margin-top: 266rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(65, 171, 133, 1);
		width: 310rpx;
		height: 310rpx;
	}

	.tip_title {
		margin: auto;
		margin-top: 38rpx;
		color: rgba(80, 80, 80, 1);
		font-size: 36rpx;
		font-weight: bold;
	}

	.tip_content {
		margin: auto;
		margin-top: 16rpx;
		color: rgba(166, 166, 166, 1);
		font-size: 28rpx;
	}

	.btn {
		width: 314rpx;
		height: 94rpx;
		margin: auto;
		display: flex;
		border-radius: 48rpx;
		margin-top: 52rpx;
		justify-content: center;
		align-items: center;
		color: rgba(80, 80, 80, 1);
		font-size: 32rpx;
		border: rgba(65, 171, 133, 1) solid 2rpx;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
