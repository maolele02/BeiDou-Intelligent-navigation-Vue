<template>
  <div id="map_container">
    <div id="container">
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'  // 导入高德组件
window._AMapSecurityConfig = {
    securityJsCode: '23a606b71f8db5f3ec3416efb8296077'
}
export default {
    name: 'MapContainer',
    mounted(){
        this.initMap()
        console.log('ok')
    },
    data() {
        return {
            map : null,
            mouseTool : null,
            overlays : [],
            auto : null,
            placeSearch : null, 
        }
    },
    methods : {
        initMap() {
            AMapLoader.load({
                "key": "5fc326e248f57051d25fd0c2e26e8a86", 
                "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                "plugins": [''],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap)=>{
                // 初始化地图
                this.map = new AMap.Map('container',{
                    viewMode : "2D",  //  是否为3D地图模式
                    zoom : 13,   // 初始化地图级别
                    center : [113.65553,34.748764], //中心点坐标  郑州
                    resizeEnable: true
                });
            }).catch(e => {
                console.log(e);
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