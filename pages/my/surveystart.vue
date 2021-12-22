<template>
	<view>
		<div class="thanks">
			<div>感谢您使用白龙医疗</div>
			<div>我们尝试各种途径获得用户的需求</div>
			<div>但最直接的，就是您的意见</div>
			<div>希望您能在白龙医疗成长过程中</div>
			<div>给予帮助，谢谢</div>
		</div>
		<div class="begin">开始</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.thanks{
		position: absolute;
		top: 200rpx;
		left: 10%;
		width: 80%;
		height: 240rpx;
		color: rgba(80, 80, 80, 1);
		font-size: 40rpx;
		line-height: 80rpx;
		text-align: center;
		font-weight: bold;
	}
	.begin{
		width: 84%;
		height: 96rpx;
		position: absolute;
		left: 7%;
		bottom: 50rpx;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(65, 171, 133, 1);
		border-radius: 50rpx;
		font-size: 32rpx;
		line-height: 48rpx;
		display: flex;
		text-align: center;
		font-weight: bold;	
		justify-content: center;
		align-items: center;
	}
</style>
