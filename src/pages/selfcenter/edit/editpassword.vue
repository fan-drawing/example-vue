<template>
 <el-form :model="resignpassForm" ref="passReset" :label-position="'top'" :rules="rules" class="baseedit">

    <el-form-item prop="passkey" label="原密码" class="passedit" style="margin-top:8px;">
      
      <el-input v-model="resignpassForm.passkey" placeholder="请输入内容" show-password></el-input>
    </el-form-item>
    <el-form-item prop="password" label="新密码" class="passedit">
      <el-input v-model="resignpassForm.password" placeholder="请输入内容" show-password></el-input>
    </el-form-item>
    <el-form-item prop="password" label="确认密码密码" class="passedit">
      <el-input v-model="resignpassForm.surepass" placeholder="请输入内容" show-password></el-input>
    </el-form-item>
    <el-button class="edit-up" @click="resign('passReset')">确定</el-button>
  </el-form>
</template>

<script>
export default {
  name: 'editpassword',
  data () {
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
    return {
      resignpassForm:{
        passkey:'122576556cjx',
        password:'122576556cjxx',
        surepass:'122576556cjxx',
      },
      rules:{
        passkey:[
          {validator:validatePass, trigger: 'blur'}
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
  methods:{
    resign(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          const data = {"old_password":this.resignpassForm.passkey,"new_password":this.resignpassForm.surepass}
          
          if(data.code==""){this.$message({ message: "短信验证码不能为空", type: 'warning'}); return false;}

          this.$post("/users/password",data).then(res=>{
            if(res.errno==='1'){
              this.$message({ message: "修改成功！！", type: 'success'});
            }else{
              if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
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
.baseedit{height:490px;background:#fff;padding:32px 40px;}
.passedit{width:320px;margin-bottom:24px;margin-left:auto;margin-right: auto;}
.passedit-label{font-size: 12px;color:rgba(22,22,24,0.75);line-height: 12px;margin-bottom: 6px;}

</style>
