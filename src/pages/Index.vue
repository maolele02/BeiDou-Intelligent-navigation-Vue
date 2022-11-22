<!--
 * @Author: maolele02
 * @Date: 2022-11-20 22:50:56
 * @LastEditTime: 2022-11-22 22:47:10
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\pages\Index.vue
-->
<template>
  <div id="index">

    <div class="container-fluid">
      <div class="row">
        <LeftMenu msg="Welcome to Your Vue.js App"/>
        <div class="col-md-10">
          <!--指定组件的呈现位置-->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from '../components/LeftMenu.vue'
import axios from 'axios'
export default {
  name: 'Index',
  components: {
    LeftMenu
  },
  // 进入该路由前执行
  beforeRouteEnter(to, from, next){
      console.log("index")

      axios.interceptors.response.use(
        function (response){
          return response;
      }, function (error){  // 请求失败拦截器
          return Promise.reject(error);
      })
      axios({  // 让后端做token校验
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        method: 'get',
        url: 'http://localhost:5000/verify',
      }).then(res=> {
        console.log('index msg: ' + res.data.msg)
        next();  // 放行
      }).catch(reason => {
        return next({
          path: '/login'  // 重定向
        })
      });
    }
}
</script>

<style>

</style>