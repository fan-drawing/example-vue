<template>
<div class="edit-tan">
  <div class="shadow"></div>
  <div class="tan-block manage-edit">
    <div class="tan-header">
      <h4>添加账户弹窗</h4>
      <i class="el-icon-close tan-close" @click="close"></i>
    </div>
    
    <el-form :model="accountData" :label-position="'left'" label-width="100px" :rules="rules" ref="accountForm" class="tan-mains">
      <el-form-item prop="name" label="账户名称：" class="my-input-suffix">
        <div>
          <el-input
            placeholder="请输入"
            v-model="accountData.name">
          </el-input>
        </div>
      </el-form-item>
      <el-form-item prop="password" label="账户密码：" class="my-input-suffix">
        <div>
          <el-input
            placeholder="请输入账户密码"
            show-password
            v-model="accountData.password">
          </el-input>
        </div>
      </el-form-item>
      
      <el-form-item prop="brokerName" label="经纪公司：" class="my-input-suffix">
        <div>
          <el-input
            placeholder="请输入公司"
            v-model="accountData.brokerName">
          </el-input>
        </div>
      </el-form-item>
      <el-form-item prop="brokerID" label="公司代码：" class="my-input-suffix" style="margin-bottom:40px;">
        <div>
          <el-input
            placeholder="请输入公司ID"
            v-model="accountData.brokerID">
          </el-input>
        </div>
      </el-form-item>

      <el-button type="primary" @click="sendAccount('accountForm')" class="addsure">确认添加</el-button>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'accountedit',
  data () {
    return {
      input1:"",
      accountData:{
        name:"146195",
        password:"xiashine",
        brokerName:"申银万国期货",
        brokerID:"12345",
      },
      rules:{
        name:[
          { required: true, message: '请输入账户名称', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入账户密码', trigger: 'blur' },
        ],
        brokerName:[
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
        brokerID:[
          { required: true, message: '经纪公司ID', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    close(){
      this.$emit('closeTan',true)
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    sendAccount(formName){
      // this.$refs[formName].validateField(['name','password','email','phone','surepass'],(errorMessage)=>{
      //   console.log(errorMessage=="")
      // })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data =  this.accountData;
          
          this.$post("/accounts/add",data).then(res=>{
            if(res.errno==='1'){
              let msg = res.data;
              //初始化新账户
              msg.State = '1';
              msg.Instruments =[];
              msg.visible = false;
              this.$emit('closeTan',msg)
            }else{
              if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
            }
          }) 
          
        } else {
            return false;
          }
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
