<template>
  <div class="box" style="font-family:'Microsoft YaHei';letter-spacing: 1px;">
    <div>
      <div style="display:flex;color: #333333;">
        <div style="display: flex;justify-content: flex-end;font-size: 10px;flex:2;align-items: center;">更新时间：{{nowDate}} 8:30 am</div>
      </div>
    </div>
    <div style="background-color: #FFFFFF;margin-bottom: 10px;border-radius : 5px;height:290px;box-shadow: rgb(218, 218, 218) 1px 1px 2px 1px;">
      <div style="margin:10px 15px 15px 15px;display: flex;flex-direction: column;">
        <div>
          <div style="display: flex;height: 40px;align-items: center;font-size: 12px;">
            <div style="flex:2;display: flex;align-items: center;color: rgb(49, 49, 49);"><div style="width: 10px;height: 10px;background: #5BC1F9;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>主型号销额（万）</div>
            <div style="flex:2;display: flex;justify-content: flex-end;color: #3CA7F8;" @click="getDialog">逻辑说明</div>
          </div>
          <div class="content_div">
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlOflAmt30 === 0?'--':form.newMtrlOflAmt30}}</div>
              <div class="title_text">30天前上架</div>
            </div>
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlOflAmt60 === 0?'--':form.newMtrlOflAmt60}}</div>
              <div class="title_text">60天前上架</div>
            </div>
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlOflAmt90 === 0?'--':form.newMtrlOflAmt90}}</div>
              <div class="title_text">90天前上架</div>
            </div>
          </div>
          <div style="display: flex;height: 40px;align-items: center;font-size: 12px;">
            <div style="flex:2;display: flex;align-items: center;color: rgb(49, 49, 49);"><div style="width: 10px;height: 10px;background: #5BC1F9;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>主型号数量（个）</div>
            <div style="flex:2;display: flex;justify-content: flex-end;color: #3CA7F8;"></div>
          </div>
          <div class="content_div">
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlOlAmt30 === 0?'--':form.newMtrlOlAmt30}}</div>
              <div class="title_text">30天前上架</div>
            </div>
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlOlAmt60 === 0?'--':form.newMtrlOlAmt60}}</div>
              <div class="title_text">60天前上架</div>
            </div>
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlOlAmt90 === 0?'--':form.newMtrlOlAmt90}}</div>
              <div class="title_text">90天前上架</div>
            </div>
          </div>
          <div style="display: flex;height: 40px;align-items: center;font-size: 12px;">
            <div style="flex:2;display: flex;align-items: center;color: rgb(49, 49, 49)"><div style="width: 10px;height: 10px;background: #5BC1F9;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>SKU数量（个）</div>
            <div style="flex:2;display: flex;justify-content: flex-end;color: #3CA7F8;"></div>
          </div>
          <div class="content_div">
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlQty30 === 0?'--':form.newMtrlQty30}}</div>
              <div class="title_text">30天前上架</div>
            </div>
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlQty60 === 0?'--':form.newMtrlQty60}}</div>
              <div class="title_text">60天前上架</div>
            </div>
            <div class="content_flex">
              <div style="color:#000000;" class="num_text">{{form.newMtrlQty90 === 0?'--':form.newMtrlQty90}}</div>
              <div class="title_text">90天前上架</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight1 +'px;'" >
      <div>
        <van-row type="flex" justify="center" style="height:30px;font-size: 12px;color: #313131;padding-top:10px;">
          <van-col span="8" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;color: rgb(49, 49, 49);">30天前上架</div>
          </van-col>
          <van-col span="16" style="display: flex;align-items: center;justify-content: flex-end;margin-right: 10px;">
            <div style="display: flex;align-items: center;">
              <div style="margin-right: 10px;display: flex;align-items: center;"><div style="width: 10px;height: 10px;background: #0074E4;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>线上</div>
              <div style="margin-right: 10px;display: flex;align-items: center;"><div style="width: 10px;height: 10px;background: #F1C40F;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>线下</div>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col><div style="display: flex;align-items: center;font-size: 12px;margin-left: 10px;">({{thirtyDateText}})</div></van-col>
        </van-row>
      </div>
      <chart class="canvas" ref="chart1" :options="orgOptions" :auto-resize="true" v-if="dhsHidden1" :style="'height:'+ heights1 +'px;'"></chart>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;" v-if="dhsHidden1" ><span @click="changeCharts1(true)" v-if="chartHidden1">点击查看更多</span><span @click="changeCharts1(false)" v-if="!chartHidden1">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden1">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight2 +'px;'">
      <div>
        <van-row type="flex" justify="center" style="height:30px;font-size: 12px;color: #313131;padding-top:10px;">
          <van-col span="8" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;color: rgb(49, 49, 49);">60天前上架</div>
          </van-col>
          <van-col span="16" style="display: flex;align-items: center;justify-content: flex-end;margin-right: 10px;">
            <div style="display: flex;align-items: center;">
              <div style="margin-right: 10px;display: flex;align-items: center;"><div style="width: 10px;height: 10px;background: #0074E4;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>线上</div>
              <div style="margin-right: 10px;display: flex;align-items: center;"><div style="width: 10px;height: 10px;background: #F1C40F;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>线下</div>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col><div style="display: flex;align-items: center;font-size: 12px;margin-left: 10px;">({{sixtyDateText}})</div></van-col>
        </van-row>
      </div>
      <chart class="canvas" ref="chart2" :options="orgOptions2" :auto-resize="true" v-if="dhsHidden2" :style="'height:'+ heights2 +'px;'"></chart>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;" v-if="dhsHidden2"><span @click="changeCharts2(true)" v-if="chartHidden2">点击查看更多</span><span @click="changeCharts2(false)" v-if="!chartHidden2">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden2">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight3 +'px;'">
      <div>
        <van-row type="flex" justify="center" style="height:30px;font-size: 12px;color: #313131;padding-top:10px;">
          <van-col span="8" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;color: rgb(49, 49, 49);">90天前上架</div>
          </van-col>
          <van-col span="16" style="display: flex;align-items: center;justify-content: flex-end;margin-right: 10px;">
            <div style="display: flex;align-items: center;">
              <div style="margin-right: 10px;display: flex;align-items: center;"><div style="width: 10px;height: 10px;background: #0074E4;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>线上</div>
              <div style="margin-right: 10px;display: flex;align-items: center;"><div style="width: 10px;height: 10px;background: #F1C40F;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;margin-right: 5px;"></div>线下</div>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col><div style="display: flex;align-items: center;color:#bbb;font-size: 12px;margin-left: 10px;">({{ninetyDateText}})</div></van-col>
        </van-row>
      </div>
      <chart class="canvas" ref="chart3" :options="orgOptions3" :auto-resize="true" v-if="dhsHidden3" :style="'height:'+ heights3 +'px;'"></chart>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;" v-if="dhsHidden3"><span @click="changeCharts3(true)" v-if="chartHidden3">点击查看更多</span><span @click="changeCharts3(false)" v-if="!chartHidden3">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden3">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <van-dialog v-model="show" :close-on-click-overlay="true" :show-confirm-button="false" title="逻辑说明">
      <div style="padding: 10px;line-height: 20px;color: #646566;margin-bottom: 10px;font-size:12px;padding-left: 18px;padding-right: 18px;">
        <p style="padding: 3px;">1、主型号销额：纯新主型号近一月实际售价（剔除未发取消）；</p>
        <p style="padding: 3px;">2、主型号数量：主型号去重计数（剔除零部件）；</p>
        <p style="padding: 3px;">3、SKU数量：子项去重计数（剔除零部件）；</p>
        <p style="padding: 3px;">4、30/60/90天前上架：上架时间1/2/3个月产品。</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
/*eslint-disable*/
import 'echarts';
import Chart from 'vue-echarts'
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import {Row, Switch, Dialog, Col} from 'vant'
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
      echartsHeight3: '260',
      heights3: '',
      chartHidden3: true,
      form: {
        newMtrlOflAmt30: 0, // 30天内线下业绩
        newMtrlOflAmt60: 0, // 60天内线下业绩
        newMtrlOflAmt90: 0, // 90天内线下业绩
        newMtrlOlAmt30: 0, // 30天内线上业绩
        newMtrlOlAmt60: 0, // 60天内线上业绩
        newMtrlOlAmt90: 0, // 90天内线上业绩
        newMtrlQty30: 0, // 30天内SKU数量
        newMtrlQty60: 0, // 60天内SKU数量
        newMtrlQty90: 0 // 90天内SKU数量
      },
      orgObj: {
        labelList: [],
        dataOnlineList: [],
        dataRetOffline: []
      },
      matchObj: {
        labelList: [],
        jjDataList: [],
        lkDataList: []
      },
      orgOptions: {},
      orgOptions2: {},
      orgOptions3: {},
      thirtyDateText: '',
      sixtyDateText: '',
      ninetyDateText: ''
    };
  },
  created() {
  },
  mounted() {

    if (this.$route.query.dateString !== '') {
      this.getChartDateText(this.$route.query.dateString);
      this.getData(this.$route.query.dateString);
      this.getBeforeDate30(this.$route.query.dateString, '5');
      this.getBeforeDate60(this.$route.query.dateString, '5');
      this.getBeforeDate90(this.$route.query.dateString, '5');
    } else {
      this.$message.error('没有指定日期');
    }
  },
  methods: {
    getChartDateText(date) {
      this.thirtyDateText = moment(date).subtract(30, 'days').format('YYYY/MM/DD') + '~' + moment(date).subtract(1, 'days').format('YYYY/MM/DD');
      this.sixtyDateText = moment(date).subtract(60, 'days').format('YYYY/MM/DD') + '~' + moment(date).subtract(31, 'days').format('YYYY/MM/DD');
      this.ninetyDateText = moment(date).subtract(90, 'days').format('YYYY/MM/DD') + '~' + moment(date).subtract(61, 'days').format('YYYY/MM/DD');
    },
    getLabelWidth(arr1, arr2) {
      const arr = [];
      const retArr = [];
      const container = document.createElement('div');
      arr1.forEach((item, index) => {
        arr.push(numeral(item).add(arr2[index]).format('0.00'));
      });
      container.style.cssText = 'display: inline-block; opacity: 0; position: absolute; left: -9999px; top: -9999px; font-size: 12px;';
      document.body.appendChild(container);
      arr.forEach(item => {
        container.innerText = item;
        retArr.push(container.offsetWidth + 20);
      });
      // 加一些留空值
      const max = _.max(retArr);
      setTimeout(() => {
        document.body.removeChild(container);
      }, 20);
      return max + 'px';
    },
    getData(dateString) {
      this.nowDate = this.getDate(dateString);
      this.$axios.get( '/bi-mobile/api/admin/biNewProductsReport/getNewLevelSummary', {
        params: { dateStr: dateString },
      }).then(res => {
        this.form = res.data;
      }).catch(error => {
        this.$message.error('基础数据' + (error.message || error.msg));
      });
    },
    getDialog() {
      this.show = true;
    },
    changeCharts1(hidden) {
      if (hidden === true) {
        this.getBeforeDate30(this.$route.query.dateString, '');
        this.chartHidden1 = false;
      } else {
        this.getBeforeDate30(this.$route.query.dateString, '5');
        this.chartHidden1 = true;
      }
    },
    changeCharts2(hidden) {
      if (hidden === true) {
        this.getBeforeDate60(this.$route.query.dateString, '');
        this.chartHidden2 = false;
      } else {
        this.getBeforeDate60(this.$route.query.dateString, '5');
        this.chartHidden2 = true;
      }
    },
    changeCharts3(hidden) {
      if (hidden === true) {
        this.getBeforeDate90(this.$route.query.dateString, '');
        this.chartHidden3 = false;
      } else {
        this.getBeforeDate90(this.$route.query.dateString, '5');
        this.chartHidden3 = true;
      }
    },
    getBeforeDate30(dateString, rownum) {
      this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/getNewLevelDetails', {
        params: {
          dateStr: dateString,
          rownum: rownum,
          orderStr: '30'
        },
      }).then(res => {
        let labelRet = [];
        let dataRetOnline = [];
        let dataRetOffline = [];
        let newProdOlAmt30 = [];
        let newProdOlAmt60 = [];
        let newProdOlAmt90 = [];
        let newProdOflAmt30 = [];
        let newProdOflAmt60 = [];
        let newProdOflAmt90 = [];
        if (res.data.length > 0) {
          res.data.forEach((item, index) => {
            labelRet.push(item.mainModel);
            dataRetOnline.push(item.newMtrlOlAmt30);
            dataRetOffline.push(item.newMtrlOflAmt30);
            newProdOlAmt30.push(item.newProdOlAmt30);
            newProdOlAmt60.push(item.newProdOlAmt60);
            newProdOlAmt90.push(item.newProdOlAmt90);
            newProdOflAmt30.push(item.newProdOflAmt30);
            newProdOflAmt60.push(item.newProdOflAmt60);
            newProdOflAmt90.push(item.newProdOflAmt90);
          });
          this.orgObj.labelList = labelRet;
          this.orgObj.dataOnlineList = dataRetOnline;
          this.orgObj.dataOfflineList = dataRetOffline;
          this.setPendingData(labelRet, dataRetOnline, dataRetOffline, newProdOlAmt30, newProdOlAmt60, newProdOlAmt90, newProdOflAmt30, newProdOflAmt60, newProdOflAmt90);
        } else {
          this.dhsHidden1 = false;
        }
      }).catch(error => {
        this.$message.error('30天前上架：' + (error.message || error.msg));
        this.dhsHidden1 = false;
      });
    },
    setPendingData(label, onlineData, offlineData, newProdOlAmt30, newProdOlAmt60, newProdOlAmt90, newProdOflAmt30, newProdOflAmt60, newProdOflAmt90) {
      this.heights1 = label.length * 20 + 20;
      const labelWidth = this.getLabelWidth(onlineData, offlineData);
      this.orgOptions = {
        tooltip: {
          confine: true,
          formatter(params) {
            if (newProdOlAmt30[params.dataIndex] == 0) {
              newProdOlAmt30[params.dataIndex] = '0.0';
            }
            if (newProdOlAmt60[params.dataIndex] == 0) {
              newProdOlAmt60[params.dataIndex] = '0.0';
            }
            if (newProdOlAmt90[params.dataIndex] == 0) {
              newProdOlAmt90[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt30[params.dataIndex] == 0) {
              newProdOflAmt30[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt60[params.dataIndex] == 0) {
              newProdOflAmt60[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt90[params.dataIndex] == 0) {
              newProdOflAmt90[params.dataIndex] = '0.0';
            }
            if (params.componentIndex == 0) {
              return '线上总额：' + params.data + '万';
            } else {
              return '线下总额：' + params.data + '万';
            }
          }
        },
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        grid: {
          top: '10px',
          left: '1%',
          right: labelWidth,
          bottom: '2%',
          containLabel: true,
          height: this.heights1
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          inverse: true,
          type: 'category',
          data: label,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#34495E',
            fontSize: '12px'
          }
        },
        series: [
          {
            name: '线下',
            type: 'bar',
            stack: '总量',
            data: onlineData,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function (params) {
                  let color = '#0074E4';
                  return color;
                },
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          },
          {
            name: '线上',
            type: 'bar',
            stack: '总量',
            data: offlineData,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function (params) {
                  let color = '#F1C40F';
                  return color;
                },
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#666'
                },
                formatter: function(params) {
                  return numeral(params.value).add(onlineData[params.dataIndex]).value() + '万';
                }
              }
            }
          }
        ]
      };
      this.$refs.chart1.resize({
        height: this.heights1
      });
      this.echartsHeight1 = this.heights1 + 70;
    },
    getBeforeDate60(dateString, rownum) {
      this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/getNewLevelDetails', {
        params: {
          dateStr: dateString,
          rownum: rownum,
          orderStr: '60'
        },
      }).then(res => {
        let labelRet = [];
        let dataRetOnline = [];
        let dataRetOffline = [];
        let newProdOlAmt30 = [];
        let newProdOlAmt60 = [];
        let newProdOlAmt90 = [];
        let newProdOflAmt30 = [];
        let newProdOflAmt60 = [];
        let newProdOflAmt90 = [];
        if (res.data.length > 0) {
          res.data.forEach((item, index) => {
            labelRet.push(item.mainModel);
            dataRetOnline.push(item.newMtrlOlAmt60);
            dataRetOffline.push(item.newMtrlOflAmt60);
            newProdOlAmt30.push(item.newProdOlAmt30);
            newProdOlAmt60.push(item.newProdOlAmt60);
            newProdOlAmt90.push(item.newProdOlAmt90);
            newProdOflAmt30.push(item.newProdOflAmt30);
            newProdOflAmt60.push(item.newProdOflAmt60);
            newProdOflAmt90.push(item.newProdOflAmt90);
          });
          this.orgObj.labelList = labelRet;
          this.orgObj.dataOnlineList = dataRetOnline;
          this.orgObj.dataOfflineList = dataRetOffline;
          this.setPendingData2(labelRet, dataRetOnline, dataRetOffline, newProdOlAmt30, newProdOlAmt60, newProdOlAmt90, newProdOflAmt30, newProdOflAmt60, newProdOflAmt90);
        } else {
          this.dhsHidden2 = false;
        }
      }).catch(error => {
        this.$message.error('60天前上架：' + (error.message || error.msg));
        this.dhsHidden2 = false;
      });
    },
    setPendingData2(label, onlineData, offlineData, newProdOlAmt30, newProdOlAmt60, newProdOlAmt90, newProdOflAmt30, newProdOflAmt60, newProdOflAmt90) {
      this.heights2 = label.length * 20 + 20;
      const labelWidth = this.getLabelWidth(onlineData, offlineData);
      this.orgOptions2 = {
        tooltip: {
          confine: true,
          formatter(params) {
            if (newProdOlAmt30[params.dataIndex] == 0) {
              newProdOlAmt30[params.dataIndex] = '0.0';
            }
            if (newProdOlAmt60[params.dataIndex] == 0) {
              newProdOlAmt60[params.dataIndex] = '0.0';
            }
            if (newProdOlAmt90[params.dataIndex] == 0) {
              newProdOlAmt90[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt30[params.dataIndex] == 0) {
              newProdOflAmt30[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt60[params.dataIndex] == 0) {
              newProdOflAmt60[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt90[params.dataIndex] == 0) {
              newProdOflAmt90[params.dataIndex] = '0.0';
            }
            if (params.componentIndex == 0) {
              return '线上总额：' + params.data + '万<br/>60天前上架：' + newProdOlAmt60[params.dataIndex] + '万<br/>30天前上架：' + newProdOlAmt30[params.dataIndex] + '万<br/>';
            } else {
              return '线下总额：' + params.data + '万<br/>60天前上架：' + newProdOflAmt60[params.dataIndex] + '万<br/>30天前上架：' + newProdOflAmt30[params.dataIndex] + '万<br/>';
            }
          }
        },
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        grid: {
          top: '10px',
          left: '1%',
          right: labelWidth,
          bottom: '2%',
          containLabel: true,
          height: this.heights2
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          inverse: true,
          type: 'category',
          data: label,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#34495E',
            fontSize: '12px'
          }
        },
        series: [
          {
            name: '线下',
            type: 'bar',
            stack: '总量',
            data: onlineData,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function (params) {
                  let color = '#0074E4';
                  return color;
                },
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          },
          {
            name: '线上',
            type: 'bar',
            stack: '总量',
            data: offlineData,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function (params) {
                  let color = '#F1C40F';
                  return color;
                },
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#666'
                },
                formatter: function(params) {
                  return numeral(params.value).add(onlineData[params.dataIndex]).value() + '万';
                }
              }
            }
          }
        ]
      };
      this.$refs.chart2.resize({
        height: this.heights2
      });
      this.echartsHeight2 = this.heights2 + 70;
    },
    getBeforeDate90(dateString, rownum) {
      this.$axios.get( '/bi-mobile/api/admin/biNewProductsReport/getNewLevelDetails', {
        params: {
          dateStr: dateString,
          rownum: rownum,
          orderStr: '90'
        },
      }).then(res => {
        let labelRet = [];
        let dataRetOnline = [];
        let dataRetOffline = [];
        let newProdOlAmt30 = [];
        let newProdOlAmt60 = [];
        let newProdOlAmt90 = [];
        let newProdOflAmt30 = [];
        let newProdOflAmt60 = [];
        let newProdOflAmt90 = [];
        if (res.data.length > 0) {
          res.data.forEach((item, index) => {
            labelRet.push(item.mainModel);
            dataRetOnline.push(item.newMtrlOlAmt90);
            dataRetOffline.push(item.newMtrlOflAmt90);
            newProdOlAmt30.push(item.newProdOlAmt30);
            newProdOlAmt60.push(item.newProdOlAmt60);
            newProdOlAmt90.push(item.newProdOlAmt90);
            newProdOflAmt30.push(item.newProdOflAmt30);
            newProdOflAmt60.push(item.newProdOflAmt60);
            newProdOflAmt90.push(item.newProdOflAmt90);
          });
          this.orgObj.labelList = labelRet;
          this.orgObj.dataOnlineList = dataRetOnline;
          this.orgObj.dataOfflineList = dataRetOffline;
          this.setPendingData3(labelRet, dataRetOnline, dataRetOffline, newProdOlAmt30, newProdOlAmt60, newProdOlAmt90, newProdOflAmt30, newProdOflAmt60, newProdOflAmt90);
        } else {
          this.dhsHidden3 = false;
        }
      }).catch(error => {
        this.$message.error('90天前上架：' + (error.message || error.msg));
        this.dhsHidden3 = false;
      });
    },
    setPendingData3(label, onlineData, offlineData, newProdOlAmt30, newProdOlAmt60, newProdOlAmt90, newProdOflAmt30, newProdOflAmt60, newProdOflAmt90) {
      this.heights3 = label.length * 20 + 20;
      const labelWidth = this.getLabelWidth(onlineData, offlineData);
      this.orgOptions3 = {
        tooltip: {
          confine: true,
          formatter(params) {
            if (newProdOlAmt30[params.dataIndex] == 0) {
              newProdOlAmt30[params.dataIndex] = '0.0';
            }
            if (newProdOlAmt60[params.dataIndex] == 0) {
              newProdOlAmt60[params.dataIndex] = '0.0';
            }
            if (newProdOlAmt90[params.dataIndex] == 0) {
              newProdOlAmt90[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt30[params.dataIndex] == 0) {
              newProdOflAmt30[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt60[params.dataIndex] == 0) {
              newProdOflAmt60[params.dataIndex] = '0.0';
            }
            if (newProdOflAmt90[params.dataIndex] == 0) {
              newProdOflAmt90[params.dataIndex] = '0.0';
            }
            if (params.componentIndex == 0) {
              return '线上总额：' + params.data + '万<br/>90天前上架：' + newProdOlAmt90[params.dataIndex] + '万<br/>60天前上架：' + newProdOlAmt60[params.dataIndex] + '万<br/>30天前上架：' + newProdOlAmt30[params.dataIndex] + '万<br/>';
            } else {
              return '线下总额：' + params.data + '万<br/>90天前上架：' + newProdOflAmt90[params.dataIndex] + '万<br/>60天前上架：' + newProdOflAmt60[params.dataIndex] + '万<br/>30天前上架：' + newProdOflAmt30[params.dataIndex] + '万<br/>';
            }
          }
        },
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        grid: {
          top: '10px',
          left: '1%',
          right: labelWidth,
          bottom: '2%',
          containLabel: true,
          height: this.heights3
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          inverse: true,
          type: 'category',
          data: label,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#34495E',
            fontSize: '12px'
          }
        },
        series: [
          {
            name: '线下',
            type: 'bar',
            stack: '总量',
            data: onlineData,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function (params) {
                  let color = '#0074E4';
                  return color;
                },
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          },
          {
            name: '线上',
            type: 'bar',
            stack: '总量',
            data: offlineData,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: function (params) {
                  let color = '#F1C40F';
                  return color;
                },
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#666'
                },
                formatter: function(params) {
                  return numeral(params.value).add(onlineData[params.dataIndex]).value() + '万';
                }
              }
            }
          }
        ]
      };
      this.$refs.chart3.resize({
        height: this.heights3
      });
      this.echartsHeight3 = this.heights3 + 70;
    },
    getDate(dtStr) {
      let dt = new Date(dtStr);
      let month = (dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1);
      let day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
      return month + '月' + day + '日';
    },
    parseNum(num) {
      const reg = /(?=(?!\b)(\d{3})+$)/g;
      return String(num).replace(reg, ',');
    }
  }
};
</script>

<style scoped lang="stylus">
.content_div{
  display: flex;align-items: center;justify-content: center;
}
.content_flex{
  flex:3;display: flex;flex-direction: column;justify-content: center;align-items: center;height: 54px;line-height 26px;
}
/deep/ .van-dialog__header{
  color:#323233;
  font-size :16px;
}
.box {
  background-color: #E7EAEF
  color #bbbbbb
  padding:10px
  overflow scroll
  .content {
    margin-top:10px;
    background-color: #fff;
    // overflow scroll;
    -webkit-overflow-scrolling: touch;
    height:260px;
    border-radius : 5px
    box-shadow: rgb(218, 218, 218) 1px 1px 2px 1px;
    .canvas {
      width: 100%;
    }
  }
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
.col_div{
  display: flex;justify-content: center;flex-direction: column;align-content: center;height:90%;
}
.num_text{
  font-size: 20px;
}
.title_text{
  font-size: 12px;
}
.span_div{
  display: flex;
  justify-content: center;
  align-items: center;
}
.colorRed{
  color:#F04134;
}
.colorGreen{
  color:#00A854;
}
.errorDiv{
  display: flex;justify-content: center;align-items: center;
}
.textBorder{
  border-right: 1px solid #ececec;height:40px;
}
</style>
