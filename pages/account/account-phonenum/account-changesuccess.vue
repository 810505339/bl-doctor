<template>
	<view class="successbody">
		<div class="box">
			<img src="../assest/success.svg" alt="" style="width: 228rpx;height: 228rpx;	margin-top: 160rpx;" />
			<p style="color: rgba(80, 80, 80, 1);font-size: 36rpx;font-weight: bold;height: 34rpx;">手机号修改成功</p>
			<p style="color: rgba(128, 128, 128, 1);font-size: 28rpx;height: 42rpx;margin-top: 22rpx;">{{ time }}秒后返回设置页</p>
			<div @click="backset(1)" class="deletbink">返回设置页</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			time: 3
		};
	},
	mounted() {
		this.backset();
	},
	methods: {
		backset(index) {
			if (index) {
				this.$router.push('/pages/account/account/account-set');
			}
			let timeon = setInterval(() => {
				this.time = this.time - 1;
				if (this.time == 0) {
					this.time = 3;
					clearInterval(timeon);
					this.$router.push('/pages/account/account/account-set');
				}
			}, 1000);
		}
	}
};
</script>

<style>
	.successbody {
		height: 100%;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
<style scoped>
.box {
	text-align: center;
	overflow: hidden;
}
.deletbink {
	position: fixed;
	width: 82%;
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
	bottom: 360rpx;
}
</style>
