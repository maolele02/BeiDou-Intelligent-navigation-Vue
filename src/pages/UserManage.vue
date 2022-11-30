<!--
 * @Author: maolele02
 * @Date: 2022-11-29 15:38:19
 * @LastEditTime: 2022-11-30 20:01:29
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
                    <th>用户类别</th>
                    <th>操作</th>
                    <!-- <th>地址</th> -->
                    </tr>

                    <template v-if="users != null">
                        <tr class="active v-cloak" v-for="user in users" :key="user.uid">
                            <td>{{user.uid}}</td>
                            <td>{{user.username}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.tel}}</td>
                            <td>{{user.mail}}</td>
                            <td>{{user.actor}}</td>
                            <template v-if="user.actor == '普通用户'">
                                <td><button @click="set_admin(user.uid)" class="btn btn-info">设为管理员</button></td>
                            </template>
                            <template v-if="user.actor == '管理员'">
                                <td><button class="btn btn-info" disabled="disabled">设为管理员</button></td>
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
        set_admin(uid){
            this.$axios({
                method: 'get',
                url: 'http://localhost:5000/user/setadmin/'+uid,
            }).then(res=>{
                if(res.data.msg == '操作成功'){
                    this.user_query()
                }
                if(res.data.msg == '操作失败'){
                    alert('操作失败，请重试！')
                }
            })
            user_query()
        },
        user_query(){
            this.$axios({
                method: 'post',
                url: 'http://localhost:5000/user/query',
                data: {
                    uid: this.uid,
                    username: this.username,
                    tel: this.tel,
                    mail: this.mail
                }
            }).then(res=>{
                if(res.data.msg == '用户列表'){
                    let res_data = res.data.data
                    for(let i=0; i<res_data.length; i++){
                        console.log(res_data[i].tel)
                        if(res_data[i].actor == 0){
                            res_data[i].actor = '普通用户';
                        }
                        if(res_data[i].actor == 1){
                            res_data[i].actor = '管理员';
                        }
                    }
                    this.users = res_data;
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
</style>