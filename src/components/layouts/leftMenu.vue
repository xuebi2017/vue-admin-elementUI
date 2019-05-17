<template>
  <section :class="{'left-menu': !collapsed, 'left-menu-collapse': collapsed}">
    <div :class="{'sider-button':!collapsed, 'sider-button-collapse': collapsed}">
      <a-icon :type="menuIcon" class="menu-fold-icon" @click="menuStateChange()"/>
    </div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="menuSelected"
      text-color="#3C3F41"
      active-text-color="#20a0ff"
      :collapse="collapsed"
      :collapse-transition="false"
    >
      <nav-menu :navMenus="menuData"></nav-menu>
    </el-menu>
  </section>
</template>
<script>
import { mapState } from "vuex";
import navMenu from "./navMenu.vue";
export default {
  name: "left-menu",
  data() {
    return {
      collapsed: false,
      pathName: ''
    };
  },
  components: {
    navMenu
  },
  computed: {
    ...mapState({
      menuData: state => state.routes
    }),
    menuIcon() {
      return this.collapsed ? "menu-unfold" : "menu-fold";
    }
  },
  methods: {
    getPathName(menuData, path) {
      menuData.forEach(m => {
        if (m.path === path) {
          this.pathName = m.name
        }else if(m.children) {
          this.pathName = this.getPathName(m.children, path)
        }
      });
      return this.pathName
    },
    menuSelected(index, indexPath, item) {
      if (item.route) {
        this.$router.push({
          path: item.route
        });
        let pathName = [];
        indexPath.forEach(path => {
          let menuPath = this.getPathName(this.menuData, path)
          menuPath && pathName.push(menuPath)
        });
        this.$emit("getBreadCrumb", pathName);
      }
    },
    menuStateChange() {
      this.collapsed = !!!this.collapsed;
    }
  }
};
</script>
<style lang="scss" scoped>
$left-menu: 230px;
.left-menu {
  width: $left-menu;
  transition: all 0.5s;
}
.left-menu-collapse {
  width: 65px;
}
.sider-button,
.sider-button-collapse {
  width: 64px;
  height: 50px;
  line-height: 50px;
  margin: 0px 20px 0 166px;
  text-align: center;
  cursor: pointer;
}
.sider-button {
  transition: all 0.5s;
}
.sider-button-collapse {
  margin: 0;
}
.left-menu,
.left-menu-collapse {
  border-right: solid 1px #e6e6e6;
}
.el-menu {
  border: none;
}
</style>
