<template>
	<view>
		<u-navbar
			title="添加病例"
			safeAreaInsetTop
			fixed
			placeholder
			@leftClick="navigateBack"
		>
			<view class="u-nav-slot" slot="right">
				<text class="save" @click="handleSave">保存</text>
			</view>
		</u-navbar>
		<view class="page-wrap">
			<u-form class="form-wrap" :model="model" :rules="rules" ref="form">
				<u-form-item labelWidth="80" class="form-item" label="姓名" borderBottom>
					<view class="form-input">{{model.user_name}}</view>
				</u-form-item>
				<u-form-item labelWidth="80" class="form-item" label="性别" borderBottom>
					<view class="form-input">{{genderType[model.gender]}}</view>
				</u-form-item>
				<u-form-item labelWidth="80" class="form-item" label="年龄" borderBottom>
					<view class="form-input">{{model.age}}</view>
				</u-form-item>
					<u-form-item labelWidth="80" class="form-item" label="就诊时间" prop="atime" borderBottom @click="showatime = true;hideKeyboard()">
						<u--input class="form-input" v-model="model.atime" disabled disabledColor="#ffffff" placeholder="请选择就诊时间" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="就诊机构" labelWidth="80" class="form-item" prop="hospital_id" @click="showhospital_id = true;hideKeyboard()">
						<u--input class="form-input" v-model="model.hospital_id.title" disabled disabledColor="#ffffff" placeholder="请选择就诊机构" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="就诊科室" labelWidth="80" class="form-item" prop="section_id" @click="showSection()">
						<u--input class="form-input" v-model="model.section_id.title" disabled disabledColor="#ffffff" placeholder="请选择就诊科室" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="备注" labelWidth="80" class="form-item form-textarea" prop="remarks">
						<u--textarea placeholder="请填写" v-model="model.remarks"></u--textarea>
					</u-form-item>
					<view class="split-line"></view>
					<u-form-item label="病情描述" labelWidth="80" class="form-item form-textarea" prop="msg">
						<u--textarea placeholder="请填写" v-model="model.msg"></u--textarea>
					</u-form-item>
					<u-form-item label="诊断建议" labelWidth="80" class="form-item form-textarea" prop="suggest">
						<u--textarea placeholder="请填写" v-model="model.suggest"></u--textarea>
					</u-form-item>
					<u-form-item class="form-item form-textarea" labelWidth="160" prop="affected_img" label="患处照片,最多上传9张">
						<u-upload
							@afterRead="afterRead($event, 'affected_img')" 
							@delete="deletePic($event, 'affected_img')" 
							class="form-upload" 
							:fileList="model.affected_img"
							:maxCount="9"
							:disabled="model.affected_img.length === 9"
						>
							<image src="/static/medical-records/upload-bg.png" mode="widthFix" class="upload-bg"></image>
						</u-upload>
					</u-form-item>
					<u-form-item class="form-item form-textarea" labelWidth="160" prop="case_img" label="病例原件,最多上传9张">
						<u-upload
							@afterRead="afterRead($event, 'case_img')" 
							@delete="deletePic($event, 'case_img')" 
							class="form-upload" 
							:fileList="model.case_img"
							:maxCount="9"
							:disabled="model.case_img.length === 9"
						>
							<image src="/static/medical-records/upload-bg.png" mode="widthFix" class="upload-bg"></image>
						</u-upload>
					</u-form-item>
			</u-form>	
			<view class="scan-add">
				<text>扫描添加</text>
			</view>
		</view>
		<u-datetime-picker
			:show="showatime"
			:value="atime"
			mode="date"
			closeOnClickOverlay
			@close="close('atime')"
			@confirm="atimeConfirm"
			@cancel="cancel('atime')"
		></u-datetime-picker>
		<u-picker @close="close('hospital_id')" keyName="title" @cancel="cancel('hospital_id')" closeOnClickOverlay :show="showhospital_id" :columns="hospitalList" @confirm="handleConfirm($event,'hospital_id')"></u-picker>
		<u-picker @close="close('section_id')" keyName="title" @cancel="cancel('section_id')" closeOnClickOverlay :show="showsection_id" :columns="sectionList" @confirm="handleConfirm($event, 'section_id')"></u-picker>
	</view>
</template>

<script>
	import {getStorage} from '@/utils/cookies.js'
	export default {
		data() {
			return {
				baseUrl: 'http://service-white-gragon.ascetic.top',
				patientId: '',
				genderType: {
					1: '男',
					2: '女'
				},
				model: {
					user_name: '',
					gender: '',
					age: '',
					atime: '',
					hospital_id: '',
					section_id: '',
					remarks: '',
					msg: '',
					suggest: '',
					affected_img: [],
					case_img: []
				},
				hospitalList: [],
				sectionList: [],
				atime: Number(new Date()),
				showatime: false,
				showhospital_id: false,
				showsection_id: false,
				rules: {
					'atime': {
						type: 'string',
						required: true,
						message: '请选取就诊时间',
						trigger: ['change']
					},
					'hospital_id': {
						type: 'object',
						required: true,
						message: '请选取就诊机构',
						trigger: ['change']
					},
					'section_id': {
						type: 'object',
						required: true,
						message: '请选取就诊科室',
						trigger: ['change']
					},
					'remarks': {
						type: 'string',
						required: true,
						message: '请输入备注',
						trigger: ['change', 'blur']
					},
					'msg': {
						type: 'string',
						required: true,
						message: '请填写病情描述',
						trigger: ['blur', 'change']
					},
					'affected_img': {
						type: 'array',
						min: 1,
						max: 9,
						required: true,
						message: '请上传患处照片，最少一张',
						trigger: ['change']
					},
					'case_img': {
						type: 'array',
						min: 1,
						max: 9,
						required: true,
						message: '请上传病例原件，最少一张',
						trigger: ['change']
					}
				},
			};
		},
		methods:{
			async getOrgList() {
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
				    },
						fail: function(err) {
							console.log(err, 'err');
							uni.showToast({
								title: err.errMsg
							});
						}
				});
				const result = await this.$axios({
					url: '/api/users/hospital/index',
					data: {
						lng: '122.22',
						lat: '122.22'
					}
				});
				if (result.code === 1) {
					this.hospitalList = [result.data.arr.data];
				}
			},
			async getSection(hospital_id) {
				const result = await this.$axios({
					url: '/api/hospital/section_list',
					data: {
						parent_id: 0,
						hospital_id
					}
				});
				if (result.code === 1) {
					this.sectionList = [result.data.list];
				}
			},
			showSection() {
				if (!this.model.hospital_id.id) {
					this.$u.toast('请先选择就诊机构');
					return;
				}
				this.showsection_id = true;
				this.hideKeyboard();
			},
			navigateBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			cancel(type) {
				this[`show${type}`] = false;
				this.$refs.form.validateField(type);
			},
			close(type) {
				this[`show${type}`] = false;
				this.$refs.form.validateField(type);
			},
			atimeConfirm(e) {
				this.model.atime = this.$u.timeFormat(e.value, 'yyyy-mm-dd');
				this.$refs.form.validateField('atime')
				this.showatime = false;
			},
			handleConfirm(e, type) {
				const { value } = e;
 				this.model[type] = value[0];
				this[`show${type}`] = false;
				type === 'hospital_id' && this.getSection(value[0].id);
			},
			hideKeyboard() {
				uni.hideKeyboard();
			},
			handleSave() {
				this.$refs.form.validate().then(async(res) => {
					const { affected_img, age, atime, case_img, gender, hospital_id, msg, remarks, section_id, suggest, user_name } = this.model;
					const param = {
						affected_img : affected_img.map(item => item.url),
						age,
						atime,
						case_img: case_img.map(item => item.url),
						gender,
						hospital_id: hospital_id.id,
						msg,
						remarks,
						section_id: section_id.id,
						suggest,
						user_name,
						patientId: this.patientId
					}
					const result = await this.$axios({
						url: '/api/users/patient_case/add',
						method: 'POST',
						data: param
					});
					if (result.code !== 1) {
						this.$u.toast(result.msg);
					} else {
						this.$u.toast('添加病例成功');
						setTimeout(() => {
							this.navigateBack();
						}, 500);
					}
					console.log(result, 'save');
				}).catch(error => {
					console.log(error, 'error')
				})
			},
			async afterRead(event, type) {
				const { baseUrl } = this;
				uni.uploadFile({
					url: `${baseUrl}/api/upload_img`,
					filePath: event.file.thumb,
					name: 'file',
					header: {
						Authorized: getStorage() || '94ef05bd-7e20-45a3-8ee6-0d3eec755525'
					},
					success: (uploadFileRes) => {
							if (uploadFileRes.statusCode === 200) {
								const { data } = JSON.parse(uploadFileRes.data);
								this.model[type].push({url: baseUrl + data.url})
							} else {
								this.$u.toast('上传图片失败，请重试');
							}
					},
					fail(err) {
						console.log(err, 'err');
						this.$u.toast(JSON.stringify(err));
					}
				})
			},
			deletePic(ev,imgType) {
				this.model[imgType].splice(ev.index, 1);
			}
		},
		onLoad(option) {
			console.log(option);
			this.model.user_name = option.name;
			this.model.gender = option.gender;
			this.model.age = option.age;
			this.patientId = option.pageId;
			this.getOrgList();
		}
	}
</script>

<style lang="scss" scoped>
.save{
	color: #505050;
	font-size: 28rpx;
}
.page-wrap{
	padding-bottom: 88rpx;
}
.form-wrap{
	display: block;
	padding-left: 20rpx;
	background-color: #FFFFFF;
	box-sizing: border-box;
}
.form-item{
	padding: 10rpx 18rpx 8rpx 0;
}
.mediacal-name{
	min-width: 120rpx;
	color: #383838;
	line-height: 150%;
	font-size: 30rpx;
}
/deep/ .form-input {
	width: 100%;
	color: #808080;
	font-size: 28rpx;
	line-height: 150%;
	text-align: right;
	.uni-input-placeholder, .uni-input-input {
		text-align: right;
	}
}
/deep/ .form-upload{
	margin-top: 32rpx;
	margin-bottom: 32rpx;
	width: 130rpx;
	height: 124rpx;
	.u-upload__wrap__preview{
		width: 130rpx !important;
		height: 124rpx !important;
		margin-bottom: 0 !important;
	}
}
/deep/ .upload-bg{
	width: 130rpx;
	height: 124rpx !important;
	& >div {
		background-size: inherit !important;
	  background-position: center !important;
	}
}
.scan-add{
	height: 88rpx;
	left: 0;
	right: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	bottom: 0;
	position: fixed;
	color: #FFFFFF;
	background-color: #41ab85;
	font-size: 28rpx;
	line-height: 88rpx;
	text-align: center;
}
.split-line{
	margin-left: -20rpx;
	height: 22rpx;
	background-color: #f3f4f8;
}
/deep/ .form-textarea {
	.u-form-item__body{
		flex-direction: column !important;
		padding: 0 !important;
		.u-textarea {
			padding-left: 0 !important;
			padding-right: 0 !important;
			border: none !important;
		}
		.u-textarea__field {
			height: 118rpx !important;
		}
	}
	.u-form-item__body__right__message {
		margin-left: 0 !important;
	}
}
</style>
