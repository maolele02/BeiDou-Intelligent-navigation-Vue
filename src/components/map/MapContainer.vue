<!--
 * @Author: maolele02
 * @Date: 2022-11-20 11:56:34
 * @LastEditTime: 2022-11-25 16:05:29
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\components\map\MapContainer.vue
-->
<template>
  <div id="map_container">
    <div id="myPageTop">
    <table>
        <tr>
            <td>
                <label>请输入关键字：</label>
            </td>
        </tr>
        <tr>
            <td>
                <input id="tipinput"/>
            </td>
        </tr>
    </table>
</div>
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'  // 导入高德组件
import store from '../../store/index.js'
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
            cnt: 0
        }
    },
    methods : {
        initMap() {
            AMapLoader.load({
                "key": "5fc326e248f57051d25fd0c2e26e8a86", 
                "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                "plugins": ['AMap.Geolocation', 'AMap.MapType', 'AMap.AutoComplete','AMap.PlaceSearch'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap)=>{
                // 初始化地图
                this.map = new AMap.Map('container',{
                    viewMode : "2D",  //  是否为3D地图模式
                    zoom : 13,   // 初始化地图级别
                    center : [113.65553,34.748764], //中心点坐标  郑州
                    resizeEnable: true
                });
                // ip定位：通过尝试发现，在使用国内ip进行定位时无法定位，在使用美国等一些国家的ip时能够实现ip定位
                // 尚未找到解决方案
                  let geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量
                    offset: [10, 20],
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,     
                    //  定位按钮的排放位置,  RB表示右下
                    position: 'RB'
                })
                this.map.addControl(new AMap.Geolocation(geolocation))
                geolocation.getCurrentPosition(function(status,result){
                        if(status=='complete'){
                            onComplete(result)
                        }else{
                            onError(result)
                        }
                });

                function onComplete (data) {
                    // data是具体的定位信息
                    // console.log(data)
                }

                function onError (data) {
                    // 定位出错
                    // console.log('ip定位失败')
                }

                this.map.addControl(new AMap.MapType())

                this.auto = new AMap.AutoComplete({
                    // input 为绑定输入提示功能的input的DOM ID
                    input: 'tipinput'
                })

                this.placeSearch = new AMap.PlaceSearch({
                    map: this.map
                });  //构造地点查询类

                this.auto.on("select", this.select);//注册监听，当选中某条记录时会触发

                    //为地图注册click事件获取鼠标点击出的经纬度坐标
                this.map.on('click', function(e) {
                    //localStorage.getItem('token')
                    if(this.cnt == 0){
                        let begin_lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
                        store.commit('BEGIN_LNGLAT', begin_lnglat)
                        this.cnt++
                    }
                    else if(this. cnt == 1){
                        let end_lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
                        store.commit('END_LNGLAT', end_lnglat)
                        this.cnt++
                    }
                    else{
                        this.cnt = 0
                        store.commit('BEGIN_LNGLAT', '')
                        store.commit('END_LNGLAT', '')
                    }
                    
                });
                

            }).catch(e => {
                // console.log(e);
            });
        },
        select(e) {
            this.placeSearch.setCity(e.poi.adcode);
            this.placeSearch.search(e.poi.name);  //关键字查询
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