<template>
  <view class="wrap">
    <u-cell-group :border="false" v-show="!loading&&typeList.length>0" class="cell-wrap">
      <u-cell  isLink  :title="item.title"  v-for="item in typeList" :key="item.id"  @click="toUrl(item)"/>
    </u-cell-group>
    <view v-show="typeList.length<=0&&!loading&&finish">
      <view   class="loading" >
        暂无更多
      </view>
    </view>

    <view class="loading" v-show='loading'>
      <u-loading-icon  mode="circle"/>
    </view>
  </view>
</template>

<script>
import url from "@/api/medical";

export default {
  name: "drugs-second",
  data(){
    return{
      typeList:[],
      loading:false,
      finish:false
    }
  },
  methods:{
    async getDrugType(pid){
      this.loading=true
      this.finish=false
      const {data}= await this.$axios({url:url.drugType,data:{pid}})
      this.typeList=data.list
      this.loading=false
      this.finish=true


    },
    toUrl(item){
      uni.navigateTo({
        url:`/pages/medical/drugs-tertiary?id=${item.id}`
      })
    }
  },
  onLoad({id}){
    this.getDrugType(id)

  }
}
</script>

<style scoped lang="scss">
.cell-wrap{
  background: #FFFFFF;
}

.wrap{
  min-height: calc(100vh - 44px);

  position: relative;
}
.loading{
  position: absolute;
  top:40%;
  left: 50%;
  transform: translate(-50%,-50%);

}

</style>