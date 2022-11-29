<!--
 * @Author: maolele02
 * @Date: 2022-11-20 11:56:34
 * @LastEditTime: 2022-11-29 13:08:23
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
            cnt: 0,
            begin_marker: null,
            end_marker: null,
            // pts:  [
            //         [116.362209, 39.887487],
            //         [116.422897, 39.878002],
            //         [116.372105, 39.90651],
            //         [116.428945, 39.89663]
            //     ],
            pts: null,
            polyline: null
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
                    center : [116.395577, 39.892257], //中心点坐标  郑州
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
                this.map.on('click', (e) => {  // 此处的回调函数定义为箭头函数时this才指向vc
                    this.cnt++;
                    if(this.cnt == 1){
                        let begin_lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
                        store.commit('BEGIN_LNGLAT', begin_lnglat)
                        this.begin_marker = new AMap.Marker({
                            position: e.lnglat,
                            title: '起点'
                        })
                        this.map.add(this.begin_marker)

                        this.getAddrStr(begin_lnglat, 1)
                    }
                    else if(this. cnt == 2){
                        let end_lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
                        store.commit('END_LNGLAT', end_lnglat)
                        this.cnt++
                        this.end_marker = new AMap.Marker({
                            position: e.lnglat,
                            title: '终点'
                        })
                        this.map.add(this.end_marker)
                        this.getAddrStr(end_lnglat, 2)
                        this.path_planning()
                        

                    //     let circle = new AMap.Circle({
                    //     center: new AMap.LngLat(113.65553,34.748764),  // 圆心位置
                    //     radius: 1000, // 圆半径
                    //     fillColor: 'red',   // 圆形填充颜色
                    //     strokeColor: '#fff', // 描边颜色
                    //     strokeWeight: 2, // 描边宽度
                    // });

                    // this.map.add(circle);
                        
                    }
                    else{
                        this.cnt = 0
                        if(this.begin_marker != null && this.end_marker != null){
                            this.map.remove(this.begin_marker)
                            this.map.remove(this.end_marker)
                            if(this.polyline != null){
                                this.map.remove(this.polyline)
                                this.pts = null
                            }
                        }
                        
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
        },
        path_planning(){
            this.$axios({
                method: 'post',
                url: 'http://localhost:5000/pts',
                data: {
                    origin: this.$store.state.begin_lnglat,
                    destination: this.$store.state.end_lnglat
                }
                //responseType: 'stream'
                }).then(res=> {
                    let res_data = res.data.data;
                            if(res.data.msg == '路径规划成功'){
                                this.pts = res_data['pts']
                                // console.log(typeof(this.$store.state.begin_lnglat))
                                // let orin = this.$store.state.begin_lnglat.split(',')
                                // let dest = this.$store.state.begin_lnglat.split(',')
                                // orin[0] = parseFloat(orin[0])
                                // orin[1] = parseFloat(orin[1])
                                // dest[0] = parseFloat(dest[0])
                                // dest[1] = parseFloat(dest[1])
                                // this.pts.unshift(orin)
                                // this.pts.push(dest)
                                // console.log(this.pts)
                                this.createPolyline()
                            }
                });
        },
        createPolyline(){
            if(true){
                // 创建折线实例
                this.polyline = new AMap.Polyline({
                path: this.pts,
                isOutline: true,
                outlineColor: '#ffeeff',
                borderWeight: 3,
                strokeColor: "#3366FF", 
                strokeOpacity: 1,
                strokeWeight: 6,
                // 折线样式还支持 'dashed'
                strokeStyle: "solid",
                // strokeStyle是dashed时有效
                strokeDasharray: [10, 5],
                lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
            });
            // polyline.show()
            // this.map.add(this.polyline)
            this.polyline.setMap(this.map)
            // console.log(this.pts)
            // let len = this.polyline.getLength()
            // let pt_arr = this.polyline.getPath()
            // console.log(this.polyline)
            // console.log('折线长度：'+ len)
            // console.log('点：'+ pt_arr)
            }
        },
        getAddrStr(addr_str, flag){
            this.$axios({
                method: 'post',
                url: 'http://localhost:5000/inverse_coding',
                data: {
                    code: addr_str
                }
            }).then(res=>{
                if(flag == 1){
                    store.commit('BEGIN_ADDR_STR', res.data.data.addr_str)
                    //console.log('addr_str1 ok')
                }
                else if(flag == 2){
                    store.commit('END_ADDR_STR', res.data.data.addr_str)
                }

            })
            
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