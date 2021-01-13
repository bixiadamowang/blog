import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  // 管理员登录
  {
    path: "/",
    redirect:'/register',
  },
  {
    path: "/register",
    component: () => import("@/views/register"),
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
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