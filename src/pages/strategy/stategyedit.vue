<template>
<div class="edit-tan strategy">
  <div class="shadow"></div>
  <div class="tan-block manage-edit">
    <div class="tan-header">
      <h4>策略管理</h4>
      <i class="el-icon-close tan-close" @click="close"></i>
    </div>
     <el-form :model="stategyData" :label-position="'top'" :rules="rules" ref="stategyForm" class="tan-mains">
      
      <el-form-item prop="name" label="策略名称" class="strategy-edit">
        <el-input v-model="stategyData.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item prop="risk" label="对冲风险敞口" class="strategy-edit">
        <el-input placeholder="请输入内容" v-model="stategyData.risk" style="width:160px;">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="risk" label="合约选择" class="strategy-edit">
        
          <el-select v-model="stategyData.instruments" multiple placeholder="请选择">
            <el-option
              v-for="item in instruments"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="direction" label="操作方向" class="strategy-edit">
         <el-input v-model="stategyData.direction" v-show="false"  placeholder="请输入内容"></el-input>
         <el-radio-group 
          v-model="checkedCities"
          @change="changeRadio"
          >
          <el-radio  v-for="city in cities" :label="city.value" :key="city.value">{{city.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="description" label="策略描述" class="strategy-edit">
        <el-input v-model="stategyData.description" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-button type="primary" class="addsure" @click="addStrategy('stategyForm')">确认添加</el-button>
    </el-form>
  </div>
</div>
</template>

<script>
const cityOptions = [{label:'双向',value:'2'}, {label:'只多',value:'1'},{label:'只空',value:'0'}];
export default {
  name: 'stategyedit',
  data () {
    return {
      stategyData:{
        name:'策略20191010', 
        risk:0.5,  
        direction:"2", 
        instruments:[],
        description:'冯爱国蓉儿爱个爱迪生给弄供热埃及sdfdfsg123454'
      },
       rules:{
        name:[
           { required: true, message: '请输入策略名称', trigger: 'blur' },
        ],
        risk:[
          { required: true, message: '请输入对冲风险敞口', trigger: 'blur' },
        ],
        instruments:[
          { required: true, message: '请选择合约', trigger: 'blur' },
        ],
        direction:[
          { required: true, message: '请输入策略名称简介', trigger: 'blur' },
        ],
        description:[
          { required: true, message: '请输入最后交易日', trigger: 'blur' },
        ],
       },
       instruments:[],
       checkedCities:"2",
       cities:cityOptions,
    }
  },
  mounted(){
    this.getAllTreaty();
  },
  methods:{
    close(){
      this.$emit('closeTan',true)
    },
    changeRadio(value){
      this.stategyData.direction = value;
      // console.log(value);
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
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    addStrategy(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data ={
              name:this.stategyData.name, 
              risk:this.stategyData.risk/100+"",  
              direction:this.stategyData.direction||"2", 
              description:this.stategyData.description+"",
              instruments:(this.stategyData.instruments).join(",")
            };
          this.$post("/strategies/add",data).then(res=>{
            if(res.errno=='1'){
              
              this.$emit('closeTan',res.data);
            }else{
              if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
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
