<template>
	<view>
		<uni-list>
			<uni-list-item :border="false" title="系统通知">
				<template slot="footer">
					<switch :checked="systemFlag" @change="changeFlag('systemFlag')" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);"/>
				</template>
			</uni-list-item>
			<uni-list-item :border="false" title="营销活动">
				<template slot="footer">
					<switch :checked="marketFlag" @change="changeFlag('marketFlag')" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);" />
				</template>
			</uni-list-item>
			
			<uni-list-item :border="false" title="上线提醒">
				<template slot="footer">
					<switch :checked="onlineFlag" @change="changeFlag('onlineFlag')" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);" />
				</template>
			</uni-list-item>
			<uni-list-item :border="false" title="活动提醒">
				<template slot="footer">
					<switch :checked="activityFlag"" @change="changeFlag('activityFlag')" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);" />
				</template>
			</uni-list-item>
			<uni-list-item :border="false" title="挂号提醒">
				<template slot="footer">
					<switch :checked="registerFlag" @change="changeFlag('registerFlag')" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);" />
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				systemFlag:true,
				marketFlag:true,
				onlineFlag:true,
				activityFlag:true,
				registerFlag:true,
			}
		},
		methods: {
			changeFlag(flag){
				this._data[flag] = !this._data[flag];
				console.log(this._data[flag])
			}
		}
	}
</script>

<style>
	.uni-list-item{
		height: 96rpx;
	}

</style>
