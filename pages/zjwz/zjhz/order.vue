<template>
	<view class="order">
		<view style="padding-bottom: 100px;">
		<uni-card isShadow>
			<view v-if="orderStatus == 0">
				<h2 class="mainColor">订单已取消</h2>
				<h4 class="grayColor">超时未支付</h4>
			</view>
			<view v-else-if="orderStatus == 1">
				<h2 class="mainColor">订单进行中</h2>
				<h4 class="grayColor">咨询中</h4>
			</view>
			<view v-else-if="orderStatus == 2">
				<view class="mainColor flex">
					<h2 style="margin-right: 10px;">待支付</h2>
					<u-count-down :time="15 * 60 * 1000" 
					format="mm:ss"
					@change="onChange">
						 <view class="uni-flex time">
								<view class="time__custom">
									<h2 class="time__custom__item">{{ timeData.minutes>=10?timeData.minutes:'0'+timeData.minutes}}</h2>
								</view>
								<h2 class="time__doc">:</h2>
								<view class="time__custom">
									<h2 class="time__custom__item">{{ timeData.seconds>=10?timeData.seconds:'0'+timeData.seconds}}</h2>
								</view>
							</view>
					</u-count-down>
				</view>
				<h4 class="grayColor">未支付</h4>
			</view>
			<view v-else-if="orderStatus == 3">
				<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;">
					<h2 class="mainColor">订单已完成</h2>
					<view class="text mainColor">对此订单不满?</view>
				</view>
				<h4 class="grayColor">咨询已结束</h4>
			</view>
			<h3>订单类型:{{orderType}}({{orderMoney}})元</h3>
		</uni-card>
	  <uni-card isShadow>
	  		 <h3>咨询医生</h3>
	  		<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;background-color: #f3f4f8;padding: 10px;border-radius: 8px;">
	  			<view class="text">
	  				<view class="uni-flex uni-row">
	  					<view class="text">
	  						<image class="uni-media-list-logo" :src="doctor.uri"></image>
	  					</view>
	  					<view class="text">
	  						<view>
	  							<span class="doctor">{{doctor.doctor}}</span>
	  							<span v-for="(itemChild, indexChild) in doctor.professional"
	  							:key="indexChild" class="professional">{{itemChild}}</span>
	  						</view>
	  						<view>
	  							<span>{{doctor.hospital}}</span>
	  							<span class="hospital">{{doctor.department}}</span>
	  						</view>
	  					</view>
	  				</view>
	  			</view>
	  			<view class="text"  style="padding-top: 15px;">
	  				<uni-icons type="forward" color="#999" size="16" />
	  			</view>
	  		</view>
	  </uni-card>
	  <uni-card isShadow>
	  		 <h3>咨询内容</h3>
			 <view style="background-color: #f3f4f8;padding: 10px;border-radius: 8px;">
				<view class="patient">
					 <h3>患者信息</h3>
					  <view>
					  <span>{{patient.name}}</span>
					  <span>{{patient.sex}}</span>
					  <span>{{patient.age}}{{patient.ageUnit}}</span></view>
				</view>
				<view class="describe">
					<h3>患者病情描述</h3>
					<view>{{patient.describe}}</view>
				</view>
			</view>
	  </uni-card>
	  <uni-card isShadow>
	  		<h3>订单信息</h3>
	  		<view class="uni-flex uni-row orderlist" style="-webkit-justify-content: space-between;justify-content: space-between;">
	  			<view class="text">订单金额</view>
	  			<view class="text">{{order.money}}</view>
	  		</view>
			<view class="uni-flex uni-row orderlist" style="-webkit-justify-content: space-between;justify-content: space-between;">
				<view class="text">实付金额</view>
				<view class="text">{{order.realMoney}}</view>
			</view>
			<view class="uni-flex uni-row orderlist" style="-webkit-justify-content: space-between;justify-content: space-between;">
				<view class="text">订单编号</view>
				<view class="text">{{order.orderId}}</view>
			</view>
			<view class="uni-flex uni-row orderlist" style="-webkit-justify-content: space-between;justify-content: space-between;">
				<view class="text">下单时间</view>
				<view class="text">{{order.orderTime}}</view>
			</view>
	  </uni-card>
	</view>
	<view class="onebtn" v-if="orderStatus == 0">
		<button @click="toUrl('singleRoom')">再次咨询</button>
	</view>
	<view class="onebtn " v-if="orderStatus == 1">
		<button @click="toUrl('singleRoom')">咨询医生</button>
	</view>
	<view class="twobtn uni-flex uni-row " v-if="orderStatus == 2">
		<button>取消咨询</button>
		<button>去支付</button>
	</view>
	<view class="uni-flex uni-row twobtn"  v-if="orderStatus == 3">
		<button>评价</button>
		<button @click="toUrl('singleRoom')">再次咨询</button>
	</view>
  </view>
</template>

<script>
	import provinceData from '@/utils/province';
	import cityData from '@/utils/city';
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import userList from '@/commen/tim/user.js';
	export default {
		components: {
			uniTag,uniIcons
		},
	  data() {
		return {
			orderStatus :1,
			doctor:{uri:'/static/examination/goods-img.jpg',
				doctor:'王守仁',professional:['主任医师',' 教授'], state:1,
				hospitalLevel:'三甲',hospital:'北京协和医院',department :'皮肤性病科', 
				good:['双眼皮环切手术','包皮环切手术','荨麻疹治疗']
			},
			patient:{
				name:'张三',sex:"女", age:18,
				ageUnit:'岁',describe:'脑袋疼，迷糊，看不清东西'
			},
			order:{
				money:'10.00',realMoney:"6.00", orderId:"202111251245841",
				orderTime:'2021-12-21 15:23:12'
			},
			orderType:"普通会诊",orderMoney:"16",
			timeData: {},user_id:null,TIM:null, 
		}
	  },
	  mounted(){
		this.initData()
	  },
	  onLoad(option) {
	  		  this.user_id = option.user_id
			  this.TIM = this.$TIM
	  },
	  methods: {
		initData(){
		 
		},
		onChange(e) {
			this.timeData = e
		},
		toUrl(url){
			console.log(this.user_id)
			//选择用户聊天 CONV_C2C CONV_GROUP
			this.$store.commit('createConversationActive', [this.TIM.TYPES.CONV_C2C, String(this.user_id)])
			// this.$store.commit('createConversationActive', String(this.user_id))
			uni.navigateTo({
				url: url
			});
		}
	  }
	}
</script>

<style lang="scss" scoped>
	.order{
		.mainColor{
			color: #41AB85;
		}
		.grayColor{
			color: #808080;margin: 10px 0;
		}
		.doctor{
			font-size: 20px;font-weight: bold;margin-right: 10px;
		}
		.professional{
			color: gray;
		}
		.hospital{
			margin-left: 10px;
		}
		.patient{
			margin: 5px 0 10px 0;
		}
		.orderlist{
			margin: 10px 0;
		}
		.u-count-down__text{
			color: #41AB85 !important;
		}
		.onebtn{
			background-color: #fff;
			position: fixed;bottom: 0;width: 100%;
			height: 80px;
			left: 0;z-index: 99;
			button{
				margin: 20px 10px;
				background-color: #41AB85;color: #fff;border-radius: 20px;
			}
		}
		.twobtn{
			background-color: #fff;
			position: fixed;bottom: 0;width: 100%;
			height: 80px;
			left: 0;z-index: 99;
			button{
				margin: 20px 10px;
				background-color: #41AB85;color: #fff;border-radius: 20px;width: 40%;
			}
			button:first-child{
				background-color: #fff;color: #41AB85;border:none
			}
			button:first-child:after{
				border:none
			}
		}
	}
</style>