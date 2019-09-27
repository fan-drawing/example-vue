<template>
<div class="hideEle">
  <div class="containue-cj overflow-two-margin">
    <div class="item-show edit-strategy" @click="addTreatyItem">
        <i class="el-icon-plus"></i><span>新增合约</span>
    </div>
    <div class="item-show msg-strategy" v-for="(item) in treatyData" :key="item.ID">
        <div class="top">
          <div class="top-inner">
            <img class="title-icon-img" src="@/assets/icon-img.png">
            <h4>{{item.Instrument}}</h4>  
            <p>上市日期：{{item.Start|filterDate}}</p>
            <p>最后交易日：{{item.End|filterDate}}</p>
            <!-- <p>操作方向：双向操作</p> -->
          </div>
        </div>
        <div class="bottom-area-action clearfix">
          <el-popover
            placement="bottom"
            width="160"
            v-model="item.visible">
            <p>确定删该合约吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="item.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteTreatySignal(item)">确定</el-button>
            </div>
            <a class="delete" slot="reference">删除合约</a>
          </el-popover>
          <a class="edit" @click="edit(item)">编辑合约</a>
        </div>
    </div>
  </div>
  <transition name="move">
    <treatyedit  v-show="openTan" v-on:closeTan="closeTanActive"/>
  </transition>
  <transition name="move">
    <treatyreedit  v-if="openTanRedit" v-on:closeTan="closeTanReActive" :treatyreedit="reEdit"/>
  </transition>
  <!-- <stategyedit/> -->
</div>
</template>

<script>
import treatyedit from "./treatyedit.vue"
import treatyreedit from "./treatyreedit.vue"
export default {
  name: 'treaty',
  
  components:{treatyedit,treatyreedit},
  data () {
    return {
      openTan:false,
      openTanRedit:false,
      // treatyData:[],
      reEdit:{
        ReditMsg:null,
        editReIndex:0,
      },
    }
  },
  computed:{
    treatyData(){
      this.$store.dispatch("increment");
      return this.$store.getters.getTreatyLists;
    }
  },
  filters:{
    filterDate(val){
      if(val instanceof String){
        val = val.toString();
      }
      if(val.length==8){
        return val.slice(0,4)+"年"+val.slice(4,6)+"月"+val.slice(6,8)+"日";
      }else{
        return "错误的格式错误"
      }
    }
  },
  mounted(){
    // this.getTreatyList();
  },
  methods:{
    closeTanActive(data){
      if(data instanceof Object){
        this.$store.dispatch("addTreaty",data);
      }
      this.openTan = false;
    },
    closeTanReActive(data){
      if(data instanceof Object){
        this.$store.dispatch("editSpliceTreaty",data);
      }
      this.openTanRedit = false;
    },
    edit(item){
      let itemCopy = JSON.parse(JSON.stringify(item));
      itemCopy.Commission = itemCopy.Commission*100;
      itemCopy.ExchangePrice = itemCopy.ExchangePrice*100;
      itemCopy.MarginLimit = itemCopy.MarginLimit*100;
      itemCopy.PriceLimit = itemCopy.PriceLimit*100;
      this.reEdit.ReditMsg =itemCopy;
      this.reEdit.editReIndex = this.searchListId(item);
      this.$nextTick(()=>{
        this.openTanRedit = true;
      })
      
    },
    getTreatyList(){
      this.$store.dispatch('getTreatyList');
    },
    addTreatyItem(){
      this.openTan = true;
    },
    deleteTreatySignal(item){
      let data ={instrumentID:item.ID};
      let index = this.searchListId(item);
      this.$store.dispatch("deleteTreaty",{data,index});
    },
    searchListId(selector){
      let ceillreturn = [];
      if(selector instanceof Array){
        selector.forEach((item)=>{
          ceillreturn.push(this.treatyData.indexOf(item));
        })
        return ceillreturn.sort();
      }else{
        return this.treatyData.indexOf(selector);
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
