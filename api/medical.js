const url = {
    diseaseList: '/api/hospital/disease_list',//获取疾病
    sectionList: '/api/hospital/section_list',//获取科室
    sectionDisease: '/api/hospital/section_disease',//查询疾病
    diseaseDetail: '/api/hospital/disease_detail', //疾病详情
    drugType: '/api/hospital/drug_type',//药品类型
    drugList: '/api/hospital/drug',//药品列表 type_id  类型id title  药品名 page 分页
    drugDetail: '/api/hospital/drug_detail', //药品详情
    needleType: '/api/hospital/vaccine_type',//疫苗类型
    needleList: '/api/hospital/vaccine',// 疫苗列表 type_id   类型id
    needleDetail: '/api/hospital/vaccine_detail',//疫苗详情 id  疫苗id
    health: '/api/index/health', // 养生知识的类型
    article:'/api/index/article', // 养生知识文章列表
    articleDetail:'/api/index/article_detail', // 养生知识文章详情
    life:'/api/index/life',//生活手册

}

export default url