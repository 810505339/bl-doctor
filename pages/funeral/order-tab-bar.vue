<template>
  <u-tabbar
      :value="1"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
  >
    <u-tabbar-item :text="item.text" :icon="item.icon"  v-for="item in list" :key="item.text"/>

  </u-tabbar>
</template>

<script>
export default {
  name: "order-tab-bar",
  data(){
    return{
      list:[
          {text:'工作台',icon:'home'},
          {text:'管理',icon:'list'},
          {text:'咨询消息',icon:'more-circle'},
          {text:'我',icon:'account'},
      ]
    }
  }
}
</script>

<style scoped>

</style>