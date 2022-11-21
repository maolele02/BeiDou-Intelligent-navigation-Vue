<template>
  <div id="app">  
    <!--指定组件的呈现位置-->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data(){
    return{

    }
  },
  created(){
    this.$axios.defaults.withCredentials = true  // 允许携带cookie
  },
}
</script>

<style>
body{
    background-color: rgb(241,242,244);
}
#top_hr {
    height: 2px;
    background-color: rgb(213, 210, 210);
    border: none;
    box-shadow: 10px 10px 10px #dedede;
    border-radius:10px;
    margin-top: -1px;
}
.mainBox{
    margin-top: 20px;
}
.shadow{
    /* 设置阴影 */
    background-color: white;
    border-radius:10px;
    box-shadow: 10px 10px 10px #dedede;
    height: 950px;
}
</style>
