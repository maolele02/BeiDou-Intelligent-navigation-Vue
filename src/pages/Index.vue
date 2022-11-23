<!--
 * @Author: maolele02
 * @Date: 2022-11-20 22:50:56
 * @LastEditTime: 2022-11-23 21:36:21
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
import store from '../store/index.js'
import axios from 'axios'
export default {
  name: 'Index',
  components: {
    LeftMenu
  },
  // 进入该路由前执行
  beforeRouteEnter(to, from, next){
      // console.log("index")

      axios.interceptors.response.use(
        function (response){
          return response;
      }, function (error){  // 请求失败拦截器
          return Promise.reject(error);
      })
      let token = localStorage.getItem('token')
      let uid = localStorage.getItem('uid')
      let url = 'http://localhost:5000/user/'+uid
      console.log(url)
      axios({  // 让后端做token校验
        headers: {
          'Authorization': 'Bearer ' + token
        },
        method: 'get',
        url: url,
      }).then(res=> {
          console.log('uid: '+uid)
          let username = res.data.data.username
          let name = res.data.data.name
          let tel = res.data.data.tel
          let mail = res.data.data.mail
          let addr_pr = res.data.data.addr_pr
          let addr_city = res.data.data.addr_city
          let addr_town = res.data.data.addr_town
          let addr_district = res.data.data.addr_district
          let addr_street = res.data.data.addr_street

          console.log('begin')
          // 存vuex
          store.commit('TOKEN', token)
          store.commit('UID', uid)
          store.commit('USERNAME', username)
          store.commit('NAME', name)
          store.commit('TEL', tel)
          store.commit('MAIL', mail)
          store.commit('ADDR_PR', addr_pr)
          store.commit('ADDR_CITY', addr_city)
          store.commit('ADDR_TOWN', addr_town)
          store.commit('ADDR_DISTRICT', addr_district)
          store.commit('ADDR_STREET', addr_street)
          console.log('end')
          next();  // 放行
      }).catch(reason => {
        console.log('index false')
        return next({
          path: '/login'  // 重定向
        })
      });
    }
}
</script>

<style>

</style>