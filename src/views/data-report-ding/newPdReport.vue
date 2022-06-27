<template>
  <div class="box" style="font-family:'Microsoft YaHei';letter-spacing: 1px;">
    <div>
      <div style="display:flex;color: #333333;">
        <div style="display: flex;justify-content: flex-end;font-size: 10px;flex:2;align-items: center;margin-bottom: 5px;">更新时间：{{nowDate}} 8:30 am</div>
      </div>
    </div>
    <div style="background-color: #FFFFFF;margin-bottom: 10px;border-radius : 5px;height:350px;box-shadow: rgb(218, 218, 218) 1px 1px 2px 1px;">
      <div style="background-color: #007BF7;padding: 10px 10px 10px 15px;color: #ffffff;font-size: 14px;border-top-right-radius: 5px;border-top-left-radius: 5px;">纯新周报</div>
      <div style="margin:5px 10px 10px;display: flex;flex-direction: column;">
        <div>
          <div style="display: flex;height: 24px;align-items: center;font-size: 14px;margin-left: -15px;margin-right: -15px;border-radius: 5px;margin-top: 5px;">
            <div style="flex:3;display: flex;align-items: center;color: #333333;padding-left:15px; ">近三月上架纯新销额汇总（万）</div>
            <div style="flex:1;display: flex;justify-content: flex-end;color: #3CA7F8;margin-right: 15px;" @click="getDialog">逻辑说明</div>
          </div>
          <div class="content_div" style="border-bottom: 1px solid #f8f6f6;">
            <div class="content_flex">
              <div class="title_text">总销额</div>
              <div style="color:#000000;" class="num_text">{{newSkuNum.num30 | numOneFilter}}</div>
            </div>
            <div class="content_flex">
              <div class="title_text">占大盘比</div>
              <div style="color:#000000;" class="num_text">{{newSkuNum.num60 | numTwoFilter}}%</div>
            </div>
            <div class="content_flex">
              <div class="title_text">销额同比</div>
              <div  class="num_text" :class="[newSkuNum.num90==0?'':newSkuNum.num90>0?'font_red':'font_greed']">{{newSkuNum.num90 | numTwoFilter}}%</div>
            </div>
          </div>
          <div style="display: flex;height: 24px;align-items: center;font-size: 14px;margin-left: -15px;border-top-right-radius: 5px;border-top-left-radius: 5px;margin-top: 5px;">
            <div style="flex:2;display: flex;align-items: center;color: #333333;padding-left: 15px;">销额上架分层（万）</div>
            <div style="flex:2;display: flex;justify-content: flex-end;color: #3CA7F8;"></div>
          </div>
          <div class="content_div" style="border-bottom: 1px solid #f8f6f6;">
            <div class="content_flex">
              <div class="title_text">30天前上架</div>
              <div style="color:#000000;" class="num_text">{{newMainSum.num30 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title">占比</div>
                <div class="zb_content">{{newMainSum.numPercent30 | numTwoFilter}}%</div>
              </div>
            </div>
            <div class="content_flex">
              <div class="title_text">60天前上架</div>
              <div style="color:#000000;" class="num_text">{{newMainSum.num60 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title">占比</div>
                <div class="zb_content">{{newMainSum.numPercent60 | numTwoFilter}}%</div>
              </div>
            </div>
            <div class="content_flex">
              <div class="title_text">90天前上架</div>
              <div style="color:#000000;" class="num_text">{{newMainSum.num90 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title">占比</div>
                <div class="zb_content">{{newMainSum.numPercent90 | numTwoFilter}}%</div>
              </div>
            </div>
          </div>
          <div style="display: flex;height: 24px;align-items: center;font-size: 14px;margin-left: -15px;border-top-right-radius: 5px;border-top-left-radius: 5px;margin-top: 5px;">
            <div style="flex:2;display: flex;align-items: center;color: #333333;padding-left: 15px;">系列主型号/SKU（个）</div>
            <div style="flex:2;display: flex;justify-content: flex-end;color: #3CA7F8;"></div>
          </div>
          <div class="content_div" >
            <div class="content_flex">
              <div class="title_text">30天前上架</div>
              <div style="color:#000000;" class="num_text">{{newMainNum.num30}}/{{newMainNum.numPercent30}}</div>
            </div>
            <div class="content_flex">
              <div class="title_text">60天前上架</div>
              <div style="color:#000000;" class="num_text">{{newMainNum.num60}}/{{newMainNum.numPercent60}}</div>
            </div>
            <div class="content_flex">
              <div class="title_text">90天前上架</div>
              <div style="color:#000000;" class="num_text">{{newMainNum.num90}}/{{newMainNum.numPercent90}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight1 +'px;'" >
      <div>
        <van-row type="flex" justify="center" class="table_title">
          <van-col span="24" style="display: flex;margin-left: 15px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;color: #FFFFFF;font-size: 14px;">30天前上架（万）</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col><div style="display: flex;align-items: center;font-size: 12px;margin-left: 10px;margin-top: 5px;">({{thirtyDateText}})</div></van-col>
        </van-row>
      </div>
      <table class="tj_table" ref="table1" @click="changeCharts1(chartHidden1)">
        <tr style="margin-left: -15px;margin-right: -15px;border-radius: 5px;">
          <th :width="'30%'" class="tj_th"><span class="tj_span">系列主型号</span></th>
          <th :width="'16%'" class="tj_th"><span class="tj_span">线上销额</span></th>
          <th :width="'16%'" class="tj_th"><span class="tj_span">线下销额</span></th>
          <th :width="'16%'" class="tj_th"><span class="tj_span">总销额</span></th>
          <th :width="'22%'" class="tj_th"><span class="tj_span">占比</span></th>
        </tr>
        <tr v-for="(item, index) in threeList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'30%'" style="text-align: center;"><span class="tj_span">{{item.mainModel}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.onlineActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.offlineActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.newProdActPrice | numOneFilter}}</span></td>
          <td :width="'22%'" style="text-align: center;"><span class="tj_span">{{item.recentRate | numTwoFilter}}%</span></td>
        </tr>
      </table>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;margin:10px;" v-if="dhsHidden1" ><span @click="changeCharts1(true)" v-if="chartHidden1">点击查看更多</span><span @click="changeCharts1(false)" v-if="!chartHidden1">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden1">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight2 +'px;'">
      <div>
        <van-row type="flex" justify="center" class="table_title">
          <van-col span="24" style="display: flex;margin-left: 15px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;color: #ffffff;font-size: 14px;">60天前上架（万）</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col><div style="display: flex;align-items: center;font-size: 12px;margin-left: 10px;margin-top: 5px;">({{sixtyDateText}})</div></van-col>
        </van-row>
      </div>
      <table class="tj_table" ref="table2" @click="changeCharts2(chartHidden2)">
        <th :width="'30%'" class="tj_th"><span class="tj_span">系列主型号</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">线上销额</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">线下销额</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">总销额</span></th>
        <th :width="'22%'" class="tj_th"><span class="tj_span">占比</span></th>
        <tr v-for="(item, index) in sixList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'30%'" style="text-align: center;"><span class="tj_span">{{item.mainModel}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.onlineActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.offlineActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.newProdActPrice | numOneFilter}}</span></td>
          <td :width="'28%'" style="text-align: center;"><span class="tj_span">{{item.recentRate | numTwoFilter}}%</span></td>
        </tr>
      </table>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;margin: 10px;" v-if="dhsHidden2"><span @click="changeCharts2(true)" v-if="chartHidden2">点击查看更多</span><span @click="changeCharts2(false)" v-if="!chartHidden2">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden2">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight3 +'px;'">
      <div>
        <van-row type="flex" justify="center" class="table_title">
          <van-col span="24" style="display: flex;margin-left: 15px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;color: #FFFFFF;font-size: 14px;">90天前上架（万）</div>
          </van-col>
        </van-row>
        <van-row>
          <van-col><div style="display: flex;align-items: center;font-size:12px;margin-left: 10px;margin-top: 5px;">({{ninetyDateText}})</div></van-col>
        </van-row>
      </div>
      <table class="tj_table" ref="table3" @click="changeCharts3(chartHidden3)">
        <th :width="'30%'" class="tj_th"><span class="tj_span">系列主型号</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">线上销额</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">线下销额</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">总销额</span></th>
        <th :width="'22%'" class="tj_th"><span class="tj_span">占比</span></th>
        <tr v-for="(item, index) in niceList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'30%'" style="text-align: center;"><span class="tj_span">{{item.mainModel}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.onlineActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.offlineActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.newProdActPrice | numOneFilter}}</span></td>
          <td :width="'22%'" style="text-align: center;"><span class="tj_span">{{item.recentRate | numTwoFilter}}%</span></td>
        </tr>
      </table>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;margin: 10px;" v-if="dhsHidden3"><span @click="changeCharts3(true)" v-if="chartHidden3">点击查看更多</span><span @click="changeCharts3(false)" v-if="!chartHidden3">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden3">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <van-dialog v-model="show" :close-on-click-overlay="true" :show-confirm-button="false" title="逻辑说明">
      <div style="padding: 10px;line-height: 20px;color: #646566;margin-bottom: 10px;font-size:12px;padding-left: 18px;padding-right: 18px;">
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
import {Row, Switch, Dialog, Col} from 'vant'
import moment from 'moment';
export default {
  name: 'deliveryReport',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Switch.name]: Switch,
    [Dialog.Component.name]: Dialog.Component
  },
  data () {
    return {
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
      echartsHeight3: '260',
      heights3: '',
      chartHidden3: true,
      // 纯新升级 升级SKU销额
      newSkuNum: {
        num30: '',
        numPercent30: '',
        num60: '',
        numPercent60: '',
        num90: '',
        numPercent90: ''
      },
      // 纯新升级 主型号总销额
      newMainSum: {
        num30: '',
        numPercent30: '',
        num60: '',
        numPercent60: '',
        num90: '',
        numPercent90: ''
      },
      // 纯新升级 主型号/SKU数（个）
      newMainNum: {
        num30: '',
        numPercent30: '',
        num60: '',
        numPercent60: '',
        num90: '',
        numPercent90: ''
      },
      threeList: [],
      sixList: [],
      niceList: [],
      thirtyDateText: '',
      sixtyDateText: '',
      ninetyDateText: ''
    };
  },
  created() {
  },
  filters: {
    numOneFilter (value) {
      if (value.toString().indexOf('.') == -1) {
        value = value + '.0';
      }
      return value;
    },
    numTwoFilter (value) {
      if (value.toString().indexOf('.') == -1) {
        value = value + '.00';
      } else {
        let a = value.toString().split('.');
        if (a.length > 1) {
          if (a[1].length < 2) {
            value = value.toString() + '0';
          }
          return value
        }
      }
      return value;
    }
  },
  mounted() {
    if (!this.$route.query.dateString) {
      this.$message.error('没有指定日期');
    }
    this.queryRecentSum(this.$route.query.dateString);
    this.querySaleDivide(this.$route.query.dateString);
    this.queryMainSkuSum(this.$route.query.dateString);
    this.queryNewSales(this.$route.query.dateString, '5', '30').then((result) => {
      this.threeList = result.data;
    }).then(() => {
      this.echartsHeight1 = this.$refs.table1.offsetHeight + 80;
    });
    this.queryNewSales(this.$route.query.dateString, '5', '60').then((result) => {
      this.sixList = result.data;
    }).then(() => {
      this.echartsHeight2 = this.$refs.table2.offsetHeight + 80;
    });
    this.queryNewSales(this.$route.query.dateString, '5', '90').then((result) => {
      this.niceList = result.data;
    }).then(() => {
      this.echartsHeight3 = this.$refs.table3.offsetHeight + 80;
    });
    this.getChartDateText(this.$route.query.dateString);
  },
  methods: {
    changeCharts1(hidden) {
      if (hidden === true) {
        this.queryNewSales(this.$route.query.dateString, null, '30').then((result) => {
          this.threeList = result.data;
        }).then(() => {
          this.echartsHeight1 = this.$refs.table1.offsetHeight + 80;
        });
        this.chartHidden1 = false;
      } else {
        this.queryNewSales(this.$route.query.dateString, '5', '30').then((result) => {
          this.threeList = result.data;
        }).then(() => {
          this.echartsHeight1 = this.$refs.table1.offsetHeight + 80;
        });
        this.chartHidden1 = true;
      }
    },
    changeCharts2(hidden) {
      if (hidden === true) {
        this.queryNewSales(this.$route.query.dateString, null, '60').then((result) => {
          this.sixList = result.data;
        }).then(() => {
          this.echartsHeight2 = this.$refs.table2.offsetHeight + 80;
        });
        this.chartHidden2 = false;
      } else {
        this.queryNewSales(this.$route.query.dateString, '5', '60').then((result) => {
          this.sixList = result.data;
        }).then(() => {
          this.echartsHeight2 = this.$refs.table2.offsetHeight + 80;
        });
        this.chartHidden2 = true;
      }
    },
    changeCharts3(hidden) {
      if (hidden === true) {
        this.queryNewSales(this.$route.query.dateString, null, '90').then((result) => {
          this.niceList = result.data;
        }).then(() => {
          this.echartsHeight3 = this.$refs.table3.offsetHeight + 80;
        });
        this.chartHidden3 = false;
      } else {
        this.queryNewSales(this.$route.query.dateString, '5', '90').then((result) => {
          this.niceList = result.data;
        }).then(() => {
          this.echartsHeight3 = this.$refs.table3.offsetHeight + 80;
        });
        this.chartHidden3 = true;
      }
    },
    // 纯新升级周报,主型号/SKU个数
    queryMainSkuSum(dateString) {
      this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/queryMainSkuSum', {
        params: {
          dateStr: dateString,
          type: 2
        },
      }).then(res => {
        this.newMainNum.num30 = res.data[30].SPUNUMBER;
        this.newMainNum.numPercent30 = res.data[30].SKUNUMBER;
        this.newMainNum.num60 = res.data[60].SPUNUMBER;
        this.newMainNum.numPercent60 = res.data[60].SKUNUMBER;
        this.newMainNum.num90 = res.data[90].SPUNUMBER;
        this.newMainNum.numPercent90 = res.data[90].SKUNUMBER;
      }).catch(error => {
        this.$message.error('纯新升级周报,主型号/SKU个数：' + (error.message || error.msg));
      });
    },
    // 纯新周报,销售上架分层
    querySaleDivide(dateString) {
      this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/querySaleDivide', {
        params: {
          dateStr: dateString
        },
      }).then(res => {
        this.newMainSum.num30 = res.data[30].NEWPRODACTPRICE;
        this.newMainSum.numPercent30 = res.data[30].RATE;
        this.newMainSum.num60 = res.data[60].NEWPRODACTPRICE;
        this.newMainSum.numPercent60 = res.data[60].RATE;
        this.newMainSum.num90 = res.data[90].NEWPRODACTPRICE;
        this.newMainSum.numPercent90 = res.data[90].RATE;
      }).catch(error => {
        this.$message.error('纯新周报,销售上架分层：' + (error.message || error.msg));
      });
    },
    // 纯新周报,近三月上架纯新销售额
    queryRecentSum(dateString) {
      this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/queryRecentSum', {
        params: {
          dateStr: dateString
        },
      }).then(res => {
        this.newSkuNum.num30 = res.data.NEWPRODACTPRICE;
        this.newSkuNum.num60 = res.data.GRAILRATE;
        this.newSkuNum.num90 = res.data.YEAROVERYEAR;
      }).catch(error => {
        this.$message.error('纯新周报,近三月上架纯新销售额：' + (error.message || error.msg));
      });
    },
    // 纯新升级周报
    queryNewSales(dateString, rowNum, week) {
      return new Promise((resolve) => {
        this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/queryNewSales', {
          url: process.env.VUE_APP_OA_DING_DING_API_URL + '/biNewProductsReport/queryNewSales',
          params: {
            dateStr: dateString,
            period: week,
            rownum: rowNum
          },
        }).then(res => {
            resolve(res);
        }).catch(error => {
          this.$message.error('纯新升级周报：' + (error.message || error.msg));
        });
      });
    },
    getChartDateText(date) {
      this.thirtyDateText = moment(date).subtract(30, 'days').format('YYYY/MM/DD') + '~' + moment(date).subtract(1, 'days').format('YYYY/MM/DD');
      this.sixtyDateText = moment(date).subtract(60, 'days').format('YYYY/MM/DD') + '~' + moment(date).subtract(31, 'days').format('YYYY/MM/DD');
      this.ninetyDateText = moment(date).subtract(90, 'days').format('YYYY/MM/DD') + '~' + moment(date).subtract(61, 'days').format('YYYY/MM/DD');
    },
    getDialog() {
      this.show = true;
    }
  }
};
</script>

<style scoped lang="stylus">
.content_div{
  display: flex;align-items: center;justify-content: center;
}
.content_flex{
  flex:3;display: flex;flex-direction: column;justify-content: center;line-height 26px;padding 5px;
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
  font-size: 18px;
  color: #333333;
}
.title_text{
  font-size: 12px;
  color: #999999;
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
.zb_div{
  display: flex;font-size: 10px;width: 100%;
  .zb_title{
    display: flex;
  }
  .zb_content{
    display: flex;color:#333333;margin-left:10px;
  }
}
.tj_table{
  font-size: 10px;width: 100%;border-collapse: collapse;border-spacing: 0;margin-top 2px;border-radius 5px;
  .tj_th{
    padding: 5px;text-align: center;color:#9c9c9c;
  }
  td{
    color: #333333;
    .tj_span{
      display: flex;
      min-height: 28px;
      // justify-content: center;
      align-items: center;
      font-size: 12px;
      word-break:break-all;
      padding-left: 10px;
    }
  }
  th{
    color: #333333;
    .tj_span{
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
.table_title{
  height: 30px;
  font-size: 12px;
  color: #FFFFFF;
  background-color: #007BF7;
  border-top-right-radius: 5px;border-top-left-radius: 5px;
  display: flex;
  align-items: center;
}
.tr_bg{
  background-color: #F5FAFF;
}
.font_red{
  color: red;
}
.font_greed{
  color: #16d153;
}
</style>

