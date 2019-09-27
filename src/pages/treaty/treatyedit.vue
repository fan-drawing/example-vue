<template>
<div class="edit-tan">
  <div class="shadow"></div>
  <div class="tan-block manage-edit">
    <div class="tan-header">
      <h4>合约管理</h4>
      <i class="el-icon-close tan-close" @click="close"></i>
    </div>
    <el-form :model="treatyData" :label-position="'top'" label-width="100px" :rules="rules" ref="treatyForm" class="tan-mains treatyForm">
      <el-form-item prop="Instrument" label="合约名称" class="strategy-edit biginput">
        <el-input v-model="treatyData.Instrument" placeholder="请输入合约名称" v-show="false"></el-input>
          <el-autocomplete
            v-model="querySelectItem"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
      </el-form-item >
      <div class="float-split clearfix">
        <el-form-item prop="Start" label="上市日期" class="strategy-edit">
          <el-input v-model="treatyData.Start" v-show="false" placeholder="请输入上市日期"></el-input>
          <el-date-picker
            v-model="Start"
            @change="onStartDrug"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="End" label="最后交易日" class="strategy-edit">
          <el-input v-model="treatyData.End" v-show="false" placeholder="请输入最后交易日"></el-input>
          <el-date-picker
            v-model="End"
            @change="onEndDrug"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="PriceLimit" label="涨跌停限制" class="strategy-edit">
          <el-input placeholder="请输入限制" v-model="treatyData.PriceLimit" style="">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="float-split clearfix">
        
        <el-form-item prop="ExchangerName" label="上市交易所" class="strategy-edit" style="width:492px;">
          <el-input v-model="treatyData.ExchangerName" placeholder="请输入上市交易所"></el-input>
        </el-form-item>
        <el-form-item prop="ExchangePrice" label="交易手续费" class="strategy-edit" style="margin-left:14px;">
          <el-input placeholder="请输入交易手续费" v-model="treatyData.ExchangePrice" style="">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </div>
     
      <div class="float-split clearfix">
        <el-form-item prop="Commission" label="交割手续费" class="strategy-edit">
          <el-input placeholder="请输入交割手续费" v-model="treatyData.Commission" style="">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="BenchmarkPrice" label="挂牌基准价" class="strategy-edit">
          <el-input v-model="treatyData.BenchmarkPrice" placeholder="请输入挂牌基准价"></el-input>
        </el-form-item>
        <el-form-item prop="MarginLimit" label="最低保证金" class="strategy-edit">
          <el-input placeholder="请输入最低保证金" v-model="treatyData.MarginLimit" style="">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </div>

      <el-button @click="addTreaty('treatyForm')" type="primary" class="addsure">确认添加</el-button>
    </el-form>
  </div>
</div>
</template>

<script>
const cityOptions = ['双向', '只多', '只空'];
export default {
  name: 'treatyedit',
  data () {
    return {
      treatyData:{
        Instrument:"IH1910",
        Start:"",
        End:"",
        PriceLimit:123,
        ExchangerName:"中金所",
        ExchangePrice:0.25,
        Commission:2.5,
        BenchmarkPrice:4561.0,
        MarginLimit:5,
      },
      querySelectItem:"",
      Start:"",
      End:"",
      rules:{
        Instrument:[
           { required: true, message: '请输入合约名称', trigger: 'blur' },
        ],
        Start:[
          { required: true, message: '请输入最上市日期', trigger: 'blur' },
        ],
        End:[
          { required: true, message: '请输入最后交易日', trigger: 'blur' },
        ],
        PriceLimit:[],
        ExchangerName:[],
        ExchangePrice:[],
        Commission:[],
        BenchmarkPrice:[],
        MarginLimit:[],
        restaurants:[],
        stateSelect: '',
        timeout:  null
      }
    }
  },
  mounted(){
    this.getAllTreaty()
  },
  methods:{
    onStartDrug(val){
      this.treatyData.Start = val;
    },
    onEndDrug(val){
      this.treatyData.End = val;
    },
    close(){
      this.$emit('closeTan',true)
    },
    addTreaty(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data ={
              Instrument:this.treatyData.Instrument,
              Start:this.treatyData.Start,
              End:this.treatyData.End,
              PriceLimit:this.treatyData.PriceLimit/100+"",
              ExchangerName:this.treatyData.ExchangerName,
              ExchangePrice:this.treatyData.ExchangePrice/100+"",
              Commission:this.treatyData.Commission/100+"",
              BenchmarkPrice:this.treatyData.BenchmarkPrice+"",
              MarginLimit:this.treatyData.MarginLimit/100+"",
            };
          this.$post("/instruments/add",data).then(res=>{
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
      
    },
    handleSelect(item) {
      this.treatyData.Instrument = item.label;
      // console.log(item);
    },
    createStateFilter(queryString) {
      // console.log(queryString)
      return (stateSelect) => {
        return (stateSelect.value.indexOf(queryString) === 0);
      };
    },
    querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 2000 * Math.random());
    },
    getAllTreaty(){
      this.$fetch("https://www.quantinfo.com/API/m/chart/config").then(res=>{
        let ceill = [];

        for(let x in res){
          let obj = {};
          obj.label = x;
          obj.value = res[x][2];
          ceill.push(obj)
        }
        // console.log(ceill)
        this.restaurants = ceill;
      })
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tan-block{width:800px;height:auto;margin-left:-400px;}
.tan-block .biginput{width:472px;}
.float-split .strategy-edit{float: left;width:33.3%;}
.float-split .el-form-item__content{line-height:1.0; }
</style>
