<template>
	<view>
		<u-navbar
					title="选择就诊人"
					safeAreaInsetTop
					fixed
					placeholder
					@leftClick="navigateBack"
		>
		<view class="u-nav-slot" slot="right">
			<text class="add-new" @click="addPatient">新增</text>
		</view>
		</u-navbar>
		<view class="page-wrap">
			<view class="record-wrap">
				<view class="record-item" v-for="(record, index) in records" :key="record.id" @click="addMedical(record)">
					<text :style="{backgroundColor: colors[index % 2]}" class="first-name">{{record.name.substr(0,1)}}</text>
					<view class="user-wrap">
						<view class="user-box">
							<view>
								<text class="user-name">{{record.name}}</text>
								<text class="user-relation">{{record.relation_type}}</text>
							</view>
							<text class="user-gender">{{record.gender_type}}<text class="user-age">{{record.age}}岁</text></text>
						</view>
						<image src="/static/medical-records/arrow-right.png" class="arrow-right"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				records: [],
				colors: ['#41ab85', '#2a82e4', '#ff5733']
			};
		},
		onLoad() {
			this.getMediacalList();
		},
		methods:{
			async getMediacalList() {
				const {data: {arr}} = await this.$axios({
					url: '/api/users/patient/index'
				});
				if(arr && arr.length) {
					this.records = arr;
				}
			},
			navigateBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			addPatient() {
				uni.navigateTo({
					url: '/pages/zjwz/jswz/add-patient'
				});
			},
			addMedical(record) {
				console.log(record);
				const { age, gender, name, id } = record;
				uni.navigateTo({
					url: `add-medical?age=${age}&gender=${gender}&name=${name}&patientId=${id}`
				})
			},
			onShow() {
				this.getMediacalList();
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-wrap{
	padding-top: 14rpx;
}
.add-new{
	color: #505050;
	font-size: 28rpx;
}
.record-wrap{
	background-color: #FFFFFF;
	padding-left: 22rpx;
	box-sizing: border-box;
}
.record-item{
	display: flex;
	align-items: center;
	width: 100%;
	padding: 48rpx 0 48rpx 0;
	border-bottom: 1px solid #e5e5e5;
}
.first-name{
	margin-right: 14rpx;
	width: 70rpx;
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFFFFF;
	border-radius: 35rpx;
	font-size: 28rpx;
	font-weight: bold;
}
.user-wrap{
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 1;
}
.user-box{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.user-name{
	margin-right: 16rpx;
	height: 48rpx;
	color: #505050;
	font-size: 32rpx;
	line-height: 1.5;
	font-weight: bold;
}
.user-relation{
	display: inline-block;
	width: 62rpx;
	height: 36rpx;
	color: #FFFFFF;
	background-color: #b0cbe9;
	border-radius: 32rpx;
	font-size: 24rpx;
	line-height: 150%;
	text-align: center;
}
.user-gender{
		height: 36rpx;
		color: #a6a6a6;
		font-size: 24rpx;
		line-height: 150%;
		text-align: left;
}
.user-age{
	margin-left: 8rpx;
}
.arrow-right{
	width: 60rpx;
	height: 60rpx;
}
</style>
