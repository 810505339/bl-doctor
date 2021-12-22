<template>
	<view class="mourning-box">
		<u-swiper :list="list5" @change="(e) => (current = e.current)" :autoplay="false">
			<view slot="indicator" class="indicator">
				<view class="indicator__dot" v-for="(item, index) in list5" :key="index"
					:class="[index === current && 'indicator__dot--active']">
				</view>
			</view>
		</u-swiper>
		<view class="screen">
			<view class="screen-item" @click="show = true">
				<text>{{ city }}</text>
				<image src="../../static/hospital-service/img2.svg" mode=""></image>
			</view>
			<view class="screen-item" @click="show = true">
				<text>{{ area }}</text>
				<image src="../../static/hospital-service/img2.svg" mode=""></image>
			</view>
			<view class="screen-item" @click="show = true">
				<text>{{ religion }}</text>
				<image src="../../static/hospital-service/img2.svg" mode=""></image>
			</view>
			<view class="screen-item" @click="show = true">
				<text>{{ others }}</text>
				<image src="../../static/hospital-service/img2.svg" mode=""></image>
			</view>
		</view>
		<view class="sort-box">
			<view class="sort-item" v-for="(item, index) in sorts" :key="index">
				{{ item.name }}
			</view>
		</view>
		<view class="sort-result">
			<view class="card" v-for="(item, index) in resluts" :key="index">
				<view class="user-img">
					<image :src="item.src" mode=""></image>
				</view>
				<view class="user-infor">
					<view class="infor-name">
						<view class="title">{{ item.name }}</view>
						<view>{{ item.distance }}</view>
					</view>
					<view class="infor-score">
						<text>销量{{ item.sales }}</text>
						<text>评分{{ item.score }}</text>
					</view>
					<p class="infor-content">
						{{ item.content }}
					</p>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				current: 0,
				currentNum: 0,
				list5: [
					"https://cdn.uviewui.com/uview/swiper/swiper3.png",
					"https://cdn.uviewui.com/uview/swiper/swiper2.png",
					"https://cdn.uviewui.com/uview/swiper/swiper1.png",
				],
				city: "黑龙江",
				area: "南岗区",
				religion: "宗教",
				others: "其他",
				sorts: [{
						name: "评分最高",
						value: 1,
					},
					{
						name: "订单最多",
						value: 2,
					},
					{
						name: "离我最近",
						value: 3,
					},
					{
						name: "价格最优",
						value: 4,
					},
				],
				resluts: [{
					src: "../../static/hospital-service/img6.png",
					name: "王凤霞寿材",
					distance: "3.8km",
					sales: 1506,
					score: 14.8,
					content: "本店承接各教派丧葬，寿材众多，已服务数以千计已仙逝的人，大众口碑，值得信赖，给本店承接各教派丧葬，寿材众多，已服务数以千计已仙逝的人，大众口碑，值得信赖，给",
				}, ],
			};
		},
	};
</script>
<style scoped lang="scss">
	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}

	.mourning-box {
		height: 1536rpx;
		width: 750rpx;
		padding: 20rpx 0;
		box-sizing: border-box;
		background-color: rgba(224, 203, 119, 1);

		.screen {
			display: flex;
			height: 96rpx;
			width: 100%;
			background-color: #ffffff;

			.screen-item {
				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;

				image {
					height: 60rpx;
					width: 60rpx;
				}
			}
		}

		.sort-box {
			display: flex;

			.sort-item {
				flex: 1;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				margin: 20rpx 16rpx;
				border-radius: 32rpx;
				background: #ffffff;
			}
		}

		.sort-result {
			box-sizing: border-box;

			.card {
				height: 200rpx;
				background: #ffffff;
				border-radius: 12rpx;
				margin: 20rpx;
				padding: 20rpx;
				display: flex;

				.user-img {
					width: 120rpx;
					image{
						height: 120rpx;
						width: 120rpx;
					}
				}

				.user-infor {
					flex: 1;

					.infor-name {
						display: flex;
						justify-content: space-between;

						.title {
							font-size: 32rpx;
							font-weight: bold;
						}
					}

					.infor-score {
						height: 60rpx;
						line-height: 54rpx;
						color: rgba(166, 166, 166, 1);

						.text {
							font-size: 24rpx;
						}
					}

					.infor-content {
						height: 72rpx;
						color: rgba(166, 166, 166, 1);
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						line-height: 35rpx;
					}
				}
			}
		}
	}
</style>
