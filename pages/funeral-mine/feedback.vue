<template>
  <div>
    <p class="title">请选择反馈问题的类型</p>
    <div class="flex-wrap">
      <div class="item" v-for="item in backArr" :key="item.value">{{item.text}}</div>
    </div>
    <p class="title2">请描述问题或建议</p>
    <textarea class="textarea" placeholder="请描述您在使用过程遇到的问题或解决建议，我们将认真查阅，会对您进行及时的反馈"></textarea>
    <p class="title2">请上传图片（选填）</p>
    <div class="upload-img-wrap">
      <div class="imgs" v-if="uploadImgArr.length > 0">
        <img width="80" class="margin-r-24" v-for="(item,index) in uploadImgArr" :key="index" :src="item" alt />
      </div>
      <div class="flex-add">
        <img width="32" src="/static/mine/addImg.svg" alt />
      </div>
    </div>
    <div class="footer">提交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backArr:[{
        value:1,
        text:'功能异常'
      },{
        value:2,
        text:'使用体验'
      },{
        value:3,
        text:'其他问题'        
      }],
      uploadImgArr:[]
    }
  },
}
</script>


<style lang="scss">
.title,.title2 {
	// width: 140*2rpx;
	// height: 21px;
	// left: 12px;
	// top: 82px;
	color: rgba(80, 80, 80, 1);
	font-size: 14*2rpx;
	line-height: 150%;
	text-align: left;
	font-weight: bold;  
  margin-top: 30rpx;
  margin-left: 24rpx;
}
.title2 {
  margin-top: 34rpx;
}

.flex-wrap{
  display: flex;
  margin-left: 24rpx;
  margin-top: 28rpx;
}
.item {
  margin-right: 20rpx;
	width: 84*2rpx;
	height: 32*2rpx;
	// left: 12*2rpx;
	// top: 117*2rpx;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
	border-radius: 32rpx;
	font-size: 28rpx;
	// line-height: 150%;
	border: rgba(229, 229, 229, 1) solid 1rpx;
	text-align: center;  
  display: flex;
  justify-content: center;
  align-items: center;
}

.textarea {
  margin-top:16rpx;
  box-sizing: border-box;  
	width: 100%;
	height: 182*2rpx;
  padding: 30rpx 13rpx;
	// top: 195px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
	font-size: 24rpx;
	line-height: 150%;
	// text-align: center;  
}
.flex-add {
	width: 160rpx;
	height: 160rpx;
	// left: 104px;
	// top: 427px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);  
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-img-wrap {
  margin-top: 24rpx;
  padding-left: 24rpx;
  display: flex;
  // flex-direction: row;
  .imgs {
    // display: flex; 
  }
}
.margin-r-24 {
  margin-right: 24rpx;
}

.footer {
  position: fixed;
  bottom: 0;
	width: 100%;
	height: 48*2rpx;
	// top: 692px;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(65, 171, 133, 1);
	font-size: 32rpx;
	// line-height: 150%;
	text-align: center;
	font-weight: bold;  
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>