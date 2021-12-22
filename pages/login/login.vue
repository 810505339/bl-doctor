<template>
  <view class="login">
    <view class="wel">登录</view>
    <view class="doc">感谢您加入白龙医疗</view>
    <view class="form">
      <u-input v-model="mobile" type="number" maxlength="11" placeholder="请输入手机号"></u-input>
      <u-input v-model="password" placeholder="请输入密码" v-if="!passwordLogin"></u-input>
      <u-input v-model="code" placeholder="请输入验证码" v-else>
        <template slot="suffix">
          <u-code ref="uCode" @change="codeChange" seconds="60" start-text="获取验证码"></u-code>
          <text @tap="getCode" :text="tips" class="u-page__code-text">{{tips}}</text>
        </template>
      </u-input>
    </view>
    <agreeDetail></agreeDetail>
    <view class="log" @click="next">登录</view>
    <view class="use-password" @click="usePasswordLogin('password')" v-if="passwordLogin">使用密码登录</view>
    <view class="use-code" v-else>
      <view @click="usePasswordLogin('code')">使用验证码登录</view>
      <view @click="forgetPassword">忘记密码？</view>
    </view>
    <view class="regisword" @click="register">注册新账号</view>
  </view>
</template>

<script>
import agreeDetail from './agreeDetail.vue'
import tims from '@/commen/tim/tim.js'
export default {
  components: {
    agreeDetail
  },
  data(){
    return {
      tips: '',
      mobile: '',
      code: '',
      password:'',
      passwordLogin:true
    }
  },
  methods: {
    usePasswordLogin(data){
      if(data === 'password'){
        this.passwordLogin = false
      }else{
        this.passwordLogin = true
      }
    },
    codeChange(text) {
      this.tips = text;
    },
    async getCode() {
      if(!this.mobile.trim()) {
        uni.$u.toast('请输入手机号');
        return
      } 
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码'
        })
        await this.$axios({
          url: '/api/sms_code?mobile=' + this.mobile
        })
        uni.hideLoading();
        uni.$u.toast('验证码已发送');
        this.$refs.uCode.start();
      } else {
        uni.$u.toast('倒计时结束后再发送');
      }
    },
    async next() {
      let params = null
      if(this.passwordLogin){
        params = {
          method: 'post',
          url: '/api/login/code_login',
          data: {
            mobile: this.mobile,
            code: this.code,
            identity: 'doctor'
          }
        }
      }else{
        params = {
          method: 'post',
          url: '/api/login',
          data: {
            mobile: this.mobile,
            password: this.password,
            identity: 'doctor'
          }
        }
      }
      const res = await this.$axios(params)
      uni.setStorageSync('token', res.data.token)
      uni.navigateTo({
        url: '/pages/doctor/index'
      })
		  // this.im()
		  // this.chatLogin()
    },
    async im(){
      const res = await this.$axios({
        method: 'post',
        url: '/api/im/register'
      })
    },
    chatLogin(){
      let userSig = tims.genTestUserSig(this.mobile).userSig
      let userInfo = {
        user: this.mobile,
        userId: this.mobile,
        img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg',
        userSig:userSig
      }
      let promise = this.tim.login({
        userID: userInfo.userId,
        userSig: userInfo.userSig
      });
      promise.then((res) => {
        //登录成功后 更新登录状态
        this.$store.commit("toggleIsLogin", true);
        //自己平台的用户基础信息
        uni.setStorageSync('userInfo', JSON.stringify(userInfo))
        //tim 返回的用户信息
        uni.setStorageSync('userTIMInfo', JSON.stringify(res.data))
        // uni.reLaunch({
        // 	url: '../tim/record'
        // })
      }).catch((err) => {
        console.warn('login error:', err); // 登录失败的相关信息
      });
    },
    register() {
      uni.navigateTo({ // 新用户注册
        url: '/pages/login/register'
      })
    },
    forgetPassword() {
      uni.navigateTo({
        url: '/pages/login/forgetPassword'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  padding: 260rpx 30rpx 0;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  position: relative;
  .wel{
    color: rgba(80, 80, 80, 1);
    font-size: 50rpx;
    line-height: 114rpx;
    font-weight: bold;
  }
  .doc{
    font-size: 34rpx;
    line-height: 75rpx;
    color: rgba(80, 80, 80, 1);
	  font-weight: bold;
  }
  .form{
    margin-top: 52rpx;
      ::v-deep .u-border{
        border: 1px solid rgba(229, 229, 229, 1);
        border-radius: 52rpx;
        height: 100rpx;
        margin-bottom: 32rpx;
        box-sizing: border-box;
        .u-page__code-text{
          color: rgba(65, 171, 133, 1);
          font-size: 30rpx;
          font-weight: bold;
          margin-right: 6rpx;
        }
        .uni-input-placeholder{
          left: 26rpx;
        }
        .uni-input-input{
          margin-left: 26rpx;
        }
      }
  }
  .log{
    color: rgba(255, 255, 255, 1);
    background-color: rgba(65, 171, 133, 1);
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 52rpx;
    font-size: 34rpx;
    text-align: center;
    font-weight: bold;
    margin-top: 34rpx;
  }
  .use-password{
   	color: rgba(80, 80, 80, 1);
    font-size: 30rpx;
    line-height: 84rpx;
    font-weight: bold; 
    margin-top: 50rpx;
  }
  .regisword{
    color: rgba(65, 171, 133, 1);
    font-size: 30rpx;
    line-height: 66rpx;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 296rpx;
  }
  .use-code{
    display: flex;
    justify-content: space-between;
    margin-top: 42rpx;
    &:nth-child(1){
      color: rgba(80, 80, 80, 1);
      font-size: 30rpx;
      font-weight: bold;
    }
    &:nth-child(2){
      color: rgba(80, 80, 80, 1);
      font-size: 30rpx;
    }
  }
}
</style>