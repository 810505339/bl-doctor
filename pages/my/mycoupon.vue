<template>
	<view>
		<div class="bigbox">
			<div  class="middlebox"   v-for="(item, index) in data" :key="index">
				<div class="smallbox">
					<div class="lastbox">
						<div>
							<span style = "color: rgba(65, 171, 133, 1);font-size: 33px;">{{ item.firstnum }}</span>
							<span style = "color: rgba(65, 171, 133, 1);font-size: 18px;">.{{ item.secondnum }}折</span>
						</div>
						<div>
							<p style="color: rgba(56, 56, 56, 1);font-size: 32rpx;font-weight: bold;">{{ item.title }}</p>
							<p
								style="width: 136rpx;color: rgba(188, 150, 21, 1);background-color: rgba(255, 255, 255, 1);border-radius: 10rpx;font-size: 20rpx;border: rgba(188, 150, 21, 1) solid 2rpx;text-align: center;"
							>
								{{ item.tip }}
							</p>
							<p style="color: rgba(166, 166, 166, 1);font-size: 12px;">
								有效期至{{ item.time }}
							</p>
						</div>
						<div style = "width: 62px;height: 24px;color: rgba(65, 171, 133, 1);border-radius: 16px;font-size: 14px;border: rgba(65, 171, 133, 1) solid 1px;text-align: center;"><p>去使用</p></div>
					</div>
				</div>
			</div>
		</div>
		<div class = "bottom"> 
			
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: [
				{
					firstnum: 4,
					secondnum: 8,
					title: '儿科问诊优惠券',
					tip: '仅限定医生',
					time: '2021-01-14 11:59'
				},
				{
					firstnum: 4,
					secondnum: 8,
					title: '儿科问诊优惠券',
					tip: '仅限定医生',
					time: '2021-01-14 11:59'
				},
				{
					firstnum: 4,
					secondnum: 8,
					title: '儿科问诊优惠券',
					tip: '仅限定医生',
					time: '2021-01-14 11:59'
				},
				{
					firstnum: 4,
					secondnum: 8,
					title: '儿科问诊优惠券',
					tip: '仅限定医生',
					time: '2021-01-14 11:59'
				},
				{
					firstnum: 4,
					secondnum: 8,
					title: '儿科问诊优惠券',
					tip: '仅限定医生',
					time: '2021-01-14 11:59'
				},
				{
					firstnum: 4,
					secondnum: 8,
					title: '儿科问诊优惠券',
					tip: '仅限定医生',
					time: '2021-01-14 11:59'
				},
				{
					firstnum: 4,
					secondnum: 8,
					title: '儿科问诊优惠券',
					tip: '仅限定医生',
					time: '2021-01-14 11:59'
				},
				{
					firstnum: 4,
					secondnum: 8,
					title: '儿科问诊优惠券',
					tip: '仅限定医生',
					time: '2021-01-14 11:59'
				}
			]
		};
	},
	methods: {}
};
</script>

<style>
.bigbox {
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;
}
.middlebox {
	width: 100%;
	height: 200rpx;
	background-color: rgba(255, 255, 255, 1);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	padding: 10rpx;
	margin-top: 20rpx;
}
.smallbox {
	width: 100%;
	border: rgba(65, 171, 133, 1) solid 1rpx;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 10rpx;
}
.lastbox {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10rpx;
	box-shadow: rgba(241, 241, 241, 1) solid 1px;
}
.bottom{
	margin-top: 50%;
	height: 10rpx;
}
</style>
