<template>
  <el-menu-item
    v-if="!item.children"
    :index="item.path"
    :route="item.path"
  >
    <i :class="item.icon"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>
</template>
<script>
export default {
  name: 'item-menu',
  props: ['item'],
  methods: {}
};
</script>
<style scoped>
</style>
