<template>

 <div style="background:#fff;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;padding-top:40px;">
   <h4 class="logo-text"><img class="logo" src="@/assets/logo.png"><span>期货账户策略平台</span></h4>
   <div class="login-area">
      <h4 class="login-sign">注册账户</h4>
      <el-form :model="resignForm" :label-position="'top'" :rules="rules" ref="resignForm" >
        <el-form-item prop="email">
          <el-input v-model.trim="resignForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model.trim="resignForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="account">
          <el-input v-model.trim="resignForm.account" placeholder="请输入账户名,字母数字汉字下划线组合，3到15位"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="resignForm.password" placeholder="请设置登录密码，6到32位，至少包含数字/大写字母/小写字母/字符两种组合" show-password></el-input>
        </el-form-item>
        <el-form-item prop="surepass">
          <el-input v-model.trim="resignForm.surepass" placeholder="确认密码" show-password></el-input>
        </el-form-item>
        <el-form-item  prop="code" class="mobile-text">
            <el-input v-model.trim="resignForm.code" placeholder="请输入短信验证码"></el-input>
            <!-- :style="{cursor:resignForm.openSms?'pointer':'not-allowed',background:resignForm.openSms?'linear-gradient(243deg,rgba(61,168,255,1) 0%,rgba(49,127,255,1) 100%)':'gray'}" -->
            <el-button class="code-get" v-if="!expire.open" @click="smsCode('resignForm')">获取验证码</el-button>
            <span class="time-back" v-else>已发送，<em>{{expire.expirestime}}</em>秒后重新获取</span>
        </el-form-item>
        
        <el-button class="login-btn" @click="resign('resignForm')">完成注册</el-button>
        <div class="to-login">
          <router-link :to="{name:'login'}" >返回登录</router-link>
        </div>
      </el-form>
      
   </div>
 </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'resign',
  data () {
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不可为空'));
      } else {
        if (value !== '') { 
          var reg=/^1[3456789]\d{9}$/;
          if(!reg.test(value)){
            callback(new Error('请输入有效的手机号码'));
          }else{
            // this.resignForm.openSms = true;
          }
        }
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请正确填写邮箱'));
      } else {
        if (value !== '') { 
          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            callback(new Error('请输入有效的邮箱'));
          }
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
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
    var validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resignForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        if (value !== '') { 
          var reg=/^[A-Za-z0-9_\u4e00-\u9fa5]{3,15}$/;
          if(!reg.test(value)){
            callback(new Error('用户名是字母数字汉字下划线组合，3到15位'));
          }
        }
        callback();
      }
    };
    
    return {
      input:'',
      resignForm:{
        email:'122576556@qq.com',
        mobile:'15110217819',
        code:'',
        account:'122576556cjx',
        password:'122576556cjx',
        surepass:'122576556cjx',
        openSms:false,
      },
      
      expire:{
        expirestime:120,
        open:false,
      },
      rules:{
        email:[
          { validator: validateEmail, trigger: 'blur'}
        ],
        mobile:[
          {validator:validateMobilePhone, trigger: 'blur'}
        ],
        account:[
          {validator:validateUser, trigger: 'blur'}
        ],
        password:[
          {validator:validatePass, trigger: 'blur'}
        ],
        surepass:[
          {validator:validatePassCheck, trigger: 'blur'}
        ],
      }
    }
  },
  mounted(){
    
    this.smsExpires();
  },
  methods:{

    smsExpires(){
      let expiresBase = this.$getCookie("expire",true);
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
          const data = {"name":this.resignForm.account, "password":this.resignForm.password, "email":this.resignForm.email, "phone":this.resignForm.mobile,type:'1'};
          if(data.name!=""&&data.password!=""&&data.email!=""&&data.phone!=""){
            this.$post("/users/smsCode",data).then(res=>{
              if(res.errno==='1'){
                this.$setCookie("expire",(new Date()).valueOf()+1000*60*2,(new Date()).valueOf()+1000*60*2,true);
                this.$nextTick(()=>{
                  this.smsExpires();
                })
              }else{
                if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning'});
              }
            }) 
          }
        } else {
            return false;
          }
        });
    },
    resign(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          const data = {"name":this.resignForm.account, "password":this.resignForm.password, "email":this.resignForm.email, "phone":this.resignForm.mobile, "code":this.resignForm.code}
          
          if(data.code==""){this.$message({ message: "短信验证码不能为空", type: 'warning'}); return false;}

          this.$post("/users/register",data).then(res=>{
            if(res.errno==='1'){
              this.$confirm('注册成功，请去登陆！', '提示', {
                customClass:'success-tip',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success '
              }).then(() => {
                this.$router.push({name:'login'}) 
              }).catch(() => {
                      
              });
            }else{
              if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning'});
            }
            // console.log(res);
          })
        } else {
          console.log('error submit!!');
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
.login-area{width:520px;border-radius:6px;border:1px solid rgba(224,224,224,1);margin:0 auto;margin-top:50px;padding-top:50px;box-sizing:border-box;padding-bottom:12px;}
.login-sign{font-size:36px;text-align:center;margin-bottom:40px;font-weight:400;}
.forget{font-size:14px;color:#2475FB;float:right;text-decoration: underline;}
.to-login{margin-top:24px;text-align:center;}
.to-login a{color:rgba(22,22,24,0.3);text-decoration: underline;display:inline-block;margin-left:5px;}
</style>
