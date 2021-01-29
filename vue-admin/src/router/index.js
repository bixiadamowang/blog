import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/login",
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
  },
  { path: "*", redirect: "/404" },
  {
    path: '/index',
    name: 'index',
    meta: { title: '系统管理' },
    component: () => import('@/views/index'),
    children: [
      {
        path: '/index/user', name: 'user', component: () => import('@/views/system/user'),
        meta: { title: '用户管理' },
      },
      {
        path: '/index/photo', name: 'photo', component: () => import('@/views/system/photo'),
        meta: { title: '照片管理' },
      },
      {
        path: '/index/blog', name: 'blog', component: () => import('@/views/system/blog'),
        meta: { title: '博客管理' },
      },
      // {
      //   path: '/index/role', name: 'role', component: () => import('@/views/system/role'),
      //   meta: { title: '角色管理' },
      // },
    ]
  },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
