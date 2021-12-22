<template>
  <view>
    <view class="search">
      <u-search placeholder="搜关键词及相关文章" :showAction="false" @search="search"/>
      <u-tabs :list="list"  sticky  :scrollable="list.length>=4"  lineColor="#41ab85" @click="tabClick"/>
      <u-list
          @scrolltolower="scrolltolower"

      >
        <u-list-item
            v-for="(heal, index) in healthList"
            :key="index"

        >
          <view class="heal-item-wrap"  @click="toUrl(heal)">
            <view class="heal-img">
              <u--image  :src="heal.thumb_img" width="100px" height="82px" />
            </view>
            <view class="content">
              <view class="title">{{heal.title}}</view>
              <view class="btm">
                <view class="time">{{heal.created_at}}</view>
                <view class="read">阅读{{heal.read}}</view>
              </view>
            </view>
          </view>
        </u-list-item>
        <view v-show="!loading&&finish">
          <view   class="loading" >
            暂无更多
          </view>
        </view>
        <view class="loading" v-show='loading'>
          <u-loading-icon  mode="circle" text="加载中..."/>
        </view>
      </u-list>

    </view>
  </view>
</template>

<script>
import url from "@api/medical";

export default {
  name: "health",
  data(){
    return{
      list:[],
      healthList:[],
      loading:false,
      finish:false,
      page:0,
      type_id:0,
      title:''
    }
  },
  methods:{
   async getHealth(){
     const {data}= await this.$axios({url:url.health})
    this.list=data.list.map(item=>({name:item.title,...item}))
     this.type_id=data.list[0].id
    await this.getArticle()
    },
    async getArticle(){

      this.page = this.page + 1;
      this.loading = true;
      this.finish = false;
      const data = {
        type_id: this.type_id,
        title: this.title,
        page: this.page
      }
      const res = await this.$axios({url:url.article,data})
      this.healthList = [...this.healthList, ...res.data?.list?.data]
      this.loading = false;
      if (this.healthList.length >= res.data?.list?.total) {
        this.finish = true
      }


    },
    scrolltolower(){
      if(!this.finish&&!this.loading)
      {
        this.getArticle()
      }
    },
   async tabClick({id}){
     this.type_id=id
    await this.init()
    },
   async search(title){
      this.title=title
     await this.init()

   },
    async init(){
      this.page=0
      this.healthList=[]
      this.loading=false
      this.finis=false
      await this.getArticle()
    },
    toUrl(item){

     uni.navigateTo({
       url:`/pages/medical/health-detail?id=${item.id}`
     })
    }

  },
  created(){
    this.getHealth()
  }

}
</script>

<style scoped lang="scss">
/deep/ .u-image__error{
  height: 160rpx;
}
.search {
  background: #FFFFFF;
  padding: 12rpx 22rpx;
}
.read{
  color:#505050;
  font-size: 26rpx;
}
.time{
  color:#505050;
  font-size: 26rpx;
}
.heal-item-wrap{
  display: flex;
  padding: 20rpx 0 ;
  border-bottom: 1rpx solid #dfe2e5;

  .heal-img{
    width: 100px;
    margin-right: 26rpx;
  }
  .btm{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .content{
    flex:1;
    position: relative;
    min-height: 150rpx;
    .title{
      font-size: 30rpx;
      font-weight: bold;
      color:#505050;
    }
  }
}
.loading{
  font-size: 26rpx;
  text-align: center;
  line-height: 50px;
}


</style>