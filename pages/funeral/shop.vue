<template>
  <view class="funeral-shop">
    <u-steps
        :current="current" activeColor="#41ab85" inactiveColor="#a6a6a6">
      <u-steps-item title="店铺信息" ></u-steps-item>
      <u-steps-item title="资质信息" ></u-steps-item>
      <u-steps-item title="人脸识别" ></u-steps-item>
      <u-steps-item title="通过验证" ></u-steps-item>
    </u-steps>
    <view v-show="current===0">
        <view>加入白龙认证殡葬服务</view>
        <view>上传内容我们会为您绝对保密！</view>
      <u--form labelPosition="top"
              :rules="rules"
              :model="shop"
              ref="form"
              :error-type="['toast']"
      >
        <u-form-item
            label="姓名"
            prop="name"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.name"
              placeholder="请输入姓名"
              border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="联系电话"
            prop="mobile"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.mobile"
              border="none"
              placeholder="请输入联系电话"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="身份证号"
            prop="id_number"
            borderBottom

            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.id_number"
              placeholder="请输入身份证号"
              border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="二代身份证照片"
            ref="item1"
            labelWidth="120"
            prop="id_card_img"

        >
       <view class="idNumber-warp">
         <u-upload
             :fileList="fileList1"
             @afterRead="afterRead"
             @delete="deletePic"
             name="1"
             multiple
             :maxCount="1"
             action="链接地址"

         />
         <view>人像面</view>
       </view>
        <view class="idNumber-warp">
          <u-upload
              :fileList="fileList2"
              @afterRead="afterRead"
              @delete="deletePic"
              name="2"
              multiple
              :maxCount="1"
              action="链接地址"
          />
          <view>国徽面</view>
        </view>
        </u-form-item>
        <u-form-item
            label="店铺地址"
            prop="store_address"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.store_address"
              placeholder="请选择店铺地址"
              border="none"
              disabled
              @click.native="addressClick"
          ></u--input>

          <u-picker :show="show"  :columns="list" ref="city"  keyName="label"   @change="change"   @cancel="show=false"  @confirm="confirm"  />
        </u-form-item>
        <u-form-item
            label="门牌号"
            prop="house_number"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.house_number"
              border="none"
              placeholder="请输入门牌号"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="门脸图"
            prop="front_figure"
            ref="item1"
            labelWidth="120"
        >
          <u-upload
              :fileList="fileList3"
              @afterRead="afterRead"
              @delete="deletePic"
              name="3"
              multiple
              :maxCount="1"
          />


        </u-form-item>
        <u-form-item
            label="门店名称"
            prop="store_name"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.store_name"
              border="none"
              placeholder="请输入门店名称"
          ></u--input>
        </u-form-item>
      </u--form>
    </view>
    <view v-show="current===1">
      <u--form labelPosition="top"
               :rules="rules1"
               :model="shop"
               ref="form1"
               :error-type="['toast']"
      >
        <u-form-item
            label="资格证书"
            prop="qualification_certificate_img"
            borderBottom
            ref="item1"
            labelWidth="120"
        >

          <u-upload
              :fileList="fileList4"
              @afterRead="afterRead"
              @delete="deletePic"
              name="4"
              :maxCount="1"
              action="链接地址"

          />

        </u-form-item>
        <u-form-item
            label="注册号/统一社会信用代码"
            prop="registration_number"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.registration_number"
              border="none"
              placeholder="请输入注册号/统一社会信用代码"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="资质名称"
            prop="qualification_name"
            borderBottom

            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.qualification_name"
              placeholder="请输入资质名称"
              border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="法定代表人/经营者"
            ref="item1"
            labelWidth="120"
            prop="legal_person">
          <u--input
              v-model="shop.legal_person"
              placeholder="请输入法定代表人/经营者"
              border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="经营场所/住所"
            prop="domicile"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.domicile"
              placeholder="请选择经营场所/住所"
              border="none"
          />
        </u-form-item>
        <u-form-item
            label="执照有效期"
            prop="certificate_expiry_date"
            ref="item1"
            labelWidth="120"
        >
          <u-radio-group
              v-model="shop.certificate_expiry_date"

              placement="row"
          >
            <u-radio  shape="circle" activeColor="green" :name="0" label="长期有效"/>
            <u-radio  shape="circle"  activeColor="green"   :name="1" label="固定时效"/>
          </u-radio-group>
        </u-form-item>
        <u-form-item
            label=""
            prop="timer"
            ref="item1"
            labelWidth="120"
            borderBottom
        >
          <u--input v-model="shop.certificate_expiry_date_start"  border="none"   placeholder="开始时间" disabled @click.native="certificate_expiry_date_start_show=true" />
          <u--input v-model="shop.certificate_expiry_date_end"  border="none"   placeholder="结束时间" disabled @click.native="certificate_expiry_date_end_show=true" />

          <u-datetime-picker
              :show="certificate_expiry_date_start_show"
              v-model="certificate_expiry_date_startValue"
              mode="date"
              @cancel="certificate_expiry_date_start_show=false"
              @confirm="expiryStartConfirm"
              :formatter="formatter"
          />

          <u-datetime-picker
              :show="certificate_expiry_date_end_show"
              v-model="certificate_expiry_date_endValue"
              mode="date"
              @cancel="certificate_expiry_date_end_show=false"
              @confirm="expiryEndConfirm"
              :formatter="formatter"
          />

        </u-form-item>
        <u-form-item
            label="注册/成立时间"
            prop="established_time"
            ref="item1"
            labelWidth="120"
            borderBottom
        >
          <u--input v-model="shop.established_time"  border="none"   placeholder="请选择核准日期" disabled @click.native="established_time_show=true" />
          <u-datetime-picker
              :show="established_time_show"
              v-model="established_timeValue"
              mode="date"
              @cancel="established_time_show=false"
              @confirm="establishedTimeConfirm"
              :formatter="formatter"
          />

        </u-form-item>
        <u-form-item
            label="发证/登记机关"
            prop="registration_authority"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input
              v-model="shop.registration_authority"
              border="none"
              placeholder="请输入发证/登记机关"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="核准日期"
            prop="approval_date"
            borderBottom
            ref="item1"
            labelWidth="120"
        >
          <u--input v-model="shop.approval_date"  border="none"   placeholder="请选择核准日期" disabled @click.native="approval_date_show=true" />
          <u-datetime-picker
              :show="approval_date_show"
              v-model="approval_dateValue"
              mode="date"
              @cancel="approval_date_show=false"
              @confirm="approvalDateConfirm"
              :formatter="formatter"
          />
        </u-form-item>
      </u--form>
    </view>
    <view v-show="current===2"></view>
    <view v-show="current===3">
     <view class="yz-wrap">
       <u--image :src="yz" class="yz-img"/>
       <view class="yz-ctx">
         恭喜您，已完成资格验证
       </view>
       <view class="yz-font">
         您已成功入驻白龙殡葬服务，快去整理一下吧
       </view>

     </view>
    </view>
    <view class="btn-wrap">
      <u-button @click="submit" v-show="current!==3" class="btn">下一步</u-button>
      <u-button @click="toUrl" v-show="current===3" class="btn">进入工作台</u-button>
    </view>
    <view style="text-align: center">
      3秒后自动跳转...
    </view>
  </view>
</template>

<script>

import {uploadUrl} from "../../utils/request";
import {url} from '@api/funeral'
import {getStorage} from '@/utils/cookies'
import city from '@/utils/city-uview'
import area from '@/utils/area'
import province from '@/utils/province'
import UImage from "../../uni_modules/uview-ui/components/u--image/u--image";


console.log([province,city[0],area[0][0]])

export default {
  name: "shop",
  components: {UImage},
  data(){
    return{
      shop:{
        name:'',
        mobile:'',
        id_number:'',
        store_address:'',
        house_number:'',
        store_name:'',
        front_figure:'',
        id_card_img:['',''],
        registration_number:'1',
        qualification_name:'1',
        legal_person:'1',
        domicile:'1',
        certificate_expiry_date:0,
        established_time:'1',
        registration_authority:'1',
        approval_date:'1',
        qualification_certificate_img:'1',
        certificate_expiry_date_start:'1',
        certificate_expiry_date_end:'1',
        timer:['1','1']


      },
      fileList1:[],
      fileList2:[],
      fileList3:[],
      fileList4:[],
      img:require('@/static/funeral/upload.png'),
      rules:{
        name:{
          type: 'string',
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change']
        },
        mobile:{
          type: 'string',
          required: true,
          message: '请填写电话',
          trigger: ['blur', 'change']
        },
        store_address:{
          type: 'string',
          required: true,
          message: '请选择店铺地址',
          trigger: ['blur', 'change']
        },
        house_number:{
          type: 'string',
          required: true,
          message: '请填写门牌号',
          trigger: ['blur', 'change']
        },
        store_name:{
          type: 'string',
          required: true,
          message: '请填写门店名称',
          trigger: ['blur', 'change']
        },
        id_number:{
          type: 'string',
          required: true,
          message: '请填写身份证号',
          trigger: ['blur', 'change']
        },
        front_figure:{
          type: 'string',
          required: true,
          message: '请上传门脸图',
          trigger: ['blur', 'change']
        },
        id_card_img:{
          type:'array',
          required: true,
          validator: (rule, value, callback) => value.every(item=>item!==''),
          message: '请上传身份证',
          trigger: ['blur', 'change']
        }



      },
      rules1:{
        registration_number:{
          type: 'string',
          required: true,
          message: '请填写注册号/社会统一信用代码',
          trigger: ['blur', 'change']
        },
        qualification_name:{
          type: 'string',
          required: true,
          message: '请填写资质名称',
          trigger: ['blur', 'change']
        },
        legal_person:{
          type: 'string',
          required: true,
          message: '请填写 法人/经营者',
          trigger: ['blur', 'change']
        },
        domicile:{
          type: 'string',
          required: true,
          message: '请填写经营场所/住所',
          trigger: ['blur', 'change']
        },
        certificate_expiry_date:{
          type: 'number',
          required: true,
          message: '请选择执照有效期',
          trigger: ['blur', 'change']
        },
        established_time:{
          type: 'string',
          required: true,
          message: '请选择注册/成立时间',
          trigger: ['blur', 'change']
        },
        registration_authority:{
          type: 'string',
          required: true,
          message: '请输入发证/登记机关',
          trigger: ['blur', 'change']
        },
        approval_date:{
          type: 'string',
          required: true,
          message: '请选择核准日期',
          trigger: ['blur', 'change']
        },
        timer:{
          type:'array',
          required: true,
          validator: (rule, value, callback) => value.every(item=>item!==''),
          message: '请选择时间',
          trigger: ['blur', 'change']
        },
        qualification_certificate_img:{
          type:'string',
          required: true,
          message: '请上传资格证书',
          trigger: ['blur', 'change']
        }
      },
      show:false,
      city: city[0],
      areas: area[0][0],
      list:[province,city[0],area[0][0]],
      current:3,
      approval_date_show:false,
      approval_dateValue:0,
      established_time_show:false,
      established_timeValue:0,
      certificate_expiry_date_end_show:false,
      certificate_expiry_date_start_show:false,
      certificate_expiry_date_startValue:0,
      certificate_expiry_date_endValue:0,
      yz:require('@/static/funeral/yz.png')
    }
  },

  methods:{
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
   async afterRead(event){
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
     console.log(fileListLen)
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].thumb);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
            fileListLen,
            1,
            Object.assign(item, {
              status: "success",
              message: "",
              url: result,
            })
        );
        fileListLen++;
      }
    },
    async uploadFilePromise(urls){
      return new Promise((resolve, reject) => {

        uni.uploadFile({
          url: uploadUrl(url.uploadImg),
          filePath:urls,
          name: 'file',
          header: {
            Authorized: getStorage()
          },
          success: (uploadFileRes) => {
            if (uploadFileRes.statusCode === 200) {
              const { data } = JSON.parse(uploadFileRes.data);
              resolve(data.url)

            } else {
              this.$u.toast('上传图片失败，请重试');
            }
          },
          fail(err) {
            this.$u.toast(JSON.stringify(err));
          }
        })

      })


    },
    change(e){

      const {
        columnIndex,
        value,
        values, // values为当前变化列的数组内容
        index,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs['city']
      } = e
      // 当第一列值发生变化时，变化第二列(后一列)对应的选项
      if (columnIndex === 0) {
        // picker为选择器this实例，变化第二列对应的选项
        this.index=index;
        picker.setColumnValues(1,city[index])
        picker.setColumnValues(2,area[this.index][0])
      }

      if (columnIndex === 1) {
        // picker为选择器this实例，变化第二列对应的选项
        console.log(city[index])
        picker.setColumnValues(2,area[this.index][index])
      }


    },
    confirm({value}){
      this.shop.store_address=value.map(item => item.label).join('-')
      this.show=false

    },
    approvalDateConfirm(e){

 this.shop.approval_date=uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      this.approval_date_show=false
    },
    addressClick(){
      this.show=true
    },
    submit(){
      switch (this.current)
      {
        case 0:
          this.from1Validate()
              break
        case 1:
          this.from2Validate()
              break
      }
    },
    from1Validate(){
      this.$refs.form.validate().then(res=> {
        this.current=res?1:0
      })
    },
    formatter(type, value){

      if (type === 'year') {
        return `${value}年`
      }
      if (type === 'month') {
        return `${value}月`
      }
      if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    establishedTimeConfirm(e){
      this.shop.established_time=uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      this.established_time_show=false
    },
    expiryStartConfirm(e){
      this.shop.certificate_expiry_date_start=uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      this.certificate_expiry_date_start_show=false
      this.shop.timer[0]=uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
    },
    expiryEndConfirm(e){
      this.shop.certificate_expiry_date_end=uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      this.certificate_expiry_date_end_show=false
      this.shop.timer[1]=uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
    },
    async from2Validate(){

     const  flag= await   this.$refs.form1.validate()

        const {data}=  this.$axios({url:url.settled,method:'post',data:{
          ...this.shop

        }})

      if(flag)
      {
        // this.current=data?2:1
      }

    },
    toUrl(){

      uni.navigateTo({
        url:`/pages/funeral/worker`
      })
    }
  },
  watch:{
    fileList1:{
      deep:true,
      handler(nVal){
        this.shop.id_card_img[0]= nVal.length===0?'':nVal[0]?.url
      }
    },
    fileList2:{
      deep:true,
      handler(nVal){
        this.shop.id_card_img[1]= nVal.length===0?'':nVal[0]?.url
      }
    },
    fileList3:{
      deep:true,
      handler(nVal){
          this.shop.front_figure= nVal.length===0?'':nVal[0]?.url
      }
    },
    fileList4:{
      deep:true,
      handler(nVal){
        this.shop.qualification_certificate_img= nVal.length===0?'':nVal[0]?.url
      }
    }
  }

}
</script>

<style scoped lang="scss">

/deep/.u-steps-item__wrapper--row{
  height: 30px;
}
/deep/.u-steps-item__wrapper__circle{
    width: 25px;
  height: 25px;
}

.funeral-shop{
  background: #ffffff ;
  min-height: 100vh;
  padding:0 34rpx ;
  /deep/.u-input{
    background: none !important;
  }
}
.idNumber-warp{
  display: flex;
  flex-direction: column;
  text-align: center;
}
.btn-wrap{
 padding: 100rpx 0;
}

.btn{
  background: #41ab85;
  color:#ffffff;
  border-radius: 50rpx;
}
.yz-wrap{
    text-align: center;
  .yz-img{
    display: inline-block;
  }

  .yz-ctx{
    color:#505050;
    font-weight: bold;
    font-size: 40rpx;

  }
  .yz-font{
    color:#a6a6a6;
    font-size: 28rpx;
  }
}
</style>