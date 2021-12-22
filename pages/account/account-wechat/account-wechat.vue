<template>
	<view>
		<uni-list>
			<uni-list-item title="微信授权">
				<template slot="footer">
					<text>{{ispower}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="微信号">
				<template slot="footer">
					<text>{{ wechatnumber }}</text>
				</template>
			</uni-list-item>
		</uni-list>
		<div class="deletwechat">解除授权</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wechatnumber:'',
			ispower: ""
		};
	},
	mounted(){
		this.getdata();
	},
	methods: {
		async getdata(){
			const data = await this.$axios({
				method:'get',
			  url: '/api/mine/get_user_info',
				"data":{
				}
			});
			if(data.code === 1){
				if(data.data.wechat_id != ''){
					this.ispower = "已授权"
				this.wechatnumber = data.wechat_id;
				}else{
					this.ispower = "未授权"
				}
			}
		}
	},
};
</script>

<style>
::v-deep .uni-list-item__content-title {
	font-family: 'Microsoft YaHei';
	font-size: 28rpx;
	color: rgba(80, 80, 80, 1);
}
.uni-list-item {
	padding: 0;
	margin: 0;
	height: 96rpx;
	line-height: 96rpx;
}
.deletwechat {
	position: fixed;
	width: 100%;
	height: 96rpx;
	background-color: rgba(212, 48, 48, 1);
	border-radius: 0 0 50rpx 50rpx;
	text-align: center;
	line-height: 96rpx;
	color: rgba(255, 255, 255, 1);
	font-weight: bold;
	font-size: 32rpx;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	bottom: 0;
}
</style>
