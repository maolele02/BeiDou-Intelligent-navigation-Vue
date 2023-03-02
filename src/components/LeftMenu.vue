<!--
 * @Author: maolele02
 * @Date: 2022-11-28 21:56:38
 * @LastEditTime: 2023-03-02 21:57:24
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\components\LeftMenu.vue
-->
<template>
  <div>
    <div class="col-md-2 menu" id="leftBox">
      <img src="../assets/BeiDouLogo.png" width="100px" height="100px" alt="logo">
      <ul class="nav nav-pills nav-stacked" id="menuBox">
          <li><router-link active-class="active" to="/index/delivery">我的配送</router-link></li>
          <li><router-link active-class="active" to="/index/reserving">配送预约</router-link></li>
          <li><router-link active-class="active" to="/index/space">个人中心</router-link></li>
          <li><router-link v-if="view == 1" active-class="active" to="/index/ordermanage">订单管理</router-link></li>
          <li><router-link v-if="view == 1" active-class="active" to="/index/usermanage">用户管理</router-link></li>
          <!-- <li><router-link v-if="view == 1" active-class="active" to="/test">test</router-link></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftMenu',
  props: {
    view:{
        type: Number,
      	required: true
      },
  },
    data(){
    return {

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#leftBox{
    background-color: white;
    border-radius:10px;
    box-shadow: 10px 10px 10px #dedede;
    height: 1000px;
}
#menuBox > li{
    font-size: larger;
}
</style>
