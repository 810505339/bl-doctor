<template>
  <view class="login">
    <view class="loginin">
      <view class="pass_context">注册新用户</view>
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
      <view class="password">
        <u-input v-model="password" password suffix-icon="lock-fill" placeholder="请输入密码" />
        <u-input v-model="confirmPassword" password suffix-icon="lock-fill" placeholder="请输入确认密码" />
      </view>
      <view class="log">
        <button @click="next">登录</button>
      </view>
      <view class="footer_agree">
        <agreeDetail></agreeDetail>
      </view>
      <u-toast ref="uToast"></u-toast>
    </view>
  </view>
</template>


<script>
import agreeDetail from './agreeDetail.vue'
export default {
  components: {
    agreeDetail
  },
  data(){
    return {
      tips: '',
      code: '',
      mobile: '',
      password: '',
      confirmPassword: ''
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
        if(this.password !== this.confirmPassword) {
          this.$refs.uToast.show({
            type: 'default',
            message: '两次密码不同',
          })
          return
        }

        try {
          await this.$axios({
            method: 'post',
            url: '/api/users/registered',
            data: {
              mobile: this.mobile,
              password: this.password,
              identity: 'doctor',
              code: this.code
            }
          })
          uni.navigateTo({
            url: '/pages/login/loginin'
          })
        } catch(e) {
          this.$refs.uToast.show({
            type: 'error',
            message: e.data.error
          })
        }
      }
  }
}
</script>

<style lang="scss" scoped>
.login{
  background: #fff;
  height: 100%;
  position: relative;
}
.loginin{
  width: 750rpx;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  .password{
    margin: 0 40rpx
  }
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
  .footer_agree{
    margin: 250rpx 40rpx 0 40rpx;
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
::v-deep .u-text__value{
  color: #606266 !important;
  font-weight: bold;
}
</style>