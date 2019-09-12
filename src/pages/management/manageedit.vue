<template>
<div class="edit-tan">
  <div class="shadow"></div>
  <div class="tan-block manage-edit">
    <div class="tan-header">
      <h4>添加任务弹窗</h4>
      <i class="el-icon-close tan-close" @click="close"></i>
    </div>
    <div class="tan-mains">
      <div class="tan-in-group">
        <p class="title-tan-group">合约选择</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="tan-in-group">
        <p class="title-tan-group">执行策略</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="tan-in-group">
        <p class="title-tan-group">执行时间</p>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="tan-in-group">
        <p class="title-tan-group ckearfix">账户选择 <el-checkbox style="float:right;margin-bottom:0px;width:auto;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></p>
        
        <template>
          
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>

      <el-button type="primary" class="addsure">确认添加</el-button>
    </div>
  </div>
</div>
</template>

<script>
const cityOptions = ['Alexandria', 'Fortaleza', 'Hong Kong', 'Valencia','Valencia01','02'];
export default {
  name: 'manageedit',
  data () {
    return {
      checkAll: false,
      checkedCities: ['Alexandria', 'Fortaleza'],
      cities: cityOptions,
      isIndeterminate: true,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: '',
       value1: [new Date(2019, 8, 1, 10, 10), new Date(2019, 8, 1, 10, 10)],
    }
  },
  methods:{
    close(){
      this.$emit('closeTan',true)
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
