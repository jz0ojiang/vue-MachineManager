import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "首页",
    component: () => import("@/views/homepage"),
    meta: { title: "首页", icon: "el-icon-download", hidden: true }
  },
  {
    path: "/input",
    name: "耗材入库",
    component: () => import("@/views/input"),
    meta: { title: "耗材入库", icon: "el-icon-download", hidden: true }
  },
  {
    path: "/output",
    name: "耗材出库",
    component: () => import("@/views/output"),
    meta: { title: "耗材出库", icon: "el-icon-download", hidden: true }
  },
  {
    path: "/storage",
    name: "耗材库存",
    component: () => import("@/views/storage"),
    meta: { title: "耗材库存", icon: "el-icon-download", hidden: true }
  },
  {
    path: "/repo",
    name: "仓库管理",
    component: () => import("@/views/repo"),
    meta: { title: "仓库管理", icon: "el-icon-download", hidden: true }
  },
  {
    path: "/logview",
    name: "查看日志",
    component: () => import("@/views/logview"),
    meta: { title: "查看日志", icon: "el-icon-download", hidden: true }
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login"),
    meta: { title: "登录", icon: "el-icon-download", hidden: true }
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/404"),
    meta: { title: "未找到页面", icon: "el-icon-download", hidden: true }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
