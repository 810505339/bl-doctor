<template>
  <view class="container">
    <uni-data-picker :localdata="items" :clear-icon="false" popup-title="请选择城市" @change="onnodeclick">
      <slot name="select">
        <template>
          <view class="left">
            {{(leftText +'').length > 3 ? (leftText+'').slice(0,3)+'...': leftText }}
            <image class="selectDown" src="../../static/accompany-service/selectDown.png"></image>
          </view>
        </template>
      </slot>
    </uni-data-picker>
    <view class="right">
      <uni-easyinput prefixIcon="search" :placeholder="placeholder" :style="{width:'100%',height:'100%'}" @blur="searchBlur"></uni-easyinput>
    </view>
  </view>
</template>

<script>
import provinceData from '../../utils/province';
import cityData from '../../utils/city';
export default {
  props: ["placeholder"],
  data() {
    return {
      items: [],
      leftText:'哈尔滨市'
    }
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData(){
      provinceData.forEach((item,index)=>{
        this.items.push({
          text:item.test,
          value:`${item.value}-${item.value}`,
          children:this.handleData(index,`${item.value}-${item.value}`)
        })
      })
      this.$emit('determine','230100')
    },
    handleData(parentIndex,valueData){
      let items = []
      cityData[parentIndex].forEach(item=>{
        items.push({text:item.test,value:`${valueData}-${item.value}`})
      })
      return items
    },
    onnodeclick(e){
      this.leftText = e.detail.value[1].text
      const valueList = e.detail.value[1].value.split('-')
      const value = valueList[valueList.length-1]
      this.$emit('determine',`${value}00`)
    },
    searchBlur(e) {
      this.$emit("searchBlur", e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .uni-data-tree{
  width:176rpx;
  margin-right: 32rpx;
  .input-value-border{
    border: none;
  }
}
.container {
  width: 100%;
  height: 100%;
  font-size: 0;
  display: flex;
  align-items: center;
  .left {
    display: inline-block;
    width: 184rpx;
    height: 100%;
	  line-height: 96rpx;
    vertical-align: middle;
    color: rgba(80, 80, 80, 1);
    font-size: 28rpx;
    text-align: left;
    font-weight: bold;
    .selectDown {
      width: 60rpx;
      height: 60rpx;
      vertical-align: middle;
      margin-left: 10rpx;
    }
  }
  .right {
    display: inline-block;
    width: 510rpx;
    height: 100%;
    vertical-align: middle;
  }
  .modalContainer {
	  position: fixed;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  background-color: rgba(0,0,0,0.5);
	  z-index: 99;
	  .modalContont {
		  position: absolute;
		  left: 0;
		  bottom: 0;
		  width: 100%;
		  height: 800rpx;
		  background-color: #fff;
		  border-radius: 30rpx 30rpx 0 0;
		  padding: 30rpx 0;
		  overflow-x: hidden;
		  overflow-y: auto;
		  .modalItem {
				width: 100%;
				height: 96rpx;
				line-height: 96rpx;
				border-bottom: 1px dotted black;
				text-align: center;
				color: rgba(80, 80, 80, 1);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 48rpx;
			}
	  }
  }
  ::v-deep .is-input-border{
    border-radius: 36rpx;
    overflow: hidden;
    background:rgba(243, 244, 248, 1);
  }
}
</style>
