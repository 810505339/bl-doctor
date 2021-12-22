<template>
  <view>
    <cu-custom class="text-bold" :isBack="true" bgColor="#f3f4f8">
      <block slot="content">身份验证</block>
    </cu-custom>
    <view class="cerificat">
      <view class="cerificat-title">查询医院</view>
      <view class="cerificat-choose" @click="choose">
        <view class="cerificat-choose-name">{{title}}</view>
        <u-icon name="arrow-right" size="20" color="#909399"></u-icon>
      </view>
      <view class="cerificat-warn">
        <image
          class="cerificat-warn-img"
          src="@/static/examination/warn.png"
        ></image>
        <view>该医院一般在体检后的5~7个工作日生成报告</view>
      </view>
      <view class="cerificat-form">
        <view class="cerificat-form-name">姓名</view>
        <u-input placeholder="请输入体检人姓名" v-model="form.name"></u-input>
      </view>
      <view class="cerificat-form">
        <view class="cerificat-form-name">身份证</view>
        <u-input placeholder="请输入身份证号码" v-model="form.idnumber"></u-input>
      </view>
      <view class="cerificat-form">
        <view class="cerificat-form-name">手机号</view>
        <u-input placeholder="请输入体检绑定手机号" v-model="form.mobile"></u-input>
      </view>
      <view class="search" @tap="jump">查询报告</view>
    </view>
  		<u-picker
			:show="show"
			:columns="columns"
			@cancel="cancel"
			@confirm="confirm"
      keyName="title"
		></u-picker>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show:false,
      columns: [],
      title:'',
      form:{
        name:'',
        idnumber:'',
        mobile:'',
        patient_id:'',
        hospital_id:''
      }

    };
  },
  mounted() {
    const {patient_id,id,title} = this.$route.query
    this.form.patient_id = patient_id
    this.form.hospital_id = id
    this.title = title
    this.getHospitalList()
  },
  methods: {
    cancel() {
      this.show = false
    },
    confirm(e) {
      this.form.hospital_id = e.value[0].id
      this.title = e.value[0].title
      this.show = false
    },
    async getHospitalList(){
      const {data} = await this.$axios({
        url:`/api/users/physical_exam/patient2hospital?patient_id=${this.patient_id}`
      })
      this.columns = [data.list]
    },
    choose(){
      this.show = true
    },
    async jump() {
      if(!this.form.name){
        uni.showToast({
          title:'请输入姓名'
        })
        return
      }
      if(!this.form.idnumber){
        uni.showToast({
          title:'请输入省份证号'
        })
        return
      }
      if(!this.form.mobile){
        uni.showToast({
          title:'请输入手机号'
        })
        return
      }
      const {data} =  await this.$axios({
        url:`/api/users/physical_exam/report`,
        data:this.form
      })
      if(data.report.length){
        uni.setStorage({
        key: 'report',
        data: JSON.stringify(data.report),
        success: ()=> {
          uni.navigateTo({
            url: `/pages/examination/report/people-report/people-report?title=${this.title}`,
          })
        }
      })
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.cerificat {
  padding: 74rpx 50rpx 0 ;
  .popup{
    height: 300rpx;
    width: 100%;
  }
  &-title {
    color: rgba(80, 80, 80, 1);
    font-size: 34rpx;
    line-height: 51rpx;
    font-weight: bold;
  }
  &-choose {
    margin-top: 14rpx;
    width: 100%;
    height: 92rpx;
    background: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 92rpx;
    &-name {
      color: rgba(80, 80, 80, 1);
      font-size: 34rpx;
      line-height: 51rpx;
      font-weight: bold;
      margin-left: 28rpx;
    }
  }
  &-warn {
    display: flex;
    margin-top: 20rpx;
    margin-bottom: 86rpx;
    &-img {
      width: 42rpx;
      height: 42rpx;
      display: block;
    }
    &:nth-last-child(1) {
      color: rgba(80, 80, 80, 1);
      font-size: 30rpx;
      line-height: 45r;
    }
  }
  &-form {
    display: flex;
    width: 100%;
    height: 92rpx;
    align-items: center;
    background: #f0f0f0;
    border-radius: 92rpx;
    margin-bottom: 42rpx;
    ::v-deep .u-border {
      border: none;
    }
    &-name {
      color: rgba(80, 80, 80, 1);
      font-size: 34rpx;
      line-height: 51rpx;
      font-weight: bold;
      margin-left: 28rpx;
      margin-right: 32rpx;
      width: 102rpx;
    }
  }
  .search {
    margin: 84rpx auto 0;
    width: 404rpx;
    height: 92rpx;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(65, 171, 133, 1);
    border-radius: 46rpx;
    font-size: 34rpx;
    line-height: 92rpx;
    text-align: center;
    font-weight: bold;
  }
}
</style>
