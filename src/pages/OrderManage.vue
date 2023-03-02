<!--
 * @Author: maolele02
 * @Date: 2022-11-29 15:37:49
 * @LastEditTime: 2023-03-02 22:02:43
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\pages\OrderManage.vue
-->
<template>
<div>
    <div class="col-md-11 col-md-offset-3 top20" id="order_search_box">
        <form class="form-inline query_form">

            <div class="form-group">
                <label for="search_tel">订单号</label>
                <input type="text" class="form-control" v-model="order_id">
            </div>

            <div class="form-group">
                <label for="search_order_id">用户名</label>
                <input type="text" class="form-control" v-model="username">
            </div>

            <select class="form-control" v-model="state">
                <option>请选择订单状态</option>
                <option>等待审核</option>
                <option>等待配送</option>
                <option>正在前往起点</option>
                <option>正在等待装货</option>
                <option>正在前往终点</option>
                <option>等待收货</option>
            </select>


            <div class="form-group">
                <button class="btn btn-default" @click.prevent="order_query">查询</button>
            </div>
        </form>
    </div>
<br/>
<div class="row">
<div class="col-md-10  col-md-offset-1 mainBox top20">
    <h5 class="v-cloak" v-if="orders == null">未查询到结果</h5>
    <table v-if="orders != null" class="table table-hover top20">
        <tr class="active">
        <th>订单号</th>
        <th>起始地</th>
        <th>目的地</th>
        <th>寄件人</th>
        <th>收件人</th>
        <th>物品类型</th>
        <th>配送状态</th>
        <th>操作1</th>
        <th>操作2</th>
        </tr>

        <template v-if="orders != null">
            <tr class="active v-cloak" v-for="order in orders" :key="order.order_id">
                <td>{{order.order_id}}</td>
                <td>{{order.s_addr_pr}}{{order.s_addr_city}}{{order.s_addr_district}}{{order.s_addr_street}}</td>
                <td>{{order.r_addr_pr}}{{order.r_addr_city}}{{order.r_addr_district}}{{order.r_addr_street}}</td>
                <td>{{order.s_name}}</td>
                <td>{{order.r_name}}</td>
                <td>{{order.item_type}}</td>
                <td>{{order.state}}</td>
                <template v-if="order.state == '等待审核'">
                    <td><button class="btn btn-success" @click="pass(order.order_id)">通过</button></td>
                    <td><button class="btn btn-warning">不通过</button></td>
                </template>
                <template v-if="order.state == '等待配送'">
                    <td>无</td>
                    <td>无</td>
                </template>
                <template v-if="order.state != '等待审核' && order.state != '等待配送'">
                    <td>
                        <button class="btn btn-info" @click="turn_to_moni(order.order_id)">
                            监控
                        </button>    
                    </td>
                    <td>无</td>
                </template>
            </tr>
        </template>
        
    </table>
</div>
</div>
</div>

</template>

<script>
export default {
    name: 'OrderManage',
    data(){
        return{
            order_id: '',
            username: '',
            state: '请选择订单状态',

            orders: null
        }
    },
    methods:{
        pass(oid){
            this.$axios({
                method: 'get',
                url: 'http://localhost:5000/order/pass/'+oid,
            }).then(res=>{
                if(res.data.msg == '操作成功'){
                    this.order_query()
                }
                if(res.data.msg == '操作失败'){
                    alert('操作失败，请重试！')
                }
                
            })
        },
        order_query(){
            if(this.order_id == '' && this.username == '' && this.state == '请选择订单状态'){
                this.orders = null;
                return;
            }
            let _state
            switch(this.state){
                case '请选择订单状态': _state = -1;break;
                case '等待审核': _state = 0;break;
                case '等待配送': _state = 1;break;
                case '正在前往起点': _state = 2;break;
                case '正在等待装货': _state = 3;break;
                case '正在前往终点': _state = 4;break;
                case '等待收货': _state = 5;break;
            }
            this.$axios({
                method: 'post',
                url: 'http://localhost:5000/order/query',
                data: {
                    order_id: this.order_id,
                    username: this.username,
                    state: _state
                }
            }).then(res=>{
                if(res.data.msg == '查询到结果'){
                    let res_data = res.data.data
                    for(let i=0; i<res_data.length; i++){
                        console.log(res_data[i].state)
                        if(res_data[i].state == 0){
                            res_data[i].state = '等待审核';
                        }
                        else if(res_data[i].state == 1){
                            res_data[i].state = '等待配送';
                        }
                        else if(res_data[i].state == 2){
                            res_data[i].state = '正在前往起点';
                        }
                        else if(res_data[i].state == 3){
                            res_data[i].state = '正在等待装货';
                        }
                        else if(res_data[i].state == 4){
                            res_data[i].state = '正在前往终点';
                        }
                        else if(res_data[i].state == 5){
                            res_data[i].state = '等待收货';
                        }
                        else{
                            res_data[i].state = '状态查询失败';
                        }
                        this.orders = res_data;
                    }
                    
                }
                else if(res.data.msg == '未查询到结果'){
                    this.orders = null  // 清空之前的查询结果
                }
                
            })
        },
        turn_to_moni(order_id){
            let car_pt;
            this.$axios({
                method: 'get',
                url: 'http://localhost:5000/position/' + order_id,
            }).then(res=>{
                car_pt = res.data.data.point;
                this.$router.push({
                    name: 'monitor',
                    query:{
                        oid: order_id,
                        cpt: car_pt
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
#order_search_box{
    margin-left: 290px;
}
.query_form > div{
    margin-left: 20px;
}
.query_form > select{
    margin-left: 20px;
}
.form-group > *{
    margin-left: 6px;
}
/* .form-group > button{
    margin-left: 6px;
} */
.mainBox{
    /* 设置阴影 */
    background-color: white;
    border-radius:10px;
    box-shadow: 10px 10px 10px #dedede;
    height: 950px;
}
.top20{
    margin-top: 20px;
}

.top10{
    margin-top: 10px;
}
[v-cloak]{
    display: none !important;
}

#map_container{
height: 600px;
margin: 0px;
}

#profile{
    border-radius:10px;
    height: 100px;
    width: 100px;
    margin-top: 25px;
}

.userInfo{
    /* height: 100px; */
    font-size: large;
    margin-top: 30px;
}

.top_search_box{
    background-color: white;
    border-radius:10px;
    box-shadow: 10px 10px 10px #dedede;
    height: 65px;
}

.top_input{
    position: relative;
    left: -75px;
}
th{
    width: 400px;

    margin: 0 auto;

    /* border: medium solid red; */

    border-spacing: 20px;

    border-collapse: separate;

    text-align: left;
}
td{
    /* border: thin solid rgb(71, 71, 71); */
    border-radius: 6px;
    padding: 16px;
}
/* #moni_btn{
    
} */
</style>