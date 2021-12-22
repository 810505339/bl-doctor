<template>
  <div>
    <div class="header">
      <div class="textareaText-wrap">
        <textarea placeholder="请在此处描述您要投诉的原因" v-model="textareaText" maxlength="300" class="textarea"></textarea>
        <span class="tip">您还能输入{{numSzie}}字</span>
      </div>
    </div>
    <p class="tip-imgs">添加图片</p>
    <div class="imgs">
      <img class="img" v-for="(item,index) in imgs" :key="index" :src="item" alt />
      <div class="add-img">
        <img src="/static/mine/addImg.svg" alt />
      </div>
    </div>
    <p class="kefu">客服受理时间9:00-18:00</p>
    <button class="confirm">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // num: 300,
      textareaText:'',
      imgs:[]
    }
  },
  computed:{
    numSzie(){
      return 300 - this.textareaText.length
    }
  }
}
</script>

<style lang="scss">
  .header {
    // width: 716rpx;
    height: 260rpx;
    // left: 2rpx;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(65, 171, 133, 1);
    font-size: 28rpx;
    // line-height: 150%;
    // text-align: center;  
    position: relative;  
    .textareaText-wrap {
        height: 312rpx;
        // padding: 16rpx 36rpx;

    position: relative;  
      .tip {
        position: absolute;
        right: 36rpx;
        bottom: -60rpx;
          // color: rgba(166, 166, 166, 1);
          font-size: 20rpx;
          // line-height: 150%;
          // text-align: left;        
      }
      .textarea {
        // box-sizing: ;
        padding: 16rpx 36rpx;
        position: absolute;
        width: 636rpx;
        height: 312rpx;
        left: 50%;
        transform: translateX(-50%);
        top: 60rpx;
        // left: 21rpx;
        // top: 67rpx;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 20rpx;
        font-size: 28rpx;
        // line-height: 150%;
        // text-align: center;    
      }
    }


  }

  .tip-imgs {
    margin-top:160rpx;
    margin-bottom:16rpx;
    margin-left:42rpx;
	color: rgba(80, 80, 80, 1);
	font-size: 28rpx;
	// line-height: 150%;
	// text-align: left;    

  }
    .imgs {
      box-sizing: border-box;
      .img {
        width: 132rpx;
        height: 132rpx;          
      }
      padding: 16rpx 36rpx;
      // width: 636rpx;
      height: 164rpx;
      left: 21rpx;
      top: 264rpx;
      color: rgba(80, 80, 80, 1);
      background-color: rgba(255, 255, 255, 1);
      border-radius: 20rpx;
      font-size: 28rpx;
      margin: 0 28rpx;
      // line-height: 150%;
      // text-align: center;    
      
      .add-img {
        width: 132rpx;
        height: 132rpx;
        // left: 39rpx;
        // top: 272rpx;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(229, 229, 229, 1);
        font-size: 28rpx;
        line-height: 150%;
        text-align: center;        
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
      width: 48rpx;
      height:  48rpx;
      }
    }
 .kefu {
   text-align: center;
	color: rgba(80, 80, 80, 1);
	font-size: 28rpx;
  margin-top: 28rpx;
  margin-bottom: 24rpx;

 }
 .confirm {
	width: 656rpx;
	height: 72rpx;
	// left: 20rpx;
	// top: 393rpx;
	color: rgba(255, 255, 255, 1);
	background-color: rgba(65, 171, 133, 1);
	border-radius: 36rpx;
	font-size: 32rpx;
	// line-height: 150%;
	// text-align: center;
	font-weight: bold;   
  display: flex;
  justify-content: center;
  align-items: center;
 }
</style>