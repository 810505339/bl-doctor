<template>
  <div>
    <!-- <div class="header">
      <img class="mine" @click="changePhoto" :src="photo?photo:defaultPhoto" alt />
    </div>-->
    <!-- <p class="phone">{{phoneNumber}}</p> -->
    <ul class="card-wrap">
      <li class="item border-bottom">
        <div class="label-item">
          <span class="item-label">当前版本</span>
          <!-- <span class="item-conten">{{version}}</span> -->
        </div>
        <div class="label-jump">
          <span class="item-label">{{version}}</span>
          <!-- <img src="/static/mine/right.svg" width="22rpx" alt /> -->
        </div>
      </li>
      <li class="item">
        <div class="label-item">
          <span class="item-label">新版更新</span>
        </div>
        <div class="label-jump">
          <span class="item-label">暂无更新</span>
          <!-- <img src="/static/mine/right.svg" width="22rpx" alt /> -->
        </div>
      </li>
    </ul>

    <ul class="card-wrap">
      <li class="item border-bottom" @click="jumpUrl('/pages/funeral-mine/privacyAgreement')">
        <div class="label-item">
          <span class="item-label">隐私协议</span>
        </div>
        <div class="label-jump">
          <img src="/static/mine/right.svg" width="22rpx" alt />
        </div>
      </li>
      <li class="item border-bottom" @click="jumpUrl('/pages/funeral-mine/userAgreement')">
        <div class="label-item">
          <span class="item-label">用户协议</span>
        </div>
        <div class="label-jump">
          <img src="/static/mine/right.svg" width="22rpx" alt />
        </div>
      </li>
      <li class="item border-bottom" @click="jumpUrl('/pages/funeral-mine/feedback')">
        <div class="label-item">
          <span class="item-label">意见反馈</span>
        </div>
        <div class="label-jump">
          <img src="/static/mine/right.svg" width="22rpx" alt />
        </div>
      </li>
      <li class="item border-bottom" @click="jumpUrl('/pages/funeral-mine/complaints')">
        <div class="label-item">
          <span class="item-label">投诉</span>
        </div>
        <div class="label-jump">
          <img src="/static/mine/right.svg" width="22rpx" alt />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version:'V1.1.1',
      photo:'',
      phoneNumber: '+86 133****3333',
      name:'王昭君',
      cache:'22.2MB'
    }
  },
  methods: {
    changePhoto(){
      uni.chooseImage({
        count:1,
        sizeType:['original','compressed'],
        sourceType:['album','camera'],
        success:(res)=>{
          // console.log('res=', res)
          // 把头像塞进来
          // 路径应该是这个
          this.photo = res.tempFilePaths[0]
        }
      })
    },
    jumpUrl(url){
      console.log('url',)
      uni.navigateTo({
        url
      })       
    }
  },
}
</script>

<style lang="scss" scope>
.header {
  text-align: center;
  .mine {
    margin-top: 32rpx;
    width: 176rpx; 
    height: 176rpx;  
  }
}

.card-wrap {
	// width: 642rpx;
	min-height: 86*2rpx;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
	border-radius: 10rpx;
	font-size: 14rpx;
	// line-height: 150%@at-root;
	// text-align: center;
  margin: 16rpx 40rpx 0;
  padding: 0;

  .item {
    display: flex;
    justify-content: space-between;
    height: 86rpx;
    font-size: 28rpx;
    align-items: center;
    padding-left: 34rpx;
    .item-label {
      margin-right: 32rpx;
    }
    .label-jump {
      display: flex;
      align-items: center;
    }
    .item-conten{
      color: rgba(80, 80, 80, 1);      
    }

  }
}

.phone {
  	color: rgba(80, 80, 80, 1);
	  font-size: 28rpx;
    text-align: center;
}
.border-bottom {
    border-bottom: 2rpx solid rgba(229, 229, 229, 1);
}

.clear {
	width: 54*2rpx;
	height: 23*2rpx;
	color: rgba(212, 48, 48, 1);
	border-radius: 12*2rpx;
	font-size: 10*2rpx;
	// line-height: 150%;
	border: rgba(212, 48, 48, 1) solid 2rpx;
	text-align: center;  
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8rpx;
}
</style>