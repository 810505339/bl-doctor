<template>
	<view class="toOrder" style="text-align: center;margin: 0 auto;">
		<view style="padding-bottom: 80px;">
		<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;margin: 20px 0;">
			<u-icon name="clock" color="#000" size="22"></u-icon>
			<text style="margin-left: 10rpx;">请在</text>
			<u-count-down :time="15 * 60 * 1000"
			format="mm:ss"
			@change="onChange">
				 <view class="uni-flex time">
						<view class="time__custom">
							<h2 class="time__custom__item">{{ timeData.minutes >= 10 ? timeData.minutes : '0'+timeData.minutes}}</h2>
						</view>
						<h2 class="time__doc">:</h2>
						<view class="time__custom">
							<h2 class="time__custom__item">{{ timeData.seconds >= 10 ? timeData.seconds:'0'+timeData.seconds}}</h2>
						</view>
					</view>
			</u-count-down>
			<text>内完成支付，超时订单自动取消</text>
		</view>
		<uni-card isShadow>
			<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
				<u-avatar :src="doctor.face_image" ></u-avatar>
				<view class="text" style="margin: 15px 10px" >{{doctor.realname}}医生</view>
				<u-icon name="arrow-right" color="#000" size="16"></u-icon>
			</view>
			<view style="margin-bottom: 20rpx;">
				<h2>{{doctor.ordinary_price}}</h2>
				<text class="goldColor">等待支付</text>
			</view>
		<!-- 	<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
				<view class="text">对方账户</view>
				<view class="text">{{account}}</view>
			</view> -->
			<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;margin: 20rpx 0;">
				<view class="text">创建时间</view>
				<view class="text">{{format(orderInfo.time)}}</view>
			</view>
			<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
				<view class="text">订单号</view>
				<view class="text">{{orderInfo.order_sn}}</view>
			</view>
		</uni-card>
		<uni-card isShadow>
			<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;" @click="selectCoupon">
				<h3>优惠券</h3>
				<view class="uni-flex uni-row" style="-webkit-justify-content: flex-end;justify-content: flex-end;">
					<h4 class="text mainColor">6折优惠(限部分医生)</h4>
					<u-icon name="arrow-right" color="#41AB85" size="20"></u-icon>
				</view>
			</view>
		</uni-card>
		<view class="uni-flex uni-row" style="padding-left: 40rpx;">
			<text>支付方式</text>
		</view>
		
		<uni-card isShadow>
			<view class="u-page__radio-item">
				<u-radio-group
					v-model="payValue"
					:borderBottom="true"
					placement="column"
					iconPlacement="right"
					activeColor="#41AB85"
				>
					<u-radio
						:customStyle="{marginBottom: '16px'}"
						v-for="(item, index) in payList"
						:key="index"
						:label="item.name"
						:name="item.uri"
						:uri="item.uri"
					>
					</u-radio>
				</u-radio-group>
			</view>
		</uni-card>
		</view>
		<view class="tip">
			<text class="goldColor">支付前请认真核对是否是您心仪的医生</text>
		</view>
		<view class="uni-flex uni-row twobtn" style="-webkit-justify-content: space-between;justify-content: space-between;">
			<view style="width: 50%;line-height: 50px;font-size: 18px;text-align: left;">
				<text>待支付: <text class="goldColor bold" style="margin-left: 10rpx;">{{doctor.ordinary_price}}元</text></text>
			</view>
			<view style="width: 50%;">
				<u-button @click="toUrl('singleRoom')">立即支付</u-button>
			</view>
		</view>
  </view>
</template>

<script>
	import provinceData from '@/utils/province';
	import cityData from '@/utils/city';
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import expertUrl from '@/api/expertConsulation'
	export default {
		components: {
			uniTag,uniIcons
		},
	  data() {
		return {
			timeData: {},
			order:{
				uri:'/static/examination/goods-img.jpg',doctor:"张新发",
				money:'50.00',account:"13223423456", orderId:"202111251245841",
				creatTime:'2021-12-21 15:23:12'
			},
			pay:50,
			payList: [{
					name: '微信',
					uri:'/static/expert/wechat.png',
					disabled: false
				},
				{
					name: '支付宝',
					uri:'/static/expert/pay.png',
					disabled: false
				},
				{
					name: '银联卡',
					uri:'/static/expert/bank.png',
					disabled: false
				},
			],
			payValue: '微信',user_id:null,
			doctor:{}
		}
	  },
	   computed:{
		  account(){
			  let accounts = this.order.account
			  let fir = accounts.substr(0, 3)
			  let end = accounts.substr(accounts.length - 4, 4)
			  let newStr = fir + "***" + end
			  return newStr
		  },
		  orderInfo(){
		    return this.$store.state.orderInfo 
		  }
	  },
	  mounted(){
		this.initData()
	  },
	  methods: {
		async initData(){
			const {data} = await this.$axios({
			  url: expertUrl.doctorDetail + "?id=" + this.orderInfo.id
			})
			this.doctor = data.data
			// const {order} = await this.$axios({
			//   url: expertUrl.accompanying + "?order_sn=" + this.orderInfo.order_sn
			// })
			// console.log(order)
		},
		onChange(e) {
			this.timeData = e
		},
		toUrl(url){
			// console.log(this.user_id)
			// this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			// let user_id = "lxsm2"
			// if(this.userInfo.userId == "lxsm"){
			// 	user_id = "lxsm2"
			// }else{
			// 	user_id = "lxsm"
			// }
			//选择用户聊天 CONV_C2C CONV_GROUP
			this.$store.commit('createConversationActive', [this.$TIM.TYPES.CONV_C2C, String(this.user_id)])
			// this.$store.commit('createConversationActive', String(this.user_id))
			uni.navigateTo({
				url: url
			});
		},
		toSkip(){
			uni.navigateTo({
				url: 'order?user_id=' + this.orderInfo.user_id
			});
		},
		selectCoupon(){
			uni.navigateTo({
				url: '../../zjwz/jswz/select-coupon?user_id='+this.orderInfo.user_id
			});
		},
		add0(m){return m<10?'0'+m:m },
		format(shijianchuo){
			//shijianchuo是整数，否则要parseInt转换
			var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y+'/'+this.add0(m)+'/'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
		}
	  },
	  onLoad(option) {
	  		//   this.user_id = option.user_id
			  // this.id = option.id
			  // this.order_sn = option.order_sn
			  // this.time = this.format(Number(option.time))
	  }
	}
</script>

<style lang="scss" scoped>
	.toOrder{
		.bold{
			font-weight: bold;
		}
		.mainColor{
			color: #41AB85;
		}
		.grayColor{
			color: #808080;margin: 10px 0;
		}
		.goldColor{
			color: #ff8d1a;
		}
		.time__custom__item{
			color: #ff8d1a;font-size: 16px;
		}
		.time__doc{
			color: #ff8d1a;font-size: 16px;
		}
		.tip{
			position: fixed;z-index: 99;left: 0;bottom: 50px;width: 100%;background-color: #efead8;
			text-align: center;padding: 10rpx 0;
		}
		.twobtn{
			background-color: #fff;
			position: fixed;bottom: 0;width: 100%;padding: 0 20rpx;
			left: 0;z-index: 99;
			height: 50px;
			button{
				margin: 5px 10px;
				background-color: #41AB85;color: #fff;border-radius: 20px;
			}
		}
	}
</style>