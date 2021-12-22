<template>
	<view>
		<div class="uni-page-head binkhead">
			<div style="width: 62rpx; height: 62rpx;margin:0 4rpx;display: flex;justify-content: center;align-items: center;">
				<i class="uni-btn-icon" style="color: rgb(0, 0, 0); font-size: 54rpx;" @click="goback()"></i>
			</div>
			<span>银行卡</span>
			<span style="font-size: 24rpx;margin-right: 16rpx;" @click="goedit()">编辑</span>
		</div>
		<div class="binkmain">
			<div class="bink" v-for="(item, index) in bink">
				<div class="move" @click="check(index)">
					<div class="bigcircle" v-if="!insertbinkshow"><div class="smallcircle" v-if="item.ischeck"></div></div>
					<div class="binkbox" :class="item.binkstyle">
						<div class="icon"><img v-bind:src="item.imgsrc" :class="item.binkiconstyle" /></div>
						<div class="binktitle">
							<span>{{ item.binktitle }}</span>
							<p>{{ item.type }}</p>
							<div class="binknum">
								<div class="binkhide" v-for="i in 3">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div class="binknum_num">{{ item.binknum }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="insertbink binkbox" v-if="insertbinkshow" @click="insertbink">
				<image class="inserticon" src="../assest/insert.svg"></image>
				<span class="insertmes">添加新卡</span>
			</div>
		</div>

		<div class="deletbink" v-if="!insertbinkshow">解除绑定</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			insertbinkshow: true,
			bink: [
				{
					binkstyle: 'china',
					imgsrc: require('../assest/chinabink.png'),
					binkiconstyle: 'china-icon',
					binktitle: '中国银行',
					type: '储蓄卡',
					binknum: '1234'
				},
				{
					binkstyle: 'china_build',
					imgsrc: require('../assest/china-buildbink.png'),
					binkiconstyle: 'china_buildicon',
					binktitle: '中国建设银行',
					type: '储蓄卡',
					binknum: '1234'
				},
				{
					binkstyle: 'china',
					imgsrc: require('../assest/chinabink.png'),
					binkiconstyle: 'china-icon',
					binktitle: '中国银行',
					type: '储蓄卡',
					binknum: '1234'
				},
			]
		};
	},
	activated() {
		// 进入时强制刷新页面
		history.go(0);
	},
	mounted() {
		this.getcircle();
	},
	methods: {
		getcircle() {
			this.bink.forEach((item, index) => {
				this.bink[index].ischeck = false;
			});
		},
		goback() {
			this.$router.go(-1);
		},
		goedit() {
			this.bink.forEach((item, index) => {
				this.bink[index].ischeck = false;
			});
			this.$forceUpdate();
			this.insertbinkshow = false;
		},
		check(index) {
			if (this.bink[index].ischeck) {
				this.bink[index].ischeck = false;
			} else {
				this.bink[index].ischeck = true;
			}
			this.$forceUpdate();
		},
		insertbink(){
			this.$router.push("/pages/account/account-bink/account-binkedit")
		}
	}
};
</script>

<style lang="scss">
.binkmain {
	padding: 0 20rpx;
}

.binkhead {
	padding: 14rpx 6rpx;
	background-color: rgb(255, 255, 255);
	color: rgb(0, 0, 0);
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.binkhead span {
	font-weight: 700;
	font-size: 34rpx;
}
.binkbox {
	margin-top: 20rpx;
	display: flex;
}
.bink .icon {
	width: 62rpx;
	height: 62rpx;
	margin-left: 26rpx;
	margin-top: 26rpx;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 32rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.china {
	width: 100%;
	height: 246rpx;
	color: rgba(80, 80, 80, 1);
	border-radius: 12rpx;
	font-size: 28rpx;
	line-height: 150%;
	background-image: url(../assest/chinabink.png);
	background-color: rgba(184, 28, 34, 0.8);
	opacity: 0.8;
	background-size: auto 90%;
	background-position: right 20rpx center;
	background-repeat: no-repeat;
}

.china .china-icon {
	width: 46rpx;
	height: 46rpx;
}

.china_build {
	width: 100%;
	height: 246rpx;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(0, 79, 156, 0.47857142857142854);
	border-radius: 12rpx;
	font-size: 28rpx;
	line-height: 150%;
	background-image: url(../assest/china-buildbink.png);
	opacity: 0.8;
	background-size: auto 110%;
	background-position: right -40rpx center;
	background-repeat: no-repeat;
}

.china_build .china_buildicon {
	width: 72rpx;
	height: 56rpx;
}

.insertbink {
	width: 100%;
	height: 130rpx;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
	border-radius: 12rpx;
	font-size: 28rpx;
	line-height: 150%;
	text-align: center;
}

.binktitle {
	width: 100%;
	height: 100rpx;
	margin-top: 20rpx;
	margin-left: 12rpx;
	color: rgba(255, 255, 255, 1);
	font-style: 'Microsoft YaHei';
	font-size: 28rpx;
	font-weight: bold;
}

.binktitle p {
	color: rgba(229, 229, 229, 1);
	font-size: 24rpx;
}

.binknum {
	margin-top: 40rpx;
	display: flex;
	align-items: center;
}

.binkhide,
.binknum_num {
	width: 24%;
	display: flex;
	// justify-content: center;
	align-items: center;
}
.binkhide span {
	display: inline-block;
	margin-left: 10rpx;
	width: 12rpx;
	height: 12rpx;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 6rpx;
}
.binkhide span:first-child {
	margin-left: 0;
}
.binknum_num {
	font-size: 36rpx;
}
.insertbink {
	display: flex;
	align-items: center;
}
.inserticon {
	margin-left: 28rpx;
	width: 54rpx;
	height: 54rpx;
}
.insertmes {
	height: 42rpx;
	color: rgba(80, 80, 80, 1);
	font-size: 28rpx;
	font-style: 'Microsoft YaHei';
}
.move {
	position: relative;
	display: flex;
	align-items: center;
}
.bigcircle {
	width: 32rpx;
	height: 32rpx;
	border-radius: 100%;
	background-color: rgba(255, 255, 255, 1);
	margin-right: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.smallcircle {
	width: 20rpx;
	height: 20rpx;
	border-radius: 100%;
	background-color: rgba(65, 171, 133, 1);
}
.deletbink {
	position: fixed;
	width: 92%;
	height: 96rpx;
	background-color: rgba(65, 171, 133, 1);
	border-radius: 50rpx;
	text-align: center;
	line-height: 96rpx;
	font-style: 'Microsoft YaHei';
	font-weight: bold;
	font-size: 32rpx;
	color: rgba(255, 255, 255, 1);
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	bottom: 40rpx;
}
</style>
