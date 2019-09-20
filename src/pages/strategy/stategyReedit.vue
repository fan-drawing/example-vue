<template>
<div class="edit-tan strategy">
  <div class="shadow"></div>
  <div class="tan-block manage-edit">
    <div class="tan-header">
      <h4>策略管理修改</h4>
      <i class="el-icon-close tan-close" @click="close"></i>
    </div>
     <el-form :model="stategyData" :label-position="'top'" :rules="rules" ref="stategyRForm" class="tan-mains">
      
      <el-form-item prop="Name" label="策略名称" class="strategy-edit">
        <el-input v-model="stategyData.Name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item prop="Risk" label="对冲风险敞口" class="strategy-edit">
        <el-input placeholder="请输入内容" v-model="stategyData.Risk" style="width:160px;">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="risk" label="合约选择" class="strategy-edit">
          <el-select v-model="stategyData.Instruments" multiple placeholder="请选择">
            <el-option
              v-for="item in instruments"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="Direction" label="操作方向" class="strategy-edit">
         <el-input v-model="stategyData.Direction" v-show="false"  placeholder="请输入内容"></el-input>
         <el-radio-group 
          v-model="checkedCities"
          @change="changeRadio"
          >
          <el-radio  v-for="city in cities" :label="city.value" :key="city.value">{{city.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="Description" label="策略描述" class="strategy-edit">
        <el-input v-model="stategyData.Description" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-button type="primary" class="addsure" @click="editReStrategy('stategyRForm')">确认修改</el-button>
    </el-form>
  </div>
</div>
</template>

<script>
const cityOptions = [{label:'双向',value:'2'}, {label:'只多',value:'1'},{label:'只空',value:'0'}];
export default {
  name: 'stategyReedit',
  props:['stategyedit'],
  data () {
    return {
      
       rules:{
        Name:[
           { required: true, message: '请输入策略名称', trigger: 'blur' },
        ],
        Risk:[
          { required: true, message: '请输入对冲风险敞口', trigger: 'blur' },
        ],
        Instruments:[
          { required: true, message: '请选择合约', trigger: 'blur' },
        ],
        Direction:[
          { required: true, message: '请输入策略名称简介', trigger: 'blur' },
        ],
        Description:[
          { required: true, message: '请输入最后交易日', trigger: 'blur' },
        ],
       },
       stategyData:{},
       cities:cityOptions,
       checkedCities:"2",
       instruments:[],
    }
  },
  computed:{
  },
  mounted(){
    this.getAllTreaty();
    let dataCeill = this.stategyedit.ReditMsg;
    dataCeill.Risk = parseFloat(dataCeill.Risk)*100;
    this.checkedCities = dataCeill.Direction+"";
    this.stategyData = dataCeill;
  },
  methods:{
    close(){
      this.$emit('closeTan',true)
    },
    getAllTreaty(){
      this.$fetch('/instruments').then(res=>{
        if(res.errno=="1"){
          let data = res.data;
          let ceillData = [];
          for(let i=0;i<data.length;i++){
            let objectCeill = {};
            objectCeill.value = data[i].ID;
            objectCeill.label = data[i].Instrument;
            ceillData.push(objectCeill);
          }
          this.instruments = (ceillData).reverse();
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:2000});
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    changeRadio(value){
      this.stategyData.Direction = value;
      // console.log(value);
    },
    editReStrategy(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data ={
              ID:(this.stategyData.ID).toString(),
              Name:this.stategyData.Name, 
              Risk:(this.stategyData.Risk/100).toString(),  
              Direction:(this.stategyData.Direction).toString()||"2", 
              Description:(this.stategyData.Description).toString(),
              Instruments:(this.stategyData.Instruments).join(',')
            };
          this.$post("/strategies/update",data).then(res=>{
            if(res.errno=='1'){
              this.$emit('closeTan',{item:this.stategyData,index:this.stategyedit.editReIndex});
            }else{
              if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning'});
            }
          }) 
          
        } else {
            return false;
          }
        });
      
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.strategy-edit{margin-bottom:36px;}
.strategy-edit .title{font-size:14px;color:rgba(0,0,0,0.85);line-height:14px;position:relative;padding-left:8px;margin-bottom:12px;}
.strategy-edit .title:before{content:"";display:block;position:absolute;left:0;width:2px;height:10px;background:#2475FB;top:50%;margin-top:-5px;}
</style>
