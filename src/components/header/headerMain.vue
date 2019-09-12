<template>
<div class="header_inner clearfix">
  <ul class="clearfix nav-list">
    <router-link to="/index" class="link" tag="li">行情列表</router-link>
    <li class="link" style="cursor: not-allowed;">
      策略管理
    </li>
    <router-link to="/management" class="link" tag="li">任务管理</router-link>
    <router-link to="/statistics" class="link" tag="li">数据统计</router-link>
  </ul>
  <div class="use-model">
    <span class="user-nickname">Mónica Ribeiro</span>
    <div class="user-img">
      <img src="../../assets/user-moren.png" alt="">
    </div>

    <div class="slideNav">
      <ul class="clearfix">
        <router-link to="/account" class="slide-item" tag="li">账号管理</router-link>
        <router-link to="/account/basemsg" class="slide-item" tag="li">基础设置</router-link>
        <li class="slide-item">
          登出
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'headerMain',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header_inner{width: 1200px;margin:0 auto;height:56px;z-index: 100;}
  .header_inner .nav-list{float: left;height:56px;line-height:54px;font-size: 14px;}
  .header_inner .nav-list li{float: left;margin-right: 50px;border-bottom:2px solid transparent;cursor: pointer;line-height: 54px;}
  .header_inner .nav-list li.active{border-bottom:2px solid #2475FB;color:#2475FB;font-weight: 600;}
  .header_inner .nav-list li:last-child{margin-right: 0px;}
  .use-model{float: right;height:56px;line-height: 56px;cursor: pointer;position: relative;}
  .use-model span.user-nickname{font-size: 14px;vertical-align: middle;margin-right: 12px;}
  .use-model .user-img{display: inline-block;width:24px;height:24px;vertical-align: middle;}
  .use-model .user-img>img{width:100%;height:100%;}
  .use-model:hover .slideNav{display: block;}
  .slideNav{display: none;position:absolute;width:140px;height:auto;padding:10px 0;border-top:1px solid rgba(36, 117, 251, 1);background:#fff;top:50px;left:0;box-shadow:0px 2px 8px 0px rgba(0,0,0,0.12);}
  .slide-item{float: left;width:100%;height:44px;padding-left:22px;line-height: 44px;}
  .slide-item.activ,.slide-item:hover{background:rgba(36, 117, 251, 0.16);}
</style>
