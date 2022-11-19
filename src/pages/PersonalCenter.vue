<template>
    <div class="row">
        <div class="col-md-10 col-md-offset-1 func">
            <div class="row">
                
                <div class="row">
                    <div class="col-md-2 col-md-offset-1">
                        <img id="profile" src="img/ProfilePic.jpg" alt="profile picture">
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
                        <span>{{getUserInfo('username')}}</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-md-12 col-md-offset-1 userInfo">
                        <b>电话号码：</b>
                        <br>
                        <span>{{getUserInfo('tel')}}</span>
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 col-md-offset-1 userInfo">
                        <b>邮箱：</b>
                        <br>
                        <span>{{getUserInfo('mail')}}</span>
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 col-md-offset-1 userInfo">
                        <b>地址：</b>
                        <br>
                        <span>
                            {{getUserInfo('addr_pr')}}{{getUserInfo('addr_city')}}{{getUserInfo('addr_town')}}{{getUserInfo('addr_district')}}{{getUserInfo('addr_street')}}
                        </span>
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-md-12">
                        <hr class="info_hr">
                    </div>
                </div>

                <div class="row userInfo">
                    <div class="col-md-1 col-md-offset-1">
                        <button class="btn btn-info">修改资料</button>
                    </div>
                    <div class="col-md-1">
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
            now_state: '个人中心',
            user: null,
        }
    },
    created(){
        this.$axios({
            method: 'get',
            url: 'http://localhost:5000/user/1',
            }).then(res=> {
            let user_query = res.data.data
            if(user != None){
                this.user = user_query
            }
            else{
                console.log('用户不存在')
            }
        });
    },
    method:{
        getUserInfo(tag){
            let info = '暂未设置'
            if(user == None)
                return info
            switch(tag){
                case 'uid':
                    return user.uid
                case 'username':
                    return user.username
                case 'name':
                    return user.name
                case 'tel':
                    return user.tel
                case 'mail':
                    if(user.mail != None)
                        return user.mail
                    return info        
                case 'addr_pr':
                    if(user.addr_pr != None)
                        return user.addr_pr
                    return info
                case 'addr_city':
                    if(user.addr_city != None)
                        return user.addr_city
                    return info
                case 'addr_town':
                    if(user.addr_town != None)
                        return user.addr_town
                    return info
                case 'addr_district':
                    if(user.addr_district != None)
                        return user.addr_district
                    return info
                case 'addr_street':
                    if(user.addr_street != None)
                        return user.addr_street
                    return info
                default:
                    return info
            }
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
</style>