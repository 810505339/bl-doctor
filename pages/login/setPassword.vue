<template>
  <view class="loginin">
    <view class="set_password">
      <view class="pass_context">设置新密码</view>
      <view class="password">
        <u-input v-model="password" password suffix-icon="lock-fill" placeholder="请输入密码" />
        <u-input v-model="confirmPassword" password suffix-icon="lock-fill" placeholder="请输入确认密码" />
      </view>
      <view class="log">
        <button @click="login">确认</button>
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
  data() {
    return {
      password: '',
      confirmPassword: '',
      query: {}
    }
  },
  mounted() {
    this.query = this.$route.query
  },
  methods: {
    async login() {
      try{
        await this.$axios({
          method: 'post',
          url: '/api/login/forget_password',
          data: {
            password: this.password,
            confirmPassword: this.confirmPassword,
            identity: 'doctor',
            ...this.query
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
page {
  background-color: #FFFFFF;
  height: 100%;
}
.loginin{
  width: 750rpx;
  background: #fff;
  .set_password{
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
    .agree{
      margin: 0 40rpx;
      position: relative;
      top: 260rpx;
      left: 10rpx;
    }
  }
}
.password{
  margin: 0 40rpx
}
.u-input{
  height: 96rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
  border-radius: 52rpx;
}
</style>