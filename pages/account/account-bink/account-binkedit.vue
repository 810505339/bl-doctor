<template>
	<view class="binkedit">
		<div class="box">
			<div class="title">
				<p>绑定银行卡</p>
				<span>绑定银行卡，支付更便捷</span>
			</div>
			<div class="inputbox">
				<span>输入持卡人姓名</span>
				<input placeholder="点击输入持卡人姓名" placeholder-style="color: rgba(166, 166, 166, 1);font-family: 'Microsoft YaHei';font-size: 28rpx;height:28rpx;line-height:28rpx"/>
				<span>输入银行卡号</span>
				<span
					style="width:100%;border: rgba(229, 229, 229, 1) solid 2rpx;height: 96rpx;display: block;padding: 0;display: flex;align-items: center;margin: 28rpx 0;font-weight: inherit;"
				>
					<input style="float: left;border: 0;" placeholder="点击输入银行卡号" placeholder-style="color: rgba(166, 166, 166, 1);font-family: 'Microsoft YaHei';font-size: 28rpx;height:28rpx;line-height:28rpx"/>
					<img class style="width: 50rpx;position: fixed;right: 82rpx;" src="../assest/camera.svg" alt="" />
				</span>
			</div>
			<div class="insertbink" v-if="ischeck"><span>提示：卡号验证失败，请重新核对</span></div>
			<div class="deletbink" @click="binding">绑定</div>
		</div>
	</view>
</template>
<script>
export default {
	data() {
		return {
			ischeck: false
		};
	},
	methods: {
		binding() {
			this.ischeck = !this.ischeck;
		}
	}
};
</script>
<style>
.binkedit {
	height: 100%;
	background-color: rgba(255, 255, 255, 1);
}
</style>
<style>
.box {
	padding: 0 60rpx;
	overflow: hidden;
}
.title {
	width: 100%;
	text-align: center;
	margin-top: 120rpx;
}
.title p {
	height: 72rpx;
	color: rgba(80, 80, 80, 1);
	font-size: 48rpx;
	line-height: 150%;
	font-weight: bold;
}
.title span {
	height: 42rpx;
	top: 326rpx;
	color: rgba(128, 128, 128, 1);
	font-size: 28rpx;
	line-height: 150%;
}
.inputbox {
	margin-top: 80rpx;
}
.inputbox span {
	height: 48rpx;
	color: rgba(80, 80, 80, 1);
	font-size: 32rpx;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
::v-deep .uni-input-input {
	color: rgba(80, 80, 80, 1);
	font-family: 'Microsoft YaHei';
	font-size: 28rpx;
}
.inputbox input {
	height: 96rpx;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 12rpx;
	line-height: 150%;
	border: rgba(229, 229, 229, 1) solid 2rpx;
	padding-left: 22rpx;
	margin: 14rpx 0;
}
.inputbox input:last-child {
	border: 0 !important;
}
.insertbink {
	height: 42rpx;
	color: rgba(212, 48, 48, 1);
	font-size: 28rpx;
	line-height: 150%;
	text-align: left;
}
.deletbink {
	position: fixed;
	width: 92%;
	height: 96rpx;
	background-color: rgba(65, 171, 133, 1);
	border-radius: 50rpx;
	text-align: center;
	line-height: 96rpx;
	font-family: 'Microsoft YaHei';
	font-weight: bold;
	font-size: 32rpx;
	color: rgba(255, 255, 255, 1);
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	bottom: 40rpx;
}
</style>
