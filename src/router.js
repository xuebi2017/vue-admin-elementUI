import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import store from "./store";
import NProgress from "nprogress";

Vue.use(Router);

const constantRoutes = [
  {
    path: "/login",
    name: "登录页",
    component: Login,
    meta: {
      icon: "tck iconfont icon-lhlpf"
    },
    hidden: true
  },
  {
    path: "/",
    name: "首页",
    component: Home,
    meta: {
      icon: "tck iconfont icon-lhlpf"
    },
    redirect: "/weighManage",
    hidden: true
  },
  {
    path: "/error",
    component: Home,
    name: "错误页面",
    meta: {
      title: "Error Pages",
      icon: "tck iconfont icon-lhlpf"
    },
    children: [
      {
        path: "/401",
        //路由懒加载
        component: () => import("@/views/error-page/401.vue"),
        name: "401",
        meta: { title: "401", icon: "tck iconfont icon-lhlpf", noCache: true }
      },
      {
        path: "/404",
        component: () => import("@/views/error-page/404.vue"),
        name: "404",
        meta: { title: "404", icon: "tck iconfont icon-lhlpf", noCache: true }
      }
    ]
  },
  {
    path: "/weighManage",
    name: "老虎磅房",
    component: Home,
    meta: {
      icon: "tck iconfont icon-lhlpf"
    },
    children: [
      {
        path: "/deliveryStates",
        name: "发货状态管理",
        component: () => import("./views/weighManage/deliveryStates.vue"),
        meta: {
          icon: "tck iconfont icon-lhlpf"
        }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];
const asyncRoutes = [
  {
    path: "/salesPlan",
    name: "销售中心",
    component: Home,
    meta: {
      icon: "tck iconfont icon-lhlpf",
      roles: ["editor"]
    },
    children: [
      {
        path: "/salesPlanManage",
        name: "运输计划管理",
        component: () => import("./views/salesPlan/salesPlanManage.vue"),
        meta: {
          icon: "tck iconfont icon-lhlpf",
          roles: ["editor"]
        }
      }
    ]
  }
];
const router = new Router({
  // mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  let user = JSON.parse(sessionStorage.getItem("user"));
  let userInfo = store.getters.getUserInfo;
  if (to.path !== "/login") {
    store.dispatch("generateRoutes").then(accessRoutes => {
      //为了不在登录页将user === null 赋值给userInfo
      if (Object.keys(userInfo).length <= 0) {
        //避免造成死循环
        store.commit("setUserInfo", user);
        router.addRoutes(accessRoutes);
      }
    });
  } else {
    sessionStorage.removeItem("user");
  }
  if (!user && to.path != "/login") {
    next({ path: "/login" });
    NProgress.done();
  } else {
    next();
    NProgress.done();
  }
});

export { router, constantRoutes, asyncRoutes };
