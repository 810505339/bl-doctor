<template>
	<view>
		<div style="height: 96rpx; display: flex;justify-content: space-between;align-items: flex-end;background-color: rgba(248, 248, 248, 1);">
			<div v-for="(item, index) in title" :key="index" style="text-align: center;width: 33%;" @click="changeclass(index)">
				<div style="margin-bottom: 20rpx;">{{ item.title }}</div>
				<div :class="{ color: item.bottom }" style="width: 66rpx;height: 8rpx;margin: 0rpx auto;"></div>
			</div>
		</div>
		<div class="bigbox">
			<div v-for="(item, index) in data" style="display: flex;" :class="{ move: item.deleate }">
				<div class="smallbox" :key="index">
					<div style="display: flex;justify-content: space-between;align-items: center;">
						<div style="width: 100%;display: flex;justify-content: flex-start;align-items: center;">
							<div class="imgbox">
								<img
									:src="item.url"
									alt=""
									style="width: 32px;
		height: 32px;"
								/>
							</div>
							<span style="margin-left: 26rpx; color: rgba(56, 56, 56, 1);font-size: 28rpx;font-weight: bold;">{{ item.name }}</span>
							<span style="margin-left: 26rpx; color: rgba(56, 56, 56, 1);font-size: 28rpx;font-weight: bold;">{{ item.name }}</span>
						</div>
						<span :class="{ colorchange: item.state1 }" style="width: 300rpx; text-align: right; font-size: 28rpx;color: rgba(166, 166, 166, 1);">
							{{ item.state1 ? item.state1 : item.state }}
						</span>
					</div>
					<div class="hospitalbox">
						<span>{{ item.hospital }}</span>
						<span>{{ item.class }}</span>
						<span>{{ item.style }}</span>
						<p>{{ item.time }}</p>
					</div>
					<div class="button">
						<div @click="changedeleate(index)">删除记录</div>
						<div>详情</div>
					</div>
				</div>
				<div v-if="item.deleate" class="deleate">删除</div>
			</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: [
				{
					title: '全部',
					bottom: true,
					class: 0
				},
				{
					title: '待支付',
					bottom: false,
					class: 1
				},
				{
					title: '咨询中',
					bottom: false,
					class: 2
				},
				{
					title: '待评价',
					bottom: false,
					class: 2
				},
				{
					title: '已取消',
					bottom: false,
					class: 2
				}
			],
			data: [
				{
					detial: false,
					url: require('./asset/myopinion.svg'),
					name: '于珠珠',
					state: '已结束',
					state1: '待支付 47:59',
					hospital: '哈尔滨医大四院',
					class: '皮肤科',
					style: '门诊普通号',
					opinion: '建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考...',
					time: '2021-12-16 13:00-13:30',
					deleate: false
				},
				{
					detial: false,
					url: require('./asset/myopinion.svg'),
					name: '于珠珠',
					state: '已结束',
					state1: '',
					hospital: '哈尔滨医大四院',
					class: '皮肤科',
					style: '门诊普通号',
					opinion: '建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考...',
					time: '2021-12-16 13:00-13:30',
					deleate: false
				},
				{
					detial: false,
					url: require('./asset/myopinion.svg'),
					name: '于珠珠',
					state: '已结束',
					state1: '未就诊',
					hospital: '哈尔滨医大四院',
					class: '皮肤科',
					style: '门诊普通号',
					opinion: '建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考...',
					time: '2021-12-16 13:00-13:30',
					deleate: false
				}
			],
			data1: [
				{
					detial: false,
					url: require('./asset/myopinion.svg'),
					name: '于珠珠',
					state: '已结束',
					state1: '未就诊',
					hospital: '哈尔滨医大四院',
					class: '皮肤科',
					style: '门诊普通号',
					opinion: '建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考...',
					time: '2021-12-16 13:00-13:30',
					deleate: false
				},
				{
					detial: false,
					url: require('./asset/myopinion.svg'),
					name: '于珠珠',
					state: '已结束',
					state1: '',
					hospital: '哈尔滨医大四院',
					class: '皮肤科',
					style: '门诊普通号',
					opinion: '建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考...',
					time: '2021-12-16 13:00-13:30',
					deleate: false
				},
				{
					detial: false,
					url: require('./asset/myopinion.svg'),
					name: '于珠珠',
					state: '已结束',
					state1: '未就诊',
					hospital: '哈尔滨医大四院',
					class: '皮肤科',
					style: '门诊普通号',
					opinion: '建议长期用药，提高免疫力，多运动多排汗，多吃些富含维生素C的水果，避免接触肥皂水等，初步怀疑是过敏性皮炎，需时间考...',
					time: '2021-12-16 13:00-13:30',
					deleate: false
				}
			]
		};
	},
	methods: {
		changeclass(index) {
			this.title.forEach(item => {
				item.bottom = false;
			});
			this.title[index].bottom = true;
			this.data.forEach(item => {
				item.deleate = false;
			});
			if (index == 2) {
				let dataarr = [];
				this.data1.forEach(item => {
					if (item.state1 == '') {
						dataarr.push(item);
					} else {
					}
				});
				this.data = dataarr;
			} else if (index == 1) {
				let dataarr = [];
				this.data1.forEach(item => {
					if (item.state1 != '') {
						dataarr.push(item);
					} else {
					}
				});
				this.data = dataarr;
			} else {
				this.data = this.data1;
			}
		},
		changedeleate(index) {
			this.data.forEach(item => {
				item.deleate = false;
			});
			this.data[index].deleate = true;
		}
	}
};
</script>

<style scoped>
.color {
	background-color: rgba(65, 171, 133, 1);
}
.smallbox {
	width: 100%;
	padding: 20rpx;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 6px;
	margin-top: 20rpx;
}
.bigbox {
	padding: 0 20rpx;
	overflow-y: hidden;
}
.imgbox {
	width: 39px;
	height: 39px;
	background-color: rgba(65, 171, 133, 1);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.button {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
.button div {
	width: 176rpx;
	height: 64rpx;
	border: rgba(166, 166, 166, 1) 1px solid;
	border-radius: 32rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 46rpx;
}
.button div {
	margin-right: 20rpx;
}
.button div:last-child {
	background-color: rgba(65, 171, 133, 1);
	color: rgba(255, 255, 255, 1);
	margin-right: 0;
}
.hospitalbox {
	margin-top: 40rpx;
}
.hospitalbox span {
	margin-left: 28rpx;
	font-size: 28rpx;
	font-weight: bold;
	color: rgba(56, 56, 56, 1);
}
.hospitalbox span:first-child {
	margin-left: 0;
}
.hospitalbox p {
	margin-top: 20rpx;
	color: rgba(128, 128, 128, 1);
	font-size: 28rpx;
}
.colorchange {
	color: rgba(65, 171, 133, 1) !important;
}
.move {
	margin-left: -30%;
}
.deleate {
	width: 20%;
	margin-top: 20rpx;
	margin-left: 20rpx;
	background-color: rgba(212, 48, 48, 1);
	display: flex;
	justify-content: center;
	align-items: center;
	color: rgba(255, 255, 255, 1);
	font-size: 32rpx;
	font-weight: bold;
}
</style>
