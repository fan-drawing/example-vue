<template>
  <div class="quotationchart">
    <div class="quotationchart-header">
      <h4 class="q-title">
        <span>任务1</span> <span>折线图</span>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'quotationchart',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .quotationchart{width:100%;height:500px;background:rgba(255,255,255,1);}
  .quotationchart-header{height:50px;border-bottom:1px solid rgba(22, 22, 24, 0.08);padding-left:30px;}
</style>
