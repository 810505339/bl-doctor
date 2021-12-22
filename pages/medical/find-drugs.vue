<template>
  <view>
    <view class="search">
      <u-search placeholder="搜药品名称" v-model="drugs" :showAction="false"
                borderColor="rgb(230, 230, 230)"
                bgColor="#fff"
                @search="search"
      />
    </view>

    <tree-select :navList="typeList" :navIndex.sync="typeIndex">
      <view >
        <view   class="loading"   v-show="cellList.length<=0&&finish&&!loading">
          暂无更多
        </view>

        <view class="loading" v-show='loading'>
          <u-loading-icon  mode="circle"/>
        </view>

        <u-cell-group :border="false" v-show="!loading&&cellList.length>0">
          <u-cell :title="cell.title" isLink v-for="cell in cellList" :key="cell.id" @click='toSecond(cell)'/>
        </u-cell-group>

      </view>
    </tree-select>
  </view>
</template>

<script>
import url from "@/api/medical";
import TreeSelect from "./tree-select";

export default {
  name: "find-drugs",
  components: {TreeSelect},
  data() {
    return {
      drugs: '',
      typeList:[],
      typeIndex:-1,
      cellList:[],
      loading:false,
      finish:false,

    }
  },
  methods:{
   async getDrugType(pid){
    const {data}= await this.$axios({url:url.drugType,data:{pid}})
    if(pid===0)
    {
      this.typeList=data.list

    }else {

      this.cellList=data.list
      console.log(this.cellList)
    }

    },
    async getDrugList({title,type_id,page}){
     const {data} =await this.$axios({url:url.drugList,data:{title,type_id,page}})
      console.log(data)
    },
    toSecond(item){
      uni.navigateTo({
        url:`/pages/medical/drugs-second?id=${item.id}`
      })
    },
    search(value){
      uni.navigateTo({
        url:`/pages/medical/drugs-list?title=${value}`
      })
    }
  },
  watch:{
    async typeIndex(nVal){
        this.loading=true
        this.finish=false
        const pid=this.typeList[nVal].id
       await this.getDrugType(pid)
      this.loading=false
      this.finish=true
    }
  },
  async created(){
   await this.getDrugType(0)
   this.typeIndex=0
  }
}
</script>

<style scoped lang="scss">
.search {
  box-sizing: content-box;
  display: flex;
  align-items: center;
  padding: 12rpx 20rpx;
}

.tree-select {
  display: flex;
  .nav {
    width: 240rpx;
    background: #f3f4f8;
    min-height: calc(100vh - 176rpx);

    .nav-item{
      padding: 11.5px 15px;
      font-size: 14px;
      text-align: center;
      box-sizing: content-box;

    }
    .active{
      background: #FFFFFF;
      font-weight: bold;
      position: relative;
      &:after{
        content: "";
        position: absolute;
        width: 3px;
        height: 24px;
        background: #41ab85;
        left: 0;
        border-radius: 5px;
      }
    }
  }

  .context {
    background: #FFFFFF;
    flex: 1;
    font-weight: bold;

  }
}
/deep/.context{
  position: relative;
}
.loading{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);

}
</style>