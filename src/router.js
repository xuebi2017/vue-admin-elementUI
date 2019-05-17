import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import DeliveryStates from "./views/weighManage/deliveryStates.vue";
import store from "./store";

Vue.use(Router);

const constantRoutes = [
  {
    path: "/login",
    name: "登录页",
    component: Login
    // hidden: true
  },
  {
    path: "/",
    name: "首页",
    component: Home
  },
  {
    path: "/weighManage",
    name: "老虎磅房",
    component: Home,
    children: [
      {
        path: "/deliveryStates",
        name: "发货状态管理",
        component: DeliveryStates
      }
    ]
  }
];
const asyncRoutes = [];
const router = new Router({
  // mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

router.beforeEach((to, from, next) => {
  // console.log('to--->',to)
  // console.log('from--->',from)
  store.dispatch("generateRoutes");
  if (to.path == "/login") {
    sessionStorage.removeItem("user");
  }
  let user = JSON.parse(sessionStorage.getItem("user"));
  if (!user && to.path != "/login") {
    next({ path: "/login" });
  } else {
    next();
  }
});

export { router, constantRoutes };
