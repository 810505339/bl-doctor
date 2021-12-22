<template>
	<view>
		<div class = "bigbox">
			<div class = "smallbox" v-for="(item,index) in data" :key = "index">
				<div style = "display: flex;justify-content: space-between;align-items: center;">
					<div style = "width: 39px;
	height: 39px;background-color: rgba(65, 171, 133, 1);
	border-radius: 50%;display: flex;justify-content: center;align-items: center;">
					<img :src="item.url" alt="" style = "width: 32px;
	height: 32px;">
					</div>
					<span style = "margin-left: -50%;color: rgba(56, 56, 56, 1);font-size: 36rpx;font-weight: bold;">{{item.name}}</span>
					<span style = "font-size: 28rpx;color: rgba(166, 166, 166, 1);">{{item.time}}</span>
				</div>
				<div class = "buttom" style = "display: flex; align-items: center;margin-top: 32rpx;">
				<div style = "width: 20rpx; height: 20rpx; background-color:rgba(65, 171, 133, 1) ; border-radius: 50%;"></div>
				<span style = "margin-left: 20rpx;">科室: {{item.class}}</span>
				</div>
				<div class = "buttom" style = "display: flex;align-items: flex-start;margin-top: 20rpx;">
				<div style = "display: flex;align-items: center;">
				<div style = "width: 20rpx; height: 20rpx; background-color:rgba(42, 130, 228, 1) ; border-radius: 50%;">
				</div>
					<span style = "width: 120rpx;margin-left: 20rpx;">诊断意见:</span>
				</div>
				<span v-if = "!item.detial" style = "font-size: 14px;line-height: 150%;height:126rpx;overflow: hidden ;margin-left: 10rpx;">{{item.opinion.slice(0,48)+'...'}}<span style = "color:green"  @click = "detialshow(index)">详情</span></span>
				<span v-if = "item.detial" style = "font-size: 14px;line-height: 150%;margin-left: 10rpx;">{{item.opinion}} <span style = "color:green"  @click = "detialclose(index)">收起</span></span>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[
					{
						detial : false,
						url:require("./asset/myopinion.svg"),
						name : "王守仁医生",
						time : "昨天",
						class : "皮肤科",
						opinion:"建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考..."
					},
					{
						detial : false,
						url:require("./asset/myopinion.svg"),
						name : "王守仁医生",
						time : "昨天",
						class : "皮肤科",
						opinion:"建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考..."
					},
					{
						detial : false,
						url:require("./asset/myopinion.svg"),
						name : "王守仁医生",
						time : "昨天",
						class : "皮肤科",
						opinion:"建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考..."
					}
				]
			}
		},
		methods: {
			detialshow(index){
				this.data[index].detial = true;
				console.log(this.data);
			},
			detialclose(index){
				this.data[index].detial = false;
				console.log(this.data);
			}
		}
		
	}
</script>

<style scoped>
	.smallbox{
		padding: 20rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 6px;
		margin-top: 20rpx;
	}
	.bigbox{
		padding: 0 20rpx;
	}
	.active{
		height: 500rpx !important;
	}
	.buttom{
		font-size: 28rpx;
		color: rgba(80, 80, 80, 1);
	}
</style>
