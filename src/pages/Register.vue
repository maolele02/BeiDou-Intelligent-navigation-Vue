<template>
  <div class="container">
        <div id="main">
            <div class="row Box">
            
                <div class="col-md-4 col-md-offset-3" id="main">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row inputs">
                                <div class="col-md-12">
                                    <label><sup>*</sup>用户名：</label><input type="text" placeholder="" class="form-control" v-model="username">
                                </div>
                            </div>

                            <div class="row inputs">
                                <div class="col-md-12">
                                    <label><sup>*</sup>昵称：</label><input type="text" placeholder="" class="form-control" v-model="name">
                                </div>
                            </div>

                            <div class="row inputs">
                                <div class="col-md-12">
                                    <label><sup>*</sup>电话号码：</label><input type="text" placeholder="" class="form-control" v-model="tel">
                                </div>
                            </div>
    
                            <div class="row inputs">
                                <div class="col-md-12">
                                    <label><sup>*</sup>电子邮箱：</label><input type="text" placeholder="" class="form-control" v-model="mail">
                                </div>
                            </div>
    
                            <div class="row inputs">
                                <div class="col-md-12">
                                    <label><sup>*</sup>密码：</label><input type="password" placeholder="" class="form-control" v-model="pwd">
                                </div>
                            </div>
                             
                            <div class="row inputs">
                                <div class="col-md-12">
                                    <label><sup>*</sup>确认密码：</label><input type="password" placeholder="" class="form-control" v-model="confirm_pwd">
                                </div>
                            </div>   
                        </div>
                    </div>
    
    
                   <div class="row marginTop25">
                        <div class="col-md-6">
                            <button class="btn btn-info" @click="out">提交</button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-info" @click="reset">重置</button>
                        </div>
                   </div>
                </div>
    
    
                <div class="col-md-4 tips">
                    <div class="row">
                        <div class="col-md-12">
                            <span>{{userNameTips}}</span>
                        </div>
                    </div>

                    <div class="row tip">
                        <div class="col-md-12">
                            <span>{{nameTips}}</span>
                        </div>
                    </div>
    
                    <div class="row tip">
                        <div class="col-md-12">
                            <span>{{telTips}}</span>
                        </div>
                    </div>
    
                    <div class="row tip">
                        <div class="col-md-12">
                            <span>{{mailTips}}</span>
                        </div>
                    </div>
    
                    <div class="row tip">
                        <div class="col-md-12">
                            <span>{{pwdTips}}</span>
                        </div>
                    </div>

                    <div class="row tip">
                        <div class="col-md-12">
                            <span>{{confirmTips}}</span>
                        </div>
                    </div>
                </div>

                <div class="col-md-2 col-md-offset-2">
                    <img src="../../src/assets/BeiDouLogo.png" alt="北斗云-定点运送系统">
                </div>
                
            </div>

        </div>
        
    </div>
</template>

<script>
export default {
    name: 'Register',
    data(){
        return{
            username: null,
            name: null,
            tel: null,
            mail: null,
            pwd: null,
            confirm_pwd: null,

            userNameTips: '',
            nameTips: '',
            mailTips: '',
            telTips: '',
            pwdTips: '',
            confirmTips: ''
        }
    },
    watch:{
        username:{
            immediate: false,
            handler(newValue, oldValue){
                // console.log("usernameHandler")
                if(newValue == '' || newValue == null){
                    this.userNameTips = '用户名不能为空';
                }else if(newValue.length >20){
                    this.userNameTips = '用户名不能超过20位';
                }else{
                    this.userNameTips = '';
                }
            }
        },
        name:{
            immediate: false,
            handler(newValue, oldValue){
                // console.log("usernameHandler")
                if(newValue == '' || newValue == null){
                    this.nameTips = '昵称不能为空';
                }else if(newValue.length >20){
                    this.nameTips = '昵称不能超过20位';
                }else{
                    this.nameTips = '';
                }
            }
        },
        tel:{
            immediate: false,
            handler(newValue, oldValue){
                let regex = /\D+/;
                // console.log("usernameHandler")
                if(newValue == '' || newValue == null){
                    this.telTips = '电话号码不能为空';
                }else if(regex.test(newValue)){
                    this.telTips = '电话号码格式不正确';
                }else if(newValue.length != 11){
                    this.telTips = '电话号码格式不正确';
                }else{
                    this.telTips = '';
                }
            }
        },
        mail:{
            immediate: false,
            handler(newValue, oldValue){
                let regex = /\w+@{1}\w+\.+\w+/;
                if(newValue == '' || newValue == null){
                    this.mailTips = '邮箱不能为空';
                }else if(!regex.test(newValue)){
                    this.mailTips = '邮箱格式不正确';
                }else{
                    this.mailTips = '';
                }
            }
        },
        pwd:{
            immediate: false,
            handler(newValue, oldValue){
                if(newValue == '' || newValue == null){
                    this.pwdTips = '密码不能为空';
                }else if(newValue.length >20){
                    this.pwdTips = '密码不能超过20位';
                }else{
                    this.pwdTips = '';
                }
            }
        },
        confirm_pwd:{
            immediate: false,
            handler(newValue, oldValue){
                if(newValue != this.pwd){
                    this.confirmTips = '与确认密码不一致'
                }
            }
        }
    },
    methods:{
        reset(){
            this.username = null;
            this.name = null;
            this.tel = null;
            this.mail = null;
            this.pwd = null;
            this.confirm_pwd = null;

            this.telTips = '';
            this.userNameTips = '';
            this.pwdTips = '';
            console.log("重置成功");
        },
        out(){
            if(this.telTips=='' && this.userNameTips=='' && this.pwdTips=='' &&
                this.mailTips=='' && this.nameTips=='' && this.confirmTips==''){
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:5000/register',
                    data: {
                        username: this.username,
                        name: this.name,
                        tel: this.tel,
                        mail: this.mail,
                        pwd: this.pwd
                    }
                }).then(res=> {
                    if(res.data.msg == '注册失败'){
                        alert("注册失败，请重新提交")
                    }else{
                        console.log('注册成功')
                        this.$router.push({path:'/login'})
                    }
                })
            }

            // let pwdReg1 = /.*\d+.*/;
            // let pwdReg2 = /.*[a-z]+.*/;
            // let pwdReg3 = /.*[A-Z]+.*/;
            // let pwdReg4 = /.*[_\W]+.*/;
            // let mailRegex = /@{1}.+/;
            // if(this.telTips!='' || this.userNameTips!='' || this.pwdTips!=''){
            //     return;
            // }else if(this.username == '' || this.tel == '' || this.pwd == '' || this.pwd2 == ''){
            //     alert("您还有必填项未填写！");
            // }else if(this.pwd.length < 6){
            //     alert("密码必须6-12位！");
            // }else if(!pwdReg1.test(this.pwd)||!pwdReg2.test(this.pwd)||!pwdReg3.test(this.pwd)||!pwdReg4.test(this.pwd)){
            //     alert("密码格式不正确");
            // }else if(this.pwd2 != this.pwd){
            //     console.log("pwd:"+this.pwd+";pwd2:"+this.pwd2);
            //     alert("密码与确认密码不一致！");
            // }else if(!mailRegex.test(this.mail)){
            //     alert("电子邮箱格式不正确！");
            // }else{
                
            // }
        }
    }
        
}
</script>

<style scoped>
#main{
    margin-top: 60px;
    height: 500px;
}
.Box{
    border-radius:10px;
    background-color: white;
    box-shadow: 10px 10px 10px #dedede;
}
.tips{
    margin-top: 100px;
}
.tip{
    margin-top: 47px;
}
span{
    display: block;
    color: red;
    height: 20px;
    /* background-color: black; */
}
sup{
    color: red;
}
.marginTop25{
    margin-top: 25px;
}
.inputs{
    margin-top: 8px;
}
img{
    width: 200px;
    position: relative;
    top: -160px;
    left: -50px;
}
</style>