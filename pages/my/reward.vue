<template>
	<view>
		<div class = "bigbox">
			<div class = "smillbox"  v-for="(item,index) in data" :key = "index">
				<img :src="item.url" alt="" style = "width: 160rpx;height: 160rpx;">
				<div>
					<p style="color: rgba(56, 56, 56, 1);font-size: 32rpx;font-weight: bold;">{{ item.title }}</p>
					<p
						style="width: 150rpx;color: rgba(188, 150, 21, 1);background-color: rgba(255, 255, 255, 1);border-radius: 10rpx;font-size: 20rpx;border: rgba(188, 150, 21, 1) solid 2rpx;text-align: center;"
					>
						{{ item.tip }}
					</p>
					<p style="color: rgba(166, 166, 166, 1);font-size: 12px;">
						有效期至{{ item.time }}
					</p>
				</div>
				<div style = "width: 62px;height: 24px;color: rgba(65, 171, 133, 1);border-radius: 16px;font-size: 14px;border: rgba(65, 171, 133, 1) solid 1px;text-align: center;"><p>去使用</p></div>
			</div>
			<div class = "bottom">
				
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [
					{
						url: require("./asset/rewardegg.jpg"),
						title: '新人福利体验包',
						tip: '限指定医院',
						time: '2021-01-14 11:59'
					},
					{
						url: require("./asset/rewardegg.jpg"),
						title: '新人福利体验包',
						tip: '限指定医院',
						time: '2021-01-14 11:59'
					},
					{
						url: require("./asset/rewardegg.jpg"),
						title: '新人福利体验包',
						tip: '限指定医院',
						time: '2021-01-14 11:59'
					},
					{
						url: require("./asset/rewardegg.jpg"),
						title: '新人福利体验包',
						tip: '限指定医院',
						time: '2021-01-14 11:59'
					},
					]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.bigbox{
	padding: 20rpx;
}
.smillbox{
	background-color: rgba(255, 255, 255, 1);
	display: flex;
	justify-content: space-between; 
	flex-wrap: wrap;
	align-items: center;
	padding: 20rpx;
	margin-top: 20rpx;
}
.bottom{
	margin-top: 50%;
	height: 10rpx;
}
</style>
