<template>
 <div>
  <div class="containue-cj">
    <div class="lrlayout-absolute">
      <div class="left-nav-absolute">
        <ul class="clearfix">
          <router-link to="/account" tag="li">账号管理</router-link>
          <router-link to="/account/basemsg" tag="li" :class="$route.name=='editpassword'?'active':''" >基础设置</router-link>
        </ul>
      </div>
      <router-view></router-view>
    </div>

    
  </div>  
</div>
</template>

<script>

export default {
  name: 'selfcenter',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lrlayout-absolute{width: 100%;height: 100%;box-sizing: border-box;padding-left:200px;}
.left-nav-absolute{width:166px;padding:16px 0px;background:#fff;position: absolute;left:0;top:0;}
.left-nav-absolute ul li{float: left;width:100%;position:relative;height:44px;line-height: 44px;cursor: pointer;padding:0 24px;margin-bottom: 10px;}
.left-nav-absolute ul li:last-child{margin-bottom: 0px;}
.left-nav-absolute ul li.active{background:rgba(36,117,251,0.1);color: rgba(36, 117, 251, 1);}
.left-nav-absolute ul li.active:before{content:"";display: block;width:2px;height:100%;position: absolute;top:0;left:0;background:#2475FB;}
</style>
