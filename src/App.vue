<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  
  name: 'App',
}
</script>
<style>
/* 清除内外边距 */
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
pre, /* text formatting elements 文本格式元素 */
fieldset, lengend, button, input, textarea, /* form elements 表单元素 */
th, td { /* table elements 表格元素 */
		margin: 0;
		padding: 0;
		box-sizing: border-box;
    color:#161618;
    line-height: 1.0;
}
.el-main{overflow: initial;padding-top:30px;}
/* 设置默认字体 */
body,
button, input, select, textarea { /* for ie */
		/*font: 12px/1 Tahoma, Helvetica, Arial, "宋体", sans-serif;*/
		font-family: 'pingFangSC',Helvetica Neue,Helvetica,Arial,Hiragino Sans GB,Hiragino Sans GB W3,Microsoft YaHei UI,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif; /* 用 ascii 字符表示，使得在任何编码下都无问题 */
		font-size: 13px;
}

h1 { font-size: 18px; /* 18px / 12px = 1.5 */ }
h2 { font-size: 16px; }
h3 { font-size: 14px; }
h4, h5, h6 { font-size: 100%; }

address, cite, dfn, em, var { font-style: normal; } /* 将斜体扶正 */
code, kbd, pre, samp, tt { font-family: "Courier New", Courier, monospace; } /* 统一等宽字体 */
small { font-size: 12px; } /* 小于 12px 的中文很难阅读，让 small 正常化 */

img{display: block;}

/* 重置列表元素 */
ul, ol { list-style: none; }

/* 重置文本格式元素 */
a { text-decoration: none; }
a:hover { text-decoration: underline; }

abbr[title], acronym[title] { /* 注：1.ie6 不支持 abbr; 2.这里用了属性选择符，ie6 下无效果 */
		border-bottom: 1px dotted;
		cursor: help;
}

q:before, q:after { content: ''; }

/* 重置表单元素 */
legend { color: #000; } /* for ie6 */
fieldset, img { border: none; } /* img 搭车：让链接里的 img 无边框 */
/* 注：optgroup 无法扶正 */
button, input, select, textarea {
		font-size: 100%; /* 使得表单元素在 ie 下能继承字体大小 */
}

/* 重置表格元素 */
table {
		border-collapse: collapse;
		border-spacing: 0;
}

/* 重置 hr */
hr {
		border: none;
		height: 1px;
}

/* 让非ie浏览器默认也显示垂直滚动条，防止因滚动条引起的闪烁 */
html { overflow-y: scroll;}
/*超出内容显示省略号*/
.ellipsis{  max-width: 100%;  white-space: nowrap;  text-overflow:ellipsis;  overflow:hidden;  }
/*清除浮动*/
.el-main{min-width:1200px;}
.clearfix {  *zoom: 1;  }
.clearfix:before,
.clearfix:after {  display: table;  line-height: 0;  content: "";  }
.clearfix:after {  clear: both;  }
.bgcolor{background:rgba(243, 245, 249, 1);}
.logo-web{float:left;height:56px;border:1px solid #eee;width:166px;margin-right:34px;}
.header-top{background:rgba(255,255,255,1);box-shadow:0px 2px 4px 0px rgba(0,0,0,0.06);}
.containue-cj{width:1200px;margin-left: auto;margin-right: auto;}
.q-title{color: rgba(36,117,251,1);font-size: 16px;line-height: 50px;}
.q-title span{margin-right:10px;}
.q-title span:last-child{margin-right: 0px;}
.el-table td{padding:15px 0;}
.table-block .demo-table-expand .el-form-item {margin-right: 0; margin-bottom: 0;width: 50%;}
.table-block .demo-table-expand label {width: 90px;color: #99a9bf;}
.el-table th.is-leaf{border:none;}
.quotationslist .el-table td{border-bottom-color:rgba(22, 22, 24, 0.08);border-right: none;}
.quotationslist .el-table th>.cell{padding-left:30px;}
.el-table th>.cell{font-size: 13px;}
.el-table .cell{text-align: center;}
.quotationslist .el-table tr{height:50px;}
.quotationslist .el-table td,.quotationslist .el-table th{padding:18px 0;}
.quotationslist .el-table .cell{padding-left:30px;}
.quotationslist .el-table--border td:first-child .cell{padding-left:30px!important;}
.quotationslist .has-gutter tr th{background: rgba(22, 22, 24, 0.03);}
.quotationslist  .el-table__header-wrapper{background: rgba(22, 22, 24, 0.03);}
.quotationslist .el-table--enable-row-hover .el-table__body tr:hover>td {background: rgba(36, 117, 251, 0.1);}
.quotationslist .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar{width: 6px;height:10px;background-color:#fff;}
.quotationslist .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track{border-radius: 10px; background-color:#fff;}
.quotationslist .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb{border-radius: 3px;background:rgba(216,216,216,1);} 
.quotationslist .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track-piece{background:#fff;}
.quotationslist .el-table__body-wrapper,.quotationslist .el-table__header-wrapper{width:99.6%;padding-left:20px;padding-right:20px;box-sizing: border-box;}
.quotationslist .el-table__body-wrapper .cell{font-size: 13px;color: #161618;}
.point-i{display: inline-block;width:6px;height: 6px;border-radius: 3px;vertical-align: middle;margin-right: 6px;}
.point-i + span{vertical-align: middle;}
.containue-cj{position: relative;width:1200px;min-height:calc(100vh - 106px);}
.el-button{padding:8px 10px;border-radius: 2px;min-width:96px;text-align: center;}
.el-button--primary{background-color: #2475FB;}
.tablemanage .table-block .el-table th{height:54px;}
.tablemanage td .cell{color:rgba(0, 0, 0, 0.65);font-size: 13px;}
.tablemanage .el-table__header-wrapper,.tablemanage .el-table__header-wrapper th {background:#FAFAFA;}
.el-button.signal{min-width: auto;padding:6px 9px;vertical-align: middle;}
.el-button.edit-btn{min-width: auto;padding:6px 9px;border:none;color: rgba(36, 117, 251, 1);vertical-align: middle;}
.split{display: inline-block;height:28px;width:1px;background:rgba(22,22,24,0.12);margin-left:12px;vertical-align: middle;}
.pages-list{margin-top:17px;}
.pages-list .el-pagination.is-background .btn-next,.pages-list .el-pagination.is-background .btn-prev,.pages-list .el-pagination.is-background .el-pager li{background:#fff;}
.el-pagination.is-background .el-pager li:not(.disabled).active {background-color: rgba(36, 117, 251, 1);color: #FFF;}
.statisticslist .el-table__header th,.statisticslist .el-table__header{background:rgba(250,250,250,1)}
.statisticslist .el-table__header th{height:54px;}
.statisticslist .el-table__header th>.cell{color:#161618;font-size: 13px;text-align: center;}
.statisticslist .el-table__body-wrapper td>.cell{color:#161618;font-size: 13px;text-align: center;}
.el-icon-arrow-down{font-size: 14px!important;}
.open{color:red;border:1px solid red;}
.tan-in-group .el-select.two-sp{width:48%;}
.tan-in-group .el-select{width:100%;margin-top:12px;border-radius: 2px;}
.tan-in-group .el-select .el-input__inner{height:32px;}
.tan-in-group .el-input .el-input__inner{height:32px;}
.tan-in-group .el-input.sp {margin-top:12px;}
.tan-in-group .el-select .el-input__icon{line-height: 32px;}
.el-button.addsure{width:140px;height:38px;background:rgba(36,117,251,1);border-radius:4px;margin:0 auto;display: block;}
.tan-mains .el-date-editor .el-range__icon,.tan-mains .el-date-editor .el-range-separator,.tan-mains .el-date-editor .el-range__close-icon{line-height: 25px;}
.tan-mains .el-date-editor .el-range-input{width: 50%;}
.tan-mains .el-checkbox{margin-bottom: 16px;}
.tan-mains .el-checkbox{margin-right: 0px;width:25%;margin-bottom: 16px;}
.header-top{z-index: 100;}
.edit-tan{position:fixed;z-index:100;top:0;left:0;width: 100%;height:100%;}
.edit-tan .shadow{position: relative;width:100%;height:100%;background:rgba(22,22,24,0.4);}
.tan-block{width:532px;background:#fff;position: absolute;left:50%;margin-left:-268px;border-radius:2px;top:16%;}
.tan-header{height:52px;border-bottom:1px solid rgba(22, 22, 24, 0.08);position:relative;}
.tan-header h4{font-size: 16px;padding-left:30px;line-height: 54px;}
.tan-close{position: absolute;top:50%;margin-top:-12px;right:30px;font-size: 24px;cursor: pointer;}
.tan-mains{padding:20px 30px;padding-bottom:24px;}
.tan-in-group{margin-bottom:32px;}
.tan-in-group .title-tan-group{font-size: 14px;color:rgba(0, 0, 0, 0.85);position: relative;padding-left:10px;}
.tan-in-group .el-range-editor.el-input__inner{height: 32px;margin-top:12px;width: 100%;}
.tan-in-group .el-date-editor .el-range-input{width:50%;}
.tan-in-group .el-date-editor .el-range__icon,.tan-in-group .el-date-editor .el-range-separator,.tan-in-group .el-date-editor .el-range__close-icon{line-height: 25px;}
.tan-in-group .title-tan-group:before{content:"";display: inline-block;width:2px;height:10px;background:rgba(36,117,251,1);position: absolute;left:0;top:50%;margin-top:-5px;}
.my-input-suffix{margin-bottom:24px;height:32px;position: relative;width:364px;margin-left:auto;margin-right: auto;padding-left:0px;}
.my-input-suffix .label-input-suffix{position: absolute;width:70px;line-height:32px;height:32px;top:0;left:0;}
.my-input-suffix .el-input__inner{height:32px;line-height: 32px;border-radius: 2px;}
.my-input-suffix .el-input__icon{line-height: 32px;}
.passedit .el-input__inner{background-color:rgba(22,22,24,0.04);border-radius:2px;border:none;}
.passedit{margin-bottom: 24px;}
.edit-up{width:320px;height:40px;background:rgba(36,117,251,1);border-radius:2px;display: block;margin-left:auto;margin-right: auto;color:#fff;}
.login-area>div{width:436px;margin:0 auto}
.login-area .el-form-item .el-input{margin-bottom:0px;}
.login-area .el-input{height:44px;margin:0 auto;display:block;}
.el-form-item{margin-bottom:20px;}
.login-area .el-input .el-input__inner{height:44px;}
.login-area .el-input__icon{line-height:44px;}
.login-btn{width:436px;height:44px;background:linear-gradient(243deg,rgba(61,168,255,1) 0%,rgba(49,127,255,1) 100%);border-radius:4px;display:block;margin-left:auto;margin-right:auto;font-size:14px;color:#fff;}
.login-btn:focus, .login-btn:hover{color:#fff;}
.mobile-text{position:relative;margin-bottom:20px;}
.login-area .mobile-text .el-input{margin-bottom:0px;}
.code-get{position:absolute;padding-top:4px;padding-bottom:4px;color:#fff; right:12px;top:50%;width:110px;height:28px;background:linear-gradient(243deg,rgba(61,168,255,1) 0%,rgba(49,127,255,1) 100%);border-radius:4px;text-align:center;margin-top:-14px;}
.code-get:hover,.code-get:focus{color:#fff;}
.time-back{color:rgba(22,22,24,0.75);display:inline-block;height:20px;right:12px;top:50%;margin-top:-10px;line-height:20px;position:absolute;}
.time-back em{font-style:normal;font-size:14px;color:#2475FB;padding-right:5px;}
.step-one .el-form-item__content{margin-left:0px!important;}
.strategy-edit .el-input__inner{height:32px;line-height:32px;border-radius:2px;float: none;}
.login-area .el-form{width:436px;margin-left:auto;margin-right:auto;}
.success-tip .el-button--primary{background:linear-gradient(243deg,rgba(61,168,255,1) 0%,rgba(49,127,255,1) 100%);}
.baseedit.el-form--label-top .el-form-item__label{font-size: 12px;color: rgba(22,22,24,0.75);line-height: 12px;margin-bottom: 6px;padding-bottom:0px;}
.el-form-item__error{white-space: nowrap;}
.strategy .el-form--label-top .el-form-item__label{font-size: 14px;color: rgba(0,0,0,0.85);line-height: 14px;position: relative;padding-left: 8px;margin-bottom: 12px;padding-bottom:0px;padding-left:0px;}
.el-form.tan-mains .el-form-item{margin-bottom:30px;}

.overflow-two-margin{padding-top:10px;margin-left:-12px;margin-right:-12px;}
.item-show{width:362px;height:184px;background:rgba(255,255,255,1);border: 1px solid transparent;float:left;margin-left:12px;margin-right:12px;margin-bottom:24px;}
.edit-strategy{text-align:center;font-size:16px;font-weight:400;color:rgba(0,0,0,0.45);line-height:184px;cursor:pointer;}
.edit-strategy:hover{border:1px dashed rgba(36,117,251,1);}
.edit-strategy i{margin-right:10px;}
.msg-strategy {box-shadow:0px 2px 8px 0px rgba(22,22,24,0.06);border-radius:2px;position:relative;border:1px solid rgba(233,233,233,1);}
.msg-strategy .bottom-area-action{position:absolute;bottom:0;left:0;width:100%;height:48px;background:rgba(253,253,253,1);left:-1px; border-radius:0px 0px 2px 2px;border:1px solid rgba(233,233,233,1);}
.bottom-area-action a{cursor:pointer;text-decoration:none!important; float:left;width:50%;height:48px;line-height:48px;display:block;text-align:center;color:rgba(0,0,0,0.45);font-size:14px;}
.bottom-area-action a.edit{color:#2475FB;}
.bottom-area-action a.delete:hover{color:#FF3300;}
.bottom-area-action:after{content:"";width:1px;height:16px;position:absolute;display:block;background:#E8E8E8;left:50%;margin-left:-0.5px;top:50%;margin-top:-6px;}
.msg-strategy .top{padding-top:24px;padding-left:24px;padding-right:24px;}
.top-inner{position:relative;padding-left:64px;}
.title-icon-img{position:absolute;width:48px;height:48px;border-radius:50%;top:0;left:0;}
.top-inner h4{font-size:16px;height:24px;line-height:24px;color:rgba(0,0,0,0.85);margin-bottom:12px;}
.top-inner p{font-size:14px;color:rgba(0,0,0,0.45);line-height:22px;margin-bottom:6px;}
.top-inner p:last-child{margin-bottom:0px;}
.hideEle{width:1200px;overflow:hidden;margin-left:auto;margin-right:auto;}
.strategy-edit{margin-bottom:36px;}
.treatyForm .el-form-item__label{font-size:14px;color:rgba(0,0,0,0.85);line-height:14px;position:relative;margin-bottom:12px;padding:0;padding-left:8px;}
.treatyForm .el-form-item__label:before{content:"";display:block;position:absolute;left:0;width:2px;height:10px;background:#2475FB;top:50%;margin-top:-5px;}
.treatyForm.tan-mains .el-form-item{margin-bottom:32px;}
.float-split .strategy-edit{float: left;width:50%;padding:0 10px;box-sizing: border-box;}
.float-split{margin-left:-10px;margin-right: -10px;}
/* .el-form-item__content{line-height: 1.0;} */
.strategy .el-form.tan-mains .el-form-item{margin-bottom:32px;}
.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
	background:none;
}
.el-textarea__inner{border-radius: 2px;}
.acountmanagement .el-table__body-wrapper .cell{overflow: hidden;text-overflow:ellipsis;white-space: nowrap; }
.el-popover .el-button{ min-width: 66px;}
.el-popover>p{margin-bottom:10px;}
.treatyForm .el-input__icon{line-height: 32px;float: left;}
.el-popover{    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);word-break: break-all;}
.tip-block{padding:20px;}
.tip-block .one-d{font-size: 16px;line-height:16px;margin-bottom: 10px;position:relative;padding-left:100px;}
.tip-block .two-d{font-size: 14px;line-height:24px;position:relative;padding-left:100px;}
.tip-block p>span:first-child{font-size: 14px;font-weight:600;display: inline-block;width:100px;text-align: left;position:absolute;top:0;left:0;}
.tip-block p>span:last-child{font-size: 12px;font-weight:400;color:#666;}
</style>
