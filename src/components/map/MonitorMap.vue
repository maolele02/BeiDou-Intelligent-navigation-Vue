<!--
 * @Author: maolele02
 * @Date: 2022-11-20 11:56:34
 * @LastEditTime: 2022-12-01 22:43:03
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\components\map\MonitorMap.vue
-->
<template>
  <div id="map_container">
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'  // 导入高德组件
window._AMapSecurityConfig = {
    securityJsCode: '23a606b71f8db5f3ec3416efb8296077'
}
export default {
    name: 'MonitorMap',
    props: {
        x:{
            type: String,
      	    required: true
        },
        y:{
            type: String,
      	    required: true
        }
  },
    mounted(){
        this.initMap()
    },
    created(){
        let xx = parseFloat(this.x)
        let yy = parseFloat(this.y)
        this.point = [xx, yy]
    },
    data() {
        return {
            map : null,
            point: null,
            marker: null
        }
    },
    methods : {
        initMap() {
            AMapLoader.load({
                "key": "5fc326e248f57051d25fd0c2e26e8a86", 
                "version": "2.0",
                "plugins": [''],
            }).then((AMap)=>{
                // 初始化地图
                this.map = new AMap.Map('container',{
                    viewMode : "2D", 
                    zoom : 13,
                    center : [116.395577, 39.892257],  // [116.395577, 39.892257]
                    resizeEnable: true
                });

                // this.map.addControl(new AMap.MapType())

                this.marker = new AMap.Marker({
                    position: [116.395577, 39.892257],
                    title: '当前位置'
                })
                this.map.add(this.marker)
            }).catch(e => {
                // console.log(e);
            });
        }
    }
}
</script>

<style scoped>
#container{
    padding:0px;
    margin: 0px;
    width: 100%;
    height: 600px;
}

</style>