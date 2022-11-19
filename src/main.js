import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Region from 'v-region'
import router from './router/index.js'
import 'bootstrap/dist/css/bootstrap.css'  // 导入bootstrap.css样式(从node_modules目录下开始找)
import axios from 'axios'
// import plugins from '/plugins'  // 导入插件

Vue.config.productionTip = false
// 全局挂载axios
Vue.prototype.$axios = axios
// 应用过VueRouter插件
Vue.use(VueRouter)
// 应用Region插件，用于使用地址选择框
Vue.use(Region)
new Vue({
  render: h => h(App),
  router: router,
  Region: Region
}).$mount('#app')
