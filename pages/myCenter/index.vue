<template>
	<view class="escort-service">
		<view class="nav">
			<view class="msg">
				<img :src="msg" alt="">
				<em></em>
			</view>
			<view class="user">
				<view class="users">
					<img :src="manPho" alt="">
					<view class="userName">
						<view class="name">快看看</view>
						<view class="phone">188888888 <span><img :src="right" alt=""></span></view>
					</view>
				</view>
				<view class="sign">签到</view>
			</view>
			<view class="tabs">
				<view class="tab" v-for="(item, index) in tabInfo" :key="index" @click="goRouter(item.url)">
					<view class="num">{{ item.num }}</view>
					<view class="title">{{ item.title }}</view>
				</view>
			</view>
			<view class="order">
				<view class="title">我的订单</view>
				<view class="orders">
					<view class="order1" v-for="(item, index) in orderInfo" :key="index">
						<img :src="item.url" alt="">
						<view>{{ item.text }}</view>
					</view>
				</view>
			</view>
			<view class="order">
				<view class="title">常用工具</view>
				<view class="orders tool">
					<view class="order1" v-for="(item, index) in toolInfo" :key="index">
						<img :src="item.url" alt="">
						<view>{{ item.text }}</view>
					</view>
				</view>
			</view>
			<view class="order">
				<view class="set" v-for="(item, index) in setInfo" :key="index">
					<view class="text">{{ item.text }}</view>
					<view class="right">
						{{ item.msg }}
						<img :src="right" alt="">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import msg from '@/static/myCenter/msg.png'
import right from '@/static/myCenter/right.png'
import manPho from '@/static/myCenter/manPho.png'
	export default {
		data() {
			return {
				msg,
				right,
				manPho,
				tabInfo:[
					{
						num: 10,
						title: '关注医生',
						url: 'pages/myCenter/followDoctor/index'
					},
					{
						num: 10,
						title: '我的奖品',
						url: ''
					},
					{
						num: 10,
						title: '优惠券',
						url: ''
					},
					{
						num: 10,
						title: '诊断建议',
						url: ''
					}
				],
				orderInfo:[
					{
						text: '预约挂号',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '咨询订单',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '服务订单',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '体检订单',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '就诊补贴',
						url: '../static/myCenter/ask.png'
					}
				],
				toolInfo:[
					{
						text: '补贴钱包',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '福利',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '就诊缴费',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '就诊记录',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '推荐有奖',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '常见问题',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '用户调研',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '意见反馈',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '白龙客服',
						url: '../static/myCenter/ask.png'
					},
					{
						text: '成为服务商',
						url: '../static/myCenter/ask.png'
					}
				],
				setInfo:[
					{
						text:'账号设置'
					},
					{
						text:'消息通知'
					},
					{
						text:'地址管理'
					},
					{
						text:'关于我们',
						msg:'发现新版本'
					}
				]
			}
		},
		computed:{
		},
		onLoad(options) {
		},
		methods:{
			goRouter(url) {
				console.log(url)
				// 路由跳转
				uni.navigateTo({
					url: '/' + url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
