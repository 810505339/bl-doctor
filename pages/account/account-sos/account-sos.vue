<template>
	<view>
		<uni-list>
			<uni-list-item title="急救模式开关">
				<template slot="footer">
					<switch :checked="sos" @change="soschange" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7);" />
				</template>
			</uni-list-item>
		</uni-list>
		<p style = "margin-top: 20rpx;margin-left: 20rpx;font-size: 28rpx;font-weight: bold;color: rgba(212, 48, 48, 1);">什么是SOS急救模式?</p>
		<p style = "margin-left: 20rpx;margin-right: 28rpx;color: rgba(166, 166, 166, 1);font-size: 28rpx;">
			急救模式是允许白龙医疗入驻的医生，在特定条件下打开您的白龙医疗软件，查看到您的病历本及体检记录，以便在您紧急悄况下洲哆精准找到医疗方案。医护人员使用时，会进人特定模式，请您放心开启。
		</p>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sos: true
		};
	},
	methods: {
		soschange(){
			this.sos = !this.sos
		}
	}
};
</script>

<style scoped>
	::v-deep .uni-list-item__container {
		align-items: center;
		padding-right: 0;
	}
	::v-deep .uni-list-item__container span{
		color: rgba(80, 80, 80, 1);
		font-family: 'Microsoft YaHei';
		font-size: 28rpx;
	}
</style>
