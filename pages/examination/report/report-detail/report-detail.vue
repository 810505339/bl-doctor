<template>
  <view>
    <cu-custom class="text-bold" :isBack="true" bgColor="#f3f4f8">
      <block slot="content">体检报告详情</block>
    </cu-custom>
    <view class="examination-detail">
      <block v-for="(item,index) in imgList" :key="index">
        <image mode="widthFix" :src="item" @tap="previewImage(index)"></image>
      </block>
    </view>
</view>

</template>

<script>
export default {
    data() {
        return {
            imgList:[],
            id:''//体检记录id
        }
    },
    mounted() {
      this.id = this.$route.query.id
      this.getData()
    },
    components: {
        
    },
    methods: {
      async getData(){
        const {data} =  await this.$axios({
          url:`/api/users/physical_exam/detail?id=${this.id}`
        })
        this.imgList = data.data.images
      },
      previewImage(index){
        uni.previewImage({
          current:index,
          urls:this.imgList,
          loop:true,
          longPressActions:{
            itemList: ['发送给朋友', '保存图片', '收藏'],
            success: function(data) {
                console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
            },
            fail: function(err) {
                console.log(err.errMsg);
            }
            }
        })
      }
    }
};
</script>
<style lang="scss" scoped>
  .examination-detail{
    padding: 28rpx 26rpx 0;
    image{
      margin-bottom: 18rpx;
      width: 100%;
      display: block;
    }
  }
</style>
