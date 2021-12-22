<template>
  <view class="login">
    <view class="loginin">
      <view class="pass_context">手机号一键登录</view>
      <view class="form">
        <u-input v-model="mobile" placeholder="请输入手机号">
          <u-text text="+86" slot="prefix" margin="0 3px 0 0" type="tips"></u-text>
        </u-input>
        <u-input v-model="code">
          <template slot="suffix">
            <u-code ref="uCode" @change="codeChange" seconds="60" start-text="获取验证码"></u-code>
            <text @tap="getCode" :text="tips" class="u-page__code-text">{{tips}}</text>
          </template>
        </u-input>
      </view>
      <view class="log">
        <button @click="next">登录</button>
      </view>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>


<script>
import {setStorage} from '../../utils/cookies'
import tims from '@/commen/tim/tim.js'
export default {
  data(){
    return {
      tips: '',
      mobile: '',
      code: ''
    }
  },
  methods: {
    codeChange(text) {
      this.tips = text;
    },
    async getCode() {
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
		const res = await this.$axios({
		  method: 'post',
		  url: '/api/login/code_login',
		  data: {
		    mobile: this.mobile,
		    code: this.code,
		    identity: 'member'
		  }
		})
		console.log(res)
		setStorage(res.data.token)
		uni.navigateTo({
		  url: '/pages/doctor/index'
		})
		this.im()
		this.chatLogin()
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
	}
	
  }
}
</script>

<style lang="scss" scoped>
.login{
  background: #fff;
  height: 100%;
}
.loginin{
  width: 750rpx;
  background: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-80%);
  .pass_context{
    margin: 0 40rpx;
    color: #505050;
    font-size: 72rpx;
  }
  .log{
    margin: 40rpx;
    button{
      background: #41ab85;
      border-radius: 332rpx;
      color: #fff;
    }
  }
  .form{
    margin: 40rpx 40rpx;
  }
  .send {
    position: absolute;
    right: 40rpx;
    top: 28rpx;
    transform: translateY(0);
    color: #41ab85;
  }
}
.u-page__code-text{
  color: #41ab85;
}
.u-input{
  height: 96rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
  border-radius: 52rpx;
}
::v-deep .is-input-border[data-v-abe12412] {
  border-radius: 52rpx;
}
::v-deep .is-input-border[data-v-abe12412]{
  height: 96rpx;
}
</style>