<template>
  <div class="acountmanagement">
    <div class="functional-area">
      <div class="btn-area clearfix">
        <div class="left-area">
          <el-button icon="el-icon-plus" @click="setnewData">添加账号</el-button>
          <el-button @click="listItemSet">批量操作</el-button>
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
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="账户名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="经纪公司">
                    <span>{{ props.row.strategy }}</span>
                  </el-form-item>
                  <el-form-item label="创建时间">
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
              label="账户名">
            </el-table-column>
            <el-table-column
              prop="strategy"
              label="合约数量">
            </el-table-column>
            <el-table-column
              prop="accountnum"
              sortable
              width="120"
              label="创建时间 ">
            </el-table-column>
            <el-table-column
              width="100"
              label="经纪公司"
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
              label="代码"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="color:#2475FB;cursor:pointer;">编辑</span>
                <span class="split" style="margin-right:12px;height:14px;"></span>
                <span style="color:#E83003;cursor:pointer;">删除</span>
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
    <accountedit v-show="openTan" v-on:closeTan="closeTanActive"/>
  </div>
</template>

<script>
import accountedit from "./accountedit.vue"
export default {
  name: 'acountmanagement',
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
  components:{accountedit},
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
.functional-area{margin-bottom:16px;}
</style>
