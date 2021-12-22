<template>
	<view>
		<uni-list>
			<uni-list-item :border="false" title="验证指纹进入系统">
				<template slot="header">
					<image class="lefticon" src="../assest/fingerprint.svg" style="width: 44rpx;height: 44rpx;"></image>
				</template>
				<template slot="footer">
					<switch :checked="fingerprint" @change="fingerprintchange" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);" />
				</template>
			</uni-list-item>
			<uni-list-item :border="false" title="验证面容进入系统">
				<template slot="header">
					<image class="lefticon" src="../assest/face.png" style="width: 44rpx;height: 44rpx;"></image>
				</template>
				<template slot="footer">
					<switch :checked="face" @change="facechange" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);" />
				</template>
			</uni-list-item>
		</uni-list>
		<p style="margin-left: 28rpx;margin-top:20rpx;font-size: 28rpx;font-family: 'Microsoft YaHei';color:rgba(80, 80, 80, 1) ;">开启本地功能需要设置解锁备用密码,并仅对本机有效</p>
	</view>
</template>

<script>
export default {
	data() {
		return {
			face: false,
			fingerprint: true
		};
	},
	methods: {
		facechange() {
			this.face = !this.face;
		},
		fingerprintchange() {
			this.fingerprint = !this.fingerprint;
		}
	}
};
</script>

<style scoped>
::v-deep .uni-list-item__container {
	align-items: center;
	padding-right: 0;
}
::v-deep .uni-list-item__content-title {
	margin-left: 14rpx;
}
::v-deep .uni-list-item__container span {
	color: rgba(80, 80, 80, 1);
	font-family: 'Microsoft YaHei';
	font-size: 28rpx;
}
</style>
