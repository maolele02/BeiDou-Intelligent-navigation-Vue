/*
 * @Author: maolele02
 * @Date: 2022-11-20 22:08:13
 * @LastEditTime: 2022-11-30 22:02:16
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Region from 'v-region'
import VueCookies from 'vue-cookies'
import router from './router/index.js'
import store from './store/index.js'
import 'bootstrap/dist/css/bootstrap.css'  // 导入bootstrap.css样式(从node_modules目录下开始找)
import axios from 'axios'

// import plugins from '/plugins'  // 导入插件

Vue.config.productionTip = false
// Vue.config.devtools = true;
// 全局挂载axios
Vue.prototype.$axios = axios
// 应用过VueRouter插件
Vue.use(VueRouter)
// 应用Region插件，用于使用地址选择框
Vue.use(Region)
// 应用Cookie插件
Vue.use(VueCookies)


new Vue({
  render: h => h(App),
  router: router,  // 将router/index.js配置成router
  store: store,  // 因为键和值相同，可直接简写为store
  Region: Region
}).$mount('#app')
