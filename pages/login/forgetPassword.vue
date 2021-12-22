<template>
  <view class="loginin">
    <view class="forget_password">
      <view class="pass_context">忘记密码</view>
      <view class="form">
        <uni-forms ref="form">
          <uni-forms-item>
            <uni-easyinput type="number" v-model="mobile" placeholder="请输入手机号" />
          </uni-forms-item>
          <u-input v-model="code">
            <template slot="suffix">
              <u-code ref="uCode" @change="codeChange" seconds="60" start-text="获取验证码"></u-code>
              <text @tap="getCode" :text="tips" class="u-page__code-text">{{tips}}</text>
            </template>
          </u-input>
        </uni-forms>
      </view>
      <view class="log">
        <button @click="next">下一步</button>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  data(){
    return {
      mobile: '',
      code: '',
      tips: ''
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
    next() {
      uni.navigateTo({
        url: '/pages/login/setPassword?mobile=' + this.mobile + '&code=' + this.code
      })
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #FFFFFF;
  height: 100%;
}
.loginin{
  width: 750rpx;
  background: #fff;
  .forget_password{
    box-sizing: border-box;
    height: 100vh;
    background: #fff;
    padding-top: 40%;
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
}
::v-deep .is-input-border[data-v-abe12412] {
  border-radius: 52rpx;
}
::v-deep .is-input-border[data-v-abe12412]{
  height: 96rpx;
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
</style>