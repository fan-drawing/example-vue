<template>
  <div class="statisticschart">
    <div class="statisticschart-header">
      <h4 class="q-title">
        <span>合约收益</span>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statisticschart',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .statisticschart{width:100%;height:368px;background:rgba(255,255,255,1);margin-top:40px;}
  .statisticschart-header{height:50px;border-bottom:1px solid rgba(22, 22, 24, 0.08);padding-left:30px;}
</style>
