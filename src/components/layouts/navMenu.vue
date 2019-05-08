<template>
  <div class="navMenu">
    <template v-for="navMenu in navMenus">
      <item-menu :item="navMenu"></item-menu>
      <sub-menu :item="navMenu"></sub-menu>
    </template>
  </div>
</template>
<script>
import itemMenu from './itemMenu.vue'
export default {
  name: 'nav-menu',
  props: ['navMenus'],
  data() {
    return {}
  },
  components: {
    itemMenu,
  },
  beforeCreate: function () {
  // 官方文档给出的是require
  // this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
  // 在基于vue-cli@2.8.1按照上面的写法还是会报错
  // Failed to mount component: template or render function not defined.
  // 所以我们应该改为基于es6的写法异步加载一个组件如下
    this.$options.components.subMenu = () => import('./subMenu.vue')
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
<style>
.left-menu-collapse span,
.left-menu-collapse .el-submenu__icon-arrow {
  display: none;
}
</style>

