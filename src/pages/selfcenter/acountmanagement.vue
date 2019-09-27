<template>
  <div class="acountmanagement">
    <div class="functional-area">
      <div class="btn-area clearfix">
        <div class="left-area">
          <el-button icon="el-icon-plus" @click="setnewData">添加账号</el-button>
          <el-button @click="listItemSet">批量删除</el-button>
          <el-button v-if="sortableOpen" :class="sortableOpen?'open':''" @click="deleteAccountSelect"  icon="el-icon-delete">删除</el-button>
          
        </div>
        <div class="right-area">
          <!-- <el-button :class="sortableOpen?'open':''" @click="listItemSet">批量操作</el-button> -->
        </div>
      </div>
    </div>

    <div class="table-block">
        <template>
          <el-table
            ref="multipleTable"
            :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="账户名">
                    <span>{{ props.row.Account }}</span>
                  </el-form-item>
                  <el-form-item label="经纪公司">
                    <span>{{ props.row.BrokerName }}</span>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <span>{{ props.row.CreateTime }}</span>
                  </el-form-item>
                  <el-form-item label="创建密码">
                    <span>{{ props.row.password }}</span>
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
              prop="Account"
              width="120"
              label="账户名">
            </el-table-column>
            <el-table-column
              label="关联合约">
              <template slot-scope="scope">
                <div class="cell">{{scope.row.Instruments|fiterName}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="CreateTime"
              sortable
              width="160"
              label="创建时间 ">
            </el-table-column>
            <el-table-column
              prop="BrokerName"
              width="160"
              label="经纪公司"
              >
            </el-table-column>
            <el-table-column
              width="100"
              label="账号状态"
              :filters="[{ text: '可用', value: '1' }, { text: '不可用', value: '0' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                <i class="point-i" v-if="scope.row.State=='2'" :style="{width:'6px',height:'6px',background:'rgba(24,144,255,1)'}"></i>
                <i class="point-i" v-if="scope.row.State=='1'" :style="{width:'6px',height:'6px',background:'#FFC107'}"></i>
                <i class="point-i" v-if="scope.row.State=='0'" :style="{width:'6px',height:'6px',background:'rgba(255, 70, 71, 1)'}"></i>
                <span v-if="scope.row.State=='1'" >待审核</span>
                <span v-if="scope.row.State=='2'" >可用</span>
                <span v-if="scope.row.State=='0'" >不可用</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#2475FB;cursor:pointer;" @click="resetnewData(scope.row)">编辑</span>
                <span class="split" style="margin-right:12px;height:14px;"></span>
                <!-- <span style="color:#E83003;cursor:pointer;">删除</span> -->
                <el-popover
                  placement="top"
                  width="160"
                  v-model="scope.row.visible">
                  <p>确定删除该账户吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="deleteAccountSignal(scope.row)">确定</el-button>
                  </div>
                  <span style="color:#E83003;cursor:pointer;" slot="reference">删除</span>
                </el-popover>
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
        :total="tableData.length"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <accountedit v-if="openTan" v-on:closeTan="closeTanActive"/>
    <accountreedit v-if="openTanEdit" v-on:closeTanEdit="closeTanEditActive" :itemmsg="editItem" :itemIndex="editIndex"/>
  </div>
</template>

<script>
import accountedit from "./accountedit.vue"
import accountreedit from "./accountreedit.vue"
export default {
  name: 'acountmanagement',
  data () {
    return {
      sortableOpen:false,
      tablelength:0,
      tableData: [],
      pagesize: 10,
      currpage: 1,
      multipleSelection: [],
      openTan:false,
      openTanEdit:false,
      visible: false,
      editItem:null,
      editIndex:null,
    }
  },
  filters:{
    fiterName(value){
      let a = [];
      value.forEach(element => {
        a.push(element.Name);
        
      });
      if(a.length!=0){
        return a.join("、");
      }
      return "暂无关联合约";
       
      
    }
  },
  components:{accountedit,accountreedit},
  mounted(){
    this.getAccountAll();
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    filterTag(value, row) {
      return row.status === value;
    },
    listItemSet(){
      this.multipleSelection=[];
      this.sortableOpen = !this.sortableOpen;
    },
    setnewData(item){
      this.openTan = true;
    },
    closeTanActive(data){
      if(data instanceof Object){
        this.tableData.unshift(data);
      }
      this.openTan = false;
    },
    resetnewData(itemobj){
      let a = JSON.stringify(itemobj);
      this.editItem = JSON.parse(a);
      this.editIndex = this.searchListId(itemobj);
      this.openTanEdit = true;
    },
    closeTanEditActive(json){
      if(json instanceof Object){
        this.tableData.splice(json.index,1,json.data);
      }
      this.openTanEdit = false;
    },


    //获取账户信息
    getAccountAll(){
      this.$fetch('/accounts').then(res=>{
        if(res.errno=="1"){
          let data = res.data;
          for(let i=0;i<data.length;i++){
            data[i].visible = false;
          }
          this.tableData = (data).reverse();
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    //delete 账户信息
    deleteAccountSignal(item){
      let data ={id:[item.ID]};
      this.$post('/accounts/del',data).then(res=>{
        if(res.errno=='1'){
          this.tableData.splice(this.searchListId(item),1);
        }else{
          if(res.errmsg) this.$message({ message: res.errmsg, type: 'warning',duration:1000,showClose:true,offset:100,});
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    deleteAccountSelect(){
      let list = this.multipleSelection;
      let selectDataId = [];
      list.forEach((item)=>{
        selectDataId.push(item.ID)
      });
      let data ={id:selectDataId};
      let selectorDele = this.searchListId(list);

      this.$post('/accounts/del',data).then(res=>{
        if(res.errno=='1'){
          let deli=0; //每次删除造成的差值
          selectorDele.forEach((i)=>{
            this.tableData.splice(i-deli,1);
            deli++;
          })
          this.multipleSelection=[];
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
          ceillreturn.push(this.tableData.indexOf(item));
        })
        return ceillreturn.sort();
      }else{
        return this.tableData.indexOf(selector);
      }
      
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.functional-area{margin-bottom:16px;}
</style>
