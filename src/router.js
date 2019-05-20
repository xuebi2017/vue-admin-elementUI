import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import store from "./store";

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
    // name: "首页",
    component: Home,
    // icon: "tck iconfont icon-lhlpf"
    redirect: "/weighManage",
    hidden: true
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
  }
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
        component: () => import('./views/salesPlan/salesPlanManage.vue'),
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
  let user = JSON.parse(sessionStorage.getItem("user"));
  console.log('user--->',user)
  let userInfo = store.getters.getUserInfo
  console.log('userInfo--->',userInfo)
  store.dispatch("generateRoutes").then((accessRoutes) => {
    //为了不在登录页将user === null 赋值给userInfo
    if(Object.keys(userInfo).length <= 0  && to.path !== "/login") {
      //避免造成死循环
      store.commit('setUserInfo', user)
      router.addRoutes(accessRoutes)
    }
  })
  if (to.path == "/login") {
    sessionStorage.removeItem("user");
  }
  if (!user && to.path != "/login") {
    next({ path: "/login" });
  } else {
    next();
  }
});

export { router, constantRoutes, asyncRoutes };
