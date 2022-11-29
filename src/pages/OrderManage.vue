<!--
 * @Author: maolele02
 * @Date: 2022-11-29 15:37:49
 * @LastEditTime: 2022-11-29 17:04:08
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\pages\OrderManage.vue
-->
<template>
<div>
    <div class="col-md-11 col-md-offset-3 top20">
    <form class="form-inline">

        <div class="form-group">
            <label for="search_tel">订单号</label>
            <input type="text" class="form-control" v-model="order_id">
        </div>

        <div class="form-group">
            <label for="search_order_id">用户名</label>
            <input type="text" class="form-control" v-model="username">
        </div>
        
        <div class="form-group">
            <label for="search_order_id">订单状态</label>
            <input type="text" class="form-control" v-model="state">
        </div>

        <div class="form-group">
            <button class="btn btn-default" @click="order_query">查询</button>
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
        </tr>

        <template v-if="orders != null">
            <tr class="active v-cloak" v-for="order in orders" :key="order.order_id">
                <td><button class="btn btn-link">{{order.order_id}}</button></td>
                <td>{{order.s_addr_pr}}{{order.s_addr_city}}{{order.s_addr_district}}{{order.s_addr_street}}</td>
                <td>{{order.r_addr_pr}}{{order.r_addr_city}}{{order.r_addr_district}}{{order.r_addr_street}}</td>
                <td>{{order.s_name}}</td>
                <td>{{order.r_name}}</td>
                <td>{{order.item_type}}</td>
                <td>{{order.state}}</td>
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
            state: '',

            orders: null
        }
    },
    methods:{
        order_query(){
            this.orders = null
            this.$axios({
                method: 'post',
                url: 'http://localhost:5000/order/query',
                data: {
                    order_id: this.order_id,
                    username: this.username,
                    state: this.state
                }
            }).then(res=>{
                if(res.data.msg == '查询到结果'){
                    this.orders = res.data.data
                }
                
            })
        }
    }
}
</script>

<style scoped>
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
</style>