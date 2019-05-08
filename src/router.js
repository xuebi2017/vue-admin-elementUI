import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import DeliveryStates from "./views/weighManage/deliveryStates.vue";

Vue.use(Router);

const routes =  [
  {
    path: "/login",
    component: Login,
    name: "",
    // hidden: true
  },
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "/weighManage/deliveryStates",
        name: "deliveryStates",
        component: DeliveryStates
      }
    ]
  }
]
const router =  new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //NProgress.start();
  console.log('to--->',to)
  console.log('from--->',from)
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
