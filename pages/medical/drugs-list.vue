<template>
  <view>
    <u-list
        @scrolltolower="scrolltolower"

    >
      <u-list-item
          v-for="(drug, index) in drugList"
          :key="index"
      >
        <u-cell isLink :title="drug.title" :label="drug.desc" @click="toUrl(drug)"/>
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
</template>

<script>
import url from "@/api/medical";

export default {
  name: "drugs-list",
  data() {
    return {
      loading: false,
      finish: false,
      page: 0,
      drugList: [],
      id: '',
      title: '',
    }
  },
  methods: {
    async getDrugList() {
      this.page = this.page + 1;
      this.loading = true;
      this.finish = false;
      const data = {
        type_id: this.id,
        title: this.title,
        page: this.page
      }
      const res = await this.$axios({url: url.drugList, data})
      this.drugList = [...this.drugList, ...res.data?.list?.data]
      this.loading = false;
      if (this.drugList.length >= res.data?.list?.total) {
        this.finish = true
      }

    },
    scrolltolower() {

      console.log(!this.finish&&!this.loading)
      if(!this.finish&&!this.loading)
      {
        this.getDrugList()
      }
    },
    toUrl(drug){
      uni.navigateTo({
        url:`/pages/medical/drugs-details?id=${drug.id}`
      })
    }
  },
  onLoad({id, title}) {
    this.id = id;
    this.title = title;
    this.getDrugList()
  }
}
</script>

<style scoped lang="scss">
/deep/.uni-scroll-view{
  background: #FFFFFF;

}
.loading{
  font-size: 26rpx;
  text-align: center;
  line-height: 50px;
}
</style>