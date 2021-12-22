<template>
	<view>
		<div class="thanks">
			<div>谢谢您的宝贵意见</div>
			<div>我们会尽快响应适合大众的需求</div>
			<div>早日将完美的产品为您呈现</div>
		</div>
		<div class="return">返回首页</div>
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
	.return{
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
