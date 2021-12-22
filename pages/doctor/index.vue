<template>
  <view class="doctor_home">
    <Doctor />
  </view>
</template>

<script>
import Doctor from './doctor.vue'
export default {
  components: {
    Doctor
  }
}
</script>

<style lang="scss" scoped>
.doctor_home{
  padding-bottom: 40px;
}
</style>