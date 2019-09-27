<template>
  <div class="quotationchart">
    <div class="quotationchart-header clearfix">
      <h4 class="q-title" style="float:left;" v-if="optionName.length!=0">
        <span>{{optionName[account].Name}}</span> <span>{{accountItem}}</span>
      </h4>
      <h4 class="q-title" style="float:left;"  v-else>
        <span>目前没有任务</span>
      </h4>
     
      
      <el-select v-if="optionName.length!=0" v-model="accountItem" placeholder="请选择合约" class="menue-right" @change="changeItem" style="width:14em; float:right;margin-right: 30px;margin-top: 5px;">
        <el-option
          v-for="item in optionItem"
          :key="item.ID"
          :label="item.Name"
          :value="item.Name">
        </el-option>
      </el-select>
      <el-select v-if="optionName.length!=0" v-model="account" placeholder="请选择" class="menue-right" @change="changeName" style="width:14em; float:right;margin-right: 30px;margin-top: 5px;">
        <el-option
          v-for="item in optionName"
          :key="item.ID"
          :label="item.Name"
          :value="item.Index">
        </el-option>
      </el-select>
      <el-select v-if="optionName.length!=0&&getsplit!=''" v-model="getsplit" placeholder="请选择" class="menue-right" @change="changeTime" style="width:100px; float:right;margin-right: 30px;margin-top: 5px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div id="app2" class="chart-lines" ref='chartlinebox' 
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
      <div id="kline" ref='kline' style="width:1200px;height:600px;"></div>
    </div>
  </div>
</template>

<script>
// console.log(kdata);
var bgColor = "#293246"; //背景
var upColor = "#FF0046"; //涨颜色
var downColor = "#00DA33"; //跌颜色

// ma  颜色
var ma5Color = "#0078FF";
var ma10Color = "#00D1FF";
var ma20Color = "#FF8800";
var ma30Color = "#00940b";
var calcEMA, calcDIF, calcDEA, calcMACD;

/*
 * 计算EMA指数平滑移动平均线，用于MACD
 * @param {number} n 时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
calcEMA = function (n, data, field) {
  var i, l, ema, a;
  a = 2 / (n + 1);
  if (field) {
    //二维数组
    ema = [data[0][field]];
    for (i = 1, l = data.length; i < l; i++) {
      ema.push((a * data[i][field] + (1 - a) * ema[i - 1]).toFixed(2));
    }
  } else {
    //普通一维数组
    ema = [data[0]];
    for (i = 1, l = data.length; i < l; i++) {
      ema.push((a * data[i] + (1 - a) * ema[i - 1]).toFixed(3));
    }
  }
  return ema;
};

/*
 * 计算DIF快线，用于MACD
 * @param {number} short 快速EMA时间窗口
 * @param {number} long 慢速EMA时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
calcDIF = function (short, long, data, field) {
  var i, l, dif, emaShort, emaLong;
  dif = [];
  emaShort = calcEMA(short, data, field);
  emaLong = calcEMA(long, data, field);
  for (i = 0, l = data.length; i < l; i++) {
    dif.push((emaShort[i] - emaLong[i]).toFixed(3));
  }
  return dif;
};

/*
 * 计算DEA慢线，用于MACD
 * @param {number} mid 对dif的时间窗口
 * @param {array} dif 输入数据
 */
calcDEA = function (mid, dif) {
  return calcEMA(mid, dif);
};

/*
 * 计算MACD
 * @param {number} short 快速EMA时间窗口
 * @param {number} long 慢速EMA时间窗口
 * @param {number} mid dea时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
calcMACD = function (short, long, mid, data, field) {
  var i, l, dif, dea, macd, result;
  result = {};
  macd = [];
  dif = calcDIF(short, long, data, field);
  dea = calcDEA(mid, dif);
  for (i = 0, l = data.length; i < l; i++) {
    macd.push(((dif[i] - dea[i]) * 2).toFixed(3));
  }
  result.dif = dif;
  result.dea = dea;
  result.macd = macd;
  return result;
};
function splitData(rawData,type="1") {
  var datas = [];
  var times = [];
  var vols = [];
  
  // console.log(timeline,dataM,vols);
  for (var i = 0; i < rawData.length; i++) {
    datas.push(rawData[i].slice(1,5));
    times.push(rawData[i][0]);
    vols.push(rawData[i][5]);
  }
 
  // console.log(time_arr('us',1))
  
  return {
    datas: datas,
    times: times,
    vols: vols
  };
}
//================================MA计算公式
function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.datas.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.datas[i - j][1];
    }
    result.push((sum / dayCount).toFixed(2));
  }
  return result;
}
function addTimeStr(time,num){ 
	var hour=time.split(':')[0];
	var mins=Number(time.split(':')[1]);
	var mins_un=parseInt((mins+num)/60);
	var hour_un=parseInt((Number(hour)+mins_un)/24);
	if(mins_un>0){
		if(hour_un>0){
			var tmpVal=((Number(hour)+mins_un)%24)+"";
			hour=tmpVal.length>1? tmpVal:'0'+tmpVal;//判断是否是一位
		}else{
			var tmpVal=Number(hour)+mins_un+"";
			hour=tmpVal.length>1? tmpVal:'0'+tmpVal;
		}
		var tmpMinsVal=((mins+num)%60)+"";
		mins=tmpMinsVal.length>1? tmpMinsVal:0+tmpMinsVal;//分钟数为 取余60的数
	}else{
		var tmpMinsVal=mins+num+"";
		mins=tmpMinsVal.length>1? tmpMinsVal:'0'+tmpMinsVal;//不大于整除60
	} 
	return hour+":"+mins;
}
function getNextTime(startTime, endTIme, offset, resultArr) {
	var result = addTimeStr(startTime, offset);
	resultArr.push(result);
	if (result == endTIme) {
		return resultArr;
	} else {
		return getNextTime(result, endTIme, offset, resultArr);
	}
}

/**
 * 不同类型的股票的交易时间会不同  
 * @param {Object} type   hs=沪深  us=美股  hk=港股
 */
var time_arr = function(type,line) { 
	if(type.indexOf('us')!=-1){//生成美股时间段
		var timeArr = new Array();
		timeArr.push('09:30')
		return (getNextTime('09:30', '11:30', line, timeArr)).concat(getNextTime('12:59', '15:00', line, timeArr))
	}
	
}
function optionBase(type){
    var cdata =[[0,0,0,0,0,0,0]];
    var data = splitData(cdata,type);
    var macd = calcMACD(12, 26, 9, data.datas, 1);
    return{
        tooltip: { //弹框指示器
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
        },
        toolbox: {
          right:50,
          feature: {
              myFull: {
                  show: true,
                  title: '全屏查看',
                  icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                  onclick: function (e){
                     
                  }
              }
          }
        },
        legend: { //图例控件,点击图例控制哪些系列不显示
          icon: 'rect',
          type: 'scroll',
          itemWidth: 14,
          itemHeight: 2,
          left: 0,
          top: '0%',
          animation: true,
          textStyle: {
            fontSize: 12,
            color: '#0e99e2'
          },
          pageIconColor: '#0e99e2'
        },
        axisPointer: {
          show: true
        },
        color: [ma5Color, ma10Color, ma20Color, ma30Color],
        grid: [{
          id: 'gd1',
          left: '1%',
          right: '4%',
          height: '60%', //主K线的高度,
          top: '5%'
        }, {
          left: '1%',
          right: '4%',
          top: '66.5%',
          height: '10%' //交易量图的高度
        }, {
          left: '1%',
          right: '4%',
          top: '80%', //MACD 指标
          height: '14%'
        }],
        xAxis: [ //==== x轴
          { //主图
            type: 'category',

            data: data.times,
            scale: true,
            boundaryGap: false,
            axisLine: {
              onZero: false
            },
            axisLabel: { //label文字设置
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#3a3a3e'
              }
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          },
          { //交易量图
            type: 'category',
            gridIndex: 1,
            data: data.times,
            axisLabel: { //label文字设置
              color: '#9b9da9',
              fontSize: 10
            },
          },
          { //幅图
            type: 'category',
            gridIndex: 2,
            data: data.times,
            axisLabel: {
              show: false
            }
          }
        ],
        yAxis: [ //y轴
          { //==主图
            scale: true,
            z: 4,
            axisLabel: { //label文字设置
              color: '#c7c7c7',
              inside: true, //label文字朝内对齐
            },
            splitLine: { //分割线设置
              show: false,
              lineStyle: {
                color: '#181a23'
              }
            },
          }, { //交易图
            gridIndex: 1,
            splitNumber: 3,
            z: 4,
            axisLine: {
              onZero: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: { //label文字设置
              color: '#c7c7c7',
              inside: true, //label文字朝内对齐 
              fontSize: 8
            },
          }, { //幅图
            z: 4,
            gridIndex: 2,
            splitNumber: 4,
            axisLine: {
              onZero: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: { //label文字设置
              color: '#c7c7c7',
              inside: true, //label文字朝内对齐 
              fontSize: 8
            },
          }
        ],
        dataZoom: [
            {
                type: 'inside',
                
                start: 0,
                end: 100
            }, {
                show: false,
                type: 'slider',
                y: '90%',
                start: 0,
                end: 100
            },{
              show: false,
              xAxisIndex: [0, 1,2],
              type: 'slider',
              start: 0,
              end: 100
            }
        ],
        sampling: function (frame) {
          return frame[0]
        },
        animation: false, //禁止动画效果
        backgroundColor: bgColor,
        blendMode: 'source-over',
       
      };

}
var ChartBig = null;

export default {
  name: 'quotationchart',
  data() {
    return {
      charts: null,
      loading: true,
      timeStart: 0,
      timeEnd: 0,
      getsplit: 1,
      
      loop: null,
      options:[{label:'1 分',value:1},{label:'5 分',value:5},{label:'15 分',value:15},{label:'30 分',value:30},{label:'1 小时',value:60},{label:'1 日',value:'D'}],
      // optionName:[{label:'中证500指数期货IC1910',value:'IC1910'},{label:'一号棉花001',value:'CF001'},{label:'鲜苹果001',value:'AP001'}],
      loopBegin:null,
      optionItem:[],
      ceillData:[],

      account:'',
      accountItem:"",
      startDate:0,
      manageName:"",
    }
  },

  created() {
    
  },
  computed:{
    optionName(){
      if(this.$store.getters.getManageListSelect.length!=0){
        if(this.account==""&&(this.account=this.$store.getters.getManageListSelect[0].Index)){}
        this.optionItem = this.$store.getters.getManageListSelect[0].Instruments;
        this.accountItem =  this.$store.getters.getManageListSelect[0].Instruments[0].Name;
        // console.log(this.$store.getters.getManageListSelect[0])
        this.startDate = this.$store.getters.getManageListSelect[0].Instruments[0].Start;
      }
      return this.$store.getters.getManageListSelect; 
    }
  },

  mounted() {
    this.timeStart = new Date(new Date().toLocaleDateString()).getTime() + 9.5 * (60 * (60 * 1000));
    this.timeEnd = new Date(new Date().toLocaleDateString()).getTime() + 15 * (60 * (60 * 1000));
    this.getData();
    ChartBig = this.$echarts.init(this.$refs.kline);
    ChartBig.setOption(optionBase(this.getsplit));

  },

  methods: {
    changeTime(val){
      this.getData();
    },
    changeItem(val){
      this.accountItem=val;
      this.getData();
    },
    changeName(val){
      this.optionItem = this.optionName[val].Instruments;
      this.startDate = this.optionName[val].Instruments[0].Start;
      this.accountItem = this.optionName[val].Instruments[0].Name;
      let ceill = this.optionName[val].Instruments;
      this.getData();
    },
    openLoopGet(begin, stop, line) {
      let openLoopMinute = true;
      this.loop = setInterval(() => {
        if ((new Date()).valueOf() > this.timeEnd) {
          this.getData();
          clearInterval(this.loop);
        } else {
          if(new Date().getMinutes()%this.getsplit==0&&openLoopMinute){
            openLoopMinute = false;
            this.getDataLoop();
            setTimeout(()=>{openLoopMinute=true},1000*30)
          }
          
        }

      },  1000 * 30)
    },
    getDataLoop() {
      let data = {
        symbol: this.accountItem,
        resolution: this.getsplit,
        from: this.loopBegin,
        to: Math.ceil(parseInt((new Date()).valueOf()) / 1000)
      };
      this.loopBegin = Math.ceil(parseInt((new Date()).valueOf()) / 1000);
      
      this.$fetch('https://www.quantinfo.com/API/m/chart/history', data)
        .then(res => {
          let data = res;
          if(res.length>0){
            for (let i = 0; i < res.length; i++) {
              let arr = [];
              if(this.getsplit=='D'){
                arr[0] = new Date(res[i][0] * 1000).format("yyyy/MM/dd"); //时间
              }else if(this.getsplit=='1'){
                arr[0] = new Date(res[i][0] * 1000).format("hh:mm");
              }else{
                arr[0] = new Date(res[i][0] * 1000).format("MM/dd hh:mm");
              }
              arr[1] = res[i][1]; //开盘
              arr[2] = res[i][4]; //收盘
              arr[3] = res[i][3]; //最小
              arr[4] = res[i][2]; //最大
              arr[5] = res[i][5]; //成交
              this.ceillData.push(arr);
            }
             ChartBig.setOption(this.uoOption(this.ceillData));
          }
          
          
         

        })
    },
    getData() {
      this.loading = true;
      let data = {
        symbol: this.accountItem,
        resolution: this.getsplit,
        from: this.startDate,
        to: Math.ceil(parseInt((new Date()).valueOf()) / 1000)
      };
      if(data.symbol==""){this.loading=false; return false;}
      if(this.getsplit=="1"){data.from = parseInt(this.timeStart) / 1000;}
      this.loopBegin = Math.ceil(parseInt((new Date()).valueOf()) / 1000);
      this.$fetch('https://www.quantinfo.com/API/m/chart/history', data)
        .then(res => {
          let data = res;
          let ceillData = [];
          if(res.length==0){
            this.$message({ message: "当前合约没有相关数据", type: 'warning',duration:1000,showClose:true,offset:100,})
            this.loading = true;
            return false;
          }
          for (let i = 0; i < res.length; i++) {
            let arr = [];
            if(this.getsplit=='D'){
              arr[0] = new Date(res[i][0] * 1000).format("yyyy/MM/dd"); //时间
            }else if(this.getsplit=='1'){
              arr[0] = new Date(res[i][0] * 1000).format("hh:mm");
            }else{
               arr[0] = new Date(res[i][0] * 1000).format("MM/dd hh:mm");
            }
            arr[1] = res[i][1]; //开盘
            arr[2] = res[i][4]; //收盘
            arr[3] = res[i][3]; //最小
            arr[4] = res[i][2]; //最大
            arr[5] = res[i][5]; //成交
            ceillData.push(arr);
          }
          this.ceillData = ceillData;
          ChartBig.setOption(this.initKOption(this.ceillData));
          this.loading = false;

         
          if (this.timeStart < (new Date()).valueOf()) {
            // this.getData();
            if ((new Date()).valueOf() > this.timeEnd) {

            } else {
              this.openLoopGet(this.timeStart, this.timeEnd, this.getsplit);
            }
          } else {

          }

      })
    },
    optionTemplate(data,macd,type="1"){
      // console.log(data)
      if(type=="1"){
        data.times = time_arr('us',1);
      }
      
      return {
        xAxis: [ //==== x轴
          { //主图
            type: 'category',
            data: data.times,
            scale: true,
            boundaryGap: false,
            axisLine: {
              onZero: false
            },
            axisLabel: { //label文字设置
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#3a3a3e'
              }
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          },
          { //交易量图
            type: 'category',
            gridIndex: 1,
            data: data.times,
            axisLabel: { //label文字设置
              color: '#9b9da9',
              fontSize: 10
            },
          },
          { //幅图
            type: 'category',
            gridIndex: 2,
            data: data.times,
            axisLabel: {
              show: false
            }
          }
        ],
        yAxis: [ //y轴
          { //==主图
            scale: true,
            position:'right',
            offset:50,
            z: 4,
            axisLabel: { //label文字设置
              color: '#c7c7c7',
              inside: true, //label文字朝内对齐
            },
            splitLine: { //分割线设置
              show: false,
              lineStyle: {
                color: '#181a23'
              }
            },
          }, 
          { //交易图
            gridIndex: 1,
            splitNumber: 3,
            position:'right',
            offset:50,
            z: 4,
            axisLine: {
              onZero: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: { //label文字设置
              color: '#c7c7c7',
              inside: true, //label文字朝内对齐 
              fontSize: 8
            },
          }, 
          { //幅图
            z: 4,
            gridIndex: 2,
            position:'right',
            offset:50,
            splitNumber: 4,
            axisLine: {
              onZero: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: { //label文字设置
              color: '#c7c7c7',
              inside: true, //label文字朝内对齐 
              fontSize: 8
            },
          }
        ],
        series: [
          {
            name: 'K线周期图表',
            type: 'candlestick',
            data: data.datas,
            barWidth: '55%',
            large: true,
            largeThreshold: 100,
            markLine: {
              symbol: "none", //去掉警戒线最后面的箭头
              label: {
                position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                formatter: function (params) {
                  return "预计卖出";
                }
              },
              data: [{
                silent: false, //鼠标悬停事件  true没有，false有
                lineStyle: { //警戒线的样式  ，虚实  颜色
                  type: "dashed",
                  color: "#607d8b",
                },
                xAxis: '13:19' // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              }]
            },
            itemStyle: {
              normal: {
                color: upColor, //fd2e2e  ff4242
                color0: downColor,
                borderColor: upColor,
                borderColor0: downColor,
              }
            },

          }, 
          {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5, data),
            smooth: true,
            symbol: "none", //隐藏选中时有小圆点
            lineStyle: {
              normal: {
                opacity: 0.8,
                color: '#39afe6',
                width: 1
              }
            },
          },
          {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10, data),
            smooth: true,
            symbol: "none",
            lineStyle: { //标线的样式
              normal: {
                opacity: 0.8,
                color: '#da6ee8',
                width: 1
              }
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20, data),
            smooth: true,
            symbol: "none",
            lineStyle: {
              opacity: 0.8,
              width: 1,
              color: ma20Color
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30, data),
            smooth: true,
            symbol: "none",
            lineStyle: {
              normal: {
                opacity: 0.8,
                width: 1,
                color: ma30Color
              }
            }
          }, 
          {
            name: 'Volumn',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.vols,
            barWidth: '60%',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList;
                  if (data.datas[params.dataIndex][1] > data.datas[params.dataIndex][0]) {
                    colorList = upColor;
                  } else {
                    colorList = downColor;
                  }
                  return colorList;
                },
              }
            }
          },
          {
            name: 'MACD',
            type: 'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: macd.macd,
            barWidth: '40%',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList;
                  if (params.data >= 0) {
                    colorList = upColor;
                  } else {
                    colorList = downColor;
                  }
                  return colorList;
                },
              }
            }
          }, 
          {
            name: 'DIF',
            type: 'line',
            symbol: "none",
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: macd.dif,
            lineStyle: {
              normal: {
                color: '#da6ee8',
                width: 1
              }
            }
          }, 
          {
            name: 'DEA',
            type: 'line',
            symbol: "none",
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: macd.dea,
            lineStyle: {
              normal: {
                opacity: 0.8,
                color: '#39afe6',
                width: 1
              }
            }
          }
        ]
      };
    },
    initKOption(cdata) {
      var data = splitData(cdata,this.getsplit);
      var macd = calcMACD(12, 26, 9, data.datas, 1);
      return this.optionTemplate(data,macd,this.getsplit);
    },
    uoOption(cdata) {
      var data = splitData(cdata,this.getsplit);
      var macd = calcMACD(12, 26, 9, data.datas, 1);
      return this.optionTemplate(data,macd,this.getsplit);
    }
  },
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .quotationchart{width:100%;height:auto;min-height:500px;background:rgba(255,255,255,1);}
  .quotationchart-header{height:50px;border-bottom:1px solid rgba(22, 22, 24, 0.08);padding-left:30px;}
  .chart-lines{width: 100%;height: auto;}
  .menue-right .el-input__suffix{right:0px;}
  .el-select.menue-right .el-input.is-focus .el-input__inner,.el-select.menue-right .el-input__inner{border:none;}
</style>
