<template>
<div class="edit-tan">
  <div class="shadow"></div>
  <div class="tan-block manage-edit">
    <div class="tan-header">
      <h4>添加任务弹窗</h4>
      <i class="el-icon-close tan-close" @click="close"></i>
    </div>
    <div class="tan-mains">
      <div class="tan-in-group">
        <p class="title-tan-group">任务名称</p>
        <el-input class="sp" v-model="formData.name" placeholder="请输入任务名称"></el-input>
      </div>
      <div class="tan-in-group">
        <p class="title-tan-group">执行策略</p>
        <el-select v-model="formData.strategies" placeholder="请选择">
          <el-option
            v-for="item in strategiesData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- <div class="tan-in-group">
        <p class="title-tan-group">合约选择</p>
        <el-select v-model="formData.treaty" placeholder="请选择">
          <el-option
            v-for="item in treatyData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> -->
      <div class="tan-in-group">
        <p class="title-tan-group">执行时间</p>
        <el-date-picker
          v-model="timeLine"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="tan-in-group">
        <p class="title-tan-group ckearfix">账户选择 <el-checkbox style="float:right;margin-bottom:0px;width:auto;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></p>
        
        <template>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="account in accounts" :label="account.value" :key="account.value">{{account.label}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>

      <el-button type="primary" class="addsure" @click="addTasks">确认添加</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'manageedit',
  data () {
    return {
      checkAll: false,
      checkedCities: [],
      accounts: [],
      isIndeterminate: true,
      formData:{
        strategies:"",
        treaty:"",
      },
      // treatyData:[],
      strategiesData:[],
      value: '',
      timeLine: ["2019-09-02 00:00:00", "2019-09-02 00:00:00"],
    }
  },
  mounted(){
    // this.getAllTreaty();
    this.getAllStrategies();
    this.getAccountAll();
  },
  methods:{

    // getAllTreaty(){
    //   this.$fetch('/instruments').then(res=>{
    //     if(res.errno=="1"){
    //       let data = res.data;
    //       let ceillData = [];
    //       for(let i=0;i<data.length;i++){
    //         let objectCeill = {};
    //         objectCeill.value = data[i].ID;
    //         objectCeill.label = data[i].Instrument;
    //         ceillData.push(objectCeill);
    //       }
    //       this.treatyData = (ceillData).reverse();
    //     }else{
    //       if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning'});
    //     }
    //   }).catch(error=>{
    //     console.log(error);
    //   })
    // },
    getAccountAll(){
      this.$fetch('/accounts').then(res=>{
        if(res.errno=="1"){
          let data = res.data;
          let ceillData = [];
          for(let i=0;i<data.length;i++){
            let objectCeill = {};
            objectCeill.value = data[i].ID;
            objectCeill.label = data[i].Account;
            ceillData.push(objectCeill);
          }
          this.accounts = (ceillData).reverse();
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',type: 'warning'});
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    getAllStrategies(){
      this.$fetch('/strategies').then(res=>{
        if(res.errno=="1"){
          let data = res.data;
          let ceillData = [];
          for(let i=0;i<data.length;i++){
            let objectCeill = {};
            objectCeill.value = data[i].ID;
            objectCeill.label = data[i].Name;
            ceillData.push(objectCeill);
          }
          this.strategiesData = (ceillData).reverse();
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',type: 'warning'});
        }
      }).catch(error=>{
        console.log(error);
      })
    },

    //添加 /tasks/add
    addTasks(){
          const data = {
            Name:(this.formData.name),
            StategyID:(this.formData.strategies).toString(),
            InstrumentID:(this.formData.treaty).toString(),
            StartTime:this.timeLine[0],EndTime:this.timeLine[1],
            AccountList:(this.checkedCities).join(",")
            } 
          this.$post("/tasks/add",data).then(res=>{
            if(res.errno=='1'){
              this.$emit('closeTan',res.data);
            }else{
              if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning'});
            }
          }) 
          
        
      
    },
    close(){
      this.$emit('closeTan',true)
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? ((arr)=>{let a=[]; arr.forEach((item)=>{ a.push(item.value);}); return a;})(this.accounts) : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.accounts.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.accounts.length;
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
