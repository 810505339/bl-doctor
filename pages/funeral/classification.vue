<template>
<view>
  <view class="btn-wrap">
    <u-button icon="plus" type="success" class="add-btn" @click="toUrl">添加</u-button>
  </view>
  <view class="list-wrap">
    <view class="header">
      <view>分类名称</view>
      <view>添加时间</view>
      <view>操作</view>
    </view>
    <view class="list" v-for="(item,index) in list" :key="item.id" :class="{active:index%2===0}">
      <view class="name">{{item.classify_name}}</view>
      <view>{{item.created_at}}</view>
      <view class="btn-group">
        <u-button class="del"@click="del(item)" >删除</u-button>
      </view>
    </view>

    <u-modal :show="show"  title="提示" content="确认删除吗？" @cancel="show=false"  :showCancelButton="true" @confirm="confirm" />
  </view>
</view>
</template>

<script>
import {url} from '@/api/funeral'
import UButton from "../../uni_modules/uview-ui/components/u-button/u-button";
export default {
  name: "classification",
  components: {UButton},
  data(){
    return{
      list:[],
      show:false
    }
  },
  methods:{
   async getApi(){
    const {data}=  await this.$axios({url:url.get_shop_classify,})
     this.list=data
     console.log(data)
    },
   async del(item){
     this.show=true;
     this.item=item
    },
   async confirm(){
      await this.$axios({url:url.del_shop_classify,method:'post',data:{classify_id:this.item.id}})
     const index=this.list.findIndex(item=>item.id===this.item.id)
     this.list.splice(index,1)
    },
    toUrl(){
      uni.navigateTo({
        url: '/pages/funeral/classification-add'
      })
    }

  },
  created(){
    this.getApi()
  }

}
</script>

<style scoped lang="scss">
.btn-wrap{
 position: absolute;
  left: 30rpx ;
  top:30rpx


}
.add-btn{

  background: #41ab85;
}
.list-wrap{
  padding: 120rpx 0 0 0;
  .header{
    display: flex;
    padding: 0 60rpx;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }
  .list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding: 20rpx ;
    margin: 0 20rpx;
    background:#FFFFFF;
    .name{
    flex-shrink: 0;
      width: 150rpx;
  }
  }
  .active{
    background: #e5e5e5;
  }
  .btn-group{
    display: flex;
    align-items: center;

    .edit{
      color:#41ab85
    }
    .del{
      color:#d43030;
    }
    button{
      width: 50px;
      font-size: 24rpx;
      height: 22px;
      margin: 0 5rpx;
    }
  }
}

</style>