const url = {
	sectionList: '/api/hospital/section_list',//获取科室
    cityList: '/api/city/list',//城市列表 get  parent_id   父级id   (默认100000)
	doctorList: '/api/users/doctor/list', //医生列表 get  city_id  市id  section_id  科室二级id receive  咨询最多(排序  0 1) scoring    评分最高(排序  0 1 )
	addQuestion:'/api/users/patient_condition/add',//post  极速问诊 提交问题
	getPatient:'/api/users/patient/index',//get  患者列表
	addPatient:'/api/users/patient/add ',//post   添加患者
	detailPatient:'/api/users/patient/detail',//get 患者详情
	modifyPatient:'/api/users/patient/edit',//post 修改患者
	addMedicalHistory:'/api/users/patient_see/add',//post 添加就诊史
	doctorDetail:'/api/users/doctor/detail',//get 添加就诊史
	getHospitalList:'/api/users/hospital/index',// get  医院列表
	getCouponList:'/api/users/coupon/list', //get   优惠券列表
	getCommentTagList:'/api/users/doctor/comment_tags',//get  评价标签
	doctorComment:'/api/users/doctor/comment',//  post  提交评论
	getCaseType:'/api/users/patient_see/case_type',//  get   病例类型
	addPatientCase:'/api/users/patient_case/add',//		 post   添加病例
	doctorDetail:'/api/users/doctor/detail',//		 get   id
	consultation_order:'/api/users/doctor/consultation_order',// post   添加订单
	accompanying:'/api/users/accompanying/detail' ,//get   陪诊订单详情  order_sn   订单号
	sel_coupon:'/api/users/doctor/sel_coupon' //post   选择优惠券order_sn   订单号 coupon_id   优惠券id
}

export default url

 // async login() {
 //      const res = await this.$axios({
 //        method: 'post',
 //        url: '/api/users/login',
 //        data: {
 //          password: this.password,
 //          mobile: this.mobile,
 //          identity: 'member'
 //        }
 //      })
 // console.log(res)
 // }
 
 // asyc test(){
	//   const res = await this.$axios({
	//    url: '/api/sms_code?mobile=' + this.mobile
	//  })
	//  console.log(res)
 // }
 
 // async getDetail(id) {
 //   const { data } = await this.$axios({
 //     url: `/api/escort/organization_detail`,
 //     data:{
 //       id
 
 //     }
 //   })
 //   console.log(res)
 // }
