<template>
  <div class="tablemanage">
      <div class="functional-area">
        <div class="btn-area clearfix">
          <div class="left-area">
            <el-button type="primary">全部开始<i class="el-icon-caret-right el-icon--right"></i></el-button>
            <el-button  icon="el-icon-plus" @click="setnewData">新建</el-button>
            <el-button v-if="sortableOpen" :class="sortableOpen?'open':''" @click="deleteManagetSelect"  icon="el-icon-delete">删除</el-button>
          </div>
          <div class="right-area">
            <el-button :class="sortableOpen?'open':''" @click="listItemSet">批量操作</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="tip-area" v-if="sortableOpen">
        <i class="el-icon-info"></i>
        <span>已选择<em>{{mullength}}</em>项</span>
      </div> -->

      <div class="table-block">
        <template>
          <el-table
            ref="multipleTableS"
            :data="manageData.slice((currpage - 1) * pagesize, currpage * pagesize)"
            tooltip-effect="dark"
            empty-text="当前用户没有填写任务"
            style="width: 100%"
            @selection-change="handleSelectionChanges">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="合约名称" v-if="props.row.Instruments!=null">
                    <span>{{((list)=>{let name = []; list.forEach((item)=>{name.push(item.Name)}); return name.join("、");})(props.row.Instruments)}}</span>
                  </el-form-item>
                  <el-form-item label="执行策略">
                    <span>{{ props.row.Strategy.Name }}</span>
                  </el-form-item>
                  <el-form-item label="执行时间">
                    <span>{{ props.row.StartStamp|timeLines }} 至 {{props.row.EndStamp|timeLines }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              v-if="sortableOpen"
              type="selection"
              width="55">
            </el-table-column>
             <el-table-column
              prop="Name"
              label="任务名称">
            </el-table-column>
            <el-table-column
              label="合约名称">
              <template slot-scope="scope">
                <!-- <el-popover
                  placement="bottom"
                  trigger="click">
                    <el-table :data="scope.row.Instruments">
                      <el-table-column width="150" property="Name" label="合约名称"></el-table-column>
                    </el-table> -->
                  <div v-if="scope.row.Instruments!=null" class="cell" style="cursor:pointer;" slot="reference">{{((list)=>{let name = []; list.forEach((item)=>{name.push(item.Name)}); return name.join("、");})(scope.row.Instruments)}}</div>
                <!-- </el-popover> -->
              </template>
            </el-table-column>
            
            <el-table-column
              label="执行策略">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  trigger="click">
                    <div class="tip-block" v-loading="loading">
                      <div v-if="StrategyItem!=null">
                        <p class="one-d">
                          <span>策略名称：</span>
                          <span>{{StrategyItem.Name}}</span>
                        </p>
                        <p class="two-d">
                          <span>策略创建时间：</span>
                          <span>{{StrategyItem.CreateTime}}</span>
                        </p>
                        <p class="two-d">
                          <span>操作方向：</span>
                          <span>{{Options[StrategyItem.Direction]}}</span>
                        </p>
                        <p class="two-d">
                          <span>策略描述：</span>
                          <span>{{StrategyItem.Description}}</span>
                        </p>
                        <p class="two-d">
                          <span>对冲风险敞口：</span>
                          <span>{{StrategyItem.Risk*100}}%</span>
                        </p>
                      </div>
                    </div>
                  <div class="cell" style="cursor:pointer;" @click="getStrategyItem(scope.row.Strategy.ID)" slot="reference">{{scope.row.Strategy.Name}}</div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              label="归属账号 ">
              <template slot-scope="scope">
                
                <el-popover
                  placement="top"
                  trigger="hover">
                  <el-table :data="scope.row.Accounts" class="tan-table">
                    <el-table-column width="150" property="Account" label="账号名称"></el-table-column>
                  </el-table>
                  <div  slot="reference" class="cell">归属<em style="color:rgb(24, 144, 255);padding:0 5px;">{{scope.row.Accounts.length}}</em>个账号</div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              :filters="[{ text: '未开始', value: '1' }, { text: '已开始', value: '2' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                <i class="point-i" v-if="scope.row.State=='1'" :style="{width:'6px',height:'6px',background:'rgba(24,144,255,1)'}"></i>
                <i class="point-i" v-if="scope.row.State=='0'" :style="{width:'6px',height:'6px',background:'#E6A23C'}"></i>
                <!-- <i class="point-i" v-if="scope.row.State=='2'" :style="{width:'6px',height:'6px',background:'rgba(255, 70, 71, 1)'}"></i> -->
                <span v-if="scope.row.State=='1'">未开始</span>
                <span v-if="scope.row.State=='0'">已开始</span>
                <!-- <span v-if="scope.row.State=='2'">已结束</span> -->
              </template>
            </el-table-column>
            <el-table-column
              label="执行时间"
              sortable
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="cell">
                  {{ scope.row.StartStamp|timeLines }} 至 {{scope.row.EndStamp|timeLines }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="200"
              >
              <template slot-scope="scope">
                <el-button v-if="scope.row.State=='1'" @click="tabTypeManage(scope.row,'0')" type="primary" class="signal">开始<i class="el-icon-caret-right el-icon--right"></i></el-button>
                <el-button v-if="scope.row.State=='0'" @click="tabTypeManage(scope.row,'1')" type="warning" class="signal">结束<i class="el-icon--right el-icon-loading"></i></el-button>
                
                <span class="split"></span>
                <el-button class="edit-btn" style="cursor:not-allowed;">待定</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="pages-list">
        <el-pagination
          background
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          
          :total="manageData.length"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
      <transition name="move">
        <manageedit  v-show="openTan" v-on:closeTan="closeTanActive"/>
      </transition>
  
  </div>
  
</template>

<script>
import manageedit from "./manageedit.vue"
export default {
  name: 'tablemanage',
  data () {
    return {
      sortableOpen:false,
      pagesize: 10,
      currpage: 1,
      manageData: [],
      multipleSelections: [],
      loading:false,
      openTan:false,
      StrategyItem: null,  
      InstrumentItem:null,
      Options:{
        '2':'双向',
        '1':'只多',
        '0':'只空',
      },
    }
  },
  filters:{
    timeLines(value){
      return new Date(value*1000).format("yyyy-MM-dd hh:mm:ss");
    }
  },
  computed:{
    
  },
  components:{manageedit},
  mounted(){
    this.getManageList();
  },
  methods:{
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleSelectionChanges(val) {
      this.multipleSelections = val;
    },
    filterTag(value, row) {
        return row.State == value;
      },
    listItemSet(){
      this.sortableOpen = !this.sortableOpen;
    },
    setnewData(){
      this.openTan = true;
    },
    getInstrumentItem(list){
      this.InstrumentItem = null;
      const data = {instrumentID:ID};
    },
    getStrategyItem(ID){
      this.loading = true;
      this.StrategyItem = null;
      const data = {strategyID:ID};
      this.$post('/strategies',data).then(res=>{
        if(res.errno=="1"){
          this.StrategyItem = res.data;
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
        }
        this.loading = false;
      }).catch(error=>{
        console.log(error);
        this.loading = false;
      })
    },
    //# 开始0 暂停1 结束2 
    tabTypeManage(item,type){
      const data = {"taskID":item.ID, "state": type};
      const index = this.searchListId(item);
      this.$post('/tasks/control',data).then(res=>{
        if(res.errno=="1"){
          this.manageData[index].State = type;
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
        }
        this.loading = false;
      }).catch(error=>{
        console.log(error);
        this.loading = false;
      })
    },
    getManageList(){
      this.$fetch('/tasks').then(res=>{
        if(res.errno=="1"){
          let data = res.data;
          for(let i=0;i<data.length;i++){
            data[i].visible = false;
          }
          this.manageData = (data).reverse();
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    closeTanActive(data){
      if(data instanceof Object){
        this.manageData.unshift(data);
      }
      this.openTan = false;
    },
    deleteManagetSelect(){
      let list = this.multipleSelections;
      let selectDataId = [];
      list.forEach((item)=>{
        selectDataId.push(item.ID)
      });
      let data ={taskID:selectDataId};
      let selectorDele = this.searchListId(list);

      this.$post('/tasks/del',data).then(res=>{
        if(res.errno=='1'){
          let deli=0; //每次删除造成的差值
          selectorDele.forEach((i)=>{
            this.manageData.splice(i-deli,1);
            deli++;
          })
          this.multipleSelections=[];
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    searchListId(selector){
      let ceillreturn = [];
      if(selector instanceof Array){
        selector.forEach((item)=>{
          ceillreturn.push(this.manageData.indexOf(item));
        })
        return ceillreturn.sort();
      }else{
        return this.manageData.indexOf(selector);
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .functional-area{margin-bottom: 16px;}
  .left-area{float: left;}
  .right-area{float: right;}
  .tip-area{margin-bottom: 16px; height:40px;background:rgba(36,117,251,0.06);border-radius:2px;border:1px solid rgba(36,117,251,0.3);padding:9px 16px;box-sizing: border-box;font-size: 14px;}
  .tip-area i{color: #2475FB;font-size: 16px;vertical-align: middle;}
  .tip-area span{margin-left:4px;vertical-align: middle;}
  .tip-area span em{color: #2475FB;padding:0 6px;}
</style>
