<template>
<div class="statisticslist">
  <div class="statisticslist-tab">
    <ul class="clearfix">
      <li class="active">买入</li>
      <li>买出</li>
    </ul>
  </div>

  <div class="table-block">
    <template>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="账户名">
        </el-table-column>
        <el-table-column
          prop="d1"
          label="昨日结算">
        </el-table-column>
        <el-table-column
          label="持仓盈亏">
          <template slot-scope="scope">
            <span style="color:#FF4647;">+{{scope.row.d2}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="平仓盈亏">
          <template slot-scope="scope">
            <span style="color:#00BB7A;">-{{scope.row.d3}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="d4"
          label="手续费">
        </el-table-column>
        <el-table-column
          prop="d5"
          label="保证金">
        </el-table-column>
        <el-table-column
          prop="d6"
          label="冻结">
        </el-table-column>
        <el-table-column
          prop="d7"
          label="可用">
        </el-table-column>
        <el-table-column
          prop="d8"
          label="动态权益 ">
        </el-table-column>
        <el-table-column
          prop="d9"
          label="风险度 ">
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
</div>
</template>

<script> 
export default {
  name: 'statisticslist',
  data () {
    return {
       tableData: [{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        },{
          name: '账号名1',
          d1: '432.00',
          d2: '432.00',
          d3: '432.00',
          d4: '432.00',
          d5: '432.00',
          d6: '432.00',
          d7: '432.00',
          d8: '432.00',
          d9: '432.00'
        }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statisticslist-tab{height:44px;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.08);padding-left:25px;margin-bottom: 24px;}
.statisticslist-tab li{float: left;height:44px;line-height: 44px;padding:0 9px;margin-right: 32px;cursor: pointer;border-bottom: 1px solid transparent;}
.statisticslist-tab li.active{color: #2475FB;border-bottom: 1px solid #2475FB;}
.statisticslist-tab li:last-child{margin-right: 0px;}
</style>
