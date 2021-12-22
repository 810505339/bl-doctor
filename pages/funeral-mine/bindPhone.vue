<template>
  <div class="wrap">
    <!-- <p class="title">用户协议</p> -->
    <img class="img-photo" src="/static/logo.png" alt />
    <p class="phone">绑定手机号：{{phoneNumber}}</p>
    <button class="chang-phone" @click="jumpUrl('/pages/funeral-mine/checkPhone')">更换手机号</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber:'13333333333'
    }
  },
  methods: {
    jumpUrl(url){
      console.log('url',)
      uni.navigateTo({
        url
      })       
    }    
  },
}
</script>

<style lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
.img-photo {
	width: 270*2rpx;
	height: 145*2rpx;  
  margin-top: 44rpx;
}
.phone {
  margin-top: 70rpx;
	color: rgba(0, 0, 0, 1);
	font-size: 44rpx;  
}
}

  
.chang-phone {
  margin-top: 74*2rpx;
	width: 166*2rpx;
	height: 48*2rpx;
	// left: 97px;
	// top: 370px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(65, 171, 133, 1);
	border-radius: 10*2rpx;
	font-size: 16*2rpx;
	// line-height: 150%;
	// text-align: center;
	font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}  

</style>