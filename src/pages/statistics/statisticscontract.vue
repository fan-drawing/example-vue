<template>
 <div class="statisticslist">
    <div class="statisticscontract-tab">
      <ul class="clearfix">
        
        <router-link to="/statistics" tag="li">全部</router-link>
        <router-link to="/statistics?time=3" tag="li">近三个月</router-link>
        <router-link to="/statistics?time=6" tag="li">近半年</router-link>
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
  name: 'statisticscontract',
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
.statisticscontract-tab{margin-bottom:16px;}
.statisticscontract-tab li{float:left;margin-right:12px;height:32px;padding:0 12px;line-height:32px;border-radius:2px;cursor:pointer;}
.statisticscontract-tab li.active{background:rgba(22,22,24,0.08);}
</style>
