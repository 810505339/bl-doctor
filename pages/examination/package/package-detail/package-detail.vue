<template>
  <view class>
    <u-navbar @leftClick="navigateBack" :title="title"></u-navbar>
    <top-nav :isShowAddress="isShowAddress" :list="navList" @sreachData="sreachData" :city_id="city_id"></top-nav>
    <uniCard :list="goodsList" @jumpCardDetail="jump"></uniCard>
  </view>
</template>

<script>
import uniCard from '../../components/uni-card/uni-card.vue'
import topNav from '../../components/top-nav/top-nav.vue'
export default {
  components: {
    uniCard,
    topNav
  },
  data(){
    return {
      goodsList:[],
      navList:[{label:'综合',value:1},{label:'销量',value:0},{label:'价格',value:0}],
      isShowAddress:false,
      city_id:'',
      title:''
    }
  },
  mounted() {
    this.city_id = this.$route.query.city_id
    this.title = this.$route.query.title
  },

  methods: {
    navigateBack(){
      uni.navigateBack({
        delta: 1
      })
    },
    async sreachData(parms){
      const {data} = await this.$axios({
        url:'/api/users/physical_exam/physical_exam_list',
        data:parms
      })
      data.list.forEach(item=>{ 
        this.goodsList.push({
          ...item,tagName:item.project.split(',')
        })
      })
    },
    jump(item){
      uni.navigateTo({
        url:`/pages/examination/detail/examination-detail?id=${item.id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
