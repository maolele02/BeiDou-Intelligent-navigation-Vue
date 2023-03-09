<!--
 * @Author: maolele02
 * @Date: 2022-12-01 21:11:44
 * @LastEditTime: 2023-03-09 22:34:01
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
                        <button class="btn"  @click="ternView($event,1)">地图</button>
                        <button class="btn moni_btn"  @click="ternView($event,2)">控制</button>
                    </div>
                </div>

                <div class="row" v-show="view == 1">
                    <MonitorMap v-if="map_init_flag" class="marginTop30" :x="nowX" :y="nowY"/>
                </div>

                <!-- <div class="row" v-show="view == 2">
                    <div class="col-md-12 Box marginTop30">
                        <MonitorVideo></MonitorVideo>
                    </div>
                </div> -->

                <div class="row Box control" v-show="view == 2">
                    <div class="col-md-12">
                        <div class="row">
                            <!--前后左右控制按钮-->
                    <div class="col-md-6 col-md-offset-1">
                    
                        <div class="row">
                            <div class="col-md-3 col-md-offset-3">
                                <div class=" btn btn-primary controllBtn marginTop10" 
                                @mousedown="control('w')"
                                @mouseup="control('z')">前</div>
                            </div>
                        </div>
        
                        <div class="row">
                            <div class="col-md-3">
                                <div class="btn btn-primary controllBtn marginTop10" 
                                @mousedown="control('a')"
                                @mouseup="control('z')">左</div>
                            </div>
                            <div class="col-md-3">
                                <div class="btn btn-warning controllBtn marginTop10" 
                                @mousedown="control('b')"
                                @mouseup="control('z')">鸣笛</div>
                            </div>
                            <div class="col-md-3">
                                <div class="btn btn-primary controllBtn marginTop10" 
                                @mousedown="control('d')"
                                @mouseup="control('z')">右</div>
                            </div>
                        </div>
        
                        <div class="row">
                            <div class="col-md-3 col-md-offset-3">
                                <div class="btn btn-primary controllBtn marginTop10" 
                                @mousedown="control('s')"
                                @mouseup="control('z')">后</div>
                            </div>
                        </div>
                    </div>
                    <!--前后左右控制按钮结束-->

                    <div class="col-md-4 col-md-offset-1">
                        <div class="marginTop65">
                            <div class="btn btn-warning controllBtn"
                            @mousedown="control('f')"
                            @mouseup="control('z')">刹车</div>
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
                                <b>当前经纬度：</b><span v-show="nowTemp != ''">{{nowPosition}}&deg;</span>
                            </div>
                        </div>

                        <div class="row marginTop30">
                            <div class="col-md-6">
                                <b>当前温度：</b><span v-show="nowTemp != ''">{{nowTemp}}&deg;</span>
                            </div>
                        </div>

                        <div class="row marginTop30">
                            <div class="col-md-6">
                                <b>当前湿度：</b><span v-show="nowHum != ''">{{nowHum}}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                

                <div class="row Box marginTop30">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                                <b>物流状态：</b><span>{{carState}}</span>
                            </div>
                        </div>

                        <div class="row marginTop30">
                            <div class="col-md-6">
                                <b>运送车牌号：</b><span :v-if="carNum != null">{{carNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!--当前位置显示-->
                <div class="row Box marginTop30" >
                    <div class="col-md-12">
                        <span style="display: block;"><b>当前位置：</b>{{nowLoc}}</span>
                    </div>
                </div>

                <div class="row" style="margin-top: 60px;">
                    <div class="col-md-12">
                        <img src="http://106.53.119.46/static/img/BeiDouLogo.png" alt="北斗云" width="300px">
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
            oid: '',
            cid: '',
            nowX: '112.862636',//112.862636,27.883359
            nowY: '27.883359',
            view: 1,
            nowPosition: 'null',
            nowLoc: '',
            nowHum: '',
            nowTemp: '',
            carState: '',
            carNum: '',
            map_init_flag: false,
            timer: null,
        }
    },
    methods:{
        getNowPointer(){
            if(this.oid == ''){
                return;
            }
            this.$axios({
                method: 'get',
                url: 'http://106.53.119.46/position/'+this.oid,
            }).then(res=>{
                if(res.data.msg == '查询成功'){
                    this.nowPosition = res.data.data.point;
                    this.nowLoc = res.data.data.loc;
                    this.cid = res.data.data.car_id;
                }
                else if(res.data.msg == '查询失败'){
                    console.log('查询失败，请重试！');
                }
            })
        },
        getItemState(){
            if(this.oid === ''){
                return;
            }
            this.$axios({
                method: 'get',
                url: 'http://106.53.119.46/state/'+this.oid,
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
        getCarId(){
            if(this.oid === ''){
                return;
            }
            this.$axios({
                method: 'get',
                url: 'http://106.53.119.46/order/car/'+this.oid,
            }).then(res=>{
                if(res.data.msg == '查询成功'){
                    if(res.data.data != null)
                        this.cid = res.data.data;
                    this.getCarData();
                }
                else if(res.data.msg == '查询失败'){
                    console.log('操作失败，请重试！');
                }
            })
        },
        getCarData(){
            if(this.cid === ''){
                console.log('!!!')
                return;
            }
            this.$axios({
                method: 'get',
                url: 'http://106.53.119.46/car/'+this.cid,
            }).then(res=>{
                if(res.data.msg == '查询成功'){
                    let res_data = res.data.data
                    let state = res_data.car_state;
                    if(state === 0){
                        this.carState = '正常';
                    }else{
                        this.carState = '出现异常';
                    }
                    
                    this.carNum = res_data.car_num;
                }
                else if(res.data.msg == '查询失败'){
                    console.log('查询失败，请重试！');
                }
            })
        },
        ternView(event, num){
            this.view = num;
        },
        control(controlData){
            this.$axios({
                method: 'post',
                url: 'http://106.53.119.46/control',
                data:{
                    cid: this.cid,
                    control_data: controlData
                }
            }).then(res=>{
                // console.log(res.data.msg);
            })
        }
    },
    created(){
    },
    mounted(){
        this.oid = this.$route.query.oid;
        console.log(this.$route.query.cpt)
        let pos = this.$route.query.cpt.split(',');
        this.nowX = pos[0];
        this.nowY = pos[1];
        this.nowPosition = this.nowX + this.nowY;
        this.map_init_flag = true;

        this.getNowPointer();
        this.getItemState();
        this.getCarId();
    },
    beforeDestroy(){

    }
}
</script>

<style scoped>
#moni_container{
    margin-top: 35px;
}
.moni_btn{
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
/* #video{
    width: 500px;
    height: 500px;
} */
/* video::-webkit-media-controls-fullscreen-button{ display: none !important; } */

.moni_map{
    margin-top: 20px
}

.control{
    position:absolute;
    margin-top: 45%;
}
</style>