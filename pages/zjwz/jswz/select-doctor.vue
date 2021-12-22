<template>
	<view class="jswz">
		<view class="condition">
			<!-- <u-search inputAlign="center" height="70" :showAction="showAction" shape="round" placeholder="搜索权威专家" margin="0 10px 10px 10px"></u-search> -->
			<uni-search-bar radius="50" placeholder="搜索权威专家" @confirm="search" />
			<view class="picker">
				<uni-view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
					<uni-view class="text" style="-webkit-flex: 1;flex: 1;">
						<picker @change="provincePickerChange" :value="provinceIndex" :range="provinceList" range-key="name">
							<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
								<view v-if="provinceList[provinceIndex]">
									{{(provinceList[provinceIndex] +'').length > 3 ? (provinceList[provinceIndex]+'').slice(0,3)+'...': provinceList[provinceIndex] }}
								</view>
								<view v-else>
									北京
								</view>
								<image class="image" mode="widthFix" src="../../../static/accompany-service/selectDown.png" />
							</view>
						</picker>
					</uni-view>
					<uni-view class="text" style="-webkit-flex: 1;flex: 1;">
						<picker @change="cityPickerChange" :value="cityIndex" :range="cityList" range-key="name">
							<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
								<view v-if="cityList[cityIndex]">
									{{(cityList[cityIndex] +'').length > 3 ? (cityList[cityIndex]+'').slice(0,3)+'...': cityList[cityIndex] }}
								</view>
								<view v-else>
									北京市
								</view>
								<image class="image" mode="widthFix" src="../../../static/accompany-service/selectDown.png" />
							</view>
						</picker>
					</uni-view>
					<uni-view class="text" style="-webkit-flex: 1;flex: 1;">
						<picker mode="multiSelector" @change="bindPickerChange" @columnchange="columnchange" v-model="sectionIndex" :range="sectionArray"
							 range-key="title">
							 <view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
								<view>{{(sectionTitle +'').length > 3 ? (sectionTitle+'').slice(0,3)+'...': sectionTitle }}</view>
								<image class="image" mode="widthFix" src="../../../static/accompany-service/selectDown.png" />
							</view>
						</picker>
					</uni-view>
					<uni-view class="text" style="-webkit-flex: 1;flex: 1;">
						<picker @change="statusPickerChange" :value="statusIndex" :range="statusList" range-key="name">
							<view class="uni-flex uni-row" style="-webkit-justify-content: center;justify-content: center;">
								<view>{{statusList[statusIndex]}}</view>
								<image class="image" mode="widthFix" src="../../../static/accompany-service/selectDown.png" />
							</view>
						</picker>
					</uni-view>
				</uni-view>
			</view>
		</view>
		
		<view class="examination-report-content">
		<block v-for="(item, index) in contentList" :key="index">
		  <view class="item">
		    <image class="left" :src="item.face_image"></image>
		    <view class="right">
		      <view class="right-top">
		        <view class="right-top-box">
		          <view class="right-top-box-name">{{ item.realname }}</view>
		          <view class="right-top-box-rank">{{ item.title.title }}</view>
		          <view class="right-top-box-rank">{{item.ducation.title}}</view>
		        </view>
		        <view class="right-top-right">
				  <view :class="item.chat_status == 1 ? 'dorp':'offline'"></view>
		          <view class="on-line">{{ item.chat_status ? '在线' : '不在线' }}</view>
		        </view>
		      </view>
		      <view class="hospital-del">
		        <view class="level" v-if="needVisible">{{ item.hospital.level }}</view>
		        <view class="hospital">{{ item.hospital.title }}</view>
		        <view class="department">{{ item.department }}</view>
		      </view>
		      <view class="introduce">擅长：{{ item.disease }}</view>
		      <view v-if="needVisible" class="main_tec">
		        <u-icon name="thumb-up-fill" color="#41ab85" size="15"></u-icon>
		        <text>主攻技术</text>
		        <text class="main_tec_item" v-for="(text,index) in item.technology.split(',')" :key="index">{{text}}</text>
		      </view>
		      <view class="bottom">
		        <view class="bottom-item">
		          <view class="lable">咨询量</view>
		          <view class="value">{{ item.call_num }}</view>
		        </view>
		        <view class="bottom-item">
		          <view class="lable">粉丝数</view>
		          <view class="value">{{ item.fans }}</view>
		        </view>
		        <view class="bottom-item">
		          <view class="lable">综合评分</view>
		          <view class="value">{{ item.star_avg }}</view>
		        </view>
		      </view>
		      <view v-if="needVisible" class="need_money">
		        <view @click="payUrl(item)">普通会诊¥{{item.ordinary_price}}</view>
		        <view @click="payUrl(item)">专家会诊¥{{item.specialist_price}}</view>
		      </view>
		    </view>
		  </view>
		</block>
		</view>
	</view>
</template>

<script>
	import provinceData from '@/utils/province';
	import cityData from '@/utils/city';
	import uniTag from '@/components/uni-tag/uni-tag.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import expertUrl from '@/api/expertConsulation'
	import expertApiUrl from '@/api/medical'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	export default {
		components: {
			uniTag,
			uniIcons,uniSearchBar
		},
		data() {
			return {
				needVisible: true,
				showAction: false,
				provinceShow: false,
				provinceList: [],
				provinceIndex: 0,
				cityShow: false,
				cityList: [],
				cityIndex: 0,
				sectionIndex: [0, 0],
				sectionArray: [[],[]],
				sectionChildArr: [], // 二级分类数据源
				sectionTitle: '科室',
				selectSection: 0,
				statusShow: false,
				statusList: ["不在线", "在线"],
				statusIndex: 0,
				contentList: [],
				cityVal:"23", sectionVal:"230100",provinceListId:[],cityListId:[],
			}
		},
		mounted() {
			this.initData()
		},
		created() {
		  this.getDepartmentList()
		  this.getContent()
		},
		methods: {
			async getDepartmentList() {
					const {data} = await this.$axios({
					  url: expertApiUrl.sectionList
					})
					// console.log("------------departments:", data.list)
					this.sectionArray[0] = data.list
					this.sectionChildArr = data.list.map(item => item.children)
					// console.log("-----------------arr:", data)
					this.sectionArray[1] = this.sectionChildArr[0]
			},
			async getContent() {
				const {data} = await this.$axios({
				  url: '/api/users/doctor/list',
				  data: {
				    city_id: this.sectionVal,
					section_id: this.selectSection,
					online: this.statusIndex,
				  }
				})
				this.contentList = data.list.data.data

			  // const {data} = await this.$axios({
			  //   url: expertUrl.doctorList,
			  //   data: {
			  //     city_id: this.city_id,
				 //  section_id: this.selectSection,
				 //  online: this.statusIndex,
			  //   }
			  // })
			  // this.contentList = data.list.data.data
			  // // console.log("--------getcontent: ", this.contentList)
			},
			// 获取二级分类
			columnchange(e) {
				// 当滚动切换一级分类时，为当前的一级分类添加它的子类
				if (e.detail.column == 0) {
					// #ifdef H5
					// 在小程序中直接赋值无效  H5 可直接赋值
					this.sectionArray[1] = this.sectionChildArr[e.detail.value]
					// #endif
					// #ifdef MP-WEIXIN
					// 在 H5 环境下 $set 会导致一级分类无法滚动， 小程序正常运行
					this.$set(this.sectionArray, 1, this.sectionChildArr[e.detail.value])
					// #endif
				}
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				let value = e.target.value;
				this.sectionIndex = value;
				if (this.sectionArray[0].length != 0) {
					this.sectionTitle = this.sectionArray[0][this.sectionIndex[0]].title
				};
				if (this.sectionArray[1].length != 0) {
					this.sectionTitle += ',' + this.sectionArray[1][this.sectionIndex[1]].title
				}
				if(this.sectionChildArr[this.sectionIndex[0]].length == 0){
					this.selectSection = this.sectionArray[0][this.sectionIndex[0]].id
					// console.log("sectionId: ",this.sectionArray[0][this.sectionIndex[0]].id)
				}
				else{
					this.selectSection = this.sectionChildArr[this.sectionIndex[0]][this.sectionIndex[1]].id
					// console.log("sectionId: ",this.sectionChildArr[this.sectionIndex[0]][this.sectionIndex[1]].id)
				}
				this.getContent()
			},	
			provincePickerChange: function(e) {
				this.initData()
				// console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.provinceIndex = e.detail.value
				this.handleCityData(this.provinceIndex)
				this.cityVal = this.provinceListId[this.provinceIndex]
				
				this.getContent()
				
				// console.log('picker发送选择改变，携带值为：' + e.detail.value)
				// this.provinceIndex = e.detail.value
				// this.cityList = this.handleCityData(this.provinceIndex)
				// console.log(this.cityList)
			},
			cityPickerChange: function(e) {
				this.cityIndex = e.detail.value
				this.sectionVal = `${this.cityListId[this.cityIndex]}00`
				this.getContent()
			},
			// departPickerChange: function(e) {
			// 	this.departIndex = e.detail.value
			// },
			statusPickerChange: function(e) {
				this.statusIndex = e.detail.value
				// console.log(this.statusIndex)
				this.getContent()
			},
			initData() {
				provinceData.forEach((item, index) => {
					this.provinceList.push(item.test)
					// this.cityList.push(this.handleData(index,`${item.value}-${item.value}`))
				})
			},
			handleCityData(provinceIndex) {
				this.cityList = [],this.cityListId = []
				cityData[provinceIndex].forEach(item=>{
							this.cityList.push(item.test)
							this.cityListId.push(item.value)
				})
				this.sectionVal = `${this.cityListId[0]}00`
				// let items = []
				// cityData[provinceIndex].forEach(item => {
				// 	items.push(item.test)
				// })
				// return items
			},
			async payUrl(item){
				const res = await this.$axios({
					  method: 'post',
					  url: expertUrl.consultation_order,
					  data:{
						  doctor_id:item.id
					  }
					})
				if(res.code == 1){
					let time = Date.parse(res.data.created_at)
					let orderInfo = {
						id:item.id,
						user_id:item.user_id,
						time:time,
						order_sn:res.data.order_sn
					}
					this.$store.commit('setOrderInfo',orderInfo)
					uni.navigateTo({
						url: '../../zjwz/zjhz/toOrder'
					});
				}
			},
			deleteDoctor(items, idx) {
				console.log(items, idx)
			},
			toRedirect() {
				uni.navigateTo({
					url: 'estimate'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jswz {
		
		.examination-report-content {
		  width: 720rpx;
		  margin: 10rpx auto;
		  .item {
		    display: flex;
		    padding: 32rpx 12rpx 22rpx;
		    margin-top: 20rpx;
		    background: #FFFFFF;
		    .left {
		      display: block;
		      width: 98rpx;
		      height: 98rpx;
		    }
		    .right {
		      margin-left: 24rpx;
		      &-top {
		        display: flex;
		        height: 48rpx;
		        width: 534rpx;
		        align-items: center;
		        justify-content: space-between;
		        &-box {
		          display: flex;
		          align-items: center;
		          &-name {
		            color: #505050;
		            font-size: 32rpx;
		            line-height: 48rpx;
		            margin-right: 16rpx;
		            font-weight: bold;
		          }
		          &-rank {
		            color: #a6a6a6;
		            font-size: 24rpx;
		            margin-left: 10rpx;
		          }
		        }
		        &-right {
		          display: flex;
		          align-items: center;
		          .dorp {
		            background: #309974;
		            width: 16rpx;
		            height: 16rpx;
		            border-radius: 10rpx;
		          }
				  .offline {
					background: #ff0000;
					width: 16rpx;
					height: 16rpx;
					border-radius: 10rpx;  
				  }
		          .on-line {
		            font-size: 24rpx;
		            margin-left: 4rpx;
		            color: #505050;
		          }
		        }
		      }
		      .hospital-del {
		        display: flex;
		        height: 36rpx;
		        align-items: center;
		        margin-top: 10rpx;
		        .level{
		          background: #309974;
		          color: #FFFFFF;
		          border-radius: 10rpx;
		          font-size: 20rpx;
		        }
		        .hospital {
		          color: #505050;
		          font-size: 24rpx;
		          line-height: 36rpx;
		          margin-left: 20rpx;
		        }
		        .department {
		          margin-left: 22rpx;
		          color: #505050;
		          font-size: 24rpx;
		          line-height: 36rpx;
		        }
		      }
		      .introduce {
		        margin-top: 10rpx;
		        color: #505050;
		        font-size: 20rpx;
		        line-height: 30rpx;
		        width: 534rpx;
		        text-overflow: -o-ellipsis-lastline;
		        overflow: hidden;
		        text-overflow: ellipsis;
		        display: -webkit-box;
		        -webkit-line-clamp: 2;
		        line-clamp: 2;
		        -webkit-box-orient: vertical;
		      }
		      .bottom {
		        margin-top: 12rpx;
		        display: flex;
		        height: 36rpx;
		        align-items: center;
		        &-item {
		          display: flex;
		          color: #505050;
		          font-size: 24rpx;
		          margin-left: 40rpx;
		          &:nth-child(1) {
		            margin-left: 0;
		          }
		          .lable {
		            margin-right: 12rpx;
		            font-size: 24rpx;
		          }
		          .value {
		            color: #41ab85;
		            font-size: 24rpx;
		          }
		        }
		      }
		    }
		  }
		}
		
		.need_money{
		  margin-top: 10rpx;
		  display: flex;
		  view{
		    border-radius: 32rpx;
		    border: rgba(65, 171, 133, 1) solid 1px;
		    font-size: 24rpx;
		    text-align: center;
		    color: #505050;
		    margin-top: 10rpx;
		    padding: 0 20rpx;
		  }
		  view:nth-child(2) {
		    margin-left: 20rpx;
		  }
		}
		
		.main_tec{
		  margin: 10rpx 0;
		  display: flex;
		  font-size: 16rpx;
		  justify-content: flex-start;
		  flex-wrap: wrap;
		  text{
		    color: black;
		    font-weight: bold;
		  }
		  .main_tec_item{
		    font-size: 16rpx;
		    background-color: rgba(243, 244, 248, 1);
		    border-radius: 32rpx;
		    padding: 0 10rpx;
		    color: #505050;
		  }
		}
		
		.condition {
			background-color: #fff;
			padding: 10px;
		}

		.infoTitle {
			font-size: 20px;
			font-weight: bold;
		}
		
		.titleDescribe {
			color: gray;
		}
		
		.picker {
			padding: 5px 0 5px 0;

			.u-icon {
				padding-top: 10px
			}
			
			.selectBtn {
				font-size: 14px;
				border: 1px solid #D9D9D9;
				border-radius: 24px;
				height: 32px;
				width: 75px;
				padding-left: 5px;
				padding-right: 5px;
				margin-right: 5px;
			}
		}

		.check {
			padding: 5px 0 10px 0;

			.u-icon {
				position: absolute;
				right: 0;
				top: 0;
			}

			.uni-media-list-logo {
				border-radius: 42px;
			}
		}

		.clinic {
			.u-button--primary {
				width: 50%;
				background-color: #41AB85;
				border-color: #41AB85;
			}
		}

		.example-body {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			padding: 0;
			font-size: 14px;
			background-color: #ffffff;
		}

		.example-body {
			flex-direction: column;
			padding: 15px;
			background-color: #ffffff;
		}

		.example-body {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
		}

		.image {
			width: 50rpx;
			height: 50rpx;
		}

		.uni-media-list-body {
			height: auto;

			.doctor {
				font-size: 20px;
				font-weight: bold;
				margin-right: 10px;
			}

			.professional {
				color: gray;
			}

			.hospitalLevel {
				border-radius: 5px;
				color: #fff;
				background-color: #41AB85;
				font-size: 10px;
				padding: 2px;
			}

			.hospital {
				margin: 5px;
			}

			.good {
				border-radius: 5px;
				background-color: #f3f4f8;
				font-size: 4px;
				padding: 2px 3px;
				margin: 2px;
			}

			.uni-tag {
				border: 1px solid #41AB85;
				background-color: #fff;
				margin: 0 5px;
			}

			.circle-green {
				display: inline-block;
				width: 10px;
				height: 10px;
				background-color: #41AB85;
				border-radius: 10px;
				margin-right: 5px;
			}

			.circle-red {
				display: inline-block;
				width: 10px;
				height: 10px;
				background-color: #f00;
				border-radius: 10px;
				margin-right: 5px;
			}
		}
	}
</style>
