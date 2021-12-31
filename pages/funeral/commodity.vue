<template>
  <view>
    <u-tabs :list="list"  :activeStyle="{color:'#41ab85'}" lineColor="#41ab85" @click="tabsChange"/>
    <tree-select :navList="treeList" :navIndex.sync="treeIndex" @vanClick="vanClick">
      <view class="commodity-wrap">
        <view class="header">
          <view class="title">{{headerText}}</view>
          <view class="num">{{dataList.length}}件商品</view>
        </view>

        <u-list
            @scrolltolower="scrolltolower"
            class="commodity-list"
        >
          <u-list-item
              v-for="(item, index) in dataList"
              :key="index"
          >
            <view class="item">
              <view class="items">
                <view class="img-wrap">
                  <u--image width="48" height="48" :border-radius="10"  :src="item.thumb_img"/>
                </view>
                <view class="context">
                  <view>{{item.shop_name}}   <view class="tag" v-if="item.is_package">套餐</view> </view>
                  <view class="sum">月销{{item.shop_monthly_sales }} 库存{{item.shop_stock}}</view>
                </view>
              </view>
              <view class="price">
                ￥{{item.shop_price}}
              </view>
              <view class="btn-wrap">
                <u-button hairline plain type="success" size="small" >价格&库存</u-button>
                <u-button hairline plain type="success" size="small">编辑</u-button>
              </view>
            </view>
          </u-list-item>
        </u-list>
      </view>
    </tree-select>

    <u-tabbar
        :fixed="false"
        :placeholder="false"
        :safeAreaInsetBottom="false"
    >
      <u-tabbar-item :text="item.text" icon="home"  v-for="item in tabList" :key="item.text" />
    </u-tabbar>

  </view>
</template>

<script>
import TreeSelect from "../medical/tree-select";
import UButton from "../../uni_modules/uview-ui/components/u-button/u-button";
import {url}  from '@api/funeral'
import {resolve} from "../../webstorm.webpack.config";


const  shopListParams={
  shop_status:'',
  shop_classify:'',
  page: 0,
  num: 10,
  sort: 1,
}
export default {
  name: "commodity",
  components: {UButton, TreeSelect},
  data() {
    return {
      list: [
        {name: '全部商品',shop_status:''},
        {name: '在售',shop_status:0},
        {name: '已售空',shop_status:1},
        {name: '已下架',shop_status:2},
      ],
      treeList: [],
      treeIndex: 0,
      tabList:[
        {text:'管理分类'},
        {text:'商品排序'},
        {text:'新建商品'},
      ],
      shopListParams:{
        shop_status:'',
        shop_classify:'',
        page: 0,
        num: 10,
        sort: 1,
      },
      dataList:[],
      headerText:'',
      tabIndex:0

    }
  },
  methods: {
    async classifyApi(){
      const {data}=  await this.$axios({url:url.classify})
      this.treeList=data.map(item=>({...item,title:item.classify_name}))
      this.headerText=this.treeList[0].classify_name
      this.shopListParams.shop_classify=this.treeList[0].id
    },
    async shopListApi(){
      return  this.$axios({url:url.shopList,method:'post',data:{
         ...this.shopListParams
        }})
    },
   async  shopListChange(){
      const {data}=await this.shopListApi()
     this.dataList=data
   },
   async vanClick(i){
    },
    async scrolltolower(){
      //todo

      this.shopListParams.page+=1;
      const {data}= await this.shopListApi()
      this.dataList=this.dataList.concat(data)
    },
   async tabsChange(e){
       this.tabIndex=e.index

    }

  },
  watch:{
   async treeIndex(newVal){
      this.shopListParams.shop_classify=this.treeList[newVal].id
      this.shopListParams.page=shopListParams.page
      this.headerText=this.treeList[newVal].classify_name
      await   this.shopListChange()
    },
    async tabIndex(newVal){
      this.shopListParams.shop_status=this.list[newVal].shop_status
      this.shopListParams.page=shopListParams.page
      await   this.shopListChange()
    }
  },
  async onLoad(){
    await this.classifyApi()
    await this.shopListChange()
  }
}
</script>

<style scoped lang="scss">
/deep/ .u-tabs__wrapper {
  background: #FFFFFF;
}
.commodity-wrap{
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:  24rpx;
    .title{
      font-size: 32rpx;
    }
    .num{
      font-size: 24rpx;
      color:#a6a6a6;
      font-weight: normal;
    }
  }
  .commodity-list{
    border-bottom: 1px #e5e5e5 solid;
    .item{
      padding: 20rpx;
      .items{
        display: flex;
        align-items: center;
      }
      .context{
        padding-left: 20rpx;
        .tag{
          display: inline-block;
          color:#FFFFFF;
          font-size: 10rpx;
          transform: scale(0.8);
          background: #ff8d1a;
          border-radius: 20rpx;
          padding:0 20rpx ;
          margin-left: 20rpx;
        }
        .sum{
          color:#a6a6a6;
          font-size: 24rpx;
          font-weight: normal;
        }
      }
      .btn-wrap{
        display: flex;
        align-items: center;

      }
      .price{
        font-size: 32rpx;
        font-weight: bold;
        padding-left:110rpx ;
        color:#ff8d1a;
      }
      .img-wrap{
        width: 96rpx;
        height: 96rpx;
        /deep/ .u-transition ,  /deep/ .u-image{
          height: 100%;
        }
      }
    }
  }
}


</style>