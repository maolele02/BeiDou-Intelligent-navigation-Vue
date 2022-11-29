<!--
 * @Author: maolele02
 * @Date: 2022-11-29 15:38:19
 * @LastEditTime: 2022-11-29 22:49:51
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\pages\UserManage.vue
-->
<template>
    <div>
        <div class="col-md-11 col-md-offset-1 top20">
            <form class="form-inline query_form">

                <div class="form-group">
                    <label for="search_tel">用户ID</label>
                    <input type="text" class="form-control" v-model="uid">
                </div>

                <div class="form-group">
                    <label for="search_order_id">用户名</label>
                    <input type="text" class="form-control" v-model="username">
                </div>
                
                <div class="form-group">
                    <label for="search_order_id">电话号码</label>
                    <input type="text" class="form-control" v-model="tel">
                </div>

                <div class="form-group">
                    <label for="search_order_id">电子邮箱</label>
                    <input type="text" class="form-control" v-model="mail">
                </div>

                <div class="form-group">
                    <button class="btn btn-default" @click="user_query">查询</button>
                </div>
            </form>
        </div>

        <br/>
        <div class="row">
            <div class="col-md-10  col-md-offset-1 mainBox top20">
                <h5 class="v-cloak" v-if="users == null">未查询到结果</h5>
                <table v-if="users != null" class="table table-hover top20">
                    <tr class="active">
                    <th>用户ID</th>
                    <th>用户名</th>
                    <th>昵称</th>
                    <th>电话号码</th>
                    <th>电子邮箱</th>
                    <th>地址</th>
                    </tr>

                    <template v-if="users != null">
                        <tr class="active v-cloak" v-for="user in users" :key="user.uid">
                            <td>{{user.uid}}</td>
                            <td>{{user.username}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.tel}}</td>
                            <td>{{user.mail}}</td>
                            <td>{{user.addr_pr}}{{user.addr_city}}{{user.addr_district}}{{user.addr_street}}</td>
                        </tr>
                    </template>
                    
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserManage',
    data(){
        return{
            uid: '',
            username: '',
            tel: '',
            mail: '',

            users: null

        }
    },
    methods:{
        user_query(){
            this.$axios({
                method: 'post',
                url: 'http://localhost:5000/user/query',
                data: {
                    order_id: this.order_id,
                    username: this.username,
                    state: this.state
                }
            })
        }
    }
}
</script>

<style scoped>
.query_form > div{
    margin-left: 20px;
}
.form-group > input{
    margin-left: 6px;
}
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