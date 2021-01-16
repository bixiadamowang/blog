import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/404",
    component: () => import("@/components/404"),
  },
  { path: "*", redirect: "/404" },
  {
    path: "/login",
    component: () => import("@/components/login/login"),
  },
  {
    path: "/register",
    component: () => import("@/components/login/register"),
  },
  {
    path: "/",
    component: () => import("@/components/Welcome"),
    register: '/blog',
    children:[
      {path:'/blog', component:() => import('@/views/blog')}
    ]
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