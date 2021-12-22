<template>
	<view>
		<u-navbar back-text=" " safeAreaInsetTop title-bold back-icon-color="rgba(153, 153, 153, 1)" @leftClick="back"
			back-icon-name="arrow-left" title="支持补贴的医院" title-color="rgba(80, 80, 80, 1)" :border-bottom="false">
			<view style="font-size: 30rpx;font-weight: bold;" slot="right"
				@click="naviTo('/pages/d_and_t-subsidy/subsidy_progress')">
				补贴进度
			</view>
		</u-navbar>
		<view class="search_box">
			<u-search shape="round" placeholder="请输入医院名称" @search="search" :inputStyle="{'fontSize':'28rpx'}"
				:show-action="false" height="66" margin="16rpx 20rpx">
			</u-search>
		</view>
		<view class="select_area">
			<view class="dropdownItem" @click="openCity">
				<u-icon margin-left="18" color="rgba(153, 153, 153, 1)" size="12" v-if="city_isOpen"
					name="arrow-up-fill" label-size="28rpx" label-color="rgba(80, 80, 80, 1)" :label="city"
					label-pos="left"></u-icon>
				<u-icon margin-left="18" color="rgba(153, 153, 153, 1)" size="12" v-else name="arrow-down-fill"
					label-size="28rpx" label-color="rgba(80, 80, 80, 1)" :label="city" label-pos="left"></u-icon>
			</view>
			<view class="dropdownItem" @click="openArea">
				<u-icon margin-left="8" color="rgba(153, 153, 153, 1)" size="12" v-if="area_isOpen" name="arrow-up-fill"
					label-size="28rpx" label-color="rgba(80, 80, 80, 1)" :label="area" label-pos="left"></u-icon>
				<u-icon margin-left="8" color="rgba(153, 153, 153, 1)" size="12" v-else name="arrow-down-fill"
					label-size="28rpx" label-color="rgba(80, 80, 80, 1)" :label="area" label-pos="left"></u-icon>
			</view>
		</view>
		<view class="card_area">
			<u-empty v-if="isLast" mode="list" text="暂无数据">
			</u-empty>
			<view class="items"
				@click="naviTo('/pages/d_and_t-subsidy/reading?hospital_id='+item.id+'&hospital_name='+item.title)"
				v-for="(item,index)  in hospitalList" :key="index">
				<view class="card_item">
					<view class=""
						style="background: rgba(229, 229, 229, 1);height: 102rpx;width: 102rpx;border-radius: 50%;display: flex;align-items: center;justify-content: center;">
						<u--image :src="item.img_url" shape="circle" width="84rpx" height="84rpx">
						</u--image>
					</view>
					<view class="info">
						<view class="title">
							{{item.title}}
						</view>
						<view class="detail">
							<view class="p1" v-for="(t,i) in item.rank">
								{{t}}
							</view>
							<view class="p2" v-for="(t,i) in item.tags">
								{{t}}
							</view>
						</view>
					</view>
					<view class="distance">
						{{item.distance + 'km'}}
					</view>
				</view>
				<view class="line" v-if="index!=hospitalList.length-1"></view>
			</view>

		</view>
		<u-picker :show="city_isOpen" keyName="test" :closeOnClickOverlay="true" :columns="cityList"
			@confirm="confirmCity" @cancel="closeCity">
		</u-picker>
		<u-picker :show="area_isOpen" keyName="label" closeOnClickOverlay :columns="areaList" @confirm="confirmArea"
			@cancel="closeArea">
		</u-picker>
	</view>
</template>

<script>
	import url from '@api/subsidy'
	import cityData from "@/utils/city.js"
	export default {
		data() {
			return {
				city: '城市',
				area: '区域',
				cityID: 0,
				areaID: 0,
				cityList: [],
				areaList: [],
				city_isOpen: false,
				area_isOpen: false,
				hospitalList: [],
				tempList: [],
				lng: 0,
				lat: 0,
				isLast: false
			};
		},
		onLoad() {
			this.getloca()
			this.cityList.push(cityData.map((item, index) => {
				return item[0]
			}))
		},
		methods: {
			async getloca() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						const {
							longitude,
							latitude
						} = res
						this.lng = longitude
						this.lat = latitude
						this.getHospitalList()
					},
					complete: (res) => {}
				})

			},
			getAreaList(id) {
				this.areaList = []
				this.area = '区域'
				this.$axios({
					url: url.area_list,
					data: {
						parent_id: id + '00'
					}
				}).then((res) => {
					this.areaList.push(res.data.list)
				})
			},
			search(e) {
				this.hospitalList = this.tempList.filter(item => {
					return item.title.indexOf(e) > -1
				})
				try {
					uni.hideKeyboard();
				} catch (e) {}
			},
			getHospitalList() {
				uni.showLoading()
				let data = {
					lng: 30,
					lat: 30
				}
				if (this.areaID) {
					data.county_id = this.areaID
				}
				if (this.cityID) {
					data.city_id = this.cityID + '00'
				}
				if (this.lng) {
					data.lng = this.lng
				}
				if (this.lat) {
					data.lat = this.lat
				}
				this.$axios({
					url: url.subsidy_hospital,
					data: data
				}).then((res) => {
					this.hospitalList = res.data.arr.data
					this.tempList = res.data.arr.data
					this.isLast = !res.data.arr.data.length?true:false
					uni.hideLoading()
				})

			},
			back() {
				uni.navigateBack({})
			},
			openCity() {
				if (this.city_isOpen) {
					return
				}
				this.city_isOpen = true
			},
			openArea() {
				if (this.area_isOpen) {
					return
				}
				this.area_isOpen = true
			},
			confirmCity(e) {
				if (!e.value.length) {
					return
				}
				this.city = e.value[0]?.test
				this.cityID = e.value[0]?.value
				this.areaID = 0
				this.getAreaList(e.value[0].value)
				this.closeCity()
				this.getHospitalList()
			},
			confirmArea(e) {
				if (!e.value.length) {
					return
				}
				this.area = e.value[0]?.label
				this.areaID = e.value[0]?.value
				this.closeArea()
				this.getHospitalList()
			},
			closeCity() {
				this.city_isOpen = false
			},
			closeArea() {
				this.area_isOpen = false
			},
			naviTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search_box {
		background-color: white;
		overflow: auto;
	}

	.select_area {
		background-color: white;
		height: 88rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;

		.dropdownItem {
			display: flex;
			flex-direction: row;
			justify-content: center;
			text-align: center;
			align-items: center;
			width: 50%;
			height: 42rpx;
			color: rgba(80, 80, 80, 1);
			font-size: 28rpx;
			font-weight: bold;
		}
	}

	.card_area {
		margin-top: 1rpx;

		.items {

			padding: 0rpx 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: white;

			.card_item {
				width: 100%;
				height: 104rpx;
				display: flex;
				margin-bottom: 4rpx;
				display: flex;
				flex-direction: row;
				position: relative;
				margin-top: 16rpx;
				margin-bottom: 26rpx;

				.info {
					margin-left: 18rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 90rpx;
					width: 100%;

					.title {
						color: rgba(80, 80, 80, 1);
						font-size: 34rpx;
						text-align: left;
						font-weight: bold;
					}

					.detail {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						white-space: normal;

						.p1 {
							color: rgba(65, 171, 133, 1);
							font-size: 26rpx;

							margin-right: 22rpx;
						}

						.p2 {
							color: rgba(80, 80, 80, 1);
							font-size: 26rpx;
							margin-right: 22rpx;
						}
					}
				}

				.distance {
					color: rgba(128, 128, 128, 1);
					font-size: 30rpx;
					text-align: right;
					position: absolute;
					top: 0;
					right: 0;
				}
			}

			.line {
				height: 2rpx;
				width: 680rpx;
				background: rgba(229, 229, 229, 1);
				margin-bottom: 16rpx;
			}
		}

	}

	/deep/ .u-navbar__content__title {
		font-weight: bold;
		color: rgba(80, 80, 80, 1);
		font-size: 34rpx;
	}
</style>
