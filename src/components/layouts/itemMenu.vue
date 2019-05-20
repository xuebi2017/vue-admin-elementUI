<template>
  <el-menu-item
    v-if="!item.children && !item.hidden"
    :index="item.path"
    :route="item.path"
  >
    <i :class="item.meta.icon"></i>
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
