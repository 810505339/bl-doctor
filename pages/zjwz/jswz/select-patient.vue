<template>
	<view class="jswz">
		<view class="list">
			<view class="uni-list">
				<block v-for="(item, index) in patientList" :key="item.id">
					<view class="uni-flex uni-row">
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover"  @click="quickConsultation(item)">
								<view class="uni-media-list">
									<!-- <image class="uni-media-list-logo" :src="item.uri"></image> -->
									<view class="uni-media-list-body">
										<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;width: 100%;">
											<view class="text" style="-webkit-flex: 1;flex: 1;">
												<span class="patient">{{item.name}}</span>
												<span class="patient-relaction">{{relationList[item.relation-1]}}</span>
											</view>
										</view>
										<view class="uni-flex uni-row" style="-webkit-justify-content: space-between;justify-content: space-between;width: 100%;">
											<view class="text" style="-webkit-flex: 1;flex: 1;">
												<span class="patient-info">{{sexList[item.gender-1]}}</span>
												<span class="patient-info">{{item.age}}岁</span>
											</view>
										</view>
									</view>
									<u-icon name="arrow-right" color="#000" size="16"></u-icon>
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
	import expertUrl from '@/api/expertConsulation'
	export default {
		components: {
			
		},
		data() {
			return {
				patientList:[],
				relationList: ['本人','爱人','父母','亲属'],
				sexList: ['男','女'],
			}
		},
		created() {
		  this.getPatientList()
		},
		methods:{
			quickConsultation: function(item) {
				const { age, gender, name, id } = item;
				
				uni.navigateTo({
					url: `quick-consultation?age=${age}&gender=${gender}&name=${name}&patientId=${id}`
				})
			},
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: '../../zjwz/jswz/add-patient'
				});
			},
			async getPatientList() {
			  const {data} = await this.$axios({url: expertUrl.getPatient})
			  this.patientList = data.arr.map((item,index)=>{
				  return item
			  })			
			}
		},
	}
</script>

<style lang="scss" scoped>
	.jswz {		
		.uni-media-list-body {
			height: auto;

			.patient {
				font-size: 20px;
				font-weight: bold;
				margin-right: 10px;
			}

			.patient-relaction {
				color: #ffffff;
				background-color: #41AB85;
				border-radius: 8px;
				padding-left: 5px;
				padding-right: 5px;
			}
			
			.patient-info{
				color: gray;
				padding-right: 5px;
			}
		}
	}
</style>

