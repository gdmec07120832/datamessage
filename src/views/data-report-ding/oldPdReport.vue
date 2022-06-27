<template>
  <div class="box" style="font-family:'Microsoft YaHei';letter-spacing: 1px;">
    <div>
      <div style="display:flex;color: #333333;">
        <div style="display: flex;justify-content: flex-end;font-size: 10px;flex:2;align-items: center;margin-bottom: 5px;">更新时间：{{nowDate}} 8:30 am</div>
      </div>
    </div>
    <div style="background-color: #FFFFFF;margin-bottom: 10px;border-radius : 5px;height:380px;box-shadow: rgb(218, 218, 218) 1px 1px 2px 1px;">
      <div style="background-color: rgb(89,178,178);padding: 10px 10px 10px 15px;color: #ffffff;font-size: 14px;border-top-right-radius: 5px;border-top-left-radius: 5px;">旧品升级概况</div>
      <div style="margin:5px 10px 10px;display: flex;flex-direction: column;">
        <div>
          <div style="display: flex;height: 24px;align-items: center;font-size: 14px;margin-left: -15px;margin-right: -15px;border-radius: 5px;margin-top: 5px;">
            <div style="flex:3;display: flex;align-items: center;color: #333333;padding-left:15px; ">新品销额（万）</div>
            <div style="flex:1;display: flex;justify-content: flex-end;color: #3CA7F8;margin-right: 15px;" @click="getDialog">逻辑说明</div>
          </div>
          <div class="content_div" style="border-bottom: 1px solid #f8f6f6;">
            <div class="content_flex">
              <div class="title_text">30天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldSkuNum.num30 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title" >占比</div>
                <div class="zb_content" style="color:#333333;">{{oldSkuNum.numPercent30 | numTwoFilter}}%</div>
              </div>
            </div>
            <div class="content_flex">
              <div class="title_text">60天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldSkuNum.num60 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title" >占比</div>
                <div class="zb_content" style="color:#333333;">{{oldSkuNum.numPercent60 | numTwoFilter}}%</div>
              </div>
            </div>
            <div class="content_flex">
              <div class="title_text">90天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldSkuNum.num90 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title" >占比</div>
                <div class="zb_content" style="color:#333333;">{{oldSkuNum.numPercent90 | numTwoFilter}}%</div>
              </div>
            </div>
          </div>
          <div style="display: flex;height: 24px;align-items: center;font-size: 14px;margin-left: -15px;border-top-right-radius: 5px;border-top-left-radius: 5px;margin-top: 5px;">
            <div style="flex:2;display: flex;align-items: center;color: #333333;padding-left: 15px;">源系列主型号销额（万）</div>
            <div style="flex:2;display: flex;justify-content: flex-end;color: #3CA7F8;"></div>
          </div>
          <div class="content_div" style="border-bottom: 1px solid #f8f6f6;">
            <div class="content_flex">
              <div class="title_text">30天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldMainSum.num30 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title" >同比</div>
                <div class="zb_content" :class="oldMainSum.numPercent30==0?'':oldMainSum.numPercent30>0?'font_red':'font_greed'">{{oldMainSum.numPercent30 | numTwoFilter}}%</div>
              </div>
            </div>
            <div class="content_flex">
              <div class="title_text" >60天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldMainSum.num60 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title">同比</div>
                <div class="zb_content" :class="oldMainSum.numPercent60==0?'':oldMainSum.numPercent60>0?'font_red':'font_greed'">{{oldMainSum.numPercent60 | numTwoFilter}}%</div>
              </div>
            </div>
            <div class="content_flex">
              <div class="title_text" >90天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldMainSum.num90 | numOneFilter}}</div>
              <div class="zb_div">
                <div class="zb_title">同比</div>
                <div class="zb_content" :class="oldMainSum.numPercent90==0?'':oldMainSum.numPercent90>0?'font_red':'font_greed'">{{oldMainSum.numPercent90 | numTwoFilter}}%</div>
              </div>
            </div>
          </div>
          <div style="display: flex;height: 24px;align-items: center;font-size: 14px;margin-left: -15px;border-top-right-radius: 5px;border-top-left-radius: 5px;margin-top: 5px;">
            <div style="flex:2;display: flex;align-items: center;color: #333333;padding-left: 15px;">系列主型号/SKU（个）</div>
            <div style="flex:2;display: flex;justify-content: flex-end;color: #3CA7F8;"></div>
          </div>
          <div class="content_div">
            <div class="content_flex">
              <div class="title_text">30天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldMainNum.num30}}/{{oldMainNum.numPercent30}}</div>
            </div>
            <div class="content_flex">
              <div class="title_text">60天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldMainNum.num60}}/{{oldMainNum.numPercent60}}</div>
            </div>
            <div class="content_flex">
              <div class="title_text">90天前上架</div>
              <div style="color:#000000;" class="num_text">{{oldMainNum.num90}}/{{oldMainNum.numPercent90}}</div>
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
          <th :width="'16%'" class="tj_th"><span class="tj_span">新品销额</span></th>
          <th :width="'16%'" class="tj_th"><span class="tj_span">新品占比</span></th>
          <th :width="'16%'" class="tj_th"><span class="tj_span">总销额</span></th>
          <th :width="'22%'" class="tj_th"><span class="tj_span">同比</span></th>
        </tr>
        <tr v-for="(item, index) in threeList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'30%'" style="text-align: center;"><span class="tj_span">{{item.mainModel}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.newProdActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.actPriceRate | numTwoFilter}}%</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.actPrice | numOneFilter}}</span></td>
          <td :width="'22%'" style="text-align: center;"><span class="tj_span" :class="[item.rate==0?'':item.rate>0?'font_red':'font_greed']">{{item.rate | numTwoFilter}}%</span></td>
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
        <th :width="'16%'" class="tj_th"><span class="tj_span">新品销额</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">新品占比</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">总销额</span></th>
        <th :width="'22%'" class="tj_th"><span class="tj_span">同比</span></th>
        <tr v-for="(item, index) in sixList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'30%'" style="text-align: center;"><span class="tj_span">{{item.mainModel}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.newProdActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.actPriceRate  | numTwoFilter}}%</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.actPrice | numOneFilter}}</span></td>
          <td :width="'22%'" style="text-align: center;"><span class="tj_span" :class="item.rate==0?'':item.rate>0?'font_red':'font_greed'">{{item.rate | numTwoFilter}}%</span></td>
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
          <van-col><div style="display: flex;align-items: center;font-size: 12px;margin-left: 10px;margin-top: 5px;">({{ninetyDateText}})</div></van-col>
        </van-row>
      </div>
      <table class="tj_table" ref="table3" @click="changeCharts3(chartHidden3)">
        <th :width="'30%'" class="tj_th"><span class="tj_span">系列主型号</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">新品销额</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">新品占比</span></th>
        <th :width="'16%'" class="tj_th"><span class="tj_span">总销额</span></th>
        <th :width="'22%'" class="tj_th"><span class="tj_span">同比</span></th>
        <tr v-for="(item, index) in niceList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'30%'" style="text-align: center;"><span class="tj_span">{{item.mainModel }}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.newProdActPrice | numOneFilter}}</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.actPriceRate | numTwoFilter}}%</span></td>
          <td :width="'16%'" style="text-align: center;"><span class="tj_span">{{item.actPrice | numOneFilter}}</span></td>
          <td :width="'22%'" style="text-align: center;"><span class="tj_span" :class="item.rate==0?'':item.rate>0?'font_red':'font_greed'">{{item.rate | numTwoFilter}}%</span></td>
        </tr>
      </table>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;margin: 10px;" v-if="dhsHidden3"><span @click="changeCharts3(true)" v-if="chartHidden3">点击查看更多</span><span @click="changeCharts3(false)" v-if="!chartHidden3">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden3">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <van-dialog v-model="show" :close-on-click-overlay="true" :show-confirm-button="false" title="逻辑说明">
      <div style="line-height: 20px;color: #646566;margin-bottom: 10px;font-size:12px;padding: 10px 18px;">
        <p style="padding: 3px;">1、源系列/主型号销额：旧品升级源系列/主型号近一月实际售价（剔除未发取消）；</p>
        <p style="padding: 3px;">2、系列/主型号数量：系列/主型号去重计数（剔除零部件）；</p>
        <p style="padding: 3px;">3、SKU数量：子项去重计数（剔除零部件）；</p>
        <p style="padding: 3px;">4、30/60/90天前上架|：上架时间1/2/3月产品；</p>
        <p style="padding: 3px;">5、旧品升级：单品升级性质=升级替换/延伸产品/旧品升级。</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
/* eslint-disable */
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
      // 旧品升级 升级SKU销额
      oldSkuNum: {
        num30: '',
        numPercent30: '',
        num60: '',
        numPercent60: '',
        num90: '',
        numPercent90: ''
      },
      // 旧品升级 主型号总销额
      oldMainSum: {
        num30: '',
        numPercent30: '',
        num60: '',
        numPercent60: '',
        num90: '',
        numPercent90: ''
      },
      // 旧品升级 主型号/SKU数（个）
      oldMainNum: {
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
    this.queryMainSkuSum(this.$route.query.dateString);
    this.queryMainSum(this.$route.query.dateString);
    this.querySkuSum(this.$route.query.dateString);
    this.queryOldSales(this.$route.query.dateString, '5', '30').then((result) => {
      this.threeList = result.data;
    }).then(() => {
      this.echartsHeight1 = this.$refs.table1.offsetHeight + 80;
    });
    this.queryOldSales(this.$route.query.dateString, '5', '60').then((result) => {
      this.sixList = result.data;
    }).then(() => {
      this.echartsHeight2 = this.$refs.table2.offsetHeight + 80;
    });
    this.queryOldSales(this.$route.query.dateString, '5', '90').then((result) => {
      this.niceList = result.data;
    }).then(() => {
      this.echartsHeight3 = this.$refs.table3.offsetHeight + 80;
    });
    this.getChartDateText(this.$route.query.dateString);
  },
  methods: {
    changeCharts1(hidden) {
      if (hidden === true) {
        this.queryOldSales(this.$route.query.dateString, '', '30').then((result) => {
          this.threeList = result.data;
        }).then(() => {
          this.echartsHeight1 = this.$refs.table1.offsetHeight + 80;
        });
        this.chartHidden1 = false;
      } else {
        this.queryOldSales(this.$route.query.dateString, '5', '30').then((result) => {
          this.threeList = result.data;
        }).then(() => {
          this.echartsHeight1 = this.$refs.table1.offsetHeight + 80;
        });
        this.chartHidden1 = true;
      }
    },
    changeCharts2(hidden) {
      console.log('click')
      if (hidden === true) {
        this.queryOldSales(this.$route.query.dateString, '', '60').then((result) => {
          this.sixList = result.data;
        }).then(() => {
          this.echartsHeight2 = this.$refs.table2.offsetHeight + 80;
        });
        this.chartHidden2 = false;
      } else {
        this.queryOldSales(this.$route.query.dateString, '5', '60').then((result) => {
          this.sixList = result.data;
        }).then(() => {
          this.echartsHeight2 = this.$refs.table2.offsetHeight + 80;
        });
        this.chartHidden2 = true;
      }
    },
    changeCharts3(hidden) {
      if (hidden === true) {
        this.queryOldSales(this.$route.query.dateString, '', '90').then((result) => {
          this.niceList = result.data;
        }).then(() => {
          this.echartsHeight3 = this.$refs.table3.offsetHeight + 80;
        });
        this.chartHidden3 = false;
      } else {
        this.queryOldSales(this.$route.query.dateString, '5', '90').then((result) => {
          this.niceList = result.data;
        }).then(() => {
          this.echartsHeight3 = this.$refs.table3.offsetHeight + 80;
        });
        this.chartHidden3 = true;
      }
    },
    // 旧品升级周报,主型号/SKU个数
    queryMainSkuSum(dateString) {
      this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/queryMainSkuSum', {
        params: {
          dateStr: dateString,
          type: 1
        },
        onFail: (error) => {
          this.$message.error('旧品升级周报,主型号/SKU个数：' + error.message);
          this.hideLoading();
        }
      }).then(res => {
        this.oldMainNum.num30 = res.data[30].SPUNUMBER;
        this.oldMainNum.numPercent30 = res.data[30].SKUNUMBER;
        this.oldMainNum.num60 = res.data[60].SPUNUMBER;
        this.oldMainNum.numPercent60 = res.data[60].SKUNUMBER;
        this.oldMainNum.num90 = res.data[90].SPUNUMBER;
        this.oldMainNum.numPercent90 = res.data[90].SKUNUMBER;
      }).catch(error => {
        this.$message.error('旧品升级周报,主型号/SKU个数：' + (error.message || error.msg));
      });
    },
    // 旧品升级周报,主型号销售额
    queryMainSum(dateString) {
      this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/queryMainSum', {
        params: {
          dateStr: dateString
        },
      }).then(res => {
        this.oldMainSum.num30 = res.data[30].MAINACTPRICE;
        this.oldMainSum.numPercent30 = res.data[30].TOTALRATE;
        this.oldMainSum.num60 = res.data[60].MAINACTPRICE;
        this.oldMainSum.numPercent60 = res.data[60].TOTALRATE;
        this.oldMainSum.num90 = res.data[90].MAINACTPRICE;
        this.oldMainSum.numPercent90 = res.data[90].TOTALRATE;
      }).catch(error => {
        this.$message.error('旧品升级周报,主型号/SKU个数：' + (error.message || error.msg));
      });
    },
    // 旧品升级周报,升级SKU销售额
    querySkuSum(dateString) {
      this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/querySkuSum', {
        params: {
          dateStr: dateString
        },
      }).then(res => {
        this.oldSkuNum.num30 = res.data[30].NEWPRODACTPRICE;
        this.oldSkuNum.numPercent30 = res.data[30].TOTALRATE;
        this.oldSkuNum.num60 = res.data[60].NEWPRODACTPRICE;
        this.oldSkuNum.numPercent60 = res.data[60].TOTALRATE;
        this.oldSkuNum.num90 = res.data[90].NEWPRODACTPRICE;
        this.oldSkuNum.numPercent90 = res.data[90].TOTALRATE;
      }).catch(error => {
        this.$message.error('旧品升级周报,主型号销售额：' + (error.message || error.msg));
      });
    },
    // 旧品升级周报
    queryOldSales(dateString, rowNum, week) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/bi-mobile/api/admin/biNewProductsReport/queryOldSales', {
          params: {
            dateStr: dateString,
            period: week,
            rownum: rowNum
          },
        }).then(res => {
          resolve(res);
        }).catch(error => {
          this.$message.error('旧品升级周报：' + (error.message || error.msg));
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
    display: flex;margin-left:10px;
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
      display: flex;
      min-height: 28px;
      // justify-content: center;
      align-items: center;
      font-size: 10px;
      line-height 14px;
      padding-left: 5px;
    }
  }
}
.table_title{
  height: 30px;
  font-size: 12px;
  color: #FFFFFF;
  background-color: rgb(89,178,178);
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
