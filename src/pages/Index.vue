<!--
 * @Author: maolele02
 * @Date: 2022-11-20 22:50:56
 * @LastEditTime: 2022-11-21 22:19:21
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
	        <!-- <router-view name="MyOrder"></router-view> -->
          <!-- <router-view name="Reserving"></router-view>
          <router-view name="Reserving"></router-view>
          <router-view name="Space"></router-view> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from '../components/LeftMenu.vue'
export default {
  name: 'Index',
  components: {
    LeftMenu
  },
  // 进入该路由前执行
  beforeRouteEnter(to, from, next){
    next()
  }
}
</script>

<style>

</style>