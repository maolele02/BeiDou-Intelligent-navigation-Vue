<template>
  <div class="container">
        <div class="row">
            <div id="login" class="col-md-10 col-md-offset-1">
                <div class="row">

                    <div class="col-md-6">
                        <img id="beidouImg" src="http://106.53.119.46/static/img/beidou.png" alt="北斗定点运送系统">
                    </div>

                    <div id="loginBox" class="col-md-5 col-md-offset-1">

                        <div class="row">
                            <div class="col-md-10">
                                用户名：<input type="text" name="username" class="form-control"  v-model="username"/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12" style="margin-top: 25px; color: red;">
                                <span class="tips">{{tips1}}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-10">
                                密码：<input type="password" name="pwd" class="form-control" v-model="pwd"/>
                            </div>
                        </div>

                        <div class="row ">
                            <div class="col-md-12" style="margin-top: 25px; color: red;">
                                <span class="tips">{{tips2}}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-2">
                                <button  class="btn btn-info" @click="login" type="button">
                                    登录
                                </button>
                                
                            </div>
                            <div class="col-md-2 col-md-offset-1">
                                <button  class="btn btn-info" @click="register" type="button">
                                    注册
                                </button>
                            </div>
                        </div>

                        <div name="login-info" id="login-info">

                        </div>
                        
                    </div>

                </div>

                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return{
            username: '',
            pwd: '',
            tips1: '',
            tips2: '',
            msg: ''
        }
    },
    methods:{
        register(){
            this.$router.push({path:'/register'})
        },
        login(){
            if(this.tips1 != '' || this.tips2 != ''){
                return;
            }
            console.log("login")
            this.$axios({
                    method: 'post',
                    url: 'http://106.53.119.46/login',
                    data:{
                        username: this.username,
                        pwd: this.pwd
                    }
                }).then(res=> {
                    this.msg = res.data.msg;
                    if(this.msg == '用户名或密码错误'){
                        alert('用户名或密码错误')
                    }else if(this.msg == '密码正确'){
                        let token = res.data.token
                        let uid = res.data.data.uid

                        localStorage.setItem('token', token)  // 将token存本地
                        localStorage.setItem('uid', uid)
                        this.$router.push({path:'/index/delivery'})
                    }
            });
        }
    },
    watch:{
        username:{
            immediate: false,
            handler(newValue, oldValue){
                if(newValue == ''){
                    this.tips1 = '用户名不能为空';
                }else{
                    this.tips1 = '';
                }
            }
        },
        pwd:{
            immediate: false,
            handler(newValue, oldValue){
                if(newValue == ''){
                    this.tips2 = '密码不能为空';
                }else if(newValue.length > 20){
                    this.tips2 = '密码过长';
                }else{
                    this.tips2 = '';
                }
            }
        }
    },
//     beforeRouteLeave(to, from, next){
//         if(to.path=='/index'){
            
//         }
//   }

}
</script>

<style scoped>
#login{
    margin-top: 50px;
    border-radius:10px;
    background-color: white;
    box-shadow: 10px 10px 10px #dedede;
}
#loginBox{
    margin-top: 25px;
    height: 250px;
}
#beidouImg{
    border-radius:10px;
    width: 500px;
}
#register{
    margin-left: 10px;
}
form{
    color: rgb(129,157,247);
}
#loginBox>div{
    margin-top: 0px;
}
.tips{
    position: absolute;
    top: -20px;
}
</style>