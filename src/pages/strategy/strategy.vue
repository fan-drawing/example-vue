<template>
<div class="hideEle">
  <div class="containue-cj overflow-two-margin">
    <div class="item-show edit-strategy" @click="addStategyItem">
        <i class="el-icon-plus"></i><span>新增策略</span>
    </div>
    <div class="item-show msg-strategy" v-for="(item) in stategyData" :key="item.ID">
        <div class="top">
          <div class="top-inner">
            <img class="title-icon-img" src="@/assets/icon-img.png">
            <h4>{{item.Name}}</h4>  
            <p>对冲风险敞口：{{(parseFloat(item.Risk)*100).toFixed(2)}}%</p>
            <p>操作方向：{{direction[item.Direction]}}</p>
            <p class="limit-line" :title="item.Description">描述：{{item.Description}}</p>
          </div>
        </div>
        <div class="bottom-area-action clearfix">
          <!-- <a class="delete">删除策略</a> -->
          <el-popover
            placement="bottom"
            width="160"
            v-model="item.visible">
            <p>确定删该策略吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="item.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteStrategySignal(item)">确定</el-button>
            </div>
            <a class="delete" slot="reference">删除策略</a>
          </el-popover>
          <a class="edit" @click="edit(item)">编辑策略</a>
        </div>
    </div>
  </div>
    <transition name="move">
      <stategyedit  v-if="openTan" v-on:closeTan="closeTanActive"/>
    </transition>
    <transition name="move">
      <stategyReedit  v-if="openTanRedit" v-on:closeTan="closeTanActiveRedit" :stategyedit="reEdit"/>
    </transition>

  <!-- <stategyedit/> -->
</div>
</template>

<script>
import stategyedit from "./stategyedit.vue"
import stategyReedit from "./stategyReedit.vue"
export default {
  name: 'strategy',
  
  components:{stategyedit,stategyReedit},
  data () {
    return {
      openTan:false,
      openTanRedit:false,
      reEdit:{
        ReditMsg:null,
        editReIndex:0,
      },
      direction:{
        '0':'只空',
        '1':'只多',
        '2':'双向',
      },
    }
  },
  computed:{
    stategyData(){
      this.$store.dispatch("increment");
      return this.$store.getters.getStrategyLists;
    }
  },
  mounted(){
    // this.getStategyList();
  },
  methods:{
    closeTanActive(data){
      if(data instanceof Object){
        this.$store.dispatch("addStategy",data);
      }
      this.openTan = false;
    },
    closeTanActiveRedit(data){
      if(data instanceof Object){
        this.$store.dispatch("editSpliceStategy",data);
      }
      this.openTanRedit = false;
    },
    edit(item){
      let itemCopy = JSON.parse(JSON.stringify(item));
     
      itemCopy.Instruments = ((arr)=>{let a=[]; arr.forEach((item)=>{a.push(item.ID)}); return a;})(itemCopy.Instruments);
      this.reEdit.ReditMsg = itemCopy;
      this.reEdit.editReIndex = this.searchListId(item);
      this.$nextTick(()=>{
        this.openTanRedit = true;
      })
      
    },
    getStategyList(){
      this.$store.dispatch("getStategyList");
    },
    addStategyItem(){
      this.openTan = true;
    },
    deleteStrategySignal(item){
      let data ={strategyID:item.ID};
      let index = this.searchListId(item);
      this.$store.dispatch("deleteStategy",{data,index});
    },
    searchListId(selector){
      let ceillreturn = [];
      if(selector instanceof Array){
        selector.forEach((item)=>{
          ceillreturn.push(this.stategyData.indexOf(item));
        })
        return ceillreturn.sort();
      }else{
        return this.stategyData.indexOf(selector);
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.overflow-two-margin{padding-top:10px;margin-left:-12px;margin-right:-12px;}
.item-show{width:362px;height:220px;background:rgba(255,255,255,1);border: 1px solid transparent;float:left;margin-left:12px;margin-right:12px;margin-bottom:24px;}
.edit-strategy{text-align:center;font-size:16px;font-weight:400;color:rgba(0,0,0,0.45);line-height:220px;cursor:pointer;}
.edit-strategy:hover{border:1px dashed rgba(36,117,251,1);}
.edit-strategy i{margin-right:10px;}
.msg-strategy {box-shadow:0px 2px 8px 0px rgba(22,22,24,0.06);border-radius:2px;position:relative;border:1px solid rgba(233,233,233,1);}
.msg-strategy .bottom-area-action{position:absolute;bottom:0;left:0;width:100%;height:48px;background:rgba(253,253,253,1);left:-1px; border-radius:0px 0px 2px 2px;border:1px solid rgba(233,233,233,1);}
.bottom-area-action a{cursor:pointer;text-decoration:none!important; float:left;width:50%;height:48px;line-height:48px;display:block;text-align:center;color:rgba(0,0,0,0.45);font-size:14px;}
.bottom-area-action a.edit{color:#2475FB;}
.bottom-area-action a.delete:hover{color:#FF3300;}
.bottom-area-action:after{content:"";width:1px;height:16px;position:absolute;display:block;background:#E8E8E8;left:50%;margin-left:-0.5px;top:50%;margin-top:-6px;}
.msg-strategy .top{padding-top:24px;padding-left:24px;padding-right:24px;}
.top-inner{position:relative;padding-left:64px;}
.title-icon-img{position:absolute;width:48px;height:48px;border-radius:50%;top:0;left:0;}
.top-inner h4{font-size:16px;height:24px;line-height:24px;color:rgba(0,0,0,0.85);margin-bottom:12px;}
.top-inner p{font-size:14px;color:rgba(0,0,0,0.45);line-height:22px;margin-bottom:6px;}
.top-inner p:last-child{margin-bottom:0px;}
.hideEle{width:1200px;overflow:hidden;margin-left:auto;margin-right:auto;}
.limit-line{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2; -webkit-box-orient: vertical;}
</style>
