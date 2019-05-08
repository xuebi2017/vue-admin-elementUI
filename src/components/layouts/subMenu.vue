<template>
  <el-submenu v-if="item.children && item.entity" :index="item.entity.id">
    <template slot="title">
      <i :class="item.entity.icon"></i>
      <span slot="title">{{item.entity.name}}</span>
    </template>
    <nav-menu :navMenus="item.children"></nav-menu>
  </el-submenu>
</template>
<script>
import navMenu from './navMenu.vue';
export default {
  props: ['item'],
  components: {
    navMenu
  },
  methods: {}
};
</script>
<style scoped>
</style>
