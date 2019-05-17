<template>
  <el-submenu v-if="item.children" :index="item.path">
    <template slot="title">
      <i :class="item.icon"></i>
      <span slot="title">{{item.name}}</span>
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
