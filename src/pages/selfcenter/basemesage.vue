<template>
<div class="basemesage">
  <div class="statisticslist-tab">
    <ul class="clearfix">
        <router-link to="/account/basemsg/" tag="li">账户信息</router-link>
        <router-link to="/account/basemsg/password" tag="li">修改密码</router-link>
    </ul>
  </div>

  <router-view></router-view>
  

</div>
</template>
<script>
export default {
  name: 'basemesage',
  data () {
    return {}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statisticslist-tab{height:44px;background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.08);padding-left:25px;margin-bottom: 24px;}
.statisticslist-tab li{float: left;height:44px;line-height: 44px;padding:0 9px;margin-right: 32px;cursor: pointer;border-bottom: 1px solid transparent;}
.statisticslist-tab li.active{color: #2475FB;border-bottom: 1px solid #2475FB;}
.statisticslist-tab li:last-child{margin-right: 0px;}

</style>