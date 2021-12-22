<template>
	<view>
		<div class="icon-block">
			<div class="icon-title">
				<div class="icon-text">白龙医疗服务端</div>
			</div>
		</div>
		<div class="title">{{name}}</div>
		<div class="recommend-block">
			<div>1.这个涵盖什么功能</div>
			<div>2.这个软件在哪里下载</div>
			<div>3.这个软件点击下面按钮就跳转到应用商店</div>
			<div>4.不跳转商店就跳转到浏览器</div>
		</div>
		
		<div class="download">
			前往下载
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"白龙医疗服务端V1.0.2"
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.icon-block{
		margin: 0 auto;
		padding-top: 160rpx;
		width: 180rpx;
		height: 180rpx;
	}
	.icon-title{
		width: 180rpx;
		height: 180rpx;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(65, 171, 133, 1);
		border-radius: 32rpx;
		font-size: 32rpx;
		line-height: 48rpx;
		text-align: center;
		font-weight: bold;
		display: flex;
		align-items: center;
	}
	.icon-text{
		margin: 0 auto;
		width: 140rpx;
		height: 100rpx;
		justify-content: center;
	}
	.title{
		margin: 0 auto;
		margin-top: 20rpx;
		width: 320rpx;
		height: 48rpx;
		color: rgba(80, 80, 80, 1);
		font-size: 32rpx;
		line-height: 48rpx;
		text-align: left;
		font-weight: bold;
	}
	.recommend-block{
		width: 540rpx;
		height: 190rpx;
		margin: 40rpx 54rpx;
		/* margin-left: 54rpx;
		margin-top: 40rpx; */
		color: rgba(80, 80, 80, 1);
		font-size: 28rpx;
		line-height: 42rpx;
		text-align: left;
	}
	.download{
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
