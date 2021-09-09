import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from "axios";

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import instance from "./axios-init";
Vue.prototype.$http = instance;

const Base64 = require('js-base64').Base64
const sha256 = require('js-sha256').sha256

Vue.config.productionTip = false


router.beforeEach((to, form, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  Base64,
  sha256,
  axios,
  render: h => h(App)
}).$mount('#app')
