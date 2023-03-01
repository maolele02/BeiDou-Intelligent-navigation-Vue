/*
 * @Author: maolele02
 * @Date: 2022-11-20 22:08:13
 * @LastEditTime: 2023-02-28 21:35:23
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
//import VideoPlayer from 'vue-video-player'
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

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://127.0.0.1:5001'  // dcenter对应于flask-sok
// }))

// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// import 'videojs-flash'
// import 'videojs-contrib-hls/dist/videojs-contrib-hls'

// videojs.options.flash.swf = "./video-js.swf";
// Vue.use(VueVideoPlayer)


new Vue({
  render: h => h(App),
  router: router,  // 将router/index.js配置成router
  store: store,  // 因为键和值相同，可直接简写为store
  Region: Region
}).$mount('#app')
