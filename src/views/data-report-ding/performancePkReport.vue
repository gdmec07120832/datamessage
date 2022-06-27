<template>
  <div class="box" style="font-family:'Microsoft YaHei';letter-spacing: 1px;">
    <div>
      <div style="display:flex;color: #333333;align-items: center;">
        <div style="font-size: 10px;align-items: center;margin-bottom: 5px;display: flex;"><span style="font-size: 14px;">双十一区域PK</span><span style="margin-left: 10px;color: #7F7F7F;">当前阶段：{{southData.STAGE}}</span></div>
        <div style="display: flex;justify-content: flex-end;font-size: 10px;flex:2;align-items: center;margin-bottom: 5px;">更新时间：{{nowDate}} 8:30 am</div>
      </div>
    </div>
    <div style="background-color: #FFFFFF;margin-bottom: 10px;border-radius : 5px;height:215px;box-shadow: rgb(218, 218, 218) 1px 1px 2px 1px;">
      <van-row type="flex" justify="center" class="table_title">
        <van-col span="24" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
          <div style="display: flex;align-items: center;color: #FFFFFF;font-size: 12px;">南北区情况</div>
        </van-col>
      </van-row>
      <div class="head_div">
        <div class="head_content">
          <div class="head_content_one">
            <div class="head_content_one_title" >南区总达成</div>
            <div class="head_content_one_text">{{southData.TOT_FIN_RATE}}%</div>
          </div>
          <div class="border_grey" ></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{southData.PTD_AUDIT_RATE}}%</div>
            <div class="head_content_two_title">结余达成</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{southData.PTD_STAGE_RATE}}%</div>
            <div class="head_content_two_title">蓄水达成</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two" >
            <div class="head_content_two_content" >{{southData.PTD_WP_RATE}}%</div>
            <div class="head_content_two_title" >网拍达成</div>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: center;"><div style="border-bottom: 1px solid #ececec;width: 98%;"></div></div>
      <div class="head_div">
        <div class="head_content">
          <div class="head_content_one">
            <div class="head_content_one_title" >北区总达成</div>
            <div class="head_content_one_text">{{northData.TOT_FIN_RATE}}%</div>
          </div>
          <div class="border_grey" ></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{northData.PTD_AUDIT_RATE}}%</div>
            <div class="head_content_two_title">结余达成</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two">
            <div class="head_content_two_content">{{northData.PTD_STAGE_RATE}}%</div>
            <div class="head_content_two_title">蓄水达成</div>
          </div>
          <div class="border_grey"></div>
          <div class="head_content_two" >
            <div class="head_content_two_content" >{{northData.PTD_WP_RATE}}%</div>
            <div class="head_content_two_title" >网拍达成</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight1 +'px;'" >
      <div>
        <van-row type="flex" justify="center" class="table_title">
          <van-col span="24" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
            <div style="flex:3;display: flex;align-items: center;color: #FFFFFF;font-size: 12px;">大区完成情况</div>
          </van-col>
        </van-row>
      </div>
      <table class="tj_table" ref="table1" @click="changeCharts1(chartHidden1)">
        <tr style="margin-left: -15px;margin-right: -15px;border-radius: 5px;">
          <th :width="'22%'" class="tj_th"><span class="tj_span">大区</span></th>
          <th :width="'18%'" class="tj_th"><span class="tj_span">总达成</span></th>
          <th :width="'19%'" class="tj_th"><span class="tj_span">结余达成</span></th>
          <th :width="'19%'" class="tj_th"><span class="tj_span">蓄水达成</span></th>
          <th :width="'22%'" class="tj_th"><span class="tj_span">网拍达成</span></th>
        </tr>
        <tr v-for="(item, index) in threeList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'22%'" style="text-align: center;"><span class="tj_span">{{item.areaName}}</span></td>
          <td :width="'18%'" style="text-align: center;"><span class="tj_span">{{item.totFinRate | numOneFilter}}%</span></td>
          <td :width="'19%'" style="text-align: center;"><span class="tj_span">{{item.ptdAuditRate | numOneFilter}}%</span></td>
          <td :width="'19%'" style="text-align: center;"><span class="tj_span">{{item.ptdStageRate | numOneFilter}}%</span></td>
          <td :width="'22%'" style="text-align: center;"><span class="tj_span">{{item.ptdWpRate | numTwoFilter}}%</span></td>
        </tr>
      </table>
      <div class="errorDiv" v-if="!dhsHidden1">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <div class="content" :style="'height:'+ echartsHeight2 +'px;'">
      <div>
        <van-row type="flex" justify="center" class="table_title">
          <van-col span="24" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;color: #FFFFFF;font-size: 12px;">片区完成情况</div>
          </van-col>
        </van-row>
      </div>
      <table class="tj_table" ref="table2" @click="changeCharts2(chartHidden2)">
        <th :width="'22%'" class="tj_th"><span class="tj_span">片区</span></th>
        <th :width="'18%'" class="tj_th"><span class="tj_span">总达成</span></th>
        <th :width="'19%'" class="tj_th"><span class="tj_span">结余达成</span></th>
        <th :width="'19%'" class="tj_th"><span class="tj_span">蓄水达成</span></th>
        <th :width="'22%'" class="tj_th"><span class="tj_span">网拍达成</span></th>
        <tr v-for="(item, index) in sixList" :key="index" :class="{'tr_bg':index % 2 === 0}">
          <td :width="'22%'" style="text-align: center;"><span class="tj_span">{{item.areaName}}</span></td>
          <td :width="'18%'" style="text-align: center;"><span class="tj_span">{{item.totFinRate | numOneFilter}}%</span></td>
          <td :width="'19%'" style="text-align: center;"><span class="tj_span">{{item.ptdAuditRate | numOneFilter}}%</span></td>
          <td :width="'19%'" style="text-align: center;"><span class="tj_span">{{item.ptdStageRate | numOneFilter}}%</span></td>
          <td :width="'22%'" style="text-align: center;"><span class="tj_span">{{item.ptdWpRate | numTwoFilter}}%</span></td>
        </tr>
      </table>
      <div style="height: 20px;font-size: 12px;display: flex;color: #A2B6CD;justify-content: center;margin: 10px;" v-if="dhsHidden2"><span @click="changeCharts2(true)" v-if="chartHidden2">点击查看更多</span><span @click="changeCharts2(false)" v-if="!chartHidden2">点击收起</span></div>
      <div class="errorDiv" v-if="!dhsHidden2">
        <img  src="~@/assets/network-error.png" height="220" width="220">
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
/* eslint-disable */
import {Row, Switch, Dialog, Col} from 'vant'
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
      // 南区
      northData: {
        LOAD_TIME: '',
        PTD_AUDIT_RATE: 0,
        PTD_STAGE_RATE: 0,
        PTD_WP_RATE: 0,
        SN_AREA_NAME: '',
        STAGE: '',
        STAGE_NAME: '',
        TDATE: '',
        TOT_FIN_RATE: 0
      },
      // 北区
      southData: {
        LOAD_TIME: '',
        PTD_AUDIT_RATE: 0,
        PTD_STAGE_RATE: 0,
        PTD_WP_RATE: 0,
        SN_AREA_NAME: '',
        STAGE: '',
        STAGE_NAME: '',
        TDATE: '',
        TOT_FIN_RATE: 0
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
      // if (value.toString().indexOf('.') == -1) {
      //     value = value + '.0';
      // }
      return value;
    },
    numTwoFilter (value) {
      // if (value.toString().indexOf('.') == -1) {
      //     value = value + '.00';
      // } else {
      //     let a = value.toString().split('.');
      //     if (a.length > 1) {
      //         if (a[1].length < 2) {
      //             value = value.toString() + '0';
      //         }
      //         return value
      //     }
      // }
      return value;
    }
  },
  mounted() {
    if (!this.$route.query.dateString) {
      this.$message.error('没有指定日期');
    }
    this.querySumRate(this.$route.query.dateString);
    this.queryAreaMes(this.$route.query.dateString, '').then((result) => {
      this.threeList = result.data;
    }).then(() => {
      this.echartsHeight1 = this.$refs.table1.offsetHeight + 40;
    });
    this.queryRegionMes(this.$route.query.dateString, '5').then((result) => {
      this.sixList = result.data;
    }).then(() => {
      this.echartsHeight2 = this.$refs.table2.offsetHeight + 70;
    });
  },
  methods: {
    changeCharts1(hidden) {
      this.queryAreaMes(this.$route.query.dateString, '').then((result) => {
        this.threeList = result.data;
      }).then(() => {
        this.echartsHeight1 = this.$refs.table1.offsetHeight + 40;
      });
    },
    changeCharts2(hidden) {
      if (hidden === true) {
        this.queryRegionMes(this.$route.query.dateString, '').then((result) => {
          this.sixList = result.data;
        }).then(() => {
          this.echartsHeight2 = this.$refs.table2.offsetHeight + 70;
        });
        this.chartHidden2 = false;
      } else {
        this.queryRegionMes(this.$route.query.dateString, '5').then((result) => {
          this.sixList = result.data;
        }).then(() => {
          this.echartsHeight2 = this.$refs.table2.offsetHeight + 70;
        });
        this.chartHidden2 = true;
      }
    },
    // 南北区总完成率
    querySumRate(dateString) {
      this.$axios.get('/bi-mobile/api/user/biDeliveryReport/querySumRate', {
        params: {
          dateStr: dateString
        }
      }).then(res => {
        if (res.data.northData) {
          this.northData = res.data.northData
        }
        if (res.data.southData) {
          this.southData = res.data.southData
        }
      }).catch(error => {
        this.$message.error('纯新周报,近三月上架纯新销售额：' + (error.message || error.msg));
      })
    },
    // 片区完成情况
    queryRegionMes(dateString, rowNum) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/bi-mobile/api/admin/biDeliveryReport/queryRegionMes', {
          params: {
            dateStr: dateString,
            rownum: rowNum
          },
        }).then(res => {
          resolve(res);
        }).catch(error => {
          this.$message.error('片区完成情况：' + (error.message || error.msg));
        });
      });
    },
    // 大区完成情况
    queryAreaMes(dateString, rowNum) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/bi-mobile/api/admin/biDeliveryReport/queryAreaMes', {
          url: process.env.VUE_APP_OA_DING_DING_API_URL + '/biDeliveryReport/queryAreaMes',
          params: {
            dateStr: dateString,
            rownum: rowNum
          },
        });
      }).then(res => {
        resolve(res);
      }).catch(error => {
        this.$message.error('大区完成情况：' + (error.message || error.msg));
      });
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
.head_div{
  display: flex;
  width: 100%;
  .head_content{
    display: flex;
    height: 90px;
    align-items: center;
    width: 100%;
    .head_content_one{
      height: 80px;
      flex: 3 1 0%;
      padding-left: 10px;
      .head_content_one_title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 36px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(49, 49, 49);
      }
      .head_content_one_text{
        font-size: 26px;
        color: rgb(57, 111, 255);
        margin-top: 8px;
      }
    }
    .head_content_two{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 2 1 0%;
      margin-top: 18px;
      .head_content_two_content{
        height: 26px;
        line-height: 24px;
        color: rgb(57, 111, 255);
      }
      .head_content_two_title{
        height: 26px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(49, 49, 49);
      }
    }
  }
}
.border_grey{
  border-left: 1px solid #ececec;height: 40px;display: flex;margin-top: 18px;
}
</style>

