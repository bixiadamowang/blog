import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/404",
    component: () => import("@/views/404"),
  },
  { path: "*", redirect: "/404" },
  // 管理员登录
  {
    path: "/",
    component: () => import("@/components/Welcome"),
  },
  {
    path: "/index",
    component: () => import("@/views/index"),
  },
  {
    path: "/register",
    component: () => import("@/views/login/register"),
  },
  {
    path: "/login",
    component: () => import("@/views/login/login"),
  },
];

const createRouter = () =>
  new Router({
    mode: 'hash', // require service support
    routes: constantRoutes
  });

const router = createRouter();

const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;