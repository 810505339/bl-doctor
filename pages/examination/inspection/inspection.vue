<template>
  <view>
    <cu-custom class="text-bold" :isBack="true" bgColor='#f3f4f8'>
      <block slot="content">团检服务</block>
		</cu-custom>
    <view class="examination-physical">
      <image class="physical-img" src="/static/examination/physical.jpg"></image>
      <view class="physical-content">
        <view class="physical-content-title">请填写相关信息，我们会尽快与您联系</view>
        <view class="form">
          <u-input class="input" v-model="form.user_name" placeholder="您的姓名"></u-input>
          <u-input class="input" v-model="form.company" placeholder="您的单位名称"></u-input>
          <u-input class="input" v-model="form.company_address" placeholder="单位的详细地址"></u-input>
          <u-cell class="input border" @click="showPicker=true" :title="showHospital" arrow-direction="down" isLink ></u-cell>
          <u-input class="input" v-model="form.person " placeholder="大约多少人体检"></u-input> 
          <u-cell class="input border" :title="showDate" @click="show = true" arrow-direction="down" isLink ></u-cell>
          <u-input class="input" type="number" :maxlength="11" v-model="form.mobile" placeholder="请输入手机号"></u-input>
          <u-input class="input" v-model="form.sms_code" placeholder="请输入手机验证码">
            <template slot="suffix">
              <u-code ref="uCode" @change="codeChange" seconds="60" start-text="获取验证码"></u-code>
              <text @tap="getCode" :text="tips" class="u-page__code-text">{{tips}}</text>
            </template>
          </u-input>
        </view>
      </view>
      <view class="btn" @tap="commit">确定提交</view>
    </view>
    <u-calendar :show="show" @confirm="confirm" @close="show = flase"></u-calendar>
    <u-picker :show="showPicker" :columns="columns" @cancel="showPicker=false" @confirm="confirmDate" keyName="title"></u-picker>
  </view>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      form:{
        user_name:'',
        company:'',
        company_address:'',
        hospital_id:'',
        person:'',
        exam_time:'',
        mobile:'',
        sms_code: '',
      },
      tips:'',
      showHospital:'想去哪种类型的机构',
      showDate:'选择大约体检日期',
      show:false,
      showPicker:false,
      columns:[]
    }
  },
  onLoad () {

  },
  mounted() {
    this.getHospital()
  },
  methods: {
    confirm(time){
      this.showDate = time[0]
      this.form.exam_time = time[0]
      this.show = false
    },
    confirmDate(e){
      this.showHospital = e.value[0].title
      this.form.hospital_id = e.value[0].id
      this.showPicker = false
    },
    async getHospital(){
      const {data} = await this.$axios({
        url:'/api/users/physical_exam/mechanism'
      })
      this.columns = [data.arr.data]
    },
    codeChange(text) {
      this.tips = text;
    },
    async getCode() {
      if(!this.form.mobile){
        uni.showToast({
          title:'请输入手机号'
        })  
        return
      }
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码'
        })
        const data = await this.$axios({
          url: '/api/sms_code?mobile=' + this.form.mobile
        })
        console.log(data)
        uni.hideLoading();
        uni.$u.toast('验证码已发送');
        this.$refs.uCode.start();
      } else {
        uni.$u.toast('倒计时结束后再发送');
      }
    },
    async commit(){
      if(!this.form.user_name){
        uni.showToast({
          title:'请输入手机号'
        })
        return
      }           
      if(!this.form.hospital_id){
        uni.showToast({
          title:'请选择机构'
        })
        return
      }      
      if(!this.form.person){
        uni.showToast({
          title:'请输入多少人'
        })
        return
      }
      if(!this.form.exam_time){
        uni.showToast({
          title:'请选择体检时间'
        })
        return
      } 
      if(!this.form.company){
        uni.showToast({
          title:'请输入单位名称'
        })
        return
      }
      if(!this.form.mobile){
        uni.showToast({
          title:'请输入手机号'
        })  
        return    
      }
      if(!this.form.sms_code){
        uni.showToast({
          title:'请输入验证码'
        })   
        return       
      }
      const data = await this.$axios({
        url:'/api/users/physical_exam/team_reserve',
        method:'POST',
        data:this.form
      })
      uni.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .u-page__code-text{
  color: rgba(65, 171, 133, 1);
}
.examination-physical{
  .physical-img{
    width: 100%;
    height: 288rpx;
    display: block;
  }
  .physical-content{
    position: relative;
    top:-72rpx;
    width: 676rpx;
    height: 980rpx;
    background: #ffffff;
    border-radius: 12rpx;
    left: 35rpx;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.5);
    &-title{
      font-size: 32rpx;
      line-height: 48rpx;
      font-weight: bold;
      text-align: center;
      padding: 38rpx 0;
      color:#505050;
    }
  .form{
    .input{
      width: 590rpx;
      height: 84rpx;
      margin: 0 auto;
      margin-bottom: 20rpx;
      box-sizing: border-box;
      &.border{
        border: 1rpx solid #dadbde;
        border-radius: 8rpx;
      }
      ::v-deep .u-cell__body{
        padding: 20rpx 18rpx;
        .u-cell__title-text{
          color: rgb(192, 196, 204);
        }
      }
      &:nth-last-child(1){
        margin-bottom: 0;
      }
    }
  }

  }
  .btn{
    height: 96rpx;
    width: 100%;
    background: #41ab85;
    color:#ffffff;
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    line-height: 96rpx;
  }
}
</style>
