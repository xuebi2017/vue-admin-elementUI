<template>
  <div class="header">
    <div class="header-content">
      <img src="@/assets/img/logo.png" alt="logo">
      <drop-down></drop-down>
    </div>
  </div>
</template>
<script>
import dropDown from './dropDown.vue'
export default {
  components: {
    dropDown
  }
}
</script>
<style lang="scss" scoped>
$header-height: 80px;
.header {
  height: $header-height;
  background-color: #314ea1;
}
.header-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px);
  margin: 0 30px 0 0;
}
</style>
