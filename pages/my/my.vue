<template>
	<view>
		<view class = "headcard">
			<div class = "circlebox">
				<img src="./asset/tip.svg" alt="" class="circle">
				<p class = "split"></p>
			</div>
			<div class = "headbody">
			<div class="smallbox">
				<img src="./asset/small.svg" alt="" class = "small">
			</div>
			<div class = "mes">
				<p style = "color: rgba(0, 0, 0, 1);font-size: 18px;line-height: 150%;text-align: left;font-weight: bold;">{{name}}</p>
				<p style = "color: rgba(166, 166, 166, 1);font-size: 14px;line-height: 150%;text-align: left;">{{phone}}></p>
			</div>
			<div class = "sign">签到</div>
			</div>
			<div class = "headfooter">
				<div v-for="(item,index) in headfoot">
					<p>{{item.num}}</p>
					<p>{{item.name}}</p>
				</div>
				</div>
			</view>
			<view class="body">
			<div class="myorder" style = "	margin-top: 34rpx;">
				<span class = "bodytitle">我的订单</span>
				<div v-for="(item,index) in order" style = "text-align: center;width: 20%;margin-top: 22rpx;position: relative;">
						<p v-if="true" class = "split1">1</p>
					<img :src="item.imgurl" alt=""  class = "bodyimg">
					<p class = "bodyclass">{{item.title}}</p>
				</div>
			</div>
					
			<div class="myorder">
						<span class = "bodytitle">常用工具</span>
				<div v-for="(item,index) in tool" style = "text-align: center;width: 20%;margin-top: 22rpx;position: relative;">
					<img :src="item.imgurl" alt="" class = "bodyimg">
					<p class = "bodyclass">{{item.title}}</p>
				</div>
			</div>
			<div class="myorder">
				<uni-list :border="false">
					<uni-list-item title="账号设置" :border="false">
						<template slot="footer">
							<image class="righticon" src="./asset/right.svg" width = "22rpx;height:22rpx"></image>
						</template>
					</uni-list-item>
					<uni-list-item title="消息通知" :border="false">
						<template slot="footer">
							<image class="righticon" src="./asset/right.svg" width = "22rpx;height:22rpx"></image>
						</template>
					</uni-list-item>
					<uni-list-item title="地址管理" :border="false">
						<template slot="footer">
							<image class="righticon" src="./asset/right.svg" width = "22rpx;height:22rpx"></image>
						</template>
					</uni-list-item>
					<uni-list-item title="关于我们" :border="false">
						<template slot="footer">
							<text>发现新版本</text>
							<image class="righticon" src="./asset/right.svg" width = "22rpx;height:22rpx"></image>
						</template>
					</uni-list-item>
					</uni-list>
				</div>
			</div>
		</view>
		<view class="u-page__item">
		  <u-tabbar :border="false" :value="value6" @change="change6" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
		    <u-tabbar-item v-for="(item,index) in tabbarList" :key="index" @click="goPage(item, index)">
		      <view slot="text" class="home_text">
		        <view :class="value6 === index ? 'activeColor' : 'inactiveColor'">{{item.title}}</view>
		        <view :class="value6 === index ? 'active' : ''"></view>
		      </view>
		    </u-tabbar-item>
		  </u-tabbar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"张益达",
				phone:'185****1024',
				headfoot:[
					{
						num: 10,
						name:"关注医生"
					},
					{
						num:5,
						name:"我的奖品"
					},
					{
						num:3,
						name:"优惠券"
					},
					{
						num:5,
						name:"诊断建议"
					}
				],
				order:[
					{
						imgurl:'',
						title:"预约挂号"
					},
					{
						imgurl:'',
						title:"咨询订单"
					},
					{
						imgurl:'',
						title:"服务订单"
					},
					{
						imgurl:'',
						title:"体检订单"
					},
					{
						imgurl:'',
						title:"就诊补贴"
					},
				],
				tool:[
					{
						imgurl:'',
						title:"补贴钱包"
					},
					{
						imgurl:'',
						title:"福利"
					},
					{
						imgurl:'',
						title:"就诊数量"
					},
					{
						imgurl:'',
						title:"就诊记录"
					},
					{
						imgurl:'',
						title:"有奖推荐"
					},
					{
						imgurl:'',
						title:"常见问题"
					},
					{
						imgurl:'',
						title:"用户调研"
					},
					{
						imgurl:'',
						title:"意见反馈"
					},
					{
						imgurl:'',
						title:"白龙客服"
					},
					{
						imgurl:'',
						title:"有奖推荐"
					},
				],
				value6: 0,
				tabbarList: [
				  {title: '首页', path: '/pages/home/home'},
				  {title: '健康档案', path: '/pages/home/home'},
				  {title: '我的问诊', path: '/pages/home/home'},
				  {title: '个人中心', path: '/pages/home/home'}
				],
			}
		},
		mounted() {
			this.getimgurl()
		},
		methods: {
			getimgurl(){
				this.order.forEach((item,index)=>{
					item.imgurl = require("./asset/my" + parseInt(index + 1)  +  ".svg");
				})
				this.tool.forEach((item,index)=>{
					item.imgurl = require("./asset/my" + parseInt(index + 6)  +  ".svg");
				})
			},
			change6(name) {
			  this.value6 = name
			},
			goPage(item, index) {
			  if(this.value6 === index) return 
			  uni.navigateTo({
			    url: item.path
			  })
			},
		}
	}
</script>

<style>
.headcard{
		background-color: rgba(243, 244, 248, 1);
}
.smallbox{
		width: 88rpx;
		height: 88rpx;
		color: rgba(80, 80, 80, 1);
		background-color: rgba(65, 171, 133, 1);
		border-radius: 46rpx;
		display: flex;
		justify-content: center;
		align-items: center;
}
.small
	{
		width: 58rpx;
		height: 58rpx;
		color: rgba(255, 255, 255, 1);
	}

.circlebox{
	margin-top: -8%;
	margin-left: 80%;
	width: 132rpx;
	height: 132rpx;
	border: rgba(65, 171, 133, 0.3) solid 36rpx;
	border-radius: 50%;
	text-align: center;
	position: relative;
}

.circle{
	width: 46rpx;
	height: 46rpx;
	opacity: 0.8;
	margin-top: 50%;
	margin-left: -5%;
}
.split{
	width: 16rpx;
	height: 16rpx;
	background-color: rgba(212, 48, 48, 1);
	position: absolute;
	top: 50%;
	right: 35%;
	border-radius: 50%;
}
.split1{
	position: absolute;
	width: 24rpx;
	height: 24rpx;
	background-color: rgba(212, 48, 48, 1);
	top: 0;
	right: 15%;
	border-radius: 50%;
	color: rgba(255, 255, 255, 1);
	font-size: 24rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.sign{
		position: absolute;
		width: 112rpx;
		height: 46rpx;
		background-color: rgba(255, 141, 26, 1);
		border-radius: 32rpx;
		font-size: 28rpx;
		color:  rgba(255, 255, 255, 1);;
		box-shadow: 0px 4rpx 4rpx 0px rgba(255, 141, 26, 0.5071428571428571);
		text-align: center;
		top: 20%;
		left: 82%;
		rigth: 0;
}
.headbody{
	position: relative;
	margin-top: 20rpx;
	padding: 0 18rpx 0 28rpx;
	
}
.mes{
	position: absolute;
	left: 130rpx;
	top: 0;
}
.headfooter{
	display: flex;
	justify-content: space-between;
	padding: 0 40rpx;
	margin-top: 40rpx;
}
.headfooter div{
	text-align: center;
}
.headfooter div p:first-child{
	color: rgba(0, 0, 0, 1);
		font-size: 28rpx;
		font-weight: bold;
}
.headfooter div p:last-child{
	color: rgba(128, 128, 128, 1);
		font-size: 24rpx;
}

.body{
	padding: 0 18rpx;
}

.bodyimg{
	width: 56rpx;
	height: 56rpx;
}

.myorder{
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		margin-top: 20rpx;
}

.body{
			margin-bottom: 144rpx;
}

.bodytitle{
	width: 100%;
	color: rgba(80, 80, 80, 1);
	font-size: 28rpx;
	font-weight: bold;
	margin-left: 15rpx;
}
.bodyclass{
	color: rgba(0, 0, 0, 1);
	font-size: 24rpx;
}

::v-deep .uni-list-item__container {
    padding: 0 6rpx 0 22rpx;
    font-family: 'Microsoft YaHei';
    font-size: 26rpx;
    color: rgba(128, 128, 128, 1);
    line-height: 88rpx;
}
::v-deep .uni-border-top-bottom::before{
			content: '';
	    display: block;
	    width: 0;
	    height: 0;
	    clear: both;
}
::v-deep .uni-border-top-bottom::after{
			content: '';
	    display: block;
	    width: 0;
	    height: 0;
	    clear: both;
}

::v-deep .righticon {
		width: 56rpx;
		height: 56rpx;
		margin: 20rpx 0 20rpx 0;
	}
	
	::v-deep .uni-list-item {
		padding: 0;
		margin: 0;
		height: 96rpx;
		line-height: 96rpx;
	}
	::v-deep .uni-list-item__content-title{
		line-height: 96rpx;
		font-family: 'Microsoft YaHei';
		font-size: 28rpx;
		color: #505050;
	}
	.inactiveColor{
	  color: #505050;
	  font-size: 32rpx;
	}
	.activeColor{
	  color: #41ab85;
	  font-size: 32rpx;
	}
	.active{
	  width: 40rpx;
	  border: 1px solid #41ab85;
	}
	.home_text{
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
</style>
