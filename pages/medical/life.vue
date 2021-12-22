<template>
  <view>
    <view class="search">
      <u-search placeholder="搜关键词及相关文章" :showAction="false" @search="search"/>
    </view>
    <view>
      <u-list
          @scrolltolower="scrolltolower"

      >
        <u-list-item
            v-for="(life, index) in lifeList"
            :key="index"

        >
          <view class="life-item-wrap"  @click="toUrl(life)">

            <view class="life-item">
              <view class="img"><u--image :src="life.thumb_url"   width="98vw"   /></view>
              <view class="title">{{life.title}}</view>
              <view class="sub">{{life.subtitle}}</view>
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
import url from '@api/medical'
export default {
  name: "life",
  data(){
    return{
      title:'',
      page:0,
      loading:false,
      finish:false,
      lifeList:[]
    }
  },
  methods:{
    async search(title){
      this.title=title
      this.page=0;
      this.loading = false;
      this.finish = false;
      this.lifeList=[]
      await this.getLife()
    },
    async getLife(){
      this.page+=1
      this.loading = true;
      this.finish = false;
      const data = {
        title: this.title,
        page: this.page
      }
      const res= await this.$axios({url:url.life,data})
      this.lifeList = [...this.lifeList, ...res.data?.list?.data]
      this.loading = false;
      if (this.lifeList.length >= res.data?.list?.total) {
        this.finish = true
      }
    },

    scrolltolower(){
      if(!this.finish&&!this.loading)
      {
        this.getArticle()
      }
    },
    toUrl(item){
      uni.navigateTo({
        url:`/pages/medical/health-detail?id=${item.id}`
      })
    }
  },
  created(){
    this.getLife()
  }
}
</script>

<style scoped lang="scss">
/deep/.u-list{
  background: #FFFFFF;
}
.search {
  background: #FFFFFF;
  padding: 12rpx 22rpx;
}
.loading{
  font-size: 26rpx;
  text-align: center;
  line-height: 50px;
}
.life-item-wrap{
  position: relative;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  margin: 20rpx auto ;
  .img{
    position: relative;
    z-index: 10;

  }
  .title{
    font-size: 30rpx;
    color:#808080;
    position:  absolute;
    z-index: 20;
    top:40rpx;
    left: 10rpx;

  }
  .sub{
  color:#505050;
    font-size: 42rpx;
    position:  absolute;
    z-index: 20;
    top:80rpx;
    left: 10rpx;

  }
}
</style>