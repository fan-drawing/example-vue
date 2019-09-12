<template>
 <div class="baseedit">
    <div class="passedit" style="margin-top:8px;">
      <p class="passedit-label">原密码</p>
      <el-input v-model="input" placeholder="请输入内容" show-password></el-input>
    </div>
    <div class="passedit">
      <p class="passedit-label">新密码</p>
      <el-input v-model="input" placeholder="请输入内容" show-password></el-input>
    </div>
    <div class="passedit">
      <p class="passedit-label">确认密码密码</p>
      <el-input v-model="input" placeholder="请输入内容" show-password></el-input>
    </div>
    <el-button class="edit-up">确定</el-button>
  </div>
</template>

<script>
export default {
  name: 'editpassword',
  data () {
    return {
      input: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.baseedit{height:490px;background:#fff;padding:32px 40px;}
.passedit{width:320px;margin-bottom:24px;margin-left:auto;margin-right: auto;}
.passedit-label{font-size: 12px;color:rgba(22,22,24,0.75);line-height: 12px;margin-bottom: 6px;}

</style>
