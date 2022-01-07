<template>
  <view class="new-commodity">
    <u--form
        labelPosition="left"
        :model="data"
        :rules="rules"
        ref="form"
    >
      <view class="form-head-wrap">
        <view class="tag"></view>
        基本信息
      </view>
      <u-form-item
          label="商品名称"
          prop="data.shop_name"
          class="white"
          labelWidth="80"
      >
        <u--input
            v-model="data.shop_name"
            placeholder="请输入商品名称"
        ></u--input>
      </u-form-item>
      <u-form-item
          label="商品分类"
          prop="data.classify_id"
          class="white"
          labelWidth="80"
      >
        <u--input
            v-model="data.classify_name"
            placeholder="请选择商品分类"
            disabled
            @click.native="show=true"
        />


        <view class="to-add">去添加</view>
      </u-form-item>
      <u-form-item
          label="商品图片"
          prop="data.shop_name"
          class="white"
          labelWidth="80"
          labelPosition
      >
        <u-upload
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
            :maxCount="9"
            action="链接地址"

        />
      </u-form-item>
      <view class="form-head-wrap">
        <view class="tag"></view>
       规格/库存
      </view>
      <u-form-item
          label="商品编码"
          prop="data.shop_sn"
          class="white"
          labelWidth="80"
      >
        <u--input
            v-model="data.shop_sn"
            placeholder="请输入商品编码"


        />
      </u-form-item>
      <u-form-item
          label="商品价格"
          prop="data.shop_price"
          class="white"
          labelWidth="80"
      >
        <u--input
            v-model="data.shop_price"
            placeholder="请输出商品价格"


        />

      </u-form-item>
      <u-form-item
          label="当前库存数量"
          prop="data.shop_stock"
          class="white"
          labelWidth="100"
      >
        <u--input
            v-model="data.shop_stock"
            placeholder="请输入当前库存数量"


        />

      </u-form-item>
      <view class="form-head-wrap sku top">
        <view class="tag "></view>
        商品详情
      </view>
      <u-form-item
          prop="data.shop_details"
          class="sku"
          labelWidth="80"
      >
        <u--input
            v-model="data.shop_details"
            placeholder="请输入商品详情"


        />

      </u-form-item>
      <u-form-item
          prop="data.shop_details_img"
          class="sku"
          labelWidth="80"
      >
        <u-upload
            :fileList="fileList2"
            @afterRead="afterRead"
            @delete="deletePic"
            name="2"
            multiple
            :maxCount="9"
            action="链接地址"

        />
      </u-form-item>

      <u-form-item
          prop="data.shop_status"
          label="商品状态"
          labelWidth="80"
          class="white"
      >
        <u-radio-group
            v-model="data.shop_status"
            placement="row"

        >
          <u-radio shape="circle" label="上架"  name="0" />
          <u-radio shape="circle" label="下架" name="2"/>
        </u-radio-group>

      </u-form-item>
    </u--form>

    <u-picker :show="show" :columns="columns" keyName="classify_name" @confirm="confirm" @cancel="show=false"/>
  </view>
</template>

<script>
import {url} from '@/api/funeral'
import {uploadUrl} from "../../utils/request";
import {getStorage} from '@/utils/cookies'

export default {
  name: "new-commodity",
  data(){
    return{
      rules:{},
      data:{
        shop_name:'',
        classify_id:'',
        shop_sn:'',
        shop_img:'',
        shop_details:'',
        shop_status:0,
        is_package:'',
        shop_price:'',
        shop_stock:'',

      },
      show:false,
      columns:[],
      fileList2:[],
      fileList1:[]

    }
  },
  methods:{
    async getApi(){
      const {data}=  await this.$axios({url:url.get_shop_classify,})
      this.columns=[data]
      console.log(data)
    },
    confirm({value}){
      console.log(value)
      this.data.classify_id=value[0].id
      this.data.classify_name=value[0].classify_name
      this.show=false
    },
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
  },
  onLoad(){
    this.getApi()
  }
}
</script>

<style scoped lang="scss">
.to-add{
  color:#2a82e4;
  margin-left: 20rpx;
}
.white{
  background: #FFFFFF;
  padding: 0rpx 30rpx;
  margin: 20rpx 0;


  /deep/ .u-form-item__body{

  }
}
.form-head-wrap{
  padding: 10rpx 30rpx;
  position: relative;
  .tag{
    width: 5rpx;
    height: 25rpx;
    left: 10rpx;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    background: #2a82e4;
  }
}
.sku{
  background: #FFFFFF;
  padding: 0 30rpx ;
}
.top{
  padding:  10rpx 30rpx;
}
.u-upload, /deep/.u-upload__wrap{
  width: 300px;
  flex-wrap: wrap;
}
</style>