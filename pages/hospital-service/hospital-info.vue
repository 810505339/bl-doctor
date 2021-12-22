<template>
	<view class="hospital-box">
		<view class="top"></view>
		<view class="content">
			<view class="card h-info">
				<view class="h-info-top">
					<view class="left">
						<view class="h-title">{{ option.title }}</view>
						<view class="h-level">
							<text>{{option.level}}</text>
							<text v-for="text in option.tags" :key="text">{{text}}</text>
						</view>
						<view class="h-person">{{ option.doctor_num }}位医生 | 开放近{{ option.search_num }}周号源</view>
					</view>
					<image :src="option.img_url" mode=""></image>
				</view>
				<view class="h-info-center">
					<p>
						{{option.desc}}
					</p>
				</view>
				<view class="h-info-bottom">
					<image src="../../static/hospital-service/img3.svg"></image>
					<view class="area">{{ option.address }}</view>
					<view class="btn" @click="lookMap">查看路线</view>
				</view>
			</view>
			<view class="card h-sort">
				<view class="title">排名</view>
				<view class="sort-box">
					<template v-if="option.rank">
						<view class="sort-item" v-for="(item, index) in rankList" :key="index">
							{{ item }}
						</view>
						<view class="sort-contorl">
							<view @click="showAll = !showAll" v-if="showAll" class="sort-item down">展开全部<image src="../../static/hospital-service/img6.svg"></image></view>
							<view v-else @click="showAll = !showAll" class="sort-item up">向上收起<image src="../../static/hospital-service/img6.svg"></image></view>
						</view>
					</template>
				</view>
				<view class="card h-register">
					<view class="title">挂号方式</view>
					<view class="list-item">
						<text>微信公众号:&nbsp;&nbsp;{{ option.register_wechat }}</text>
						<view class="list-btn" @click="setBoardData(option.register_wechat)">复制</view>
					</view>
					<view class="list-item">
						<text>网络平台:&nbsp;&nbsp;{{ option.register_network }}</text>
						<view class="list-btn"></view>
					</view>
					<view class="list-item">
						<text>电话:&nbsp;&nbsp;{{ option.register_phone }}</text>
						<view class="list-btn" @click="callPhone(option.register_phone)">呼叫</view>
					</view>
					<view class="list-item">
						<text>APP:&nbsp;&nbsp;{{ option.register_app }}</text>
					</view>
				</view>
				<view class="card h-doctor">
					<view class="title">
						<text>在线医生</text>
						<view class="all">
							<text>全部</text>
							<image src="../../static/hospital-service/img4.svg" mode=""></image>
						</view>
					</view>
					<view class="doc-item" v-for="item in option.online_doctor" :key="item.id">
						<view class="doc-img">
							<view class="img-box">
								<image :src="item.face_image"></image>
							</view>
						</view>
						<view class="doc-right">
							<view>
								<text class="doc-name">{{ item.realname }}</text>
								<text class="doc-type allText">{{ item.desc }}</text>
							</view>
							<view>
								<!-- <text class="doc-hospital allText">
									{{ item.hospital }}
								</text> -->
								<text class="doc-hospital allText">
									{{ item.sections.join(' ') }}
								</text>
							</view>
							<view>
								<p class="doc-infor">{{ item.technology }}</p>
							</view>
							<view class="doc-ach">
								<view class="ach allText">
									<text>接诊数</text>
									<text class="num">{{ item.order_num }}</text>
								</view>
								<!-- <view class="ach allText">
									<text>接诊率</text>
									<text class="num">{{ item.b }}</text>
								</view> -->
								<view class="ach allText">
									<text>综合评分</text>
									<text class="num">{{ item.star_avg }}</text>
								</view>
							</view>
						</view>
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
				bgColor: "rgba(65, 171, 133, 1)",
				option: {},
				showAll: true
			};
		},
		computed: {
			rankList() {
				const {showAll} = this
				if(showAll && this.option.rank.length<7) return this.option.rank
				return this.option.rank
			}
		},
		onLoad(option) {
			this.option = option;
			this.getHospitalInfo()
		},
		methods: {
			async getHospitalInfo() {
				const {data} = await this.$axios({
					url: '/api/hospital/detail',
					data: {
						id: this.option.id
					}
				})
				this.option = data.data
				uni.setNavigationBarTitle({
					title: this.option.title,
				});
			},
			leftClick() {
				uni.navigateTo({
					url: "/pages/hospital-service/hospital-service",
				});
			},
			// 查看路线
			lookMap() {
				uni.navigateTo({
					url:'/pages/hospital-service/hospital-map'
				})
			},
			callPhone(phone) { // 打电话
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			setBoardData(data) { // 复制
				console.log(data)
				uni.setClipboardData({
					data
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.hospital-box {
		position: relative;
		height: 100%;
		overflow: auto;

		.top {
			width: 100%;
			height: 184rpx;
			background-color: rgba(65, 171, 133, 1);
		}

		.content {
			position: absolute;
			top: 40rpx;
			width: 750rpx;
			padding: 0 20rpx;
			box-sizing: border-box;

			.card {
				background: #ffffff;
				border-radius: 6rpx;
				padding: 20rpx;
				margin-bottom: 20rpx;

				.title {
					color: rgba(80, 80, 80, 1);
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.h-info {
				padding: 30rpx 20rpx 20rpx;

				.h-info-top {
					display: flex;
					height: 144rpx;
					align-items: center;
					margin-bottom: 10rpx;

					.left {
						flex: 1;

						.h-title {
							height: 60rpx;
							line-height: 60rpx;
							font-size: 40rpx;
							font-weight: bold;
						}

						.h-level {
							height: 42rpx;
							line-height: 42rpx;

							text {
								font-size: 28rpx;
								padding-right: 20rpx;
							}
						}

						.h-person {
							height: 42rpx;
							line-height: 42rpx;
							font-size: 28rpx;
						}
					}

					image {
						height: 120rpx;
						width: 120rpx;
					}
				}

				.h-info-center {
					margin: 20rpx 0;
					height: 148rpx;
					border-bottom: 2rpx solid rgba(166, 166, 166, 1);

					p {
						font-size: 24rpx;
						line-height: 35rpx;
						color: rgba(80, 80, 80, 1);
					}
				}

				.h-info-bottom {
					display: flex;
					height: 48rpx;
					align-items: center;

					image {
						height: 36rpx;
						width: 36rpx;
					}

					.btn {
						width: 96rpx;
						font-size: 24rpx;
						color: rgba(65, 171, 133, 1);
					}

					.area {
						flex: 1;
					}
				}
			}

			.h-sort {
				.sort-box {
					min-height: 224rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.sort-item {
						color: rgba(80, 80, 80, 1);
						background-color: rgba(245, 245, 245, 1);
						height: 42rpx;
						border-radius: 32rpx;
						font-size: 24rpx;
						padding: 0 25rpx;
						margin-left: 16rpx;
					}
					.down,.up{
						display: flex;
						align-items: center;
						color:  rgba(65, 171, 133, 1);
						image{
							margin-left: 20rpx;
							height: 50rpx;
							width: 50rpx;
						}
					}
				}
			}

			.h-register {
				.list-item {
					display: flex;
					align-items: center;

					.list-btn {
						width: 48rpx;
						color: rgba(65, 171, 133, 1);
						font-size: 24rpx;
					}

					text {
						flex: 1;
						font-size: 24rpx;
						color: rgba(80, 80, 80, 1);
					}
				}
			}

			.h-doctor {
				.title {
					display: flex;
					align-items: center;

					text {
						flex: 1;
					}

					.all {
						width: 100rpx;
						height: 40rpx;
						display: flex;
						align-items: center;

						image {
							height: 44rpx;
							width: 44rpx;
						}
					}
				}

				.doc-item {
					display: flex;
					border-bottom: 2rpx solid rgba(153, 153, 153, 1);
					padding: 22rpx 0;

					.doc-img {
						width: 120rpx;

						.img-box {
							height: 80rpx;
							width: 80rpx;
							margin: 0 auto;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 50%;
							background-color: rgba(153, 153, 153, 0.2);
						}

						image {
							height: 70rpx;
							width: 70rpx;
						}
					}

					.doc-right {
						flex: 1;
						color: rgba(80, 80, 80, 1);

						.doc-name {
							font-size: 32rpx;
							font-weight: bold;
							font-size: 32rpx;
							margin-right: 16rpx;
						}

						.doc-type {
							color: rgba(166, 166, 166, 0.8);
						}

						.allText {
							font-size: 24rpx;
						}

						.doc-infor {
							font-size: 20rpx;
						}

						.doc-hospital {
							margin-right: 22rpx;
						}

						.doc-ach {
							display: flex;

							view {
								flex: 1;

								.num {
									color: rgba(65, 171, 133, 1);
								}
							}
						}
					}
				}
			}
		}
	}
</style>
