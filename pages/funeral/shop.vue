<template>
  <view class="funeral-shop">
    <u-steps
        current="0" activeColor="#41ab85" inactiveColor="#a6a6a6">
      <u-steps-item title="店铺信息" ></u-steps-item>
      <u-steps-item title="资质信息" ></u-steps-item>
      <u-steps-item title="人脸识别" ></u-steps-item>
      <u-steps-item title="通过验证" ></u-steps-item>
    </u-steps>
    <view>
        <view>加入白龙认证殡葬服务</view>
        <view>上传内容我们会为您绝对保密！</view>
      <u-form labelPosition="top">
        <u-form-item
            label="姓名"
            prop="userInfo.name"
            borderBottom
            ref="item1"
        >
          <u--input
              v-model="shop.name"
              placeholder="请输入姓名"
              border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="联系电话"
            prop="userInfo.mobile"
            borderBottom
            ref="item1"
            labelWidth="70"
        >
          <u--input
              v-model="shop.mobile"
              border="none"
              placeholder="请输入联系电话"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="身份证号"
            prop="userInfo.id_number"
            borderBottom

            ref="item1"
            labelWidth="70"
        >
          <u--input
              v-model="shop.id_number"
              placeholder="请输入身份证号"
              border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="二代身份证照片"
            prop="userInfo.name"

            ref="item1"
            labelWidth="120"
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
            prop="userInfo.store_address "
            borderBottom
            ref="item1"
            labelWidth="70"
        >
          <u--input
              v-model="shop.store_address"
              placeholder="请输入店铺地址"
              border="none"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="门牌号"
            prop="userInfo.house_number"
            borderBottom
            ref="item1"
            labelWidth="70"
        >
          <u--input
              v-model="shop.house_number"
              border="none"
              placeholder="请输入门牌号"
          ></u--input>
        </u-form-item>
        <u-form-item
            label="门脸图"
            prop="userInfo.front_figure"

            ref="item1"
            labelWidth="70"
        >
          <u-upload
              :fileList="fileList3"
              @afterRead="afterRead"
              @delete="deletePic"
              name="3"
              multiple
              :maxCount="10"
          />


        </u-form-item>
        <u-form-item
            label="门店名称"
            prop="userInfo.store_name"
            borderBottom
            ref="item1"
            labelWidth="70"
        >
          <u--input
              v-model="shop.store_name"
              border="none"
              placeholder="请输入门店名称"
          ></u--input>
        </u-form-item>
      </u-form>
    </view>
    <view class="btn-wrap">
      <u-button @click="submit" class="btn">下一步</u-button>
    </view>
  </view>
</template>

<script>

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


      },
      fileList1:[],
      fileList2:[],
      fileList3:[],
      img:require('@/static/funeral/upload.png')
    }
  },
  methods:{

    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
   async afterRead(){
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
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





    submit(){

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
  background: #ffffff;
  padding:0 34rpx;
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