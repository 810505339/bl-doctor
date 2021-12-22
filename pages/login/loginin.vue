<template>
  <view class="login">
    <view class="loginin">
      <view class="pass_context">密码登录</view>
      <setPassword :password.sync="password" :mobile.sync="mobile" text="请输入手机号" passwordText="请输入密码"></setPassword>
      <view class="log">
        <button @click="login">登录</button>
        <view @click="goForget">忘记密码？</view>
      </view>
      <agreeDetail class="agree"></agreeDetail>
    </view>
  </view>
</template>

<script>
import setPassword from './password.vue'
import agreeDetail from './agreeDetail.vue'
import {setStorage, getStorage} from '@/utils/cookies'
import tims from '@/commen/tim/tim.js'
export default {
  components: {
    setPassword,
    agreeDetail
  },
  data() {
    return {
      password: '',
      mobile: ''
    }
  },
  methods: {
    async login() {
      const res = await this.$axios({
        method: 'post',
        url: '/api/users/login',
        data: {
          password: this.password,
          mobile: this.mobile,
          identity: 'member'
        }
      })
      if(res.code !== 1) {
        uni.showToast({
          title: res.data.error
        })
        return
      }
      setStorage(res.data.token)
      uni.redirectTo({
        url: '/pages/doctor/index'
      })
	  this.im()
	  this.chatLogin()
    },
    goForget() {
      uni.navigateTo({
        url: '/pages/login/forgetPassword'
      })
    },
	async im(){
		//getStorage() || 
		// uni.request({
		//   url: "http://xw7sg3.natappfree.cc/api/im/register",
		//   method: 'post',
		//   header: {
		//     Authorized: getStorage() || '94f93ed4-2dbf-4ffd-bccb-13b3257f9881' 
		//   },
		//   success: (res) => {
		//    console.log(res)
		//   },
		//   fail: (err) => {
		//     console.log(err)
		//   }
		// })
		const res = await this.$axios({
		  method: 'post',
		  url: '/api/im/register'
		})
		console.log(res)
	},
	chatLogin(){
		let userSig = tims.genTestUserSig(this.mobile).userSig
		let userInfo = {
			user: this.mobile,
			userId: this.mobile,
			img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2262632647,543198910&fm=26&gp=0.jpg',
			userSig:userSig
		}
		// let userInfo = {
		// 	user: 'lxsm',
		// 		userId: 'lxsm',
		// 		img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1779444511,689185070&fm=26&gp=0.jpg',
		// 		userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwjkVxblQ8eKU7MSCgswUJStDEwMDMwNjE3NLiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzM7YwMDc3NzKBmpKZDjQ2OcrZqzyzPNIzNafUzMDC3ynbxMTVIiQostzDJUbf3zUgPDnQ2DXSxyi93NVWqRYAIUswwg__'
			
		// }
		// if(this.mobile == "18972972370"){
		// 	userInfo = {
		// 		user: 'lxsm',
		// 			userId: 'lxsm',
		// 			img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1779444511,689185070&fm=26&gp=0.jpg',
		// 			userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwjkVxblQ8eKU7MSCgswUJStDEwMDMwNjE3NLiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzM7YwMDc3NzKBmpKZDjQ2OcrZqzyzPNIzNafUzMDC3ynbxMTVIiQostzDJUbf3zUgPDnQ2DXSxyi93NVWqRYAIUswwg__'
				
		// 	}
		// }else{
		// 	userInfo = {
		// 		user: 'lxsm2',
		// 			userId: 'lxsm2',
		// 			img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1779444511,689185070&fm=26&gp=0.jpg',
		// 			userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwjkVxblGUInilOzEgoLMFCUrQxMDAzMDYxNzS4hMakVBZlEqUNzU1NTIwMAAIlqSmQsSMzO2MDC3MLEwg5qSmQ4019cyKsmjNKDAq8w0P8c8wsXcuLzKuzIozM010dDIxCnQN7Cw0CnUOcrVM9tWqRYAGnEw8A__'
		// 		}
		// }
		
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
  },
  onLoad(){
	  
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background: #fff !important;
}
.loginin{
  width: 750rpx;
  background: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
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
    view{
      color: #505050;
      float: right;
      margin-top: 20rpx;
    }
  }
  .agree{
    width: 670rpx;
    margin: 0 40rpx;
    position: relative;
    top: 260rpx;
    left: 10rpx;
  }
}
</style>