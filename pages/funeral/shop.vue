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
               :rules="rules"
               :model="shop"
               ref="form"
               :error-type="['toast']"
      >
        <u-form-item
            label="资格证书"
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
            label="注册号/统一社会信用代码"
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
            label="名称"
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
            label="法定代表人/经营者"
            ref="item1"
            labelWidth="120"
            prop="id_card_img">
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
            label="经营场所/住所"
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
            label="执照有效期"
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
            label="注册/成立时间"
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
            label="发证/登记机关"
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
        <u-form-item
            label="核准日期"
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
    <view class="btn-wrap">
      <u-button @click="submit" class="btn">下一步</u-button>
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

console.log([province,city[0],area[0][0]])

export default {
  name: "shop",

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



      },
      fileList1:[],
      fileList2:[],
      fileList3:[],
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
      show:false,
      city: city[0],
      areas: area[0][0],
      list:[province,city[0],area[0][0]],
      current:0
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
    addressClick(){
      this.show=true
    },
    submit(){
      switch (this.current)
      {
        case 0:
          this.from1Validate()
              break
      }
    },
    from1Validate(){
      this.$refs.form.validate().then(res=> {
        this.current=res?1:0
      })
    },

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
</style>