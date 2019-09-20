<template>
 <div style="background:#fff;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;padding-top:120px;">
   <h4 class="logo-text"><img class="logo" src="@/assets/logo.png"><span>期货账户策略平台</span></h4>
   <div class="login-area">
      <h4 class="login-sign">登录</h4>
      <el-form :model="loginForm" :label-position="'top'" :rules="rules" ref="loginForm" >
        <el-form-item prop="loginName">
          <el-input v-model="loginForm.loginName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="loginPass">
          <el-input placeholder="请输入密码" v-model="loginForm.loginPass" show-password></el-input>
        </el-form-item>
        <div class="clearfix actionarea">
          <router-link :to="{name:'password'}" class="forget">忘记密码</router-link>
        </div>
        <el-button class="login-btn" @click="loginAction">登录</el-button>
        <div class="to-resign">
          <span>或</span> 
          <router-link :to="{name:'resign'}" >注册账号</router-link>
        </div>
      </el-form>
      
   </div>
 </div>
</template>

    

<script>
export default {
  name: 'login',
  data () {
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
    return {
      loginForm:{
        loginName:'122576556cjx',
        loginPass:'122576556cjx'
      },
      rules:{
        loginName:[
          {validator:validateUser, trigger: 'blur'}
        ],
        loginPass:[
          {validator:validatePass, trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    loginAction(){
      const data = {"name":this.loginForm.loginName, "password":this.loginForm.loginPass};
      if(data.name!=""&&data.password!=""){
        this.$post("/sessions/add",data).then(res=>{
          if(res.errno==='1'){
            this.$message({
              message: '登陆成功',
              type: 'success'
            });
            this.$setCookie('umsg',res.data,(new Date()).valueOf()+1000*60*60*24,true);
            this.$router.push({name:'quotations'})
          }else{
              if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning'});
            }
        }) 
      }
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
.login-area{width:520px;height:420px;border-radius:6px;border:1px solid rgba(224,224,224,1);margin:0 auto;margin-top:50px;padding-top:50px;box-sizing:border-box;}
.login-sign{font-size:36px;text-align:center;margin-bottom:40px;font-weight:400;}
.forget{font-size:14px;color:#2475FB;float:right;text-decoration: underline;}
.to-resign{margin-top:24px;text-align:center;}
.to-resign a{color:#2475FB;text-decoration: underline;display:inline-block;margin-left:5px;}
</style>
