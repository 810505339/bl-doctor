<template>
  <view>
    <view class="header-wrap">
        <view class="header">
          <view class="title">{{title}}</view>
          <view class="sub">所属科室:{{sub}}</view>
        </view>
    </view>
    <view class="tabs">
      <u-tabs :list="tabs" sticky :scrollable="tabs.length>3" lineColor="#41ab85" @click="tabClick"/>
      <view v-for="(item,i) in disease":key="item.id" class="content-wrap" v-show="i===tabIndex">
        <u-parse :content="item.content"  />
      </view>
    </view>
  </view>
</template>

<script>
import url from '@/api/medical'



export default {
  name: "virus-detail",
  data(){
    return{
      disease:[],
      tabIndex:0,
      title:'',
      sub:''

    }
  },
  methods: {
    async getDiseaseDetail(id) {
      const {data} = await this.$axios({url: url.diseaseDetail, data: {id}})
      this.disease=data?.data?.disease
      this.title=data?.data?.title
      this.sub=data?.data?.parent?.title
    },
    //点击tab
    tabClick({index}){
    this.tabIndex=index
    }
  },
  async onLoad({id}) {
    await  this.getDiseaseDetail(id)

  },
  computed:{
    tabs(){
     return  this.disease.map(item=>({name:item.title}))
    }
  }

}
</script>

<style scoped lang="scss">
.header-wrap{

  background: #FFFFFF;
  padding: 0 32rpx;

  .header{
    border-bottom: 1px solid #e5e5e5;
    padding:  32rpx 0;
  }
  .title{
    font-size: 34rpx;
    color:#505050;
    font-weight: bold;
  }
  .sub{
    margin-top: 5rpx;
    font-size: 26rpx;
    color:#a6a6a6;
  }
}
.tabs{
  background: #FFFFFF;
}
.content-wrap{
  padding:  32rpx;
}

</style>