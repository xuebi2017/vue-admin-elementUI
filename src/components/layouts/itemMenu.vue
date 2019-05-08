<template>
  <el-menu-item
    v-if="item.children === null && item.entity"
    :index="item.entity.id"
    :route="item.entity.route"
  >
    <i :class="item.entity.icon"></i>
    <span slot="title">{{item.entity.name}}</span>
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
