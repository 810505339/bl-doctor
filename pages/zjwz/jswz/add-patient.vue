<template>
  <view class="jswz">
    <view class="notice">
      <uni-notice-bar :show-close-left="true" :single="true" text="为医生更安全的诊断,请填写真实信息" style="height: 26px;" />
    </view>
    <view class="required">必填项</view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">与您的关系</view>
      <view>
        <picker @change="relationPickerChange" v-model="relationIndex" :range="relationList" range-key="name">
          <view class="uni-input uni-flex">
            <view class="uni-input picker-input">{{relationList[relationIndex].name}}</view>
            <u-icon name="arrow-right" color="#000" size="16"></u-icon>
          </view>
        </picker>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">姓名</view>
      <view class="uni-input uni-flex">
        <input class="uni-input picker-input" v-model="patientName" placeholder="请输入姓名" placeholderStyle="text-align:right" />
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">性别</view>
      <view>
        <picker @change="sexPickerChange" v-model="sexIndex" :range="sexList" range-key="name">
          <view class="uni-input uni-flex">
            <view class="uni-input picker-input">{{sexList[sexIndex].name}}</view>
            <u-icon name="arrow-right" color="#000" size="16"></u-icon>
          </view>
        </picker>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">出生日期</view>
      <view>
        <picker mode="date" name="brithday" v-model="date" :start="startDate" :end="endDate" @change="bindDateChange">
          <view class="uni-input picker-input">{{date}}</view>
        </picker>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">身份证号</view>
      <view class="uni-input uni-flex">
        <input class="uni-input picker-input" type="idcard" v-model="patientCard" placeholder="请输入身份证号" placeholderStyle="text-align:right" />
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">手机号</view>
      <view class="uni-input uni-flex">
        <input class="uni-input picker-input" type="number" v-model="patientPhone" placeholder="请输入手机号" placeholderStyle="text-align:right" />
      </view>
    </view>
    <view class="optional">选填项</view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">身高</view>
      <view class="uni-input uni-flex">
        <input class="uni-input picker-input" type="number" v-model="height" placeholder="请输入" placeholderStyle="text-align:right" />
        <view class="text">cm</view>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">体重</view>
      <view class="uni-input uni-flex">
        <input class="uni-input picker-input" type="number" v-model="weight" placeholder="请输入" placeholderStyle="text-align:right" />
        <view class="text">kg</view>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">腰围</view>
      <view class="uni-input uni-flex">
        <input class="uni-input picker-input" type="number" v-model="waistline" placeholder="请输入" placeholderStyle="text-align:right" />
        <view class="text">cm</view>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">吸烟史</view>
      <view>
        <picker @change="smokePickerChange" v-model="smokeIndex" :range="smokeList" range-key="name">
          <view class="uni-input uni-flex">
            <view class="uni-input picker-input">{{smokeText}}</view>
            <u-icon name="arrow-right" color="#000" size="16"></u-icon>
          </view>
        </picker>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">饮酒史</view>
      <view>
        <picker @change="drinkPickerChange" v-model="drinkIndex" :range="drinkList" range-key="name">
          <view class="uni-input uni-flex">
            <view class="uni-input picker-input">{{drinkText}}</view>
            <u-icon name="arrow-right" color="#000" size="16"></u-icon>
          </view>
        </picker>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">肝功能</view>
      <view>
        <picker @change="liverPickerChange" v-model="liverIndex" :range="liverList" range-key="name">
          <view class="uni-input uni-flex">
            <view class="uni-input picker-input">{{liverText}}</view>
            <u-icon name="arrow-right" color="#000" size="16"></u-icon>
          </view>
        </picker>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">肾功能</view>
      <view>
        <picker @change="kidneyPickerChange" v-model="kidneyIndex" :range="kidneyList" range-key="name">
          <view class="uni-input uni-flex">
            <view class="uni-input picker-input">{{kidneyText}}</view>
            <u-icon name="arrow-right" color="#000" size="16"></u-icon>
          </view>
        </picker>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">婚姻状况</view>
      <view>
        <picker @change="marriagePickerChange" v-model="marriageIndex" :range="marriageList" range-key="name">
          <view class="uni-input uni-flex">
            <view class="uni-input picker-input">{{marriageText}}</view>
            <u-icon name="arrow-right" color="#000" size="16"></u-icon>
          </view>
        </picker>
      </view>
    </view>
    <view class="uni-list-cell picker-list">
      <view class="uni-list-cell-left packer-label">生育状况</view>
      <view>
        <picker @change="bearPickerChange" v-model="bearIndex" :range="bearList" range-key="name">
          <view class="uni-input uni-flex">
            <view class="uni-input picker-input">{{bearText}}</view>
            <u-icon name="arrow-right" color="#000" size="16"></u-icon>
          </view>
        </picker>
      </view>
    </view>
    <view class="text save-view">
      <button class="submit-btn" @click="savePatient">保存</button>
    </view>
  </view>
</template>

<script>
	import {createNamespacedHelpers} from 'vuex'
	const { mapState } = createNamespacedHelpers('escort-service')
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import expertUrl from '@/api/expertConsulation'
	var  graceChecker = require("../../../common/graceChecker.js");
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
		computed: {
			...mapState(['routerDetail'])
		},
		data() {
			return {
				patientId:'',
				relationList: [{name:'本人'},{name: '爱人'}, {name:'父母'}, {name:'亲属'}],
				relationIndex: 0,
				patientName: '',
				sexList: [{name:'男'},{name:'女'}],
				sexIndex: 0,
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				patientCard:'',
				patientPhone:'',
				height:'',
				weight:'',
				waistline:'',
				smokeList: [{name:'有'},{name:'无'}],
				smokeIndex: -1,
				smokeText: '请选择',
				drinkList: [{name:'有'},{name:'无'}],
				drinkIndex: -1,
				drinkText: '请选择',
				liverList: [{name:'好'},{name:'坏'}],
				liverIndex: -1,
				liverText: '请选择',
				kidneyList: [{name:'好'},{name:'坏'}],
				kidneyIndex: -1,
				kidneyText: '请选择',
				marriageList: [{name:'结婚'},{name:'未婚'}],
				marriageIndex: -1,
				marriageText: '请选择',
				bearList: [{name:'好'},{name:'坏'}],
				bearIndex: -1,
				bearText: '请选择',
				opition:{},
			}
		},
		methods:{
			relationPickerChange: function(e) {
				this.relationIndex = e.detail.value
			},
			sexPickerChange: function(e) {
				this.sexIndex = e.detail.value
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			smokePickerChange: function(e) {
				this.smokeIndex = e.detail.value
				this.smokeText = this.smokeList[e.detail.value].name
			},
			drinkPickerChange: function(e) {
				this.drinkIndex = e.detail.value
				this.drinkText = this.drinkList[e.detail.value].name
			},
			liverPickerChange: function(e) {
				this.liverIndex = e.detail.value
				this.liverText = this.liverList[e.detail.value].name
			},
			kidneyPickerChange: function(e) {
				this.kidneyIndex = e.detail.value
				this.kidneyText = this.kidneyList[e.detail.value].name
			},
			marriagePickerChange: function(e) {
				this.marriageIndex = e.detail.value
				this.marriageText = this.marriageList[e.detail.value].name
			},
			bearPickerChange: function(e) {
				this.bearIndex = e.detail.value
				this.bearText = this.bearList[e.detail.value].name
			},
			verifyInfo: function(){
				if (!this.patientName) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return -1
				}
				
				const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;	
				
				if (!this.patientCard) {      //判断如果身份证号（this.card)num）为空，提示用户输入身份证号
					uni.showToast({
						title: '请输入身份证号',
						icon: 'none'
					})
					return -1
				}
				
				if (!reg.test(this.patientCard)) {      //判断身份证号格式时候正确
					uni.showToast({
						title: '请输入正确的身份证号',
						icon: 'none'
					})
					return -1
				}
				
				let regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/      //正则表达式定义手机号正确格式
				if (!this.patientPhone) {      //判断如果手机号（this.tele）为空，提示用户输入手机号
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return -1
				}
				
				if (!regPhone.test(this.patientPhone)) {        //判断手机号格式时候正确
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return -1
				}
				
				return 0
			},
			async addPatient() {
				if(this.verifyInfo() === -1){
					return
				}				
				const data = {
					relation: this.relationIndex+1, // 关系(1 本人 2 爱人 3 父母 4 亲属)
					name: this.patientName, // 姓名
					gender: this.sexIndex+1, // 性别(1 男 2 女)
					birth_date: this.date , // 出生日期(YYYY-mm-dd)
					idnumber: this.patientCard, // 身份证号
					mobile: this.patientPhone, // 手机号
					height: this.height===0?'':this.height,// 身高
					weight: this.weight===0?'':this.weight,// 体重
					waist: this.waistline===0?'':this.waistline,
					smoke: this.smokeIndex==-1?'':this.smokeIndex+1,
					wine: this.drinkIndex==-1?'':this.drinkIndex+1,
					liver:this.liverIndex==-1?'':this.liverIndex+1,
					kidney:this.kidneyIndex==-1?'':this.kidneyIndex+1,
					marriage:this.marriageIndex==-1?'':this.marriageIndex+1,
					bearint:this.bearIndex==-1?'':this.bearIndex+1,
				}
				try{
					const res = await this.$axios({
						method: 'post',
						url: expertUrl.addPatient,
						data: data
					})
				}catch(e){
					//TODO handle the exception
					console.log(e)
					if(e.code !== 1) { // 添加患者失败
						uni.showToast({
							title: e.msg,
							icon: 'none'
						})
						return
					}
				}
				if(Object.keys(this.routerDetail).length) {
					const key = Object.keys(this.routerDetail)[0]
					uni.navigateTo({
						url: `/pages/escort/choose-people/choose-people?${key}=${this.routerDetail[key]}`
					})
					return 
				}
				uni.navigateTo({
					url: '../../zjwz/jswz/select-patient'
				});	
				// var name = JSON.stringify(this.patientName)
				// uni.navigateTo({
				// 	url: '../../zjwz/jswz/quick-consultation?name='+name
				// });						
			},
			savePatient: function(e) {
				this.addPatient();
			}
		}
	}
	
	
</script>

<style lang="scss" scoped>
	.jswz{
		background-color: #fff;
		.required{
			color: #41ab85;
			font-weight: bold;
			padding-left: 10px;
		}
		
		.picker-list{
			height: 45px;
		}
		
		.packer-label{
			font-weight: bold;
		}
			
		.picker-input{
			font-weight: bold;
			padding: 0 10px; 
			background-color: transparent;
			text-align:right
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
