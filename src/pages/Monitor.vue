<!--
 * @Author: maolele02
 * @Date: 2022-12-01 21:11:44
 * @LastEditTime: 2023-03-01 22:26:36
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
                                    <button class="btn btn-primary controllBtn marginTop10" @click="control('left')">左</button>
                                </div>
                                <div class="col-md-3">
                                    <button class="btn btn-warning controllBtn marginTop10" @click="control('beep')">鸣笛</button>
                                </div>
                                <div class="col-md-3">
                                    <button class="btn btn-primary controllBtn marginTop10" @click="control('right')">右</button>
                                </div>
                            </div>
            
                            <div class="row">
                                <div class="col-md-3 col-md-offset-3">
                                    <button class="btn btn-primary controllBtn marginTop10" @click="control('back')">后</button>
                                </div>
                            </div>
                        </div>
                        <!--前后左右控制按钮结束-->
    
                        <div class="col-md-4 col-md-offset-1">
                            <div class="marginTop65">
                                <button class="btn btn-warning controllBtn" @click="control('off')">刹车</button>
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
                        <div class="row ">
                            <div class="col-md-6">
                                <b>当前经纬度：</b><span v-show="nowTemp != ''">{{showPos()}}&deg;</span>
                            </div>
                        </div>

                        <div class="row marginTop30">
                            <div class="col-md-6">
                                <b>当前温度：</b><span v-show="nowTemp != ''">{{showTemp()}}&deg;</span>
                            </div>
                        </div>

                        <div class="row marginTop30">
                            <div class="col-md-6">
                                <b>当前湿度：</b><span v-show="nowHum != ''">{{showHum()}}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="row Box marginTop30">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                                <b>物流状态：</b><span>{{showCarState()}}</span>
                            </div>
                        </div>

                        <div class="row marginTop30">
                            <div class="col-md-6">
                                <b>运送车牌号：</b><span :v-if="carNum != null">{{showCarNum()}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!--当前位置显示-->
                <div class="row Box marginTop30" >
                    <div class="col-md-12">
                        <span style="display: block;"><b>当前位置：</b>{{showLoc()}}</span>
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
            oid: 1,
            cid: 1,
            nowX: '112.862636',//112.862636,27.883359
            nowY: '27.883359',
            view: 1,
            nowPosition: 'null',
            nowLoc: '',
            nowHum: null,
            nowTemp: null,
            carState: '',
            carNum: null,



            fakeTemp: '',
            fakeHum: '',
            fakeTempList: ['21.21','21.22','21.23', '21.24', '20.25', '21.04', '21.12', '20.31','20.32','20.26'],
            fakeHumList: ['67.12', '67.15', '67.13', '67.10', '67.21', '67.30', '67.41', '67.53', '67.28', '67.24'],
            timer: null,
        }
    },
    methods:{
        getNowPointer(){
            if(this.oid == null){
                return;
            }
            this.$axios({
                method: 'get',
                url: 'http://localhost:5000/position/'+this.oid,
            }).then(res=>{
                if(res.data.msg == '查询成功'){
                    this.nowPosition = res.data.data.point;
                    this.nowLoc = res.data.data.loc;
                }
                else if(res.data.msg == '查询失败'){
                    console.log('查询失败，请重试！');
                }
            })
        },
        getItemState(){
            if(this.oid == null){
                return;
            }
            this.$axios({
                method: 'get',
                url: 'http://localhost:5000/state/'+this.oid,
            }).then(res=>{
                if(res.data.msg == '查询成功'){
                    this.nowTemp = res.data.data.i_temp;
                    this.nowHum = res.data.data.i_hum;
                }
                else if(res.data.msg == '查询失败'){
                    console.log('操作失败，请重试！');
                }
            })
        },
        getCarData(){
            if(this.cid == null){
                return;
            }
            this.$axios({
                method: 'get',
                url: 'http://localhost:5000/car/'+this.cid,
            }).then(res=>{
                if(res.data.msg == '查询成功'){
                    let state = res.data.data.car_state;
                    if(state === 0){
                        this.carState = '正常';
                    }else{
                        this.carState = '出现异常';
                    }
                    
                    this.carNum = res.data.data.car_num;
                }
                else if(res.data.msg == '查询失败'){
                    console.log('操作失败，请重试！');
                }
            })
        },
        ternView(event, num){
            this.view = num;
        },
        setFakeTemp(){
            this.getItemState();

            // let num1 = Math.random()*10;
            // let num2 = Math.random()*10;
            // let index1 = Math.floor(num1);
            // let index2 = Math.floor(num2);
            // this.fakeTemp = this.fakeTempList[index1];
            // this.fakeHum = this.fakeHumList[index2];
        },
        showTemp(){
            return this.nowTemp;
        },
        showHum(){
            return this.nowHum;
        },
        showPos(){
            return this.nowPosition;
        },
        showCarState(){
            return this.carState;
        },
        showCarNum(){
            return this.carNum;
        },
        showLoc(){
            return this.nowLoc;
        },
        control(controlData){
            this.$axios({
                method: 'post',
                url: 'http://localhost:5000/control',
                data:{
                    oid: this.username,
                    cid: this.pwd,
                    control_data: controlData
                }
            }).then(res=>{
                console.log(res.data.msg);
            })
        }
    },
    created(){
        // this.timer = setInterval(() => {
        //     this.getItemState();
        //     this.getNowPointer();
        //     //console.log(this.fakeTemp);
        //     //do something
        //     //定时器的回调函数中需要注意 this 指向
        // }, 1000)
        
    },
    mounted(){
        this.getNowPointer();
        this.getItemState();
        this.getCarData();
    },
    beforeDestroy () {
        // clearInterval(this.timer)
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