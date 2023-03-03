<template>
    <div class="row">
        <div class="col-md-10 col-md-offset-1 func">
            <div class="row">
                
                <div class="row">
                    <div class="col-md-2 col-md-offset-1">
                        <img id="profile" src="http://localhost/static/img/ProfilePic.jpg" alt="profile picture">
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12 col-md-offset-1 userInfo">
                        <b>用户名：</b>
                        <br/>
                        <span>{{$store.state.username}}</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 col-md-offset-1 userInfo">
                        <div class="row">
                            <div class="col-md-12"><b>昵称：</b></div>
                        </div>
                        <div class="row">
                            <div class="col-md-5"><span>{{$store.state.name}}</span></div>
                            <div class="col-md-4"><button class="btn btn-info" @click="modify">修改</button></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-md-12 col-md-offset-1 userInfo">
                        <div class="row">
                            <div class="col-md-12"><b>电话号码：</b></div>
                        </div>
                        <div class="row">
                            <div class="col-md-5"><span>{{$store.state.tel}}</span></div>
                            <div class="col-md-4"><button class="btn btn-info" @click="modify">修改</button></div>
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 col-md-offset-1 userInfo">
                        <div class="row">
                            <div class="col-md-12"><b>邮箱：</b></div>
                        </div>
                        <div class="row">
                            <div class="col-md-5"><span>{{$store.state.mail}}</span></div>
                            <div class="col-md-4"><button class="btn btn-info" @click="modify">修改</button></div>
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>

                <!-- <div class="row">
                    <div class="col-md-12 col-md-offset-1 userInfo">
                        <div class="row">
                            <div class="col-md-12"><b>地址：</b></div>
                        </div>
                        <div class="row">
                            <div class="col-md-5"><span>{{getAddrInfo()}}</span></div>
                            <div class="col-md-4"><button class="btn btn-info" @click="modify">修改</button></div>
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div> -->

                <div class="row userInfo">
                    <div class="col-md-1 col-md-offset-3">
                        <button class="btn btn-info" @click="logout">退出登录</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonalCenter',
    data(){
        return{
            now_state: '个人中心'
        }
    },
    created(){

    },
    methods:{
        getAddrInfo(){
            if(this.$store.state.addr_pr == null)
                return '暂未设置'
            return this.$store.state.addr_pr+' '+this.$store.state.addr_city+' '
                    +this.$store.state.addr_town+' '+this.$store.state.addr_district+' '
                    +this.$store.state.street;
        },
        modify(){

        },
        logout(){
            localStorage.removeItem('token')
            localStorage.removeItem('uid')
            this.$router.push({path:'/login'})
        }
    }
}
</script>

<style scoped>
.userInfo{
    /* height: 100px; */
    font-size: large;
    margin-top: 30px;
}
.info_hr{
    height: 2px;
    background-color: rgb(233, 233, 233);
    border: none;
    box-shadow: 10px 10px 10px #dedede;
    border-radius:10px;
    margin-top: 30px;
}
#profile{
    border-radius:10px;
    height: 100px;
    width: 100px;
    margin-top: 25px;
}
#logo{
    height: 10px;
}
</style>