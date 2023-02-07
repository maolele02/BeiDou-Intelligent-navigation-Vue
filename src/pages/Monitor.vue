<!--
 * @Author: maolele02
 * @Date: 2022-12-01 21:11:44
 * @LastEditTime: 2023-02-07 17:33:48
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\pages\Monitor.vue
-->
<template>
  <div id="moni_container">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-5 col-md-offset-1">

                <div class="row">
                    <div class="col-md-12">
                        <button class="btn"  @click="ternView($event,1)">监控</button>
                        <button class="btn map_btn"  @click="ternView($event,2)">地图</button>
                    </div>
                </div>

                <div class="row" v-show="view == 1">
                    <div class="col-md-12 Box monitor_map marginTop30">

                        <!-- <video muted autoplay="true" controlsList='nofullscreen nodownload noremote footbar' width="760" style="margin-top: 28px;">
                            <source  src="./video/v1.mp4" type="video/mp4" />
                            <object data="./video/v1.mp4" width="320" height="240">
                            <embed src="./video/Sail-Away.swf" width="320" height="240" />
                                你的浏览器不支持该视频格式。 Your browser does not support this video format.
                            </object>
                        </video> -->

                        <MonitorVideo></MonitorVideo>

                    </div>
                </div>

                <div class="row" v-show="view == 2">
                    <MonitorMap :x="nowX" :y="nowY"/>
                </div>

                    <div class="row Box marginTop30" v-show="view == 1">
                        <div class="col-md-12">
                            <div class="row">
                                <!--前后左右控制按钮-->
                        <div class="col-md-6 col-md-offset-1">
                        
                            <div class="row">
                                <div class="col-md-3 col-md-offset-3">
                                    <button class=" btn btn-primary controllBtn marginTop10">前</button>
                                </div>
                            </div>
            
                            <div class="row">
                                <div class="col-md-3">
                                    <button class="btn btn-primary controllBtn marginTop10">左</button>
                                </div>
                                <div class="col-md-3">
                                    <button class="btn btn-warning controllBtn marginTop10">鸣笛</button>
                                </div>
                                <div class="col-md-3">
                                    <button class="btn btn-primary controllBtn marginTop10">右</button>
                                </div>
                            </div>
            
                            <div class="row">
                                <div class="col-md-3 col-md-offset-3">
                                    <button class="btn btn-primary controllBtn marginTop10">后</button>
                                </div>
                            </div>
                        </div>
                        <!--前后左右控制按钮结束-->
    
                        <div class="col-md-4 col-md-offset-1">
                            <div class="marginTop65">
                                <button class="btn btn-warning controllBtn">刹车</button>
                            </div>
                        </div> 
                            </div>
                        </div>
                        
                    </div>
            </div>

            <!--右侧显示温湿度图表-->
            <div class="col-md-3 col-md-offset-1 marginTop30">
                <!--温湿度显示-->
                <div class="row Box">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                                <b>当前温度：</b><span v-show="fakeTemp != ''">{{showFakeTemp()}}&deg;</span>
                            </div>
                        </div>

                        <div class="row marginTop30">
                            <div class="col-md-6">
                                <b>当前湿度：</b><span v-show="fakeHum != ''">{{showFakeHum()}}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="row Box marginTop30">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                                <b>物流状态：</b><span>正常</span>
                            </div>
                        </div>

                        <div class="row marginTop30">
                            <div class="col-md-6">
                                <b>运送车牌号：</b><span>11230</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!--当前位置显示-->
                <div class="row Box marginTop30" >
                    <div class="col-md-12">
                        <span style="display: block; height: 35px;"><b>当前位置：</b>湖南省永州市零陵区杨梓塘路123号</span>
                    </div>
                </div>

                <div class="row" style="margin-top: 60px;">
                    <div class="col-md-12">
                        <img src="../assets/BeiDouLogo.png" alt="北斗云" width="300px">
                    </div>
                </div>

            </div>
        </div>
    </div>
  </div>
</template>

<script>
import MonitorMap from '../components/map/MonitorMap.vue'
import MonitorVideo from '../components/video/MonitorVideo.vue'
export default {
    name: 'Monitor',
    components: {
        MonitorMap,
        MonitorVideo
  },
    data(){
        return{
            nowX: '112.862636',//112.862636,27.883359
            nowY: '27.883359',
            view: 1,
            NowPosition: 'null',
            NowHum: null,
            NowTemp: null,


            fakeTemp: '',
            fakeHum: '',
            fakeTempList: ['21.21','21.22','21.23', '21.24', '20.25', '21.04', '21.12', '20.31','20.32','20.26'],
            fakeHumList: ['67.12', '67.15', '67.13', '67.10', '67.21', '67.30', '67.41', '67.53', '67.28', '67.24'],
            timer: null,
        }
    },
    methods:{
        getNowPointer(){

        },
        ternView(event, num){
            this.view = num;
        },
        setFakeTemp(){
            let num1 = Math.random()*10;
            let num2 = Math.random()*10;
            let index1 = Math.floor(num1);
            let index2 = Math.floor(num2);
            this.fakeTemp = this.fakeTempList[index1];
            this.fakeHum = this.fakeHumList[index2];
        },
        showFakeTemp(){
            return this.fakeTemp;
        },
        showFakeHum(){
            return this.fakeHum;
        }
    },
    created(){
        this.timer = setInterval(() => {
            this.setFakeTemp();
            //console.log(this.fakeTemp);
            //do something
            //定时器的回调函数中需要注意 this 指向
        }, 1000)
        this.getNowPointer()
    },
    beforeDestroy () {
        clearInterval(this.timer)
    },
}
</script>

<style scoped>
#moni_container{
    margin-top: 35px;
}
.map_btn{
    margin-left: 10px;
}
button.controllBtn{
    width: 50px;
    height: 50px;
}
.marginTop10{
    margin-top: 10px;
}
.marginTop65{
    margin-top: 65px;
}
.marginTop30{
    margin-top: 30px;
}
.Box{
    border-radius:10px;
    background-color: white;
    box-shadow: 10px 10px 10px #dedede;
}
.monitor_map{
    height: 500px;
}
#video{
    width: 500px;
    height: 500px;
}
video::-webkit-media-controls-fullscreen-button{ display: none !important; }
</style>