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
}
</script>

<style>

</style>