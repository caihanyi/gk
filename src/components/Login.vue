<template>
    <div>
        <el-form
                :rules="rules"
                ref="loginForm"
                v-loading="loading"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="loginForm"
                class="loginContainer">
            <h3 class="loginTitle">登录</h3>
            <div v-show="isLoginByPassword">
                <el-form-item prop="username">
                    <el-input size="normal" type="text" v-model="loginForm.userName" auto-complete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
                </el-form-item>
                <el-checkbox style="float:left;" size="normal" class="loginRemember" v-model="checked">记住我</el-checkbox>
            </div>
            <div v-show="!isLoginByPassword">
                <el-form-item prop="phoneNum">
                    <el-input size="normal" type="text" v-model="loginForm.phoneNum" auto-complete="off" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                    <el-input size="normal" type="text" v-model="loginForm.verificationCode" auto-complete="off" placeholder="请输入验证码" @keydown.enter.native="submitLogin">
                        <el-button slot="append" :class="buttonHasGotCode"  @click="getVerificationCode" :disabled="hasGotCode">{{codeMsg}}</el-button>
                    </el-input>
                </el-form-item>
                <el-checkbox style="float:left;" size="normal" class="loginRemember" v-model="checked">记住我</el-checkbox>
            </div>
            
            <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin" >登录</el-button>
            <div class="otheroperation" >
                <el-link style="float:left;"  target="_blank" v-show="isLoginByPassword" @click="changeLoginWay">短信验证码登录</el-link>
                <el-link style="float:left;"  target="_blank" v-show="!isLoginByPassword" @click="changeLoginWay">账号密码登录</el-link>
                <el-link style="float:right;" href="https://element.eleme.io" target="_blank">注册</el-link>
            </div>
        </el-form>
    </div>
</template>

<script >

    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                loginForm: {
                    phoneNum:'',
                    verificationCode:'',
                    userName: '',
                    password: ''
                },
                checked: true,
                passwordRules: {
                    userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                phoneRules: {
                    phoneNum: [{required: true, message: '请输入手机号码', trigger: 'blur'}],
                    verificationCode: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                },

                isLoginByPassword: false,
                codeMsg: '获取验证码',
                time:0,
                hasGotCode: false,
                buttonHasGotCode: 'verificationCodeButton'
            }
        },
        computed: {
            rules(){
                if(this.isLoginByPassword){
                    return this.passwordRules;
                } else {
                    return this.phoneRules;
                }
            },
        },
        methods: {
            changeLoginWay(){
                this.isLoginByPassword = !this.isLoginByPassword
            },

            loginSuccess(resp){
                this.loading = false;
                if (resp) {
                    this.$store.dispatch('saveSession', resp.session);//存储session
                    this.$router.replace('/');
                }
            },
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        //账号密码登录
                        if(this.isLoginByPassword){
                            this.postRequest('/login', this.loginForm).then(resp => this.loginSuccess(resp))
                            .catch((e) => {
                                console.log('error' + e);
                            });
                        } else {
                            //手机登录
                            this.postRequest('/loginByPhoneNum', this.loginForm).then(resp => this.loginSuccess(resp))
                            .catch((e) => {
                                console.log('error' + e);
                            });;
                        } 
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                });
            },

           

            getVerificationCode() {
                if(this.checkPhoneNum(this.loginForm.phoneNum)){
                    this.postRequest('/getVerificationCode', this.loginForm).then(resp => {
                        if (resp) {
                            this.changeCodeMsg ();
                        }
                    })
                }else{
                    this.$message.error("手机号码有误，请重填");  
                }
            },

            checkPhoneNum (phoneNum) {
                if(!(/^1[3456789]\d{9}$/.test(phoneNum))){ 
                    return false; 
                } else {
                    return true; 
                }
            },

            changeCodeMsg () {
                this.time = 60;
                this.hasGotCode = true;
                this.buttonHasGotCode = 'verificationCodeButtonDisabled';
                this.timer = setInterval(() =>{
                    this.codeMsg = '('+this.time+')'+'已获取验证码';
                    if(this.time === 0){
                        clearInterval(this.timer);
                        this.buttonHasGotCode = 'verificationCodeButton';
                        this.codeMsg = '重新获取验证码';
                        this.hasGotCode = false;
                    }
                    this.time --;
                }, 1000);
               
            }
        }
    }

</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRemember {
        text-align: left;
        margin: 0px 0px 15px 0px;
    }


    .otheroperation {
        margin-top:10px;
        margin-bottom: 20px;
    }

    .verificationCodeButton {
        width: 140px;
        color: #FFF!important;
        background-color: #409EFF!important;
    }

    .verificationCodeButtonDisabled{
        width: 140px;
    }
</style>