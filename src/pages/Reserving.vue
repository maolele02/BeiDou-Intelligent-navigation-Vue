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
                            寄件人：<input type="text" name="" id="" class="form-control" v-model="order.s_name"/><br/>
                            寄件人电话号码：<input type="text" name="" id="" class="form-control" v-model="order.s_tel"/>
                        </div>
                        <div class="col-md-6">
                            收件人：<input type="text" name="" id="" class="form-control" v-model="order.r_name"/><br/>
                            收件人电话号码：<input type="text" name="" id="" class="form-control" v-model="order.r_tel"/>
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-md-2">起点经纬度:</div>
                        <div class="col-md-4">
                            <span>{{$store.state.begin_lnglat}}</span>
                        </div>
                        <div class="col-md-2">终点经纬度:</div>
                        <div class="col-md-4">
                            <span>{{$store.state.end_lnglat}}</span>
                        </div>
                    </div>

                    <br />
                    <div class="row">
                        <div class="col-md-2">物品数量:</div>
                        <div class="col-md-1 col-md-pull-1">
                            <input type="number" name="" id="" class="form-control" v-model="order.item_num"/>
                        </div>
                        <div class="col-md-2">物品重量(kg):</div>
                        <div class="col-md-1 col-md-pull-1">
                            <input name="" id="" class="form-control" v-model="order.item_weight"/>
                        </div>
                        <div class="col-md-2">物品类型:</div>
                        <div class="col-md-2 col-md-pull-1">
                            <input type="text" name="" id="" class="form-control" v-model="order.item_type"/>
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-md-1">备注:</div>
                        <div class="col-md-10">
                            <textarea name="" id="" cols="25" rows="3" v-model="order.remark"></textarea>
                        </div>
                    </div>
                    <br/>
                    <div class="row"></div>
                    <button class="btn btn-info col-md-2" @click="submit">提交</button>
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
import store from '../store/index.js'
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
        order: {
            s_uid: '',
            s_name: '',
            s_tel: '',

            r_name: '',
            r_tel: '',

            item_num: '',
            item_type: '',
            item_weight: '',
            remark: '',

            begin_lnglat: '',
            end_lnglat: ''
        }
      }
    },
    created(){
        let uid = localStorage.getItem('uid')
        this.order.s_uid = uid
        this.$axios({
            method: 'get',
            url: 'http://localhost:5000/user/'+uid,
            }).then(res=> {
            let user = res.data.data
            if(user != null){
                this.order.s_uid = user.uid
                this.order.s_name = user.name
                this.order.s_tel = user.tel
            }
            else{
                console.log('用户不存在')
            }
            
        });
    },
    methods:{
        submit(){
            let regex = /\d+\.*\d*/
            this.order.begin_lnglat = store.state.begin_lnglat
            this.order.end_lnglat = store.state.end_lnglat
            if(
                this.order.s_name == '' ||
                this.order.s_tel == '' ||
                this.order.r_name == '' ||
                this.order.r_tel == '' ||
                this.order.item_num == '' ||
                this.order.item_type == '' ||
                this.order.item_weight == '' ||
                this.order.begin_lnglat == '' ||
                this.order.end_lnglat == ''
            ){
                alert('请将信息填写完毕后再提交！')
                return;
            }
            else if(!regex.test(this.order.item_weight)){
                alert('物品重量填写不合法！')
                return;
            }
            let num = parseInt(this.order.item_num)
            let weight = parseFloat(this.order.item_weight)
            this.order.item_num = num
            this.order.item_weight = weight
            this.$axios({
            method: 'post',
            url: 'http://localhost:5000/order',
            data: this.order
            }).then(res=> {
                if(res.data.msg == '订单提交成功'){
                    this.$router.push({path:'index/complete'})
                }
                if(res.data.msg == '订单提交失败'){
                    alert('订单提交失败，请重试！')
                }
            });
        },
        regionChange (data) {
            // console.log(data)
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