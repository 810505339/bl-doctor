export default {
	state: {
		user_info: {
			active_info: {}, // 选择优惠券信息
			order_id: '', // 订单id
		},
		nav_list: {
			escort: [
				{
					id: 1,
					title: '被服务人',
					note: '选择一个患者',
					to: '/pages/escort/choose-people/choose-people?escort=0',
					back: '/pages/escort/escort-service/escort-service'
				},
				{
					id: 1,
					title: '去哪里陪诊',
					note: '选择一个医院',
					to: '/pages/select-hospital/select-hospital?escort=1',
					back: '/pages/escort/escort-service/escort-service'
				}
			],
			handle: [
				{
					id: 2,
					title: '为谁办理',
					note: '选一个被服务人',
					to: '/pages/escort/choose-people/choose-people?handle=0',
					back: '/pages/escort/escort-service/escort-service'
				},
				{
					id: 2,
					title: '去哪里办理',
					note: '选择一个地址',
					to: '/pages/select-hospital/select-hospital?handle=1',
					back: '/pages/escort/escort-service/escort-service'
				}
			],
			appointment: [
				{
					id: 3,
					title: '被服务人',
					note: '选择一个患者',
					to: '/pages/escort/choose-people/choose-people?appointment=0',
					back: '/pages/escort/escort-service/escort-service'
				},
				{
					id: 3,
					title: '去哪里陪诊',
					note: '选择一个医院',
					to: '/pages/select-hospital/select-hospital?appointment=1',
					back: '/pages/escort/escort-service/escort-service'
				},
				{
					id: 3,
					title: '什么时间服务',
					note: '选择一个时间',
					cb: true
				}
			]
		},
		routerDetail: {}
	},
	mutations: {
		change_active_info(state, payload) {
			state.user_info.active_info = payload
		},
		change_order_id(state, payload) {
			state.user_info.order_id = payload
		},
		change_nav_list(state, {key, value, index}) {
			state.nav_list[key][index] = {...state.nav_list[key][index], ...value}
		},
		change_route(state, {key, value}) {
			state.routerDetail[key] = value
		}
	}
}