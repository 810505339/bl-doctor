<template>
	<view class="mine-order">
		<view class="header">
			<view class="header-flex">
				<u-icon name="arrow-left" size="30" color="#909399" @tap='goback'></u-icon>
				<u-tabs :list="list1" lineWidth="30" :lineColor="lineColor" :activeStyle="activeStyle"
					:itemStyle="itemStyle" @click='tabs' style="flex: 1;">
				</u-tabs>
			</view>
			<u-tabs :list="getArr" lineWidth="0" :lineColor="lineColor" :activeStyle="activeStyle2"
				:inactiveStyle="inactiveStyle2" :itemStyle="itemStyle" @click='tabs1' ref='tabsref'>
			</u-tabs>
		</view>
		<view class="zhanwei">
			<!-- 站位 -->
		</view>
		<!-- 殡葬服务 -->
		<view class="" v-if="activeIndex==2">
			<view v-for="(item,index) in shopList" :key="index">
				<com-order-binzhang @goPayPage='goPayPage' @deleteClick='deleteClick' @cancelClick='cancelClick'
					:item='item' :index='index' />
			</view>
		</view>
		<!--陪诊 陪护 -->
		<view class="" v-else>
			<view v-for="(item,index) in shopList" :key="index">
				<com-order-peihu @goPayPage='goPayPage' @deleteClick='deleteClick' @cancelClick='cancelClick'
					:activeindex='activeIndex' :item='item' :index='index' />
			</view>
		</view>
		<!-- <u-loading-icon></u-loading-icon> -->
	</view>
</template>

<script>
	import {
		createNamespacedHelpers,
	} from 'vuex'
	const {
		mapMutations,
		mapState
	} = createNamespacedHelpers('escort-service')
	export default {
		name: 'mine-order',
		data() {
			return {
				itemStyle: 'padding-left: 15px; padding-right: 15px; height: 50px;',
				lineColor: 'rgba(65, 171, 133, 1)',
				activeStyle: {
					color: '#303133',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				},
				activeStyle2: {
					color: 'rgba(65, 171, 133, 1)',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				},
				inactiveStyle1: {
					color: '#606266',
					fontSize: '17px',
					transform: 'scale(1)'
				},
				inactiveStyle2: {
					color: '#606266',
					fontSize: '15px',
					transform: 'scale(1)'
				},
				list1: [{ //大的分类
					name: '陪护服务',
					path: '/api/users/escort/order_list', //请求列表接口
					method: 'get',
					delpath: '/api/users/escort/delete_order', //删除接口
					cancelPath: '/api/users/escort/cancel_order'

				}, {
					name: '陪诊服务',
					path: '/api/users/accompanying/order_list',
					method: 'get',
					delpath: '/api/users/accompanying/delete_order', //删除接口
					cancelPath: '/api/users/accompanying/cancel_order'

				}, {
					name: '殡葬服务',
					path: '/api/users/funeral_order_list',
					method: 'get',
					delpath: '/api/users/del_funeral_order', //删除接口
					cancelPath: '/api/users/order_cancel'
				}],

				// 0  待支付  1 服务中  2  已接单  3  已完成  '' 全部  那个待评价不要了
				// 订单状态  (-1:订单关闭,0:待付款,1:待接单,2:待出单,3:待送达,4:已完成)
				list2: [{ //陪护服务 陪诊服务
					name: '全部',
					status: ''
				}, {
					name: '待支付',
					status: 0

				}, {
					name: '服务中',
					status: 1

				}, {
					name: '已完成',
					status: 3
				}],

				list3: [{ //殡葬
						name: '全部',
						status: ''
					}, {
						name: '待付款',
						status: 0
					},
					// {
					// 	name: '待接单',
					// 	status: 1

					// }, 
					// {
					// 	name: '待出单',
					// 	status: 2
					// },
					{
						name: '待送达',
						status: 3
					}, {
						name: '已完成',
						status: 4
					}
				],
				shopList: [], //列表数组
				activeIndex: 0, //大分类
				activeIndex2: 0, //小分类
				page: 1, //分页
				last_page: 0, //一共多少分页
			};
		},
		computed: {
			...mapState({
				user_info: state => state.user_info,
			}),
			getArr() { //获得二级分类列表数据
				if (this.activeIndex == 2) { //如果是殡葬服务
					return this.list3
				} else {
					return this.list2
				}
			},
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			if (this.page <= this.last_page) {
				this.getList()
			}
		},
		methods: {
			...mapMutations(['change_order_id']),
			goPayPage(e) {
				console.log('goPayPage')
				if (this.activeIndex == 0) { //如果是陪护服务
				}
				if (this.activeIndex == 1) { //如果是陪诊服务
					this.change_order_id(e.order_sn)
					uni.navigateTo({
						url: '/pages/escort/order-message/order-message'
					})
				}
				if (this.activeIndex == 2) { //如果是殡葬服务
				}
			},
			async cancelClick(e) {
				console.log('cancelClick', e)
				let that = this

				uni.showModal({
					title: '确定取消从此订单?',
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							})
							const {
								data
							} = await that.$axios({
								url: that.list1[that.activeIndex].cancelPath,
								method: 'post',
								data: {
									order_sn: ' e.order_sn'
								}
							})
							// 如果取消成功
							that.$set(that.shopList[e.index], 'order_status', -1)
						}
					}
				})
			},
			deleteClick(e) {
				console.log('deleteClick', e)
				let that = this
				let obj = {
					order_sn: e.order_sn
				}
				e.funeral_id ? obj.funeral_id = e.funeral_id : ''; // 如果为殡葬删除则添加一个字段
				uni.showModal({
					title: '确定删除从此订单?',
					async success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中'
							})
							console.log(obj, '数据')
							const {
								data
							} = await that.$axios({
								url: that.list1[that.activeIndex].delpath,
								method: 'post',
								data: obj
							})
							// 如果删除成功
							that.shopList.splice(e.index, 1)

						}
					}
				})

			},
			async getList() {
				let {
					path,
					method
				} = this.list1[this.activeIndex]
				uni.showLoading({
					title: '加载中'
				})
				const {
					data
				} = await this.$axios({
					url: path,
					method,
					data: {
						status: this.getArr[this.activeIndex2].status,
						page: this.page
					}
				})
				this.last_page = data.list.last_page
				if (data.list && data.list.data && data.list.data.length) {
					if (this.page == 1) {
						this.shopList = data.list.data
					} else {
						this.shopList.concat(data.list.data)
					}
				}
				this.page++

			},
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			tabs(e) {
				this.$refs.tabsref.current = 0
				// this.change_order_id(222) // 存储订单号
				// console.log(this.user_info,this.activeIndex)
				this.activeIndex = e.index
				this.activeIndex2 = 0
				this.page = 1
				this.shopList = []
				this.getList()
			},
			tabs1(e) {
				this.activeIndex2 = e.index
				this.page = 1
				this.shopList = []
				this.getList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		background-color: white;
		width: 100%;
		padding-top: calc(var(--window-top) + 15px);
		position: fixed;
		top: 0;
	}

	.zhanwei {
		height: 125px;
		width: 100%;
		padding-top: calc(var(--window-top) + 15px);
	}

	.header-flex {
		display: flex;
	}
</style>
