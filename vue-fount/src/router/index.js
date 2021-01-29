import Vue from "vue";
import Router from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/404",
    component: () => import("@/components/404"),
  },
  { path: "*", redirect: "/404" },
  {
    path: "/",
    component: () => import("@/views/index"),
    redirect: '/blog',
    children:[
      {path: '/blog', component: () => import('@/views/blog/index')}
    ]
  },
  // {
  //   path: "/index",
  //   component: () => import("@/views/index"),
  // },
  {
    path: "/register",
    component: () => import("@/components/login/register"),
  },
  {
    path: "/login",
    component: () => import("@/components/login/login"),
  },
];

const createRouter = () =>
  new Router({
    mode: 'hash', // require service support
    routes: constantRoutes
  });
NProgress.configure({
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})
const router = createRouter();
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  // 若加载时间长且不定，担心进度条走完都没有加载完，可以调用
  NProgress.inc();//这会以随机数量递增，且永远达不到100%，也可以设指定增量
  next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})
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