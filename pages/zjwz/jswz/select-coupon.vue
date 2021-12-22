<template>
  <view class="jswz">
    <view class="text title">可用</view>
    <view class="list">
      <view class="uni-list">
        <block v-for="(item, index) in listData" :key="index">
          <view class="uni-flex uni-row" >
            <view class="text" style="-webkit-flex: 1;flex: 1; border: 2px solid #B0CBE9; margin-bottom:10px;">
              <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="onClick(item, index)">
                <view class="uni-media-list">
                  <view class="uni-media-list-logo">
                    <view class="uni-input-wrapper coupon">{{item.coupon}}折</view>
                  </view>
                  <view class="uni-media-list-body">
                    <view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;width: 100%;">
                      <view class="text" style="-webkit-flex: 1;flex: 1;">
                        <span class="text">{{item.doctor}}</span>
                      </view>
                    </view>
                    <view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;width: 100%;">
                      <view class="text" style="-webkit-flex: 1;flex: 1;">
                        <span class="data-use">有效期至{{item.data}}</span>
                      </view>
                    </view>
                  </view>
                  <uni-icons :type="item.checked ? 'checkbox-filled' : 'circle'" :color="item.checked ? '#007aff' : '#aaa'" size="24" />
                </view>
              </view>
              <view class="uni-flex uni-row" style="justify-content: flex-end;margin-right: 18px;">
                <view class="uni-flex" @click="item.isShowRule = !item.isShowRule">
                  <view class="uni-input-wrapper rule">使用规则</view>
                  <u-icon name="arrow-down" color="#000" size="16"></u-icon>
                </view>
              </view>
              <view v-if="item.isShowRule" class="uni-flex uni-row" style="padding-left: 10px;">
                <span>{{item.useRule}}</span>
              </view>
            </view>
          </view>
          <!-- #ifdef APP-PLUS -->
          <view class="ad-view" v-if="(index > 0 && (index+1) % 10 == 0)">
            <ad :adpid="adpid" @error="aderror"></ad>
          </view>
          <!-- #endif -->
        </block>
      </view>
    </view>
    <view class="text title">不可用</view>
    <view class="list">
      <view class="uni-list">
        <block v-for="(item, index) in listDataUnUse" :key="index">
          <view class="uni-flex uni-row">
            <view class="text" style="-webkit-flex: 1;flex: 1; border: 1px solid gray; margin-bottom:10px;">
              <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                <view class="uni-media-list">
                  <view class="uni-media-list-logo">
                    <view class="uni-input-wrapper coupon-unuse">{{item.coupon}}折</view>
                  </view>
                  <view class="uni-media-list-body">
                    <view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;width: 100%;">
                      <view class="text" style="-webkit-flex: 1;flex: 1;">
                        <span class="text doctor-unuse">{{item.doctor}}</span>
                      </view>
                    </view>
                    <view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;width: 100%;">
                      <view class="text" style="-webkit-flex: 1;flex: 1;">
                        <span class="data-use">有效期至{{item.data}}</span>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
              <view class="uni-flex uni-row" style="justify-content: flex-end;margin-right: 18px;">
                <view class="uni-flex">
                  <view class="uni-input-wrapper rule">使用规则</view>
                  <u-icon name="arrow-down" color="#000" size="16"></u-icon>
                </view>
              </view>
            </view>
          </view>
          <!-- #ifdef APP-PLUS -->
          <view class="ad-view" v-if="(index > 0 && (index+1) % 10 == 0)">
            <ad :adpid="adpid" @error="aderror"></ad>
          </view>
          <!-- #endif -->
        </block>
      </view>
    </view>
  </view>
</template>

<script>
	import provinceData from '@/utils/province';
	import cityData from '@/utils/city';
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import expertUrl from '@/api/expertConsulation'
	
	export default {
		components: {
			uniTag,uniIcons
		},
		data() {
			return {
				user_id:null,
				index:0,
				listData: [{
					id:1,
						checked:false,
						coupon: '4.8',
						doctor: '可对部分医生使用',
						data:'2021-12-12',
						useRule:'优惠券使用规则',
						isShowRule:false
					},
					{
						id:2,
						checked:false,
						coupon: '4.8',
						doctor: '可对部分医生使用',
						data:'2021-12-12',
						useRule:'优惠券使用规则',
						isShowRule:false
					},
				],
				listDataUnUse: [{
						coupon: '4.8',
						doctor: '可对部分医生使用',
						data:'2021-12-12',
					},
					{
						coupon: '4.8',
						doctor: '可对部分医生使用',
						data:'2021-12-12',
					},
				],
			}
		},
		created() {
		  this.getCouponList()
		},
		computed:{
				  orderInfo(){
				    return this.$store.state.orderInfo 
				  }
		},
		methods:{
			// choiceCoupon: function(e) {
				
			// },
			async onClick(items, idx){
				// let _this = this
				// items.checked = !items.checked
				// const res = await this.$axios({
				// 	  method: 'post',
				// 	  url: expertUrl.sel_coupon,
				// 	  data:{
				// 		  order_sn: _this.orderInfo.order_sn,
				// 		  coupon_id:items.id
				// 	  }
				// 	})
				// console.log(res)
				uni.navigateTo({
					url: '../../zjwz/zjhz/toOrder'
				});
			},

			async getCouponList() {
			  const { data } = await this.$axios({
			    url: expertUrl.getCouponList
			    });
			  let {list} = data;
			  this.couponList = list;
			  console.log(this.couponList)
			},
		},
		onLoad(option) {
				  this.user_id = option.user_id
		}
	}
</script>

<style lang="scss" scoped>
	.jswz {		
		padding-left: 10px;
		padding-right: 10px;
		.title{
			font-weight: bold;
			padding-top: 10px;
			font-size: 18px;
		}
		
		.uni-media-list-logo{
			width: 20%;
			.coupon{
				font-size: 24px;
				color: #B0CBE9;
			}
			.coupon-unuse{
				font-size: 24px;
				color: gray;
			}
		}
		.uni-media-list-body {
			height: auto;
			
			.data-use{
				color: gray;
				padding-right: 5px;
				font-size: 12px;
			}
			
			.doctor-unuse{
				color: gray;
			}
		}
		
		.rule{
			color: gray;
			font-size: 12px;
		}
		
		.uni-list-cell::after{
			display: none;
		}
	}
</style>

