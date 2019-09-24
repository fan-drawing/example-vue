<template>
 <div style="background:#fff;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;padding-top:40px;">
   <h4 class="logo-text"><img class="logo" src="@/assets/logo.png"><span>期货账户策略平台</span></h4>
   <div class="login-area">
      <h4 class="login-sign">找回密码</h4>
      <h4  class="login-sign" v-if="false"><span style="color:#2475FB;">重置</span>账户密码</h4>
      <div>
        
        <el-form  v-show="!opentabpass" :model="ruleForm" :rules="rules" ref="passForm" class="step-one">
          <el-form-item prop="mobile">
            <el-input v-model.trim="ruleForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <div class="mobile-text">
            
              <el-input v-model.trim="ruleForm.code"  placeholder="请输入短信验证码"></el-input>
              <el-button class="code-get" v-if="!expire.open" @click="smsCode('passForm')">获取验证码</el-button>
              <span class="time-back" v-else>已发送，<em>{{expire.expirestime}}</em>秒后重新获取</span>
          </div>
          <el-button class="login-btn" @click="nextStep('passForm')">下一步</el-button>
        </el-form>
        <el-form  v-show="opentabpass" :model="ruleFormword" :rules="rulesword" ref="passFormword">
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="ruleFormword.password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="surepass">
            <el-input placeholder="请再次确认密码" v-model="ruleFormword.surepass"  show-password></el-input>
          </el-form-item>
          <el-button class="login-btn" @click="resetNow('passFormword')">重置</el-button>
        </el-form>
        
        <div class="to-login">
          <router-link :to="{name:'login'}" >返回登录</router-link>
        </div>
      </div>
      
   </div>
 </div>
</template>

<script>
export default {
  name: 'password',
  data () {

    var validateMobile = (rule, value, callback) => {
        if(!(/^1[3456789]\d{9}$/.test(value))){ 
          callback(new Error('电话号码不合法!'));     
        }
        callback();
    };
    var validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleFormword.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        if (value !== '') { 
          var reg=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,32}$/;
          if(!reg.test(value)){
            callback(new Error('密码是6到32位，至少包含数字/大写字母/小写字母/字符两种组合'));
          }
        }
        callback();
      }
    };

    return {
      input:'',
      ruleForm: {
          mobile: '',
          code:'',
      },
      ruleFormword:{
          password:'',
          surepass:'',
      },
      rulesword:{
        password:[
          {validator:validatePass, trigger: 'blur'}
        ],
        surepass:[
          {validator:validatePassCheck, trigger: 'blur'}
        ],
      },
      rules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          
      },
      opentabpass:false,
      expire:{
        expirestime:120,
        open:false,
      },
    }
  },
  mounted(){
    
    this.smsExpires();
  },
  methods:{
    smsExpires(){
      let expiresBase = this.$getCookie("expirep",true);
      if(expiresBase==null){
        this.expire.expirestime = 120;
        this.expire.open = false;
      }else{ 
        let time = Math.ceil((parseInt(expiresBase)-parseInt((new Date()).valueOf()))/1000)
        this.expire.expirestime = time;
        this.expire.open = true;
        setTimeout(()=>{this.smsExpires()},500);
      }
    },
    smsCode(formName){
      // this.$refs[formName].validateField(['name','password','email','phone','surepass'],(errorMessage)=>{
      //   console.log(errorMessage=="")
      // })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {"phone":this.ruleForm.mobile,type:'2'};
          if(data.phone!=""){
            this.$post("/users/smsCode",data).then(res=>{
              if(res.errno==='1'){
                this.$setCookie("expirep",(new Date()).valueOf()+1000*60*2,(new Date()).valueOf()+1000*60*2,true);
                this.$nextTick(()=>{
                  this.smsExpires();
                })
              }else{
                if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
              }
            }) 
          }
        } else {
            return false;
          }
        });
      },
      resetNow(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            const data = {"password":this.ruleFormword.surepass,'code':this.ruleForm.code};
        
            this.$post("/users/resetPassword",data).then(res=>{
              console.log(res)
              if(res.errno==='1'){
                this.$message({
                  message: '修改成功，请重新登录！',
                  type: 'success'
                });
                this.$delCookie("umsg");
                this.$router.push({name:'login'})
              }else{
                if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
              }
            }) 
            
          }else{
            return false;
          }
        });
      },
      nextStep(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.code!=""){
              this.opentabpass = true;
            }else{

            }  
          }else{
            return false;
          }
        });
        
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-text{text-align:center;}
.actionarea{margin-bottom:24px;margin-top:-8px;}
.logo-text .logo{width:51px;height:51px;display:inline-block;margin-right:10px;    vertical-align: middle; }
.logo-text span{font-size:32px;line-height:45px;color:rgba(73,73,73,1);    vertical-align: middle;}
.login-area{width:520px;border-radius:6px;border:1px solid rgba(224,224,224,1);margin:0 auto;margin-top:50px;padding-top:50px;box-sizing:border-box;padding-bottom:12px;min-height:420px;}
.login-sign{font-size:36px;text-align:center;margin-bottom:40px;font-weight:400;}
.forget{font-size:14px;color:#2475FB;float:right;text-decoration: underline;}
.to-login{margin-top:24px;text-align:center;}
.to-login a{color:rgba(22,22,24,0.3);text-decoration: underline;display:inline-block;margin-left:5px;}
</style>
