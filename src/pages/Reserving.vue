<template>
<div>
    <span>{{now_state}}</span>
    <hr id="top_hr"/>

    <div class="row">
        <div class="col-md-10 col-md-offset-1 func">
            <div class="row">
                <!--高德地图-->
                <MapContainer/>
            </div>
            
            <div class="mainBox">
                <!--订单信息填写-->
                    <div class="row">
                        <div class="col-md-6">
                            寄件人：<input type="text" name="" id="" class="form-control" v-model="order.s_name"/>
                            寄件人电话号码：<input type="text" name="" id="" class="form-control" v-model="order.s_tel"/>
                        </div>
                        <div class="col-md-6">
                            收件人：<input type="text" name="" id="" class="form-control" v-model="order.r_name"/>
                            收件人电话号码：<input type="text" name="" id="" class="form-control" v-model="order.r_tel"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            寄件地址: <br>
                            <div class="row">
                                <v-region-selects class="regin"
                                :town="true"
                                v-model="s_region"
                                @change="regionChange" 
                                />
                            </div>
                            <div class="row">
                                <div class="col-md-12 marginTop20">
                                    <input type="text" name="s_street" id="s_street" placeholder="详细地址" class="form-control" v-model="order.s_addr_street"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            收件地址:<br>
                            <div class="row">
                                <v-region-selects class="regin"
                                :town="true"
                                v-model="r_region"
                                @change="regionChange" 
                                />
                            </div>
                            <div class="row">
                                <div class="col-md-12 marginTop20">
                                    <input type="text" name="r_street" id="r_street" placeholder="详细地址" class="form-control" v-model="order.r_addr_street"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div class="row">
                        <div class="col-sm-1">物品数量:</div>
                        <div class="col-sm-1">
                            <input type="number" name="" id="" class="form-control" v-model="order.item_num"/>
                        </div>
                        <div class="col-sm-1">物品重量(kg):</div>
                        <div class="col-sm-1">
                            <input type="number" name="" id="" class="form-control" v-model="order.item_weight"/>
                        </div>
                        <div class="col-sm-1 col-sm-offset-2">物品类型:</div>
                        <div class="col-md-2">
                            <input type="text" name="" id="" class="form-control" v-model="order.item_type"/>
                        </div>
                    </div>
                    <br/>
                    <div class="row"></div>
                    <button class="btn btn-info col-md-2" @click="changePage($event, 4)">提交</button>
            </div>
        </div>
    </div>

    <div class="row" v-show="now_state == '订单提交反馈'">
        <div class="col-md-10 col-md-offset-1 func">
            <span>订单提交成功！</span><button type="button" class="btn btn-link">点击此处继续生成订单</button>
        </div>
    </div>
</div>
  
</template>

<script>
import MapContainer from '../components/map/MapContainer.vue'
export default {
    name: 'Reserving',
    components: {
        MapContainer
    },
    props: {

    },
    data(){
      return {
        now_state: '配送预约',
        s_region: {
            province: '350000',
            city: '350100',
            area: '350104',
            town: '350104008'
        },
        r_region: {
            province: '350000',
            city: '350100',
            area: '350104',
            town: '350104008'
        },
        order: {
            s_uid: '',
            s_name: '',
            s_tel: '',
            s_addr_pr: '',
            s_addr_city: '',
            s_addr_town: '',
            s_addr_district: '',
            s_addr_street: '',

            r_uid: '',
            r_name: '',
            r_tel: '',
            r_addr_pr: '',
            r_addr_city: '',
            r_addr_town: '',
            r_addr_district: '',
            r_addr_street: '',

            item_num: '',
            item_type: '',
            item_weight: '',
            remark: '',
            state: '',
            order_time: ''
        }
      }
    },
    created(){
        this.$axios({
            method: 'get',
            url: 'http://localhost:5000/user/1',
            }).then(res=> {
            let user = res.data.data
            if(user != null){
                this.order.s_uid = user.s_uid
                this.order.s_name = user.name
                this.order.s_addr_pr = user.addr_pr
                this.order.s_addr_city = user.addr_city
                this.order.s_addr_town = user.addr_town
                this.order.s_addr_district = user.addr_district
                this.order.s_addr_street = user.addr_street
            }
            else{
                console.log('用户不存在')
            }
            
        });
    },
    methods:{
        uploade_order(){
            this.$axios({
            method: 'post',
            url: 'http://localhost:5000/order',
            data: this.order
            }).then(res=> {
                
            });
        },
        regionChange (data) {
            console.log(data)
        }
    }
}
</script>

<style scoped>
#map_container{
    height: 600px;
    margin: 0px;
}
.marginTop20{
    margin-top: 20px;
}
.regin{
    margin-left: 15px;
}
.mainBox{
    margin-top: 60px;
}
</style>