<template>
	<view>
	
		<div class="title">
			白龙医疗
		</div>
		<div class="phone-message">
			for iphone V1.0.2
		</div>
		<div class="erweima">
			<image src="./asset/erweima.png" />
		</div>
		<div class="download">扫描二维码，您的朋友也可以下载白龙医疗客户端</div>
		<uni-list>
			<uni-list-item :border="true" title="特别声明">
				<template slot="footer">
					<image class="right" src="./asset/right.svg"></div>
				</template>
			</uni-list-item>
			<uni-list-item :border="true" title="法律条款">
				<template slot="footer">
					<image class="right" src="./asset/right.svg"></div>
				</template>
			</uni-list-item>
			<uni-list-item :border="true" title="给我评分">
				<template slot="footer">
					<image class="right" src="./asset/right.svg"></div>
				</template>
			</uni-list-item>
			<uni-list-item :border="true" title="隐私政策">
				<template slot="footer">
					<image class="right" src="./asset/right.svg"></div>
				</template>
			</uni-list-item>
			<uni-list-item :border="true" title="检查更新">
				<template slot="footer">
					<image class="right" src="./asset/right.svg"></div>
				</template>
			</uni-list-item>
		</uni-list>
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
	.title{
		margin: 0 auto;
		margin-top: 100rpx;
		width: 160rpx;
		height: 60rpx;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 40rpx;
	}
	.phone-message{
		margin: 0 auto;
		height: 42rpx;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 28rpx;
	}
	.erweima{
		margin: 0 auto;
		margin-top: 38rpx;
		width: 184rpx;
		height: 184rpx;
	}
	.erweima image{
		width: 184rpx;
		height: 184rpx;
	}
	.download{
		margin: 0 auto;
		margin-top: 18rpx;
		margin-bottom: 32rpx;
		height: 36rpx;
		font-size: 20rpx;
		text-align: center;
	}
	.uni-list-item{
		height: 96rpx;
	}
	.right{
		width: 52rpx;
		height: 52rpx;
		justify-content: center;
		align-items: center;
	}
</style>
