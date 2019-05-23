<template>
  <div>
    <header-part></header-part>
    <div class="main-container">
      <left-menu @getBreadCrumb="getBreadCrumb"></left-menu>
      <div class="content">
        <bread-crumb :currentPath="breadCrumb"></bread-crumb>
        <transition name="page">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <footer-part></footer-part>
  </div>
</template>
<script>
import headerPart from "@/components/layouts/header.vue";
import leftMenu from "@/components/layouts/leftMenu.vue";
import footerPart from "@/components/layouts/footer.vue";
import breadCrumb from "@/components/layouts/breadCrumb.vue";
export default {
  name: "home",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      breadCrumb: []
    };
  },
  props: {},
  components: {
    headerPart,
    leftMenu,
    footerPart,
    breadCrumb
  },
  computed: {},
  methods: {
    getBreadCrumb(data) {
      this.breadCrumb = data;
    },
    reload() {
      // this.isRouterAlive = false;
      // setTimeout(() => {
      //   this.$nextTick(() => (this.isRouterAlive = true));
      // }, 500);
    }
  }
};
</script>
<style lang="scss">
@import "//at.alicdn.com/t/font_1144546_vrspiai46e.css";
@import "@/assets/scss/site.scss";
</style>

<style lang='scss' scoped>
$header-height: 80px;
$content-background-color: #f0f3f6;
.main-container {
  display: flex;
  // calc中不能使用$
  min-height: calc(100vh - 80px);
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $content-background-color;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>

