<template>
  <div>
    <el-form-item prop="phoneNum">
      <el-input
        size="normal"
        type="text"
        v-model="phoneNum"
        auto-complete="off"
        placeholder="请输入手机号码"
        @blur="updatePhone"
      ></el-input>
    </el-form-item>
    <el-form-item prop="verificationCode">
      <el-input
        size="normal"
        type="text"
        v-model="verificationCode"
        auto-complete="off"
        placeholder="请输入验证码"
        @blur="updatePhone"
        @keydown.enter.native="submit"
      >
        <el-button
          slot="append"
          :class="buttonHasGotCode"
          @click="getVerificationCode"
          :disabled="hasGotCode"
        >{{codeMsg}}</el-button>
      </el-input>
    </el-form-item>
  </div>
</template>


<script >
export default {
  name: "VerificationCode",
  data() {
    return {
      loading: false,
      phoneNum: "1884616",
      verificationCode: "",
      codeMsg: "获取验码",
      time: 0,
      hasGotCode: false,
      buttonHasGotCode: "verificationCodeButton"
    };
  },

  // props:{
  //   phoneNum:{
  //     type:Number
  //     // default:5
  //   }
  // },
  computed: {},
  methods: {
    getVerificationCode() {
      if (this.checkPhoneNum(this.phoneNum)) {
        let param = {
          phoneNum: this.phoneNum
        };
        this.postRequest("/getVerificationCode", param).then(resp => {
          if (resp) {
            this.changeCodeMsg();
          }
        });
      } else {
        this.$message.error("手机号码有误，请重填");
      }
    },

    checkPhoneNum(phoneNum) {
      if (!/^1[3456789]\d{9}$/.test(phoneNum)) {
        return false;
      } else {
        return true;
      }
    },

    updatePhone(event){
      this.$emit('getPhone', this.phoneNum,this.verificationCode),
      console.log("getpone");
      
    }, 

    // updateVerCode(event){
    //   this.$emit('getVerCode', this.verificationCode)
    // }, 

    submit(event){
      this.$emit('getPhone', this.phoneNum,this.verificationCode),
      this.$emit('submit')
    },

    changeCodeMsg() {
      this.time = 60;
      this.hasGotCode = true;
      this.buttonHasGotCode = "verificationCodeButtonDisabled";
      this.timer = setInterval(() => {
        this.codeMsg = "(" + this.time + ")" + "已获取验证码";
        if (this.time === 0) {
          clearInterval(this.timer);
          this.buttonHasGotCode = "verificationCodeButton";
          this.codeMsg = "重新获取验证码";
          this.hasGotCode = false;
        }
        this.time--;
      }, 1000);
    }
  }
};
</script>

<style>
.verificationCodeButton {
  width: 140px;
  color: #fff !important;
  background-color: #409eff !important;
}

.verificationCodeButtonDisabled {
  width: 140px;
}
</style>