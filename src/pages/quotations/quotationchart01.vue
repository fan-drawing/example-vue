<template>
  <div class="quotationchart">
    <div class="quotationchart-header">
      <h4 class="q-title">
        <span>任务1</span> <span>折线图</span>
      </h4>
    </div>
    <div id="app2" class="chart-lines" ref='chartlinebox' >
      <div id="kline" ref='kline'></div>
    </div>
  </div>
</template>

<script>
import HQChart from 'hqchart'
function DefaultData(){}
function NetworkFilter(data, callback)
{
    console.log('[NetworkFilter] data', data);
    // data.PreventDefault=true;	//设置hqchart不请求数据
    // data.Request.Type = "get";
    // data.Request.Url = "https://www.quantinfo.com/API/m/chart/history?symbol=BTC_USD_BITFINEX&resolution=15&from=1567555200&to=1569380285";
    // callback(data);
	// //通过data.Request里的数据 对应到第3方数据
	// $.ajax({
    //     url:'https://www.quantinfo.com/API/m/chart/history?symbol=BTC_USD_BITFINEX&resolution=15&from=1567555200&to=1569380285',
    //     success: function (data)
    //     {
    //        var hqchartData;//把第3方数据data转成 hqchart数据
    //        callback(hqchartData); //把数据传回hqchart
    //     }
    // });
}
DefaultData.GetKLineOption = function () 
{
    let data = 
    {
        Type: '历史K线图', 
        IsAutoUpdate:true,          //是自动更新数据
        AutoUpdateFrequency:10000,   //数据更新频率
        Page: 
        { 
            Minute:{ Enable:true } //开启1分钟K线分页下载
        },
        Windows: //窗口指标
        [
            {Index:"MA",Modify: false, Change: false}, 
            {Index:"VOL",Modify: false, Change: false}
        ], 
        CorssCursorInfo:{ Left:1, Right:1, Bottom:1, IsShowCorss:true },
        NetworkFilter:NetworkFilter,
        IsShowRightMenu:true,  //右键菜单
        IsShowCorssCursorInfo:true,
        
        Border: //边框
        {
            Left:60,         //左边间距
            Right:60,       //右边间距
            Bottom:25,      //底部间距
            Top:25          //顶部间距
        },
        MenuData:[
            {
                Text: '工具',
                ActiveIndex: null,
                Children: ['工具']
            }
        ],
        KLine:  //K线设置
        {
            DragMode:1,                 //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
            Right:1,                    //复权 0 不复权 1 前复权 2 后复权
            Period:0,                   //周期 0 日线 1 周线 2 月线 3 年线 
            MaxReqeustDataCount:1000,   //数据个数
            PageSize:500,               //一屏显示多少数据
            // Info:["互动易","大宗交易",'龙虎榜',"调研","业绩预告","公告"],       //信息地雷
            IsShowTooltip:true,                 //是否显示K线提示信息
        },
        
    };

    return data;
}

export default {
    name: 'quotationchart',
    data() 
    {
        var data=
        {
            Symbol:'600000.sh',
            KLine: 
            {
                JSChart:null,
                Option:DefaultData.GetKLineOption(),
            },

        };

        return data;

    },

    created()
    {
        
    },

    mounted()
    {
        this.OnSize();

        window.onresize = ()=> { this.OnSize(); }

       this.CreateKLineChart(); 
    //    this.getData();
    },
        
    methods:
    {
        getData(){
            this.$fetch('https://www.quantinfo.com/API/m/chart/history?symbol=BTC_USD_BITFINEX&resolution=15&from=1567555200&to=1569380285')
            .then(res=>{
                console.log(res);
            })
        },
        OnSize()
        {
            var chartHeight = 450;
            var chartWidth = 1200;
            var kline=this.$refs.kline;
            kline.style.width=chartWidth+'px';
            kline.style.height=chartHeight+'px';
            if (this.KLine.JSChart) this.KLine.JSChart.OnSize();
        },

        CreateKLineChart()  //创建K线图
        {
            if (this.KLine.JSChart) return;
            this.KLine.Option.Symbol=this.Symbol;
            let chart=HQChart.Chart.JSChart.Init(this.$refs.kline);
            chart.SetOption(this.KLine.Option);
            this.KLine.JSChart=chart;
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .quotationchart{width:100%;height:auto;background:rgba(255,255,255,1);}
  .quotationchart-header{height:50px;border-bottom:1px solid rgba(22, 22, 24, 0.08);padding-left:30px;}
  .chart-lines{width: 100%;height: auto;}
</style>
