<template>
<div class="quotationslist">
  <div class="quotationslist-header">
    <h4 class="q-title">
      <span>任务列表</span>
    </h4>
  </div>
  <div class="table-block">
      <template>
        <el-table
          :data="tableData"
          height="336"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="任务名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="合约名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="执行策略">
          </el-table-column>
          <el-table-column
            width="100"
            label="状态 ">
            <template slot-scope="scope">
              <i class="point-i" v-if="scope.row.status=='进行中'" :style="{width:'6px',height:'6px',background:'#1890FF'}"></i>
              <i class="point-i" v-if="scope.row.status=='已结束'" :style="{width:'6px',height:'6px',background:'#FF4647'}"></i><span>{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="价格趋势">
            <template slot-scope="scope">
              图片
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
</div>
</template>

<script>
export default {
  name: 'quotationslist',
  data () {
    return {
      tableData: [{
          date: '任务1',
          name: 'IC1910',
          address: '策略1：这里是一段描述',
          status: '进行中',
        },{
          date: '任务2',
          name: 'IC1910',
          address: '策略1：这里是一段描述',
          status: '进行中',
        },{
          date: '任务3',
          name: 'IC1910',
          address: '策略1：这里是一段描述',
          status: '进行中',
        },{
          date: '任务4',
          name: 'IC1910',
          address: '策略1：这里是一段描述',
          status: '进行中',
        },{
          date: '任务5',
          name: 'IC1910',
          address: '策略1：这里是一段描述',
          status: '进行中',
        },{
          date: '任务6',
          name: 'IC1910',
          address: '策略1：这里是一段描述',
          status: '进行中',
        },{
          date: '任务7',
          name: 'IC1910',
          address: '策略1：这里是一段描述',
          status: '进行中',
        },{
          date: '任务8',
          name: 'IC1910',
          address: '策略1：这里是一段描述',
          status: '进行中',
        },]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .quotationslist-header{height:50px;border-bottom:1px solid rgba(22, 22, 24, 0.08);padding-left:30px;}
  .quotationslist{width: 100%;height: 386px;background:#fff;margin-top:20px;}
</style>
