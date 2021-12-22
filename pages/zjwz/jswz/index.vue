<template>
	<view class="jswz">
		<view class="condition">
			<view class="uni-flex uni-row">
				<view class="text" style="-webkit-flex: 1;flex: 1;" @click="quickConsultation()">
					<view class="uni-center">
						<!-- #ifdef MP-ALIPAY -->
						<!-- <view style="background-color:  #41ab85;
						border-radius: 10rpxpx;
						padding: 20rpx 20rpx 0 20rpx;
						display: inline-block;">
											<image class="image" mode="widthFix" src="/static/expert/zjwzLog.png" style="width: 30rpx;height: 30rpx;"/>
											</view> -->
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY 2a82e4--> 
						<view class="image-box" style="background-color:  #41ab85;">
						<image class="image" mode="widthFix" src="@/static/expert/zjwzLog.png"/>
						</view>
						<!-- <u-avatar src="/static/expert/zjwzLog0.png"  shape="square" style="background-color: #2a82e4;"></u-avatar> -->
						<!-- #endif -->
						<view class="text infoTitle">极速问诊</view>
						<view class="text titleDescribe">在线医生急速响应</view>
					</view>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view class="uni-center">
						<!-- #ifdef MP-ALIPAY -->
						<!-- <image class="image" mode="widthFix" src="../../../static/expert/find-expert.png" /> -->
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY -->
						<!-- <image class="image" mode="widthFix" src="../../../static/expert/find-expert.png" /> -->
						<view class="image-box" style="background-color: #ff8d1a;position: relative;">
						<image class="image" mode="widthFix" src="@/static/expert/zjwzLog.png"/>
						<text class="free">免费</text>
						</view>
						<!-- #endif -->
						<view class="text infoTitle">找专家</view>
						<view class="text titleDescribe">按疾病找科室</view>
					</view>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;" @click="toUrl()">
					<view class="uni-center">
						<!-- #ifdef MP-ALIPAY -->
						<!-- <image class="image" mode="widthFix" src="../../../static/expert/export-consultation.png" /> -->
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY -->
						<!-- <image class="image" mode="widthFix" src="../../../static/expert/export-consultation.png" /> -->
						<view class="image-box" style="background-color:  #2a82e4;">
						<image class="image" mode="widthFix" src="@/static/expert/zjwzLog.png"/>
						</view>
						<!-- #endif -->
						<view class="text infoTitle">专家会诊</view>
						<view class="text titleDescribe">权威专家在线解答</view>
					</view>
				</view>
			</view>
			<view class="text infoTitle">
				名医推荐
			</view>
			<FamousDoctor></FamousDoctor>
		</view>
	</view>
</template>

<script>
	import provinceData from '@/utils/province';
	import cityData from '@/utils/city';
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import medicalUrl from '@/api/medical'
	import expertUrl from '@/api/expertConsulation'
	import FamousDoctor from '@/pages/home/famous-doctor.vue'
	
	export default {
		components: {
			uniTag,
			uniIcons,
			FamousDoctor
		},
		data() {
			return {
				showAction: false,
				provinceShow: false,
				provinceList: [],
				provinceIndex: 0,
				cityShow: false,
				cityList: [],
				cityIndex: 0,
				departShow: false,
				doctorList:[],
				departList: ["急诊", "住院", "内科", "外科"],
				departIndex: 0,
				statusShow: false,
				statusList: ["在线", "不在线"],
				statusIndex: 0,
				patient:{},
				listData: [{
						checked: false,
						uri: '/static/examination/goods-img.jpg',
						doctor: '王守仁',
						professional: ['主任医师', ' 教授'],
						state: 1,
						hospitalLevel: '三甲',
						hospital: '北京协和医院',
						department: '皮肤性病科',
						expert:'痤疮、银屑病、雄激素性脱发、眶周色素沉着、面部血管纤维瘤、痘坑、青年痤疮、痘印、接触性皮炎',
						good: ['双眼皮环切手术', '包皮环切手术', '荨麻疹治疗'],
						onsultationCount:3069,
						fanCount:1026,
						score:4.9
						
					},
					{
						checked: true,
						uri: '/static/examination/goods-img.jpg',
						doctor: '王仁',
						professional: ['主任医师', ' 教授'],
						state: 0,
						hospitalLevel: '二甲',
						hospital: '北京协和医院',
						department: '皮肤性病科',
						expert:['痤疮、银屑病、雄激素性脱发、眶周色素沉着、面部血管纤维瘤、痘坑、青年痤疮、痘印、接触性皮炎'],
						good: ['双眼皮环切手术', '包皮环切手术', '荨麻疹治疗'],
						onsultationCount:3069,
						fanCount:1026,
						score:4.9
					},
				],
				checkDoctor: [{
						uri: '/static/examination/goods-img.jpg',
						online: 0,
						doctor: '王守仁'
					},
					{
						uri: '/static/examination/goods-img.jpg',
						online: 1,
						doctor: '王仁'
					},
					{
						uri: '/static/examination/goods-img.jpg',
						online: 1,
						doctor: '王仁'
					},
					{
						uri: '/static/examination/goods-img.jpg',
						online: 1,
						doctor: '王仁'
					},
					{
						uri: '/static/examination/goods-img.jpg',
						online: 0,
						doctor: '王仁'
					},
				]
			}
		},
		mounted() {
			this.initData()
		},
		created() {
		  this.getDoctorList()
		  this.getPatientList()
		},
		methods: {
			provincePickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.provinceIndex = e.detail.value
				this.cityList = this.handleCityData(this.provinceIndex)
				console.log(this.cityList)
			},
			cityPickerChange: function(e) {
				this.cityIndex = e.detail.value
			},
			departPickerChange: function(e) {
				this.departIndex = e.detail.value
			},
			statusPickerChange: function(e) {
				this.statusIndex = e.detail.value
			},
			initData() {
				provinceData.forEach((item, index) => {
					this.provinceList.push(item.test)
					// this.cityList.push(this.handleData(index,`${item.value}-${item.value}`))
				})
			},
			handleCityData(provinceIndex) {
				let items = []
				cityData[provinceIndex].forEach(item => {
					items.push(item.test)
				})
				return items
			},
			quickConsultation: function(e) {	
				if(this.patient != undefined){
					const { age, gender, name, id } = this.patient;
					
					// console.log(age,'--',gender,'---',name,'---',id)
					uni.navigateTo({
						url: `quick-consultation?age=${age}&gender=${gender}&name=${name}&patientId=${id}`
					})
				}
				else{
					uni.navigateTo({
						url: `quick-consultation`
					})
				}

			},
			onClick(items, idx) {
				items.checked = !items.checked
			},
			deleteDoctor(items, idx) {
				console.log(items, idx)
			},
			toRedirect() {
				uni.navigateTo({
					url: 'estimate'
				});
			},
			toUrl(){
				uni.navigateTo({
					url: '../../zjwz/zjhz/index'
				});
			},
			async getPatientList() {
			  const {data} = await this.$axios({url: expertUrl.getPatient})
			  // let patientList = data.arr.map((item,index)=>{
				 //  return item
			  // })
			  // this.patient = patientList[0]
			  
			  this.patient = data.arr[0]
			},
			async getDoctorList() {
			  const {data} = await this.$axios({url: expertUrl.doctorList})
			  let datas = data.list.data.data
			  // this.navList = data.list
			  this.doctorList = datas.map((item,index)=>{
				  return item.title
			  })
			console.log(this.doctorList)
			  // await this.getDiseaseList(data.list[0].id)
			
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jswz {
		.condition {
			// background-color: #fff;
			padding: 20px 10px 10px 10px;
		}

		.infoTitle {
			font-size: 20px;
			font-weight: bold;
		}
		
		.titleDescribe {
			color: gray;
		}
		
		.picker {
			padding: 5px 0 5px 0;

			.u-icon {
				padding-top: 10px
			}
			
			.selectBtn {
				font-size: 14px;
				border: 1px solid #D9D9D9;
				border-radius: 24px;
				height: 32px;
				width: 75px;
				padding-left: 5px;
				padding-right: 5px;
				margin-right: 5px;
			}
		}

		.check {
			padding: 5px 0 10px 0;

			.u-icon {
				position: absolute;
				right: 0;
				top: 0;
			}

			.uni-media-list-logo {
				border-radius: 42px;
			}
		}

		.clinic {
			.u-button--primary {
				width: 50%;
				background-color: #41AB85;
				border-color: #41AB85;
			}
		}

		.example-body {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			padding: 0;
			font-size: 14px;
			background-color: #ffffff;
		}

		.example-body {
			flex-direction: column;
			padding: 15px;
			background-color: #ffffff;
		}

		.example-body {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
		}

		.image {
			width: 50rpx;
			height: 50rpx;
		}

		.uni-media-list-body {
			height: auto;

			.doctor {
				font-size: 20px;
				font-weight: bold;
				margin-right: 10px;
			}

			.professional {
				color: gray;
			}

			.hospitalLevel {
				border-radius: 5px;
				color: #fff;
				background-color: #41AB85;
				font-size: 10px;
				padding: 2px;
			}

			.hospital {
				margin: 5px;
			}

			.good {
				border-radius: 5px;
				background-color: #f3f4f8;
				font-size: 4px;
				padding: 2px 3px;
				margin: 2px;
			}

			.uni-tag {
				border: 1px solid #41AB85;
				background-color: #fff;
				margin: 0 5px;
			}

			.circle-green {
				display: inline-block;
				width: 10px;
				height: 10px;
				background-color: #41AB85;
				border-radius: 10px;
				margin-right: 5px;
			}

			.circle-red {
				display: inline-block;
				width: 10px;
				height: 10px;
				background-color: #f00;
				border-radius: 10px;
				margin-right: 5px;
			}
		}
		.image-box{
			border-radius: 20rpx;
			padding: 20rpx 20rpx 0 20rpx;
			display: inline-block;
			image{
				width: 30rpx;height: 30rpx;
			}
			.free{
				position: absolute;
				background: #9fa8f1;
				color: #fff;
				border-radius: 20rpx;
				font-size: 16rpx;
				top: -30rpx;
				right: -40rpx;
				display: inline-block;
				padding: 2rpx 10rpx;
			}
		}
	}
</style>
