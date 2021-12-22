<template>
  <div class="wrap">
    <div class="tip">
      更换手机号后，下次登录可使用新手机号登录。当前
      手机号：13766815730
    </div>
    <div class="input-phone">
      <div class="phone-tip">
        <p class="p-86">+ 86</p>
        <p class="china">中国大陆</p>
      </div>
      <input placeholder="你本人的手机号" class="input" type="text" />
    </div>
    <!-- 获取验证码 -->
    <button class="code-button">获取验证码</button>

    <div class="addTell-wrap">
      <input type="text" v-model="input1" class="addTell" maxlength="1" @keyup="changeInput($event,1)" />
      <input type="text" v-model="input2" class="addTell" maxlength="1" @keyup="changeInput($event,2)" />
      <input type="text" v-model="input3" class="addTell" maxlength="1" @keyup="changeInput($event,3)" />
      <input type="text" v-model="input4" class="addTell" maxlength="1" @keyup="changeInput($event,4)" />
    </div>

    <p>请输入验证码</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1:'',
      input2:'',
      input3:'',
      input4:'',
    }
  },
  methods: {
    changeInput(e,num){
      console.log('sss',e,num)
      // input1=input1.replace(/[^0-9-]+/,'');
      this['input'+num] = this['input'+num] .replace(/[^0-9-]+/,'');

    }
  },
}
</script>

<style lang="scss">
  .wrap {
    padding-top: 30rpx;
    // text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
	// width: 322*2rpx;
	// height: 42*2rpx;
	color: rgba(80, 80, 80, 1);
	font-size: 14*2rpx;
	// line-height: 150%;
	text-align: left;
  .tip {
    text-align: left;
    padding: 0 38rpx;
  }
  .input-phone {
    display: flex;
    align-items: center;
    margin-top: 60rpx;
    .phone-tip{
      .p-86 {
          // width: 34px;
          // height: 24px;
          // left: 39px;
          // top: 144px;
          color: rgba(0, 0, 0, 1);
          font-size: 32rpx;
          // line-height: 150%;
          text-align: left;        
      }
      .china {
        color: rgba(0, 0, 0, 1);
        font-size: 16rpx;        
      }
    }
    .input{
      border: none;
      border-bottom: 2rpx solid rgba(229, 229, 229, 1);
      margin-left: 40rpx;
    }
  }

  .code-button {
    margin-top: 60rpx;
    width: 166*2rpx;
    height: 48*2rpx;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(65, 171, 133, 1);
    border-radius: 20rpx;
    font-size: 32rpx;
    // line-height: 150%;
    text-align: center;
    font-weight: bold;   
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  .addTell-wrap {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 0 56rpx 0 80rpx;
    justify-content: space-between;
    margin-top: 68rpx;
    margin-bottom: 30rpx;

  .addTell {
    width: 88rpx;
    height: 88rpx;
    background-color: rgba(229, 229, 229, 1);    
    padding: 31rpx;
    box-sizing: border-box;
    font-size: 40rpx;    
  }
  }

}
</style>