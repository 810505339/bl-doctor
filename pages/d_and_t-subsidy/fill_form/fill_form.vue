<template>
	<view style="background-color: white;padding-bottom: 100rpx;">
		<u-navbar back-text=" " safeAreaInsetTop title-bold back-icon-color="rgba(153, 153, 153, 1)" @leftClick="back"
			back-icon-name="arrow-left" title="诊疗补贴" title-color="rgba(80, 80, 80, 1)" :border-bottom="false">
		</u-navbar>
		<u-popup :show="show" mode="center" :customStyle="{'width':'516rpx','height':'280rpx'}" :round="true"
			borderRadius="14">
			<view class="rect">
				提示
			</view>
			<view class="content">
				请您务必要填写准确信息，以便工作人员核实，提交后无法修改，请您准确核对
			</view>
			<view class="driver_line"></view>
			<view class="bttn_group">
				<view class="btn btn_cancel" @click="cancel">
					取消
				</view>
				<view class="btn btn_confirm" @click="go">
					确定
				</view>
			</view>
		</u-popup>
		<view style="width: 716rpx;margin: auto;">
			<u-form :model="form" ref="uForm" :labelStyle="{'fontSize': '30rpx'}">
				<u-form-item label="患者姓名*" labelWidth="200rpx" prop="name" borderBottom
					@click="showName = true; hideKeyboard()">
					<u-input v-model="form.name" style="text-align: right;margin-right: 5rpx;" disabled
						disabledColor="#ffffff" placeholder="请选择患者" placeholder-style="color:rgba(204, 204, 204, 1)"
						border="none">
					</u-input>
					<u-icon slot="right" name="arrow-right" color="rgba(153, 153, 153, 1)"></u-icon>
				</u-form-item>
				<u-form-item label="患者性别*" labelWidth="200rpx" prop="sex" borderBottom>
					<u-input v-model="form.sex" style="text-align: right;margin-right: 5rpx;" disabled
						disabledColor="#ffffff" placeholder="根据选择患者自动获取"
						placeholder-style="color:rgba(204, 204, 204, 1)" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="与本人关系*" labelWidth="200rpx" prop="relation" borderBottom>
					<input v-model="form.relation" style="text-align: right;margin-right: 5rpx;" disabledColor="#ffffff"
						placeholder="前提是需要在该账号档案中" placeholder-style="color:rgba(204, 204, 204, 1)" border="none">
					</input>
				</u-form-item>
				<u-form-item label="患者年龄*" labelWidth="200rpx" prop="age" borderBottom>
					<u-input v-model="form.age" style="text-align: right;margin-right: 5rpx;" disabled
						disabledColor="#ffffff" placeholder="自动获取" placeholder-style="color:rgba(204, 204, 204, 1)"
						border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="患者身份证号*" labelWidth="200rpx" prop="card" borderBottom>
					<u-input v-model="form.card" maxlength="18" style="text-align: right;margin-right: 5rpx;"
						disabledColor="#ffffff" placeholder="自动获取" placeholder-style="color:rgba(204, 204, 204, 1)"
						border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="患者诊疗机构*" labelWidth="200rpx" prop="organ" borderBottom>
					<input v-model="form.organ" style="text-align: right;margin-right: 5rpx;" placeholder="请输入患者所在诊疗机构"
						placeholder-style="color:rgba(204, 204, 204, 1)" border="none">
					</input>
				</u-form-item>
				<u-form-item label="患者诊疗科室" labelWidth="200rpx" prop="department" borderBottom>
					<u-input v-model="form.department" style="text-align: right;margin-right: 5rpx;"
						placeholder="请输入患者诊疗科室" placeholder-style="color:rgba(204, 204, 204, 1)" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="负责医生" labelWidth="200rpx" prop="doctor_name" borderBottom>
					<u-input v-model="form.doctor_name" style="text-align: right;margin-right: 5rpx;"
						placeholder="请输入负责该手术的医生姓名" placeholder-style="color:rgba(204, 204, 204, 1)" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="联系电话*" labelWidth="200rpx" prop="phone" borderBottom>
					<u-input v-model="form.phone" style="text-align: right;margin-right: 5rpx;"
						placeholder="请输入可以随时联系的电话" placeholder-style="color:rgba(204, 204, 204, 1)" border="none"
						type="number" maxlength="11">
					</u-input>
				</u-form-item>
				<u-form-item label="验证码*" labelWidth="200rpx" prop="code" borderBottom>
					<u-input v-model="form.code" placeholder="请输入验证码"
						style="text-align: right !important;margin-right: 5rpx;" />
					<u-toast ref="uToast"></u-toast>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange">
					</u-verification-code>
					<u-button @click="getCode" :hairline="false" class="custom-style" slot="right">{{tips}}
					</u-button>
				</u-form-item>
				<u-form-item label="患者身份证照片*" labelWidth="250rpx" prop="fileList1">
					<view class="" style="width: 100%;">
						<u-upload :action="action" @afterRead="afterRead" @delete="deletePic" deletable
							:fileList="form.fileList1" name="1" :maxCount="2" multiple width="184rpx" height="184rpx">
						</u-upload>
					</view>
				</u-form-item>
			</u-form>

			<view class="photo_item">
				<view class="label">
					患者病历照片（可在术后补充）
				</view>
				<u-upload :action="action" @afterRead="afterRead" @delete="deletePic" :fileList="form.fileList2"
					deletable name="2" multiple width="184rpx" height="184rpx"></u-upload>

			</view>
			<view class="photo_item">
				<view class="label">
					患者缴费票据（可在术后补充）
					<u-icon name="question-circle" size="50rpx" color="rgba(166, 166, 166, 1)"></u-icon>
				</view>
				<u-upload :action="action" @afterRead="afterRead" @delete="deletePic" :fileList="form.fileList3"
					deletable name="3" multiple width="184rpx" height="184rpx"></u-upload>
			</view>
			<view class="photo_item">
				<view class="label">
					患者其他证明（如患者照片、早期病症病历等）
					<u-icon name="question-circle" size="50rpx" color="rgba(166, 166, 166, 1)"></u-icon>
				</view>
				<u-upload :action="action" @afterRead="afterRead" @delete="deletePic" :fileList="form.fileList4"
					deletable name="4" multiple width="184rpx" height="184rpx"></u-upload>
			</view>
			<u-action-sheet :show="showName" :actions="actionList" title="请选择患者" description=" "
				@close="showName = false" @select="sexSelect">
			</u-action-sheet>
			<view class="add_btn" @click="submit">
				提交
			</view>
		</view>

	</view>
</template>

<script>
	import url from '@api/subsidy'
	import {
		getStorage
	} from '@/utils/cookies.js'
	export default {
		data() {
			return {
				form: {
					name: '',
					sex: '',
					relation: '',
					age: '',
					organ: '',
					department: '',
					doctor_name: '',
					phone: '',
					card: '',
					code: '',
					fileList1: [],
					fileList2: [],
					fileList3: [],
					fileList4: [],
					hospital_id:0
				},
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change']
					},
					sex: {
						type: 'string',
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change']
					},
					relation: {
						type: 'string',
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change']
					},
					age: {
						type: 'number',
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change']
					},
					card: [{
						type: 'string',
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change']
					}, {
						validator: (rule, value, callback) => {
							return uni.$u.test.idCard(value);
						},
						message: '身份证号码不正确',
						trigger: ['blur'],
					}],
					organ: {
						type: 'string',
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change']
					},
					phone: [{
							required: true,
							message: '此为必填字段',
							trigger: ['blur', 'change'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['blur'],
						},
					],
					code: {
						type: 'string',
						required: true,
						message: '此为必填字段',
						trigger: ['blur', 'change']
					},
					fileList1: {
						required: true,
						message: '此为必填字段'
					},
				},
				show: false,
				showName: false,
				action: 'http://service-white-gragon.ascetic.top/api/upload_img',
				actionList: [{
						name: 'AAA',
					},
					{
						name: 'BBB',
					},
					{
						name: '保密',
					},
				],
				tips: '',
				seconds: 60
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			this.getPatientList()
			this.hospital_id=option.hospital_id
			this.form.organ=option.hospital_name
			console.log(option)
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`form[fileList${event.name}]`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this['form'][`fileList${event.name}`].length
				lists.map((item) => {
					this['form'][`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].thumb)
					let item = this['form'][`fileList${event.name}`][fileListLen]
					this['form'][`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://service-white-gragon.ascetic.top/api/upload_img', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						header: {
							Authorized: getStorage()
						},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data).data.url)
							}, 1000)
						}
					});
				})
			},
			getPatientList() {
				this.$axios({
					url: url.patient
				}).then((res) => {
					if (res.code == 1) {
						this.actionList = res.data.arr
					}
				})
			},
			go() {
				this.show = false
				let data = {
					patient_id: this.form.id,
					gender: this.form.gender,
					age: this.form.age,
					idnumber: this.form.card,
					organization: this.form.organ,
					section: this.form.organ,
					doctor: this.form.doctor_name,
					mobile: this.form.phone,
					idcard_img: this.form.fileList1[0].url,
					code: this.form.code,
					hospital_id:this.hospital_id
				}
				if (this.form.fileList2.length) {
					data.case_img = this.form.fileList2
				}
				if (this.form.fileList3.length) {
					data.payment_img = this.form.fileList3
				}
				if (this.form.fileList4.length) {
					data.other_img = this.form.fileList4
				}
				this.$axios({
					url: url.subsidy_post,
					data: data,
					method: 'POST'
				}).then(res => {
					if (res.code == 1) {
						uni.$u.toast('提交成功'),
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/d_and_t-subsidy/subsidy_progress'
								})
							}, 1e3)
					}
				})
			},
			cancel() {
				this.show = false
			},
			submit() {
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
					if (!this.form.fileList1.length) {
						uni.$u.toast('请上传身份证照片')
						return
					}
					this.show = true

				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
				})
			},
			sexSelect(e) {
				this.form.id = e.id
				this.form.name = e.name
				this.form.sex = e.gender_type
				this.form.gender = e.gender
				this.form.relation = e.relation_type
				this.form.age = e.age
				this.form.card = e.idnumber
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			back() {
				uni.navigateBack({})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (!this.$u.test.mobile(this.form.phone)) {
					uni.showToast({
						title: '手机号不正确!',
						icon: "error",
						duration: 1500
					})
					return
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$axios({
						url: url.send_code,
						data: {
							mobile: this.form.phone
						}
					}).then((res) => {
						if (res.code == 1) {
							uni.hideLoading();
							this.$u.toast('验证码已发送' + res.msg);
						}
					})

					this.$refs.uCode.start();
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-button--info {
		border: 0 !important;
		background: transparent !important;
		color: rgba(48, 153, 116, 1);
		font-size: 30rpx;
	}

	/deep/ .u-border {
		border: 0;

		.u-input__content__field {
			text-align: right !important;
		}
	}

	/deep/ .u-navbar__content__title {
		font-weight: bold;
		color: rgba(80, 80, 80, 1);
		font-size: 34rpx;
	}

	/deep/ .form .u-hairline-border:after {
		border: 0 !important;
	}

	/deep/ .form .u-size-default {
		background: transparent !important;
		color: #41AE37 !important;
		font-size: 24rpx !important;
	}

	/deep/ .u-button {
		height: auto !important;
	}

	/deep/ .u-border {
		padding: 0 !important;
	}

	.add_btn {
		width: 100%;
		display: flex;
		left: 0;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		bottom: -1px;
		position: fixed;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(48, 153, 116, 1);
		font-size: 34rpx;
		text-align: center;
		font-weight: bold;
	}

	/deep/ .u-form-item:last-child {
		.u-form-item__body {
			flex-direction: column !important;
			height: auto;
		}
	}

	/deep/ .u-upload {
		margin-top: 20rpx;
	}

	.photo_item {
		width: 100%;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid rgba(229, 229, 229, 1);
		;

		.label {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			color: rgba(80, 80, 80, 1);
			font-size: 30rpx;
		}
	}

	.rect {
		padding-top: 28rpx;
		text-align: center;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(80, 80, 80, 1);
	}

	.content {
		padding-top: 14rpx;
		margin: 0 48rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(80, 80, 80, 1);
	}

	.driver_line {
		height: 1rpx;
		background-color: rgba(221, 221, 221, 1);
		margin: 16rpx 22rpx 0 22rpx;
	}

	.bttn_group {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.btn {
			width: 50%;
			height: 74rpx;
			margin-top: 2rpx;
			border-radius: 8rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;

			&:first-child {
				border-right: 1rpx solid rgba(221, 221, 221, 1);
			}
		}

		.btn_confirm {
			color: rgba(67, 207, 124, 1);
		}

		.btn_cancel {
			color: #333333;
		}
	}

	/deep/ .u-form-item__body__right__content__slot {
		justify-content: end;
	}

	/deep/ .u-form-item__body__right__message {
		text-align: right;
	}

	/deep/ .u-input__content__field {
		text-align: right;
		display: block !important;
	}
</style>
