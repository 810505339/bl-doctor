<template>
	<view>
		<uni-list>
			<uni-list-item :border="true" title="注册常见问题">
				<template slot="footer">
					<image class="right" src="./asset/right.svg"></div>
				</template>
			</uni-list-item>
			<uni-list-item :border="true" title="验证码无法收取的问题">
				<template slot="footer">
					<image class="right" src="./asset/right.svg"></div>
				</template>
			</uni-list-item>
			<uni-list-item :border="true" title="无法进入登陆页面的问题">
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
