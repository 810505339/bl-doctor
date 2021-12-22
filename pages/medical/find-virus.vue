<template>
  <view>
    <view class="search">
      <u-search placeholder="搜疾病名称" v-model="search" :showAction="false" @search="handleSearch"/>
    </view>
    <view>
      <tree-select :navIndex.sync="navIndex" :navList="this.navList" @vanClick="vanClick" >
        <template>
          <view   class="loading"   v-show="indexList.length<=0&&!loading&&finish">
            暂无更多
          </view>
          <u-index-list :index-list="indexList" v-show="!loading&&indexList.length>0">
            <template v-for="(item, index) in itemArr" >
              <!-- #ifdef APP-NVUE -->
              <u-index-anchor :text="indexList[index]"></u-index-anchor>
              <!-- #endif -->
              <u-index-item>
                <!-- #ifndef APP-NVUE -->
                <u-index-anchor :text="indexList[index]"></u-index-anchor>
                <!-- #endif -->

                <u-cell-group :border="false">
                  <u-cell :title="cell.title" isLink v-for="(cell) in item" :key="cell.id" @click="toDetail(cell)"/>
                </u-cell-group>
              </u-index-item>
            </template>
          </u-index-list>

          <view class="loading" v-show='loading'>
            <u-loading-icon  mode="circle"/>
          </view>
        </template>
      </tree-select>



    </view>
  </view>
</template>

<script>
import url from '@/api/medical'
import TreeSelect from "./tree-select";

export default {
  name: "find-virus",
  components: {TreeSelect},
  data() {
    return {
      search: '',
      navList: [],
      navIndex: 0,
      indexList: ["A", "B", "C"],
      itemArr: [],
      loading:false,
      finish:false,

    }
  },
  methods: {
    //获取疾病
    async getDiseaseList(id) {
      this.loading=true
      this.finish=false
      const {data} = await this.$axios({url: url.diseaseList, data: {section_id: id,title:this.search}})
      this.indexList = Object.keys(data.list)
      this.itemArr = Object.values(data.list)
      this.loading=false
      this.finish=true

      console.log(Object.values(data.list))

    },
    //获取科室
    async getSectionList() {
      const {data} = await this.$axios({url: url.sectionList,data:{title:this.search}})
      this.navList = data.list
      await this.getDiseaseList(data.list[0].id)

    },
    //点击科室
    async vanClick(i) {


    },
    //点击疾病去详情
    toDetail(item){
      uni.navigateTo({
        url:`/pages/medical/virus-detail?id=${item.id}`
      })

    },
    handleSearch(value){
      this.getSectionList()

    }
  },
  watch: {
    navIndex(newIndex) {
      const section = this.navList[newIndex]
      this.getDiseaseList(section.id)
    }
  },
  created() {
    this.getSectionList()

  }


}
</script>

<style scoped lang="scss">
.search {
  background: #FFFFFF;
  padding: 12rpx 22rpx;
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