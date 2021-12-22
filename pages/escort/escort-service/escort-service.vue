<template>
	<view class="escort-service">
		<view class="nav">
			<u-navbar title="陪诊服务" bg-color="#41ab85" :safeAreaInsetTop="true" rightText="订单" @leftClick="leftClick" @rightClick="rightClick">
				<u-icon slot="left" name="arrow-left" color="#FFFFFF"></u-icon>
			</u-navbar>
			<view class="content"><image class="img" src="../../../static/escort-service/location-white.png"></image><text>附近有{{escortInfo.person_num}}位陪护人员，预计{{escortInfo.order_time}}分钟接单</text></view>
			<view class="nav_tab">
				<view class="nav_tab_list">
					<view :class="{active: index===item.label, nav_tab_list_item: true}" v-for="item in navList" :key="item.label" @click="changeIndex(item.label)">
						<text>{{item.value}}</text>
						<view></view>
					</view>
					<view class="location"><image class="img" src="../../../static/escort-service/location.png"></image><text>{{this.location}}</text></view>
				</view>
				<!-- 医院陪诊 -->
				<view class="escort" v-if="index===1">
					<escortTab :msgList="escort">
						<button class="primary" @click="sendEscort">发起陪诊邀请</button>
						<view class="money">
							单次服务{{escortInfo.service_price}}元
						</view>
					</escortTab>
				</view>
				<!-- 代为办理 -->
				<view class="handle" v-if="index===2">
					<escortTab :msgList="handle">
						<button class="primary" @click="sendHandle">发起取送服务邀请</button>
						<view class="money">
							单次服务{{escortInfo.service_price}}元
						</view>
					</escortTab>
				</view>
				<!-- 预约陪诊 -->
				<view class="appointment" v-if="index===3">
					<escortTab :msgList="appointment">
						<button class="primary" @click="sendAppointment">发起预约陪诊邀请</button>
					</escortTab>
					<SimpleDateTimePicker
						ref="myPicker"
						@submit="handleSubmit"
					/>
					<u-toast ref="uToast"></u-toast>
				</view>
			</view>
			<view class="message">
				<marquee id="affiche" class="affiche" align="left" behavior="scroll" direction="left"  hspace="50" vspace="20" loop="-1" scrollamount="10" scrolldelay="0">
					<image style="width: 42rpx; height: 42rpx; position: relative; top: 10rpx;" class="img" src="../../../static/escort-service/voice-black.png"></image>
					<text class="message_text" v-for="(text, index) in escortInfo.tips" :key="index">{{text.msg}}</text>
				</marquee>
			</view>
			<image class="image" src="../../../static/escort-service/zhaomu.jpg"></image>
			<view class="rule">
				<view class="title">
					使用规则
				</view>
				<rich-text :nodes="escortInfo.rules && escortInfo.rules.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import escortTab from '../../../components/escort-tab/escort-tab.vue'
	import SimpleDateTimePicker from "uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";
	import {createNamespacedHelpers} from 'vuex'
	const { mapState } = createNamespacedHelpers('escort-service')
	export default {
		components:{
			escortTab,
			SimpleDateTimePicker
		},
		data() {
			return {
				birthday: "",
				location: '',
				escortInfo: {},
				index: 1,
				navList: [
					{label: 1, value: '医院陪诊'},
					{label: 2, value: '代为办理'},
					{label: 3, value: '预约陪诊'}
				]
			}
		},
		computed:{
			...mapState(['nav_list']),
			escort() {
				return this.nav_list.escort
			},
			handle() {
				return this.nav_list.handle
			},
			appointment() {
				return this.nav_list.appointment
			}
		},
		onLoad(options) {
			this.index = options.id ? +options.id : 1
			this.nav_list.appointment.forEach(item => {
				if(item.cb) {
					item.cb = this.openDatetimePicker
				}
			})
			this.getContext() // 获取经纬度
		},
		methods:{
			changeIndex(index=0) {
				this.index = index
			},
			async getContext() {
				// TODO 获取经纬度和城市
				uni.getLocation({
					type:'gcj02',
					success: (res) => {
						this.longitude=res.longitude
						this.latitude = res.latitude
						var point = new plus.maps.Point(res.longitude, res.latitude);
						plus.maps.Map.reverseGeocode(
							point,
							{},
							event => {
								const address = event.address; // 转换后的地理位置
								const reg = /.+?(省|市|自治区|自治州|县|区)/g;
								this.addressList=address.match(reg).toString().split(",");
								this.location= this.addressList[0];
							}
						)
					}
				})
				const {data} = await this.$axios({
					url: `/api/accompanying/detail?lng=${this.longitude}&lat=${this.latitude}`
				})
				this.escortInfo = data
			},
			sendEscort() {
				// 发起陪诊邀请
				uni.navigateTo({
					url: '/pages/escort/pay-escort-service/pay-escort-service'
				})
			},
			sendHandle() {
				// 发起取送服务邀请
				uni.navigateTo({
					url: '/pages/escort/substitute-handle/substitute-handle'
				})
			},
			sendAppointment() {
				// 发起预约陪诊邀请
				uni.navigateTo({
					url: '/pages/escort/appointment-accompany/appointment-accompany'
				})
			},
			openDatetimePicker() {
				this.$refs.myPicker.show.call(this);
			},

			// 关闭picker
			closeDatetimePicker() {
				this.$refs.myPicker.hide();
			},

			handleSubmit(e) {
				const time = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
				const cTime = Date.parse(new Date(time));
				const nTime = Date.parse(new Date())
				if(cTime < nTime) {
					this.$refs.uToast.show({
						type: 'error',
						message: '无效时间'
					})
				} else {
					this.appointment[2].title = time
					this.appointment[2].note = '预约到达时间'
				}
			},
			leftClick() {
				uni.navigateBack()
			},
			rightClick() {
				// 去订单页面
				uni.navigateTo({
					url: '/pages/mine-order/mine-order'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.escort-service{
		.nav{
			box-sizing: border-box;
			width: 750rpx;
			height: 560rpx;
			background: url(../../../static/escort-service/back.png) no-repeat;
			background-size: 100% 100%;
			.content{
				margin: 0 20rpx;
				margin-top: 38rpx;
				height: 64rpx;
				line-height: 64rpx;
				padding-left: 12rpx;
				color: #ffffff;
				font-size: 28rpx;
				border-radius: 12rpx;
				background-color: rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				.img{
					width: 42rpx;
					height: 42rpx;
				}
				text{
					margin-left: 15rpx;
				}
			}
			.nav_tab{
				box-sizing: border-box;
				margin-top: 24rpx;
				margin-right: 20rpx;
				margin-left: 20rpx;
				background-color: #fff;
				border-radius: 12rpx;
				padding: 24rpx 24rpx 48rpx 24rpx;
				color: #505050;
				.nav_tab_list{
					display: flex;
					justify-content: space-between;
					.nav_tab_list_item{
						display: flex;
						flex-direction: column;
						align-items: center;
					}
					.active{
						font-weight: bold;
						view{
							width: 42rpx;
							height: 8rpx;
							border-radius: 32rpx;
							background-color: #41ab85;
							margin: 10rpx 0;
						}
					}
					.location{
						display: flex;
						.img{
							width: 42rpx;
							height: 42rpx;
						}
					}
				}
			}
			.message{
				background-color: #FFFFFF;
				font-size: 28rpx;
				height: 96rpx;
				line-height: 96rpx;
				margin: 22rpx 20rpx 0 20rpx;
				padding: 0 20rpx;
				.swiper-item{
					margin-left: 22rpx;
					white-space:nowrap;
					width: 200rpx;
				}
				.affiche{
					.message_text{
						margin-left: 22rpx;
					}
				}
			}
			.image{
				width: 710rpx;
				height: 270rpx;
				margin: 20rpx;
			}
			.rule{
				margin: 0 20rpx;
				background-color: rgba(255, 255, 255, 1);
				padding: 20rpx;
				.title{
					font-size: 32rpx;
					color: rgba(80, 80, 80, 1);
					font-weight: bold;
				}
				rich-text{
					color: rgba(80, 80, 80, 1);
					font-size: 28rpx;
					margin-left: 22rpx;
				}
			}
		}
	}
	.primary{
		background-color: $uni-color-primary;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 40rpx;
		width: 496rpx;
		border-radius: 50rpx;
	}
	.money{
		font-size: 28rpx;
		color: #a6a6a6;
		text-align: center;
		width: 100%;
		margin-top: 45rpx;
	}
	.message_text{
		margin-right: 40rpx;
	}
	.img{
		width: 42rpx;
		height: 42rpx;
	}
	::v-deep img{
		opacity: 1 !important;
	}
	::v-deep .uni-list--border-top{
		display: none !important;
	}
	::v-deep .uni-list--border-bottom{
		display: none !important;
	}
	::v-deep .uni-swiper-item{
		width: 60% !important;
	}
	::v-deep .u-navbar__content__title{
		color: #FFFFFF;
	}
	::v-deep .u-navbar__content__right {
		color: #FFFFFF;
	}
	::v-deep .uni-list::before{
		height: 0;
	}
	::v-deep .uni-list:after{
		height: 0;
	}
</style>
