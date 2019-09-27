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
          :data="manageData"
          height="336"
          border
          style="width: 100%">
          <el-table-column
            prop="Name"
            label="任务名称"
            width="180">
          </el-table-column>
          <el-table-column
            label="合约名称"
            width="180">
            <template slot-scope="scope">
                <div v-if="scope.row.Instruments!=null" class="cell" style="cursor:pointer;" slot="reference">{{((list)=>{let name = []; list.forEach((item)=>{name.push(item.Name)}); return name.join("、");})(scope.row.Instruments)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="执行策略">
            <template slot-scope="scope">
                <div class="cell">{{scope.row.Strategy.Name}}</div>
              </template>
          </el-table-column>
          <el-table-column
            width="100"
            label="状态 ">
            <template slot-scope="scope">
                <i class="point-i" v-if="scope.row.State=='1'" :style="{width:'6px',height:'6px',background:'rgba(24,144,255,1)'}"></i>
                <i class="point-i" v-if="scope.row.State=='0'" :style="{width:'6px',height:'6px',background:'#E6A23C'}"></i>
                <span v-if="scope.row.State=='1'">未开始</span>
                <span v-if="scope.row.State=='0'">已开始</span>
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
      
    }
  },
  computed:{
    manageData(){
      this.$store.dispatch("increment");
      return this.$store.getters.getManageList; 
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .quotationslist-header{height:50px;border-bottom:1px solid rgba(22, 22, 24, 0.08);padding-left:30px;}
  .quotationslist{width: 100%;height: 386px;background:#fff;margin-top:20px;}
</style>
