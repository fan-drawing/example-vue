<template>
 <div class="baseedit">
      <div class="msg-edit-block">
            <p class="he">用户名称:</p>
            <div class="edit-msg">
              <span class="value">Mónica Ribeiro</span>
              <span class="editvalue">修改</span>
            </div>
      </div>
      <div class="msg-edit-block">
            <p class="he">邮箱账号:</p>
            <div class="edit-msg">
              <span class="value">12225765556@qq.com</span>
              <span class="editvalue">修改</span>
            </div>
      </div>
      <div class="msg-edit-block">
            <p class="he">手机号码:</p>
            <div class="edit-msg">
              <span class="value">15110217819</span>
              <span class="editvalue">修改</span>
            </div>
      </div>
      
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.baseedit{height:490px;background:#fff;padding:32px 40px;}
.msg-edit-block{width:618px;height:82px;padding: 24px 0;border-bottom:1px solid rgba(22, 22, 24, 0.06);box-sizing: border-box;}
.msg-edit-block p.he{color:rgba(22,22,24,0.5);line-height: 12px;font-size: 12px;margin-bottom: 6px;}
.edit-msg{position: relative;}
.edit-msg .editvalue{color: #2475FB;font-size: 14px;float: right;position: absolute;top:0;right:0;cursor: pointer;}
.edit-msg .value{line-height: 16px;font-size: 16px;color: rgba(22, 22, 24, 0.75);}
</style>
