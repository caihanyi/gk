<template>
  <div>
    <el-form
      :rules="rules"
      ref="loginForm"
      v-loading="loading"
      element-loading-text="正在注册..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :model="loginForm"
      class="loginContainer"
    >
      <h3 class="loginTitle">注册</h3>

      <el-form-item prop="userName">
        <el-input
          size="normal"
          type="text"
          v-model="loginForm.userName"
          auto-complete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="normal"
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          size="normal"
          type="password"
          v-model="loginForm.confirmPassword"
          auto-complete="off"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>

      <VerificationCode ref="verificationCode" @getPhone="getPhone" @submit="sign"></VerificationCode>

      <el-button size="normal" type="primary" style="width: 100%;" @click="sign">快速注册</el-button>
      <div class="otheroperation">
        <el-link style="float:right;" @click="toLogin" target="_blank">返回登录</el-link>
      </div>
    </el-form>
  </div>
</template>

<script >
import VerificationCode from "../components/VerificationCode";

export default {
  name: "Sign",

  components: {
    VerificationCode
  },

  data() {
    const  checkPassword = (rule, value, callback) => {
      console.log("校验密码");
      if (value !== this.loginForm.password) {
        console.log("两次输入密码不一致");
        return callback(new Error("两次输入密码不一致"));
      } else {
        console.log("两次输入密码一致");
        callback();
      }
    };
    return {
      numPages: [],
      loading: false,
      
      loginForm: {
        phoneNum: "",
        verificationCode: "",
        userName: "",
        password: "",
        confirmPassword:"",
      },
      checked: true,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phoneNum: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { required: true, trigger: "blur", validator: checkPassword }
        ]
      },

      isLoginByPassword: false,
      codeMsg: "获取验证码",
      time: 0,
      hasGotCode: false,
      buttonHasGotCode: "verificationCodeButton"
    };
  },
  computed: {
    // phoneNum(){
    //     return this.$verificationCode.phoneNum;
    // },
    // verificationCode(){
    //     return this.$verificationCode.verificationCode;
    // },
    // rules(){
    //     if(this.isLoginByPassword){
    //         return this.passwordRules;
    //     } else {
    //         return this.phoneRules;
    //     }
    // },
  },
  methods: {
    loginSuccess(resp) {
      this.loading = false;
      if (resp) {
        this.$store.dispatch("saveSession", resp.session); //存储session
        this.$router.replace("/");
      }
    },

    getPhone(phoneNum, code) {
      this.loginForm.phoneNum = phoneNum;
      this.loginForm.verificationCode = code;
    },

    // getVerCode(code){
    //   this.loginForm.verificationCode = code
    // },

    sign() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.postRequest("/sign", this.loginForm)
            .then(resp => this.loginSuccess(resp))
            .catch(e => {
              console.log("error" + e);
            });
        } else {
          this.$message.error("请输入所有字段");
          return false;
        }
      });
    },

    toLogin() {
      this.$router.replace("/login");
    },

    // getVerificationCode() {
    //     if(this.checkPhoneNum(this.loginForm.phoneNum)){
    //         this.postRequest('/getVerificationCode', this.loginForm).then(resp => {
    //             if (resp) {
    //                 this.changeCodeMsg ();
    //             }
    //         })
    //     }else{
    //         this.$message.error("手机号码有误，请重填");
    //     }
    // },

    // checkPhoneNum (phoneNum) {
    //     if(!(/^1[3456789]\d{9}$/.test(phoneNum))){
    //         return false;
    //     } else {
    //         return true;
    //     }
    // },

    // changeCodeMsg () {
    //     this.time = 60;
    //     this.hasGotCode = true;
    //     this.buttonHasGotCode = 'verificationCodeButtonDisabled';
    //     this.timer = setInterval(() =>{
    //         this.codeMsg = '('+this.time+')'+'已获取验证码';
    //         if(this.time === 0){
    //             clearInterval(this.timer);
    //             this.buttonHasGotCode = 'verificationCodeButton';
    //             this.codeMsg = '重新获取验证码';
    //             this.hasGotCode = false;
    //         }
    //         this.time --;
    //     }, 1000);

    // }
  }
};
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
  margin-top: 10px;
  margin-bottom: 20px;
}

/* .verificationCodeButton {
        width: 140px;
        color: #FFF!important;
        background-color: #409EFF!important;
    }

    .verificationCodeButtonDisabled{
        width: 140px;
    } */
</style>