<template>
  <view>
    <cu-custom class="text-bold" :isBack="true" bgcolor="#f3f4f8">
      <block slot="content">{{title}}_体检报告</block>
    </cu-custom>
    <view class="examination-appointment">
      <view class="examination-name">体检人:{{user_name}}</view>
      <view class="examination-content">
        <block v-for="(item,index) in list" :key="index">
          <view class="examination-content-item" @tap="jump(item)">
            <view class="examination-content-item-left">
              <view class="examination-content-item-left-name">{{item.physical_exam.title}}</view>
              <view class="examination-content-item-left-time">体检时间：{{item.created_at}}</view>
            </view>
            <view :class="['examination-content-item-right',item.status === 2?'color':'']">{{item.status===2 ? '已出报告' : '未出报告'}}</view>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
export default {
    data() {
        return {
            list:[],
            user_name:''
        }
    },
    mounted() {
      console.log(this.$route.query)
      this.title = this.$route.query.title
      this.getDate()
    },
    watch:{
      list:{
        handler(){
          this.user_name = this.list[0].user_name
        },
        deep:true
      }
    },
    methods: {
      getDate(){
        uni.getStorage({
          key: 'report',
          success: (res) => {
            this.list = JSON.parse(res.data)
            console.log(this.list,999)
          }
        })
      },
      jump(item){
        uni.navigateTo({ url: `/pages/examination/report/report-detail/report-detail?id=${item.id}` });
      }
    }
};
</script>
<style lang="scss" scoped>
.examination-appointment{
  padding: 24rpx 24rpx 0;
  .examination-name{
    color: rgba(80, 80, 80, 1);
    font-size: 32rpx;
    line-height: 48rpx;
    font-weight: bold;
  }
  .examination-content{
    margin-top: 14rpx;
    &-item{
      background: #ffffff;
      display: flex;
      padding: 46rpx 26rpx;
      margin-bottom: 20rpx;
      align-items: center;
      justify-content: space-between;
      &-left{
        &-name{
          color: rgba(80, 80, 80, 1);
          font-size: 36rpx;
          line-height: 48rpx;
          font-weight: bold;
        }
        &-time{
          color: rgba(166, 166, 166, 1);
          font-size: 24rpx;
          line-height: 36rpx;
          margin-top: 10rpx;
        }
      }
      &-right{
        color: rgba(166, 166, 166, 1);
        font-size: 24rpx;
        line-height: 36rpx;
        &.color{
          color: #41ab85;
        }
      }
    }
  }
}
  
</style>
