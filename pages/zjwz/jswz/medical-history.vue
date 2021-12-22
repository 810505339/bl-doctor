<template>
	<view class="jswz">
		<view class="uni-list-cell picker-list">
			<view class="uni-list-cell-left packer-label">
				就诊人
			</view>
			<view class="uni-input-wrapper">
				<input class="uni-input picker-input" placeholder="请输入" v-model="patient.name" placeholderStyle="text-align:right"/>
			</view>
		</view>
		<view class="uni-list-cell picker-list">
			<view class="uni-list-cell-left packer-label">
				病例类型
			</view>
			<view>
				<picker @change="caseTypePickerChange" v-model="caseTypeIndex" :range="caseTypeList" range-key="name">
					<view class="uni-input uni-flex">
						<view class="uni-input picker-input">{{selectCaseType}}</view>
						<u-icon name="arrow-right" color="#000" size="16"></u-icon>
					</view>
				</picker>
			</view>
		</view>
		
		<view class="uni-list-cell picker-list">
			<view class="uni-list-cell-left packer-label">
				初诊/复诊
			</view>
			<view>
				<picker @change="isFirstVisitPickerChange" :value="isFirstVisitIndex" :range="isFirstVisitList" range-key="name">
					<view class="uni-input uni-flex">
						<view class="uni-input picker-input">{{isFirstVisitList[isFirstVisitIndex].name}}</view>
						<u-icon name="arrow-right" color="#000" size="16"></u-icon>
					</view>
				</picker>
			</view>
		</view>
		<view class="uni-list-cell picker-list">
			<view class="uni-list-cell-left packer-label">
				就诊时间
			</view>
			<view>
				<picker mode="date" v-model="consulationDate" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input uni-flex">
						<view class="uni-input picker-input">{{consulationDate}}</view>
						<u-icon name="arrow-right" color="#000" size="16"></u-icon>
					</view>
				</picker>
			</view>
		</view>

		<view class="uni-list-cell picker-list">
			<view class="uni-list-cell-left packer-label">
				医院
			</view>
			<view>
				<picker @change="hospitalPickerChange" v-model="hospitalIndex" :range="hospitalList" range-key="title">
					<view class="uni-input uni-flex">
						<view class="uni-input picker-input">{{hospitalTitle}}</view>
						<u-icon name="arrow-right" color="#000" size="16"></u-icon>
					</view>
				</picker>
			</view>
		</view>		
		<view class="uni-list-cell picker-list">
			<view class="uni-list-cell-left packer-label">
				科室
			</view>
			<picker mode="multiSelector" @change="bindPickerChange" @columnchange="columnchange" v-model="sectionIndex" :range="sectionArray"
				 range-key="title">
				 <view class="uni-input uni-flex">
					<view class="uni-input picker-input">{{sectionTitle}}</view>
					<u-icon name="arrow-right" color="#000" size="16"></u-icon>
				</view>
			</picker>
		</view>
		<view class="uni-list-cell picker-list">
			<view class="uni-list-cell-left packer-label">
				医生姓名
			</view>
			<view class="uni-input-wrapper">
				<input class="uni-input picker-input" v-model="doctorName" placeholder="请输入"  placeholderStyle="text-align:right"/>
			</view>
		</view>
		
		<view class="text packer-label" style="padding-left: 15px;">备注</view>
		<view class="uni-textarea">
			<textarea style="height: 100px; padding-left: 15px;	font-weight: bold" name="remark" :value="remark" placeholder="请填写"/>
		</view>
		<view class="text packer-label" style="padding-left: 15px;">病情描述</view>
		<view class="uni-textarea">
			<textarea style="height: 150px; padding-left: 15px;	font-weight: bold" name="caseDiscribe" :value="caseDiscribe" placeholder="请填写"/>
		</view>
		<view class="flex" style="width: 100%;">
			<view class="text packer-label" style="width: 30%; padding-left: 15px;">患处照片</view>
<!-- 			<view class="flex">
				<view class="uni-input-wrapper">最多上传9张</view>
			</view> -->
		</view>
		<view class="uni-uploader-body" style="padding-left: 15px;">
			<view class="uni-uploader__files">
				<block v-for="(image,index) in imageList" :key="index">
					<view class="uni-uploader__file">
						<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
					</view>
				</block>
				<view class="uni-uploader__input-box">
					<view class="uni-uploader__input" @tap="chooseImage"></view>
				</view>
			</view>
		</view>
		
		<view class="text packer-label" style="padding-left: 15px;">诊断意见</view>
		<view class="uni-textarea">
			<textarea style="height: 100px; padding-left: 15px;	font-weight: bold" name="suggest" :value="suggest" placeholder="请填写"/>
		</view>
		
		<view class="text save-view">
				<button class="submit-btn" @click="formSubmit">保存</button>
		</view>
	</view>
</template>

<script>
	import expertUrl from '@/api/expertConsulation'
	import expertApiUrl from '@/api/medical'
	import permision from "@/common/permission.js"
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	
	export default {
		components: {
		},
		data() {
			return {
				patient:{},
				caseTypeList:[],
				selectCaseType: "请选择",
				caseTypeIndex: 0,
				isFirstVisitList: [{name:'初诊'},{name: '复诊'}],
				isFirstVisitIndex: 0,
				consulationDate: "请选择就诊时间",
				startDate:getDate('start'),
				endDate:getDate('end'),
				hospitalList:[],
				hospitalTitle:"请选择就诊医院",
				selectHospital: 0,
				hospitalIndex: 0,
				doctorName:'',
				remark:'',
				caseDiscribe:'',
				suggest:'',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				sectionIndex: [0, 0],
				sectionArray: [[],[]],
				sectionChildArr: [], // 二级分类数据源
				sectionTitle: '请选择就诊科室',
				selectSection: 0,
			}
		},
		created() {
		  this.getHospitalList()
		  this.getDepartmentList()
		  this.getCaseTypeList()
		},
		onLoad(options) {
			console.log("history----options: ",options)
			this.patient.name = options.name;
			this.patient.gender = options.gender;
			this.patient.age = options.age;
			this.patient.patientId = options.patientId;
		},
		methods:{
			async getDepartmentList() {
				const {data} = await this.$axios({
				  url: expertApiUrl.sectionList
				})
				// console.log("------------departments:", data.list)
				this.sectionArray[0] = data.list
				this.sectionChildArr = data.list.map(item => item.children)
				// console.log("-----------------arr:", data)
				this.sectionArray[1] = this.sectionChildArr[0]
		},
		
		async getCaseTypeList() {
			const {data} = await this.$axios({
			  url: expertUrl.getCaseType
			})
			console.log("----getcaseType: ",data)
			this.caseTypeList = data.list.map((item, index) => item)
			
			console.log("DiseaseList:", this.caseTypeList)
		},
		// 获取二级分类
		columnchange(e) {
			// 当滚动切换一级分类时，为当前的一级分类添加它的子类
			if (e.detail.column == 0) {
				// #ifdef H5
				// 在小程序中直接赋值无效  H5 可直接赋值
				this.sectionArray[1] = this.sectionChildArr[e.detail.value]
				// #endif
				// #ifdef MP-WEIXIN
				// 在 H5 环境下 $set 会导致一级分类无法滚动， 小程序正常运行
				this.$set(this.sectionArray, 1, this.sectionChildArr[e.detail.value])
				// #endif
			}
		},

		// 选择任务分类
		bindPickerChange: function(e) {
			// console.log('picker发送选择改变，携带值为', e.target.value)
			let value = e.target.value;
			this.sectionIndex = value;
			if (this.sectionArray[0].length != 0) {
				this.sectionTitle = this.sectionArray[0][this.sectionIndex[0]].title
			};
			if (this.sectionArray[1].length != 0) {
				this.sectionTitle += ',' + this.sectionArray[1][this.sectionIndex[1]].title
			}
			if(this.sectionChildArr[this.sectionIndex[0]].length == 0){
				this.selectSection = this.sectionArray[0][this.sectionIndex[0]].id
				// console.log("sectionId: ",this.sectionArray[0][this.sectionIndex[0]].id)
			}
			else{
				this.selectSection = this.sectionChildArr[this.sectionIndex[0]][this.sectionIndex[1]].id
				// console.log("sectionId: ",this.sectionChildArr[this.sectionIndex[0]][this.sectionIndex[1]].id)
			}
		},	
			async getHospitalList() {
				const { data } = await this.$axios({
				// url: `/api/users/hospital/index`,
				url:expertUrl.getHospitalList,
				data: {
				  lat: 39.909,
				  lng: 116.39742,
				}
				});
				// console.log("----getHospitalList: ", data.arr.data)
				this.hospitalList = data.arr.data.map((item,index)=>{
					return item
			})
			},
			caseTypePickerChange: function(e) {
				this.caseTypeIndex = e.detail.value
				this.selectCaseType = this.caseTypeList[this.caseTypeIndex]
			},
			isFirstVisitPickerChange: function(e) {
				this.isFirstVisitIndex = e.detail.value
			},
			bindDateChange: function(e) {
				this.consulationDate = e.detail.value
			},
			hospitalPickerChange: function(e) {
				this.hospitalTitle = this.hospitalList[e.detail.value].title
				this.selectHospital = this.hospitalList[e.detail.value].id
			},
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = parseInt(e.detail.value)
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = parseInt(e.detail.value)
			},
			countChange: function(e) {
				this.countIndex = e.detail.value;
			},
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
						
				if (this.imageList.length === 9) {
					return
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');
						
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
						
				return status;
			},			
			async addMedicalHistory(){
				const data = {
					patient_id:Number(this.patient.patientId),
					case_type:this.selectCaseType,
					hospital_id:this.selectHospital,
					section_id:this.selectSection,
					doctor_name:this.doctorName,
					remarks:this.remark,
					msg:this.caseDiscribe,
					images:this.imageList,
					opinions:this.suggest,
				}
				console.log("--------addMedicalHistory data: ",data)
				try{
					const res = await this.$axios({
						method: 'post',
						url: expertUrl.addMedicalHistory,
						data
					})					
				}catch(e){
					if(e.code !== 1) {
						uni.showToast({
							title: e.msg,
							icon: 'none'
						})
						return
					}
				}
				
				const { age, gender, name, patientId } = this.patient;
				uni.navigateTo({
					url: `quick-consultation?age=${age}&gender=${gender}&name=${name}&patientId=${patientId}&hasMedicalHistory=`+true
				});	
			},
			
			formSubmit: function(e) {
				this.addMedicalHistory()
			},
			
			onNavigationBarButtonTap(e) {
				this.addMedicalHistory()
			},
		}
	}
	
</script>

<style lang="scss" scoped>
	.jswz{
		background-color: #fff;
		.required{
			color: #0FC176;
			font-weight: bold;
			padding-left: 10px;
		}
		.packer-label{
			font-weight: bold;
		}
		.picker-list{
			height: 45px;
		}
			
		.picker-input{
			padding: 0 10px; 
			background-color: transparent;
			text-align:right;
			font-weight: bold;
		}
		
		.optional{
			color: gray;
			font-weight: bold;
			padding-left: 10px;
			padding-top: 10px;
		}
		
		.save-view{
			padding-top: 15px;
			padding-bottom: 60px;
		}
		
		.submit-btn{
			background-color: #41ab85; 
			color: #ffffff;
		}
	}
</style>
