<template>
  <div class="tablemanage">
      <div class="functional-area">
        <div class="btn-area clearfix">
          <div class="left-area">
            <el-button type="primary">全部开始<i class="el-icon-caret-right el-icon--right"></i></el-button>
            <el-button  icon="el-icon-plus" @click="setnewData">新建</el-button>
            <el-button v-if="sortableOpen" :class="sortableOpen?'open':''"  icon="el-icon-delete">删除</el-button>
          </div>
          <div class="right-area">
            <el-button :class="sortableOpen?'open':''" @click="listItemSet">批量操作</el-button>
          </div>
        </div>
      </div>
      <div class="tip-area" v-if="sortableOpen">
        <i class="el-icon-info"></i>
        <span>已选择<em>1</em>项</span>
      </div>

      <div class="table-block">
        <template>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="合约名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="执行策略">
                    <span>{{ props.row.strategy }}</span>
                  </el-form-item>
                  <el-form-item label="执行时间">
                    <span>{{ props.row.time }}</span>
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
              prop="name"
              width="120"
              label="合约名称">
            </el-table-column>
            <el-table-column
              prop="strategy"
              label="执行策略">
            </el-table-column>
            <el-table-column
              prop="accountnum"
              sortable
              width="120"
              label="归属账号 ">
            </el-table-column>
            <el-table-column
              width="100"
              label="状态"
              :filters="[{ text: '已暂停', value: '已暂停' }, { text: '已开始', value: '已开始' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                <i class="point-i" v-if="scope.row.status=='进行中'" :style="{width:'6px',height:'6px',background:'rgba(24,144,255,1)'}"></i>
                <i class="point-i" v-if="scope.row.status=='已结束'" :style="{width:'6px',height:'6px',background:'rgba(255, 70, 71, 1)'}"></i><span>{{scope.row.status}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="执行时间"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="primary" class="signal">开始<i class="el-icon-caret-right el-icon--right"></i></el-button>
                <span class="split"></span>
                <el-button class="edit-btn">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="pages-list">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
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
      tableData: [
          {
            name: 'TradeCode 0',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
          {
            name: 'TradeCode 1',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 2',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 3',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 4',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 5',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 6',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 7',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 8',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 9',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
           {
            name: 'TradeCode 10',
            strategy: '策略1：一段描述',
            accountnum: '12121212',
            status:"已暂停",
            time:"2017.01.31 - 2017.01.31",
          },
        ],
      multipleSelection: [],
      openTan:false,
    }
  },
  components:{manageedit},
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterTag(value, row) {
        return row.status === value;
      },
    listItemSet(){
      this.sortableOpen = !this.sortableOpen;
    },
    setnewData(){
      this.openTan = true;
    },
    closeTanActive(){
      this.openTan = false;
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
