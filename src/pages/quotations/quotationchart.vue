<template>
  <div class="quotationchart">
    <div class="quotationchart-header">
      <h4 class="q-title">
        <span>任务1</span> <span>折线图</span>
      </h4>
    </div>
    <div class="chart-lines" ref='chartlinebox'>
      <canvas id="myChart"></canvas>
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
  },
  mounted(){
    // this.drawLine();
  },
  methods:{
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChartEle = document.getElementById('myChart');
        myChartEle.width = this.$refs.chartlinebox.offsetWidth;
        myChartEle.height = this.$refs.chartlinebox.offsetHeight;
        // myChartEle.width = 
        var myChart = this.$echarts.init(myChartEle);
        // 绘制图表
        myChart.setOption({
          title: {
              text: 'Beijing AQI'
          },
          tooltip: {
              trigger: 'axis'
          },
          xAxis: {
              data: data.map(function (item) {
                  return item[0];
              })
          },
          yAxis: {
              splitLine: {
                  show: false
              }
          },
          toolbox: {
              left: 'center',
              feature: {
                  dataZoom: {
                      yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
              }
          },
          dataZoom: [{
              startValue: '2014-06-01'
          }, {
              type: 'inside'
          }],
          visualMap: {
              top: 10,
              right: 10,
              pieces: [{
                  gt: 0,
                  lte: 50,
                  color: '#096'
              }, {
                  gt: 50,
                  lte: 100,
                  color: '#ffde33'
              }, {
                  gt: 100,
                  lte: 150,
                  color: '#ff9933'
              }, {
                  gt: 150,
                  lte: 200,
                  color: '#cc0033'
              }, {
                  gt: 200,
                  lte: 300,
                  color: '#660099'
              }, {
                  gt: 300,
                  color: '#7e0023'
              }],
              outOfRange: {
                  color: '#999'
              }
          },
          series: {
              name: 'Beijing AQI',
              type: 'line',
              data: data.map(function (item) {
                  return item[1];
              }),
              markLine: {
                  silent: true,
                  data: [{
                      yAxis: 50
                  }, {
                      yAxis: 100
                  }, {
                      yAxis: 150
                  }, {
                      yAxis: 200
                  }, {
                      yAxis: 300
                  }]
              }
          }
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .quotationchart{width:100%;height:500px;background:rgba(255,255,255,1);}
  .quotationchart-header{height:50px;border-bottom:1px solid rgba(22, 22, 24, 0.08);padding-left:30px;}
  .chart-lines{width: 100%;height: 450px;}
</style>
