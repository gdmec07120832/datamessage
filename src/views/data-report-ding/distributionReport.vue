<template>
  <div class="box" style="font-family:'Microsoft YaHei';letter-spacing: 1px;">
    <div>
      <div style="display:flex;color: #333333;align-items: center;">
        <div style="font-size: 10px;align-items: center;margin-bottom: 5px;display: flex;"><span
            style="font-size: 14px;">新零售发货日报</span></div>
        <div
            style="display: flex;justify-content: flex-end;font-size: 10px;flex:2;align-items: center;margin-bottom: 5px;">
          更新时间：{{ nowDate }} 8:30 am
        </div>
      </div>
    </div>
    <div
        style="background-color: #FFFFFF;margin-bottom: 10px;border-radius : 5px;height:295px;box-shadow: rgb(218, 218, 218) 1px 1px 2px 1px;">
      <van-row type="flex" justify="center" class="table_title">
        <van-col span="24" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
          <div style="display: flex;align-items: center;color: #FFFFFF;font-size: 12px;">整体概况</div>
        </van-col>
      </van-row>
      <div class="head_div">
        <div class="head_content">
          <div class="head_content_one">
            <div class="head_content_one_title">整体达成</div>
            <div class="head_content_one_text">{{ detail.MTD_SEND_RATE }}%</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ detail.SEND_TARGET | ThousandSeparator }}万</div>
            <div class="head_content_two_title">发货目标</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ detail.SEND_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">本月发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ detail.SEND_LAST_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">昨日发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ detail.PTD_SEND_RATE }}%</div>
            <div class="head_content_two_title">昨日达成</div>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
        <div style="border-bottom: 1px solid #ececec;width: 98%;margin-bottom: 15px;"></div>
      </div>
      <div style="padding-left: 10px;margin-bottom: 15px;font-size: 12px;color: #313131;">近30天达成趋势</div>
      <chart class="canvas" ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
    </div>
    <div
        style="background-color: #FFFFFF;margin-bottom: 10px;border-radius : 5px;height:395px;box-shadow: rgb(218, 218, 218) 1px 1px 2px 1px;">
      <van-row type="flex" justify="center" class="table_title">
        <van-col span="24" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
          <div style="display: flex;align-items: center;color: #FFFFFF;font-size: 12px;">区域概况</div>
        </van-col>
      </van-row>
      <div class="head_div">
        <div class="head_content">
          <div class="head_content_one">
            <div class="head_content_one_title">东区达成</div>
            <div class="head_content_one_text">{{ earea.MTD_SEND_RATE }}%</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ earea.SEND_TARGET | ThousandSeparator }}万</div>
            <div class="head_content_two_title">发货目标</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ earea.SEND_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">本月发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ earea.SEND_LAST_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">昨日发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ earea.PTD_SEND_RATE }}%</div>
            <div class="head_content_two_title">昨日达成</div>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
        <div style="border-bottom: 1px solid #ececec;width: 98%;"></div>
      </div>
      <div class="head_div">
        <div class="head_content">
          <div class="head_content_one">
            <div class="head_content_one_title">南区达成</div>
            <div class="head_content_one_text">{{ sarea.MTD_SEND_RATE }}%</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ sarea.SEND_TARGET | ThousandSeparator }}万</div>
            <div class="head_content_two_title">发货目标</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ sarea.SEND_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">本月发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ sarea.SEND_LAST_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">昨日发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ sarea.PTD_SEND_RATE }}%</div>
            <div class="head_content_two_title">昨日达成</div>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
        <div style="border-bottom: 1px solid #ececec;width: 98%;"></div>
      </div>
      <div class="head_div">
        <div class="head_content">
          <div class="head_content_one">
            <div class="head_content_one_title">西区达成</div>
            <div class="head_content_one_text">{{ warea.MTD_SEND_RATE }}%</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ warea.SEND_TARGET | ThousandSeparator }}万</div>
            <div class="head_content_two_title">发货目标</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ warea.SEND_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">本月发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ warea.SEND_LAST_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">昨日发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ warea.PTD_SEND_RATE }}%</div>
            <div class="head_content_two_title">昨日达成</div>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
        <div style="border-bottom: 1px solid #ececec;width: 98%;"></div>
      </div>
      <div class="head_div">
        <div class="head_content">
          <div class="head_content_one">
            <div class="head_content_one_title">北区达成</div>
            <div class="head_content_one_text">{{ narea.MTD_SEND_RATE }}%</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ narea.SEND_TARGET | ThousandSeparator }}万</div>
            <div class="head_content_two_title">发货目标</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ narea.SEND_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">本月发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ narea.SEND_LAST_AMT | ThousandSeparator }}万</div>
            <div class="head_content_two_title">昨日发货</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{ narea.PTD_SEND_RATE | ThousandSeparator }}%</div>
            <div class="head_content_two_title">昨日达成</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight1 +'px;'">
      <div>
        <van-row type="flex" justify="center" class="table_title">
          <van-col span="12"
                   style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;flex: 1;">
            <div style="flex:3;display: flex;align-items: center;color: #FFFFFF;font-size: 12px;">大区概况</div>
          </van-col>
          <van-col span="12"
                   style="display: flex;margin-right: 10px;align-items: center;justify-content: flex-end;flex: 1;">
            月明细
            <van-switch v-model="checked" size="14" active-color="#88C0FA" inactive-color="#88C0FA"
                        @change="getChecked1" style="margin-left: 10px;margin-right: 10px;"/>
            日明细
          </van-col>

        </van-row>
      </div>
      <table class="tj_table" ref="table1" @click="changeCharts1(chartHidden1)">
        <tr style="margin-left: -15px;margin-right: -15px;border-radius: 5px;">
          <th :width="'22%'" class="tj_th"><span class="tj_span">大区</span></th>
          <th :width="'18%'" class="tj_th"><span class="tj_span">大区经理</span></th>
          <th :width="'19%'" class="tj_th" v-if="monthHiddien1"><span class="tj_span">发货目标</span></th>
          <th :width="'19%'" class="tj_th" v-if="monthHiddien1"><span class="tj_span">本月发货</span></th>
          <th :width="'22%'" class="tj_th" v-if="monthHiddien1"><span class="tj_span">本月达成</span></th>
          <th :width="'19%'" class="tj_th" v-if="!monthHiddien1"><span class="tj_span">发货目标</span></th>
          <th :width="'19%'" class="tj_th" v-if="!monthHiddien1"><span class="tj_span">昨日发货</span></th>
          <th :width="'22%'" class="tj_th" v-if="!monthHiddien1"><span class="tj_span">昨日达成</span></th>
        </tr>
        <tr v-for="(item, index) in threeList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'22%'" style="text-align: center;"><span class="tj_span">{{ item.areaName }}</span></td>
          <td :width="'18%'" style="text-align: center;"><span class="tj_span">{{ item.areaManagerName }}</span></td>
          <td :width="'19%'" style="text-align: center;" v-if="monthHiddien1"><span
              class="tj_span">{{ item.sendTarget | ThousandSeparator }}万</span></td>
          <td :width="'19%'" style="text-align: center;" v-if="monthHiddien1"><span
              class="tj_span">{{ item.sendAmt | ThousandSeparator }}万</span></td>
          <td :width="'22%'" style="text-align: center;" v-if="monthHiddien1"><span
              class="tj_span">{{ item.mtdSendRate }}%</span></td>
          <td :width="'19%'" style="text-align: center;" v-if="!monthHiddien1"><span
              class="tj_span">{{ item.sendTarget | ThousandSeparator }}万</span></td>
          <td :width="'19%'" style="text-align: center;" v-if="!monthHiddien1"><span
              class="tj_span">{{ item.sendLastAmt | ThousandSeparator }}万</span></td>
          <td :width="'22%'" style="text-align: center;" v-if="!monthHiddien1"><span
              class="tj_span">{{ item.ptdSendRate }}%</span></td>
        </tr>
      </table>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;margin: 10px;"
           v-if="dhsHidden1"><span @click="changeCharts1(true)" v-if="chartHidden1">点击查看更多</span><span
          @click="changeCharts1(false)" v-if="!chartHidden1">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden1">
        <img src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight2 +'px;'">
      <div>
        <van-row type="flex" justify="center" class="table_title">
          <van-col span="12"
                   style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;flex: 1;">
            <div style="display: flex;align-items: center;color: #FFFFFF;font-size: 12px;">片区概况</div>
          </van-col>
          <van-col span="12"
                   style="display: flex;margin-right: 10px;align-items: center;justify-content: flex-end;flex: 1;">
            月明细
            <van-switch v-model="checked2" size="14" active-color="#88C0FA" inactive-color="#88C0FA"
                        @change="getChecked2" style="margin-left: 10px;margin-right: 10px;"/>
            日明细
          </van-col>
        </van-row>
      </div>
      <table class="tj_table" ref="table2" @click="changeCharts2(chartHidden2)">
        <th :width="'22%'" class="tj_th"><span class="tj_span">片区</span></th>
        <th :width="'18%'" class="tj_th"><span class="tj_span">片区经理</span></th>
        <th :width="'19%'" class="tj_th" v-if="monthHiddien2"><span class="tj_span">发货目标</span></th>
        <th :width="'19%'" class="tj_th" v-if="monthHiddien2"><span class="tj_span">本月发货</span></th>
        <th :width="'22%'" class="tj_th" v-if="monthHiddien2"><span class="tj_span">本月达成</span></th>
        <th :width="'19%'" class="tj_th" v-if="!monthHiddien2"><span class="tj_span">发货目标</span></th>
        <th :width="'19%'" class="tj_th" v-if="!monthHiddien2"><span class="tj_span">昨日发货</span></th>
        <th :width="'22%'" class="tj_th" v-if="!monthHiddien2"><span class="tj_span">昨日达成</span></th>
        <tr v-for="(item, index) in sixList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'22%'" style="text-align: center;"><span class="tj_span">{{ item.subAreaName }}</span></td>
          <td :width="'18%'" style="text-align: center;"><span class="tj_span">{{ item.subAreaManagerName }}</span></td>
          <td :width="'19%'" style="text-align: center;" v-if="monthHiddien2"><span
              class="tj_span">{{ item.sendTarget }}万</span></td>
          <td :width="'19%'" style="text-align: center;" v-if="monthHiddien2"><span
              class="tj_span">{{ item.sendAmt }}万</span></td>
          <td :width="'22%'" style="text-align: center;" v-if="monthHiddien2"><span
              class="tj_span">{{ item.mtdSendRate }}%</span></td>
          <td :width="'19%'" style="text-align: center;" v-if="!monthHiddien2"><span
              class="tj_span">{{ item.sendTarget }}万</span></td>
          <td :width="'19%'" style="text-align: center;" v-if="!monthHiddien2"><span
              class="tj_span">{{ item.sendLastAmt }}万</span></td>
          <td :width="'22%'" style="text-align: center;" v-if="!monthHiddien2"><span
              class="tj_span">{{ item.ptdSendRate }}%</span></td>
        </tr>
      </table>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;margin: 10px;"
           v-if="dhsHidden2"><span @click="changeCharts2(true)" v-if="chartHidden2">点击查看更多</span><span
          @click="changeCharts2(false)" v-if="!chartHidden2">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden2">
        <img src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <van-dialog v-model="show" :close-on-click-overlay="true" :show-confirm-button="false" title="逻辑说明">
      <div style="line-height: 20px;color: #646566;margin-bottom: 10px;font-size:12px;padding: 10px 18px;">
        <p style="padding: 3px;">1、总销额：纯新品系列/主型号近一月实际售价（剔除未发取消）；</p>
        <p style="padding: 3px;">2、系列/主型号数量：系列/主型号去重计数（剔除零部件）；</p>
        <p style="padding: 3px;">3、SKU数量：子项去重计数（剔除零部件）；</p>
        <p style="padding: 3px;">4、30/60/90天前上架：上架时间1/2/3月产品；</p>
        <p style="padding: 3px;">5、纯新：单品升级性质=原始产品。</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Chart from 'vue-echarts'
import { Row, Switch, Dialog, Col } from 'vant'

export default {
  name: 'deliveryReport',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Switch.name]: Switch,
    [Dialog.Component.name]: Dialog.Component,
    Chart
  },
  data () {
    return {
      checked: false,
      monthHiddien1: true,
      checked2: false,
      monthHiddien2: true,
      type: '',
      show: false,
      nowDate: '',
      dhsHidden1: true,
      dhsHidden2: true,
      dhsHidden3: true,
      pplHidden: true,
      echartsHeight1: '260',
      heights1: '',
      chartHidden1: true,
      echartsHeight2: '260',
      heights2: '',
      chartHidden2: true,
      detail: {}, // 总体情况
      earea: {}, // 东区
      sarea: {}, // 南区
      warea: {}, // 西区
      narea: {}, // 北区
      threeList: [],
      sixList: [],
      orgObj: {},
      orgOptions: {}
    }
  },
  created () {
  },
  filters: {
    ThousandSeparator (input) {
      return input && input.toString()
          .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
  },
  mounted () {
    if (!this.$route.query.dateString) {
      this.$message.error('没有指定日期')
    }
    this.getDetail(this.$route.query.dateString)
    this.getChart(this.$route.query.dateString)
    this.getArea(this.$route.query.dateString, '东区').then((result) => {
      this.earea = result.data
    })
    this.getArea(this.$route.query.dateString, '南区').then((result) => {
      this.sarea = result.data
    })
    this.getArea(this.$route.query.dateString, '西区').then((result) => {
      this.warea = result.data
    })
    this.getArea(this.$route.query.dateString, '北区').then((result) => {
      this.narea = result.data
    })
    this.queryAreaMes(this.$route.query.dateString, '5').then((result) => {
      this.threeList = result.data
    }).then(() => {
      this.echartsHeight1 = this.$refs.table1.offsetHeight + 70
    })
    this.queryRegionMes(this.$route.query.dateString, '5').then((result) => {
      this.sixList = result.data
    }).then(() => {
      this.echartsHeight2 = this.$refs.table2.offsetHeight + 70
    })
  },
  methods: {
    getChecked1 (value) {
      this.monthHiddien1 = value !== true
    },
    getChecked2 (value) {
      this.monthHiddien2 = value !== true
    },
    getChart (dateString) {
      this.$axios.get('/bi-mobile/api/admin/biDistributionReport/getList3', {
        params: { dateStr: dateString }
      }).then((res) => {
        let labelRet = []
        let dataRet = []
        if (res.data.length > 0) {
          res.data.forEach((item) => {
            labelRet.push(item.label)
            dataRet.push(item.value)
          })
          this.orgObj.labelList = labelRet
          this.orgObj.dataList = dataRet
          this.orgOptions = {
            grid: {
              left: '3%',
              right: '4%',
              bottom: '40px',
              top: '10px',
              containLabel: true
            },
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            },
            color: ['#C6D8F0'],
            xAxis: {
              axisLabel: {
                color: '#7F7F7F',
                fontSize: '12px'
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              type: 'category',
              boundaryGap: false,
              data: this.orgObj.labelList
            },
            yAxis: {
              axisLabel: {
                formatter: '{value}%',
                color: '#7F7F7F',
                fontSize: '12px'
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              type: 'value'
            },
            series: [{
              symbol: 'none',
              smooth: true,
              data: this.orgObj.dataList,
              type: 'line',
              areaStyle: {}
            }]
          }
        }
      }).catch((error) => {
        this.$message.error('图表异常：' + (error.message || error.msg))
      })
    },
    changeCharts1 (hidden) {
      if (hidden === true) {
        this.queryAreaMes(this.$route.query.dateString, null).then((result) => {
          this.threeList = result.data
        }).then(() => {
          this.echartsHeight1 = this.$refs.table1.offsetHeight + 70
        })
        this.chartHidden1 = false
      } else {
        this.queryAreaMes(this.$route.query.dateString, '5').then((result) => {
          this.threeList = result.data
        }).then(() => {
          this.echartsHeight1 = this.$refs.table1.offsetHeight + 70
        })
        this.chartHidden1 = true
      }
    },
    changeCharts2 (hidden) {
      if (hidden === true) {
        this.queryRegionMes(this.$route.query.dateString, null).then((result) => {
          this.sixList = result.data
        }).then(() => {
          this.echartsHeight2 = this.$refs.table2.offsetHeight + 70
        })
        this.chartHidden2 = false
      } else {
        this.queryRegionMes(this.$route.query.dateString, '5').then((result) => {
          this.sixList = result.data
        }).then(() => {
          this.echartsHeight2 = this.$refs.table2.offsetHeight + 70
        })
        this.chartHidden2 = true
      }
    },
    // 总体情况
    getDetail (dateString) {
      this.$axios.get('/bi-mobile/api/admin/biDistributionReport/getDetail', {
        params: {
          dateStr: dateString
        },
      }).then(res => {
        if (res.data) {
          this.detail = res.data
        }
      }).catch((error) => {
        this.$message.error('总体情况：' + (error.message || error.msg))
      })
    },
    getArea (dateString, area) {
      return new Promise((resolve) => {
        this.$axios.get('/bi-mobile/api/admin/biDistributionReport/getDetail2', {
          params: {
            dateStr: dateString,
            area: area
          },
        }).then(res => {
          return resolve(res)
        }).catch((error) => {
          this.$message.error('东南西北区完成情况：' + (error.message || error.msg))
        })
      })
    },
    // 片区完成情况
    queryRegionMes (dateString, rowNum) {
      return new Promise((resolve) => {
        this.$axios.get('/bi-mobile/api/admin/biDistributionReport/getList2', {
          params: {
            dateStr: dateString,
            rownum: rowNum
          },
        }).then((res) => {
          resolve(res)
        }).catch((error) => {
          this.$message.error('片区完成情况：' + (error.message || error.msg))
        })
      })
    },
    // 大区完成情况
    queryAreaMes (dateString, rowNum) {
      return new Promise((resolve) => {
        this.$axios.get('/bi-mobile/api/admin/biDistributionReport/getList1', {
          params: {
            dateStr: dateString,
            rownum: rowNum
          },
        }).then(res => {
          resolve(res)
        }).catch(error => {
          this.$message.error('大区完成情况：' + (error.message || error.msg))
        })
      })
    },
    getDialog () {
      this.show = true
    }
  }
}
</script>

<style scoped lang="stylus">
.box {
  background-color: #E7EAEF
  color #bbbbbb
  padding: 10px
  overflow scroll

  .content {
    margin-top: 10px;
    background-color: #fff;
    // overflow scroll;
    -webkit-overflow-scrolling: touch;
    height: 260px;
    border-radius: 5px
    box-shadow: rgb(218, 218, 218) 1px 1px 2px 1px;

    .canvas {
      width: 100%;
    }
  }
}

.content_div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content_flex {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height 26px;
  padding 5px;
}

/deep/ .van-dialog__header {
  color: #323233;
  font-size: 16px;
}

.canvas {
  width: 100%;
  height 160px
}

.i-box {
  position absolute
  right: -25px
  top: 5px

  .el-icon-question {
    font-size 20px
    color #409EFF
  }
}

.col_div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  height: 90%;
}

.num_text {
  font-size: 18px;
  color: #333333;
}

.title_text {
  font-size: 12px;
  color: #999999;
}

.span_div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.colorRed {
  color: #F04134;
}

.colorGreen {
  color: #00A854;
}

.errorDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}

.textBorder {
  border-right: 1px solid #ececec;
  height: 40px;
}

.zb_div {
  display: flex;
  font-size: 10px;
  width: 100%;

  .zb_title {
    display: flex;
  }

  .zb_content {
    display: flex;
    color: #333333;
    margin-left: 10px;
  }
}

.tj_table {
  font-size: 10px;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top 2px;
  border-radius 5px;

  .tj_th {
    padding: 5px;
    text-align: center;
    color: #9c9c9c;
  }

  td {
    color: #333333;

    .tj_span {
      display: flex;
      min-height: 28px;
      // justify-content: center;
      align-items: center;
      font-size: 10px;
      word-break: break-all;
      padding-left: 10px;
    }
  }

  th {
    color: #333333;

    .tj_span {
      font-weight: normal;
      display: flex;
      min-height: 28px;
      // justify-content: center;
      align-items: center;
      font-size: 10px;
      padding-left: 5px;
    }
  }
}

.table_title {
  height: 30px;
  font-size: 12px;
  color: #FFFFFF;
  background-color: #007BF7;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  align-items: center;
}

.tr_bg {
  background-color: #F5FAFF;
}

.font_red {
  color: red;
}

.font_greed {
  color: #16d153;
}

.head_div {
  display: flex;
  width: 100%;

  .head_content {
    display: flex;
    height: 90px;
    align-items: center;
    width: 100%;

    .head_content_one {
      height: 80px;
      flex: 5 1 0%;
      padding-left: 10px;

      .head_content_one_title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 36px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(49, 49, 49);
      }

      .head_content_one_text {
        font-size: 18px;
        color: rgb(57, 111, 255);
        margin-top: 8px;
      }
    }

    .head_content_two {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 4 1 0%;
      margin-top: 18px;

      .head_content_two_content {
        height: 26px;
        line-height: 24px;
        color: rgb(57, 111, 255);
        font-size 12px
      }

      .head_content_two_title {
        height: 26px;
        line-height: 24px;
        font-size: 10px;
        color: rgb(49, 49, 49);
      }
    }
  }
}

.border_grey {
  border-left: 1px solid #ececec;
  height: 40px;
  display: flex;
  margin-top: 18px;
}
</style>
