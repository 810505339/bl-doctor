<template>
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

</template>

<script>
import provinceData from '../../utils/province';
import cityData from '../../utils/city';
export default {
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
</style>
