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
import menuData from './menuData'
import navMenu from './navMenu.vue'
export default {
  name: 'left-menu',
  data() {
    return {
      collapsed: false,
      menuData: menuData.children
    }
  },
  components: {
    navMenu
  },
  computed: {
    menuIcon() {
      return this.collapsed ? 'menu-unfold' : 'menu-fold'
    }
  },
  methods: {
    menuSelected(index, indexPath, item) {
      const _This = this
      if (item.route) {
        _This.$router.push({
          path: item.route
        })

        const pathName = []
        var proc = (m, id) => {
          if (m.entity.id == id && m.entity.name!=='首页'){
            return m.entity.name
          }
          for (let i = 0; (m.children && i != m.children.length); i++){
            const name = proc(m.children[i], id)
            if (name != null) {
              return name
            }
          }
          return null
        }
        indexPath.forEach(id => {
          _This.menuData.forEach(m => {
            const name = proc(m, id)
            if (name != null) {
              pathName.push(name)
            }
          })
        })
        this.$emit('getBreadCrumb', pathName)
      }
    },
    menuStateChange() {
      this.collapsed = !!!this.collapsed
    }
  }
}
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
