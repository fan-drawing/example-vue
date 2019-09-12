<template>
<div>
  <div class="containue-cj">
    <div class="lrlayout-absolute">
      <div class="left-nav-absolute">
        <ul class="clearfix">
          <li class="active">
            全部任务
          </li>
          <li>
            进行中的任务
          </li>
          <li>
            已结束的任务
          </li>
        </ul>
      </div>
      <tablemanage/>
    </div>
  </div>  
</div>

</template>
<script>
import tablemanage from "./tablemanage.vue"
export default {
  name: 'management',
  data () {
    return {
     
    }
  },
  components:{tablemanage},
  methods:{
    
    
  }
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
