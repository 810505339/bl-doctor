<template>
	
	<view class="jswz">
		<view class="step" style="margin: 5px 15px;">		
<!-- 			<view class="uni-flex uni-row" style="width: 100%;">
				<view class="currentLabel">病情描述</view>
				<u-icon name="arrow-right" color="#000" size="16"></u-icon>
				<view class="label">选择医生</view>
				<u-icon name="arrow-right" color="#000" size="16"></u-icon>
				<view class="label">支付诊费</view>
				<u-icon name="arrow-right" color="#000" size="16"></u-icon>
				<view class="label">开始咨询</view>
			</view> -->
			<view class="uni-flex uni-row">
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
						<view class="currentLabel" style="padding: 0px;">病情描述</view>
						<u-icon name="arrow-right" color="#000" size="16" style="padding-left:5px"></u-icon>
					</view>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
						选择医生<u-icon name="arrow-right" color="#000" size="16" style="padding-left:5px"></u-icon>
					</view>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
						支付诊费<u-icon name="arrow-right" color="#000" size="16" style="padding-left:5px"></u-icon>
					</view>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
					开始咨询
					</view>
				</view>
			</view>
		</view>
			<view class="consultation">
				<view v-if="hasPatient">
					<view class="uni-flex uni-row" style="width: 100%;">
						<view class="add-patient">请选择问诊患者</view>
						<u-icon name="arrow-down" color="#000" size="16" @click="selectPatient()"></u-icon>
					</view>
					<input class="uni-input picker-input" name="currentPatientName" placeholder="请输入姓名" v-model="this.patient.name" />
				</view>
				<view v-else>
					<view class="uni-flex uni-row" style="width: 100%;">
						<view class="add-patient">添加就诊人</view>
						<u-icon name="plus" color="#000" size="16" @click="addPatient()"></u-icon>
					</view>
				</view>
				<view class="uni-flex uni-row" style="width: 100%;justify-content: space-between;">
					<view class="add-patient" style="width: 60%;">请描述您的病情</view>
					<view class="how-discribe" @click="howDiscribe()">怎样描述？</view>
				</view>
				<view class="uni-textarea">
					<textarea style="height: 180px;" v-model="discribeProblem" name="caseDiscribe" placeholder="请大致描述下您的病情:例如什么时间发病,具体有哪些症状,是否就医,是否复用药物等."/>
				</view>
				<view class="uni-flex uni-row" style="width: 100%;">
					<view class="add-patient" style="width: 80%;">上传病例</view>
					<view v-if="hasUploadCase">
						<view class="uni-input-wrapper">已选择</view>
					</view>
					<view v-else>
						<view class="uni-flex uni-row" @click="uploadCase()">
							<view class="uni-input-wrapper">请选择</view>
							<u-icon name="arrow-right" color="#000" size="16"></u-icon>
						</view>
					</view>
				</view>
				<view class="uni-flex uni-row" style="width: 100%;">
					<view class="add-patient" style="width: 80%;">相关就诊史</view>
					<view v-if="hasMedicalHistory" >
						<view class="uni-input-wrapper">已选择</view>
					</view>
					<view v-else>
						<view class="uni-flex uni-row" @click="medicalHistory()">
							<view class="uni-input-wrapper">请选择</view>
							<u-icon name="arrow-right" color="#000" size="16"></u-icon>
						</view>
					</view>
				</view>
				<view class="uni-flex uni-row" style="width: 100%;">
					<view class="add-patient" style="width: 40%;">请上传相关图片</view>
					<view class="uni-flex uni-row">
						<view class="uni-input-wrapper">(最多8张)</view>
					</view>
				</view>
				<view class="uni-uploader-body">
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
			</view>
			<view class="text save-view">
				<button class="submit-btn" @click="formSubmit">提交问题</button>
			</view>
	</view>
</template>

<script>
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import permision from "@/common/permission.js"
	import expertUrl from '@/api/expertConsulation'
	var  graceChecker = require("@/common/graceChecker.js");
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
	export default {
		components: {
			uniTag,
			uniIcons
		},
		data() {
			return {
				hasPatient:false,
				patient:{},
				currentPatient:'',
				discribeProblem:'',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 7,
				count: [1, 2, 3, 4, 5, 6, 7, 8],
				hasUploadCase: false,
				hasMedicalHistory: false
			}
		},
		onLoad(options) {
			this.patient.name = options.name
			this.patient.gender = options.gender
			this.patient.age = options.age
			this.patient.patientId = options.patientId
			if(this.patient.name != undefined){
				this.hasPatient = true
			}
			this.hasMedicalHistory = options.hasMedicalHistory
			this.hasUploadCase = options.hasUploadCase
			// console.log("------quck options: ", options)
		},
		methods:{
			addPatient(){
				uni.navigateTo({
					url: '../../zjwz/jswz/add-patient'
				});
			},
			selectPatient(){
				uni.navigateTo({
					url: '../../zjwz/jswz/select-patient'
				});
			},
			howDiscribe(){
				uni.showModal({
					title: "怎样描述问题？",
					content: '例如：今天头疼，有些眼晕，前几天去医院没有检查出来问题，前几天的时候也有些头疼，是那种阵痛的感觉，浑身乏力，什么也不想做，上班都没有心情。',
					showCancel: false,
					confirmText: "我知道了",
					confirmColor:'#41ab85',
				})
			},
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			dialogClose(done) {
				done()
			},
			uploadCase(){	
				const { age, gender, name, patientId } = this.patient;
				uni.navigateTo({
					url: `upload-case?age=${age}&gender=${gender}&name=${name}&patientId=${patientId}`
				});
			},
			medicalHistory(){
				// console.log("-0-----medicalHistory patient: ",this.patient)
				const { age, gender, name, patientId } = this.patient;
				uni.navigateTo({
					url: `medical-history?age=${age}&gender=${gender}&name=${name}&patientId=${patientId}`
				});	
			},
			async consultation(){			
				// const data = {
				// 	patient_id:this.patient.patientId,
				// 	msg:this.discribeProblem,
				// 	case_id:0,
				// 	see_id:0,
				// 	images:this.imageList,
				// 	doctor_id:0,
				// }
				// try{
				// 	const res = await this.$axios({
				// 		method: 'post',
				// 		url: expertUrl.addQuestion,
				// 		data
				// 	})					
				// }catch(e){
				// 	//TODO handle the exception
				// 	if(e.code !== 1) {
				// 		uni.showToast({
				// 			title: e.msg,
				// 			icon: 'none'
				// 		})
				// 		return
				// 	}
				// }

				uni.navigateTo({
					url: 'select-doctor'
				});
			},
			formSubmit: function(e) {
				this.consultation()
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
					if (this.imageList.length === 8) {
						return 
					}
					// #ifdef APP-PLUS
					// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
					if (this.sourceTypeIndex !== 2) {
						let status = await this.checkPermission();
						if (status !== 1) {
							return;
						}
					}
					// #endif
			
					if (this.imageList.length === 8) {
						let isContinue = await this.isFullImg();
						console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						count: this.imageList.length + this.count[this.countIndex] > 8 ? 8 - this.imageList.length : this.count[this.countIndex],
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
				}
			
		}
	}
	
</script>

<style lang="scss" scoped>
	.jswz{
		.step{
			.currentLabel{
				padding: 10px; 
				color: #0FC176;
			}
			
			.label{
				padding: 10px; 
			}
		}
		
		.consultation{
			.add-patient{
				 width: 90%;
				 font-size: 16px;
				 font-weight: bold;
				 padding-left: 10px;
			}
			.picker-input{
				font-weight: bold;
				padding: 0 10px; 
				height: 36px;
			}
			.how-discribe{
				color: #0FC176;
				line-height: 36px;
			}
		}
		
		.submit-btn{
			background-color: #41ab85; 
			color: #ffffff;
		}
	}
</style>
