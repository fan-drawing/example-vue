<template>
<div class="edit-tan">
  <div class="shadow"></div>
  <div class="tan-block manage-edit">
    <div class="tan-header">
      <h4>添加账户弹窗</h4>
      <i class="el-icon-close tan-close" @click="close"></i>
    </div>
    <div class="tan-mains">
      <div class="my-input-suffix">
        <span class="label-input-suffix">账户名称：</span>
        <div>
          <el-input
            placeholder="请输入"
            v-model="input1">
          </el-input>
        </div> 
      </div>
      <div class="my-input-suffix">
        <span class="label-input-suffix">账户名称：</span>
        <div>
          <el-input
            placeholder="请输入"
            v-model="input1">
          </el-input>
        </div> 
      </div>
      <div class="my-input-suffix">
        <span class="label-input-suffix">账户密码：</span>
        <div>
          <el-input
            placeholder="请输入"
            show-password
            v-model="input1">
          </el-input>
        </div> 
      </div>
      <div class="my-input-suffix">
        <span class="label-input-suffix">确认密码：</span>
        <div>
          <el-input
            placeholder="请输入"
            show-password
            v-model="input1">
          </el-input>
        </div> 
      </div>
      <div class="my-input-suffix">
        <span class="label-input-suffix">经纪公司：</span>
        <div>
          <el-input
            placeholder="请输入"
            v-model="input1">
          </el-input>
        </div> 
      </div>
      <div class="my-input-suffix" style="margin-bottom:40px;">
        <span class="label-input-suffix">公司代码：</span>
        <div>
          <el-input
            placeholder="请输入"
            v-model="input1">
          </el-input>
        </div> 
      </div>

      <el-button type="primary" class="addsure">确认添加</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'accountedit',
  data () {
    return {
      input1:"",
      
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
