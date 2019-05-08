<template>
  <div class="bread-class">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/'}">
        <i class="breadCrumbIcon iconfont icon-home"></i>首页
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="list in currentPath" :key="list.value">{{list}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: ['currentPath']
}
</script>
<style lang="scss" scoped>
$breadcrumb-height: 40px;
.bread-class {
  display: flex;
  // height: var(--breadcrumb-height);
  height: $breadcrumb-height;
  line-height: $breadcrumb-height;
  background-color: #fff;
}
.el-breadcrumb {
  line-height: $breadcrumb-height;
  padding-left: 20px;
}
.breadCrumbIcon {
  font-size: 13px;
  margin-right: 2px;
}
</style>
