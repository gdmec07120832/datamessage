<template>
  <div>
    <div class="table-box">
      <div class="top-content clearfix">
        <div class="title fl">销售业绩</div>
        <div class="time fr">{{ dateTime }}</div>
      </div>
      <div class="pay" v-for="(item,index) in dataMsg" :key="index">
        <li v-for="(key,i) in item" :key="i">
          <div
              :class="index===1?{redColor:i===2&&Number(key.num.replace('%',''))<=48,greenColor:i===2&&Number(key.num.replace('%',''))>48}:{greenColor:i===2&&Number(key.num.replace('%',''))<100,redColor:i===2&&Number(key.num.replace('%',''))>=100}">
            {{ key.num }}
          </div>
          <div>{{ key.content }}</div>
        </li>
      </div>
      <div class="perTitle clearfix" style="marginTop:10px">
        <div></div>
        <div>七天净业绩</div>
      </div>
      <div class="performance" ref="chart"></div>
      <div class="perTitle clearfix" style="marginTop:10px;">
        <div style="backgroundColor:#f6ac38"></div>
        <div>七天未发取消</div>
      </div>
      <div class="performance" ref="chartNot"></div>
      <div class="perTitle clearfix" style="marginTop:10px;">
        <div></div>
        <div>最近七个团客单价</div>
      </div>
      <div class="performance" ref="chartCost"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import E from 'echarts'

export default {
  name: 'moneyTable',
  data () {
    return {
      // time:new Date().toLocaleString(),
      dataMsg: null,
      chartOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(150,150,150,0.05)'
            }
          },
          formatter: (params) => {
            let value = params[0].value
            let sign = value === 0 ? '' : value >= 10000 || value <= 10000 ? '万' : '元'
            if (value >= 10000 || value <= -10000) {
              value = (value / 10000).toFixed(2)
            }
            return params[0].axisValueLabel + '<br />' + params[0].marker + value + sign
          },
          confine: true
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          data: [],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#e3eaea',
              width: 2
            }
          },
          axisLabel: {
            color: '#707070'
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(183,183,199,0.4)',
              type: 'dotted'
            },
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 15,
            data: [2648, 2149, 2693, 2528, 2707, 2000, 2000],
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#00A3EB',
              formatter ({ dataIndex, value }) {
                console.log(value)
                if (dataIndex !== 5) {
                  return ''
                } else {
                  if (value > 10000) {
                    // return (value / 10000) + '万'
                    return ''
                  } else {
                    // return value
                    return ''
                  }
                }
              }
            },
            itemStyle: {
              color ({ dataIndex }) {
                return '#00A3EB'
              },
              // barBorderRadius:[7,7,0,0]

              // barBorderRadius:(pamars)=> {
              //   if(pamars.value>0){
              //     return [7, 7, 0, 0]
              //   }else{
              //     return [0, 0, 7, 7]
              //   }
              // }
            },
            emphasis: {
              itemStyle: {
                color: '#f6ac38'
              }
            }
          }
        ]
      },
      chartOptionsNot: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(150,150,150,0.05)'
            }
          },
          formatter: (params) => {
            let value = params[0].value
            let sign = value === 0 ? '' : value >= 10000 ? '万' : '元'
            if (value >= 10000) {
              value = (value / 10000).toFixed(2)
            }
            return params[0].axisValueLabel + '<br />' + params[0].marker + value + sign
          },
          confine: true
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          data: ['11.14', '11.15', '11.16', '11.17', '11.18', '11.19', '11.20'],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#e3eaea',
              width: 2
            }
          },
          axisLabel: {
            color: '#707070'
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(183,183,199,0.4)',
              type: 'dotted'
            },
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 15,
            data: [2648, 2149, 2693, 2528, 2707, 2000, 2000],
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#00A3EB',
              formatter ({ dataIndex, value }) {
                console.log(value)
                if (dataIndex !== 5) {
                  return ''
                } else {
                  if (value > 10000) {
                    //return (value / 10000) + '万'
                    return ''
                  } else {
                    //return value
                    return ''
                  }
                }
              }
            },
            itemStyle: {
              color ({ dataIndex }) {
                return '#f6ac38'
              },
              // barBorderRadius: [7, 7, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: '#00A3EB'
              }
            }
          }
        ]
      },
      chartOptionsCost: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(150,150,150,0.05)'
            }
          },
          formatter: (params) => {
            let value = params[0].value
            let sign = value === 0 ? '' : value >= 10000 ? '万' : '元'
            if (value >= 10000) {
              value = (value / 10000).toFixed(2)
            }
            return params[0].axisValueLabel + '<br />' + params[0].marker + value + sign
          },
          confine: true
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          data: ['11.14', '11.15', '11.16', '11.17', '11.18', '11.19', '11.20'],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#e3eaea',
              width: 2
            }
          },
          axisLabel: {
            color: '#707070',
            // fontSize:'16px'
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(183,183,199,0.4)',
              type: 'dotted'
            },
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 15,
            data: [2648, 2149, 2693, 2528, 2707, 2000, 2000],
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#00A3EB',
              formatter ({ dataIndex, value }) {
                console.log(value)
                if (dataIndex !== 5) {
                  return ''
                } else {
                  if (value > 10000) {
                    //return (value / 10000) + '万'
                    return ''
                  } else {
                    //return value
                    return ''
                  }
                }
              }
            },
            itemStyle: {
              color ({ dataIndex }) {
                return '#00A3EB'
              },
              // barBorderRadius: [7, 7, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: '#f6ac38'
              }
            }
          }
        ]
      },
      chartIns: null,
      chartNot: null,
      chartCost: null,
      dateTime: ''
    }
  },
  mounted () {
    // this.getCityList()
    if (this.$route.query.dateString !== '') {
      this.getDetailData(this.$route.query.dateString)
      this.dateTime = '更新时间 : ' + this.$route.query.dateString + '  08:30'
    } else {
      this.$message.error('没有指定日期')
    }
  },
  methods: {
    getDetailData (date) {
      this.$axios.get('/bi-mobile/api/admin/biProjectBReport/getDetail', {
        params: { 'dateStr': date }
      }).then(res => {
        this.dataMsg = [
          [
            {
              num: Number(res.data.paymentTarget).toLocaleString() + '亿',
              content: '支付目标'
            },
            {
              num: Number(res.data.paymentSum).toLocaleString() + '亿',
              content: '累计支付'
            },
            {
              num: res.data.paymentReached + '%',
              content: '累计达成'
            }
          ],
          [
            {
              num: res.data.cancelTarget === 0 ? '/' : Number(res.data.cancelTarget).toLocaleString(),
              content: '未发取消目标'
            },
            {
              num: Number(res.data.cancelActual).toLocaleString() + '亿',
              content: '未发取消'
            },
            {
              num: res.data.cancelProportion + '%',
              content: '未发取消占比'
            }
          ],
          [
            {
              num: Number(res.data.target).toLocaleString() + '亿',
              content: '净业绩目标'
            },
            {
              num: Number(res.data.sumTarget).toLocaleString() + '亿',
              content: '累计净业绩'
            },
            {
              num: res.data.sumTargetReached + '%',
              content: '累计达成'
            }
          ],
          [
            {
              num: Number(res.data.deliveryTarget).toLocaleString() + '亿',
              content: '发货目标'
            },
            {
              num: Number(res.data.deliverySum).toLocaleString() + '亿',
              content: '累计发货'
            },
            {
              num: res.data.deliveryReached + '%',
              content: '累计达成'
            }
          ],
          [
            {
              num: Number(res.data.cdTarget).toLocaleString(),
              content: '客单价目标'
            },
            {
              num: Number(res.data.kdPrice).toLocaleString(),
              content: '客单价'
            },
            {
              num: res.data.kdReached + '%',
              content: '累计达成'
            }
          ],
        ]
      }).then(() => {
        //获取净业绩图表数据
        return this.$axios.get('/bi-mobile/api/admin/biProjectBReport/getList1').then(res => {
          let timeDate = []
          let numData = []
          for (let i = res.data.length - 1; i >= 0; i--) {
            timeDate.push(res.data[i].value)
            numData.push(res.data[i].label)
          }
          this.chartOptions.series[0].data = timeDate
          this.chartOptions.xAxis.data = numData
        })
      }).then(() => {
        //获取未发取消图表数据
        return this.$axios.get('/bi-mobile/api/admin/biProjectBReport/getList2').then(res => {
          let timeDate = []
          let numData = []
          for (let i = res.data.length - 1; i >= 0; i--) {
            timeDate.push(res.data[i].value)
            numData.push(res.data[i].label)
          }
          this.chartOptionsNot.series[0].data = timeDate
          this.chartOptionsNot.xAxis.data = numData
        })
      }).then(() => {
        //获取客单价图表数据
        return this.$axios.get('/bi-mobile/api/admin/biProjectBReport/getList3').then(res => {
          let timeDate = []
          let numData = []
          for (let i = res.data.length - 1; i >= 0; i--) {
            timeDate.push(res.data[i].value)
            numData.push(res.data[i].label)
          }
          this.chartOptionsCost.series[0].data = timeDate
          this.chartOptionsCost.xAxis.data = numData
          this.initEcharts()
          // this.hideLoading()
        })
      }).catch((error) => {
        this.$message.error(error.message || error.msg)
      })
    },
    initEcharts () {
      this.chartIns = E.init(this.$refs['chart'])
      this.chartIns.setOption(this.chartOptions)
      this.chartNot = E.init(this.$refs['chartNot'])
      this.chartNot.setOption(this.chartOptionsNot)
      this.chartCost = E.init(this.$refs['chartCost'])
      this.chartCost.setOption(this.chartOptionsCost)
    },
  }
}
</script>

<style lang="scss" scoped>
.pay li {
  list-style: none;
}
.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

.table-box {
  padding: 10px;
  background: -webkit-linear-gradient(top, rgba(50, 148, 248, .2), rgba(50, 148, 248, .1));
  background: -o-linear-gradient(bottom, rgba(50, 148, 248, .2), rgba(50, 148, 248, .1));
  background: -moz-linear-gradient(bottom, rgba(50, 148, 248, .2), rgba(50, 148, 248, .1));
  background: linear-gradient(to bottom, rgba(50, 148, 248, .2), rgba(50, 148, 248, .1));
}

.top-content {
  padding: 10px 0;
}

.title {
  margin-left: 10px;
  font-weight: bold;
}

.time {
  font-size: 12px;
  line-height: 16px;
  color: #969696;
}

.greenColor {
  color: #2fa868;
}

.redColor {
  color: red;
}

// .pay:nth-child(3){
//   >li:nth-child(3){
//     >div:first-child{
//       color: #2fa868;
//     }
//   }
// }
// .pay:nth-child(4),.pay:nth-child(5){
//   >li:nth-child(3){
//     >div:first-child{
//       color: red;
//     }
//   }
// }

.pay {
  width: 100%;
  height: 60px;
  border-radius: 6px;
  background-color: #fff;
  padding: 10px 0;
  margin-bottom: 6px;

  > li:last-child {
    border: none;
  }

  > li:nth-child(2) {
    > div:first-child {
      font-weight: bold;
      color: #000;
    }
  }

  > li {
    width: 33%;
    float: left;
    text-align: center;
    color: #666;
    border-right: 1px solid #ddd;

    > div {
      line-height: 20px;
    }

    > div:last-child {
      font-size: 12px;

    }
  }

}

.performance {
  width: 100%;
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
}

.perTitle {
  width: 100%;
  background-color: #fff;
  padding: 10px 10px 0 10px;

  > div:first-child {
    float: left;
    width: 4px;
    height: 16px;
    margin-right: 6px;
    background-color: #3b9ceb;
    border-radius: 2px;
  }

  > div:last-child {
    float: left;
    font-weight: bold;

  }

}
</style>
