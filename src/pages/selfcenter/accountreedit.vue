<template>
<div class="edit-tan">
  <div class="shadow"></div>
  <div class="tan-block manage-edit">
    <div class="tan-header">
      <h4>修改账户信息{{itemIndex}}</h4>
      <i class="el-icon-close tan-close" @click="close"></i>
    </div>
    
    <el-form :model="accountData" :label-position="'left'" label-width="100px" :rules="rules" ref="accountForm" class="tan-mains">
      <el-form-item prop="Account" label="账户名称：" class="my-input-suffix">
        <div>
          <el-input
            placeholder="请输入"
            v-model="accountData.Account">
          </el-input>
        </div>
      </el-form-item>
       <!-- <el-form-item prop="password" label="账户密码：" class="my-input-suffix">
        <div>
          <el-input
            placeholder="请输入账户密码"
            show-password
            v-model="accountData.password">
          </el-input>
        </div>
      </el-form-item> -->
      <el-form-item prop="BrokerName" label="经纪公司：" class="my-input-suffix">
        <div>
          <el-input
            placeholder="请输入公司"
            v-model="accountData.BrokerName">
          </el-input>
        </div>
      </el-form-item>
      <el-form-item prop="BrokerID" label="公司代码：" class="my-input-suffix" style="margin-bottom:40px;">
        <div>
          <el-input
            placeholder="请输入公司ID"
            v-model="accountData.BrokerID">
          </el-input>
        </div>
      </el-form-item>

      <el-button type="primary" @click="sendAccount('accountForm')" class="addsure">确认修改</el-button>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'accountreedit',
  props:['itemmsg','itemIndex'],
  computed:{
    accountData(){
      return this.itemmsg;
    }
  },
  data () {
    return {
      input1:"",
      
      rules:{
        Account:[
          { required: true, message: '请输入账户名称', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入账户密码', trigger: 'blur' },
        ],
        BrokerName:[
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
        BrokerID:[
          { required: true, message: '经纪公司ID', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    close(){
      this.$emit('closeTanEdit',true)
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data =  {"name": this.accountData.Account,"brokerName":this.accountData.BrokerName,"brokerID":this.accountData.BrokerID,"ID":this.accountData.ID+""}  
          this.$post("/accounts/update",data).then(res=>{
            if(res.errno==='1'){
              this.accountData.CreateTime = res.data.UpdateTime;
              this.$emit('closeTanEdit',{data:this.accountData,index:this.itemIndex});
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
