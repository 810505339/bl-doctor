<template>
	<view>
		<uni-list>
			<uni-list-item title="个性化推荐">
				<template slot="footer">
					<switch :checked="individualization" @change="individualizationchange" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);" />
				</template>
			</uni-list-item>
		</uni-list>
		<p style = "margin-top: 20rpx;margin-left: 20rpx;font-size: 28rpx;font-weight: bold;">什么是个性化推荐?</p>
		<p style = "margin-left: 20rpx;margin-right: 28rpx;color: rgba(166, 166, 166, 1);font-size: 28rpx;">
			个性化推荐是指后台分析的使用习惯及浏览情况,
			为您量身推荐一些符合您需求的内容,减少您的查找
			时间,此开关不涉及隐私安全,请您放心使用
		</p>
	</view>
</template>

<script>
export default {
	data() {
		return {
			individualization: true
		};
	},
	methods: {
		individualizationchange(){
			this.individualization = !this.individualization
		}
	}
};
</script>

<style scoped>
	::v-deep .uni-list-item__container {
		align-items: center;
	}
	::v-deep .uni-list-item__container span{
		color: rgba(80, 80, 80, 1);
		font-family: 'Microsoft YaHei';
		font-size: 28rpx;
	}
</style>
