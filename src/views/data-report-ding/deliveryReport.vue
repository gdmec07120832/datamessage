<template>
  <div class="box" style="font-family:'Microsoft YaHei'">
    <div>
      <van-row type="flex" justify="center" style="height:20px;font-size: 0.8rem;color: #313131;">
        <van-col span="24">
          <div style="display: flex;justify-content: flex-end;">更新时间：{{nowDate}} 8:30 am</div>
        </van-col>
      </van-row>
    </div>
    <div style="background-color: #FFFFFF;margin-bottom: 10px;border-radius : 5px;height:180px;">
      <van-row type="flex"  style="height:90px;padding-top: 10px;" justify="center">
        <van-col span="7" class="span_div">
          <div class="col_div">
            <div class="num_text" style="color:#396FFF;">{{form.sendTargetStr}}亿</div>
            <div class="title_text">当月目标</div>
          </div>
        </van-col>
        <van-col span="1" class="span_div">
          <div class="textBorder" >
          </div>
        </van-col>
        <van-col span="7" class="span_div">
          <div class="col_div">
            <div class="num_text" style="color:#396FFF;">{{form.sendAmtStr}}亿</div>
            <div class="title_text">累计发货</div>
          </div>
        </van-col>
        <van-col span="1" class="span_div">
          <div class="textBorder" >
          </div>
        </van-col>
        <van-col span="7" class="span_div">
          <div class="col_div">
            <div class="num_text" v-bind:class="{colorRed: form.achievementRate>=100,colorGreen:form.achievementRate<100}">{{form.achievementRate}}%</div>
            <div class="title_text" >累计达成</div>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" style="height:90px;">
        <van-col span="7" class="span_div">
          <div class="col_div">
            <div class="num_text" style="color:#396FFF;">{{form.dailySurplusTargetStr}}万</div>
            <div class="title_text">剩余日均目标</div>
          </div>
        </van-col>
        <van-col span="1" class="span_div">
          <div class="textBorder" >
          </div>
        </van-col>
        <van-col span="7" class="span_div">
          <div class="col_div">
            <div class="num_text" style="color:#396FFF;">{{form.sendLastAmtStr}}万</div>
            <div class="title_text">昨日发货</div>
          </div>
        </van-col>
        <van-col span="1" class="span_div">
          <div class="textBorder" >
          </div>
        </van-col>
        <van-col span="7" class="span_div">
          <div class="col_div">
            <div class="num_text"  v-bind:class="{colorRed: form.amtYoy>=0,colorGreen:form.amtYoy<0}">{{form.amtYoy}}%</div>
            <div class="title_text">累计同增</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="tipsBody">
      <div style="font-size: 12px;margin-bottom: 10px;"><span v-html="form.orderPoolStatus"></span></div>
      <div style="font-size: 12px;"><span v-html="form.sendCadence"></span></div>
    </div>
    <div class="content">
      <div>
        <van-row type="flex" justify="center" style="height:20px;font-size: 0.7rem;color: #313131;padding-top:10px;margin-bottom: 5px;">
          <van-col span="12" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;">最近7天待货审金额</div>
          </van-col>
          <van-col span="12" style="display: flex;align-items: center;justify-content: flex-end;margin-right: 10px;">
            <div style="display: flex;align-items: center;">本月总待货审：{{orgObj.totAmtThisMonStr}}万</div>
          </van-col>
        </van-row>
      </div>
      <chart class="canvas" ref="chart1" :options="orgOptions" :auto-resize="true" v-if="dhsHidden"></chart>
      <div class="errorDiv" v-if="!dhsHidden">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>

    </div>
    <div class="content" style="margin-top: 10px;height:275px;">
      <div>
        <van-row type="flex" justify="center" align="center" style="height:20px;font-size: 0.7rem;color: #313131;padding-top:10px;">
          <van-col span="12" style="display: flex;margin-left: 10px;align-items: center;justify-content: flex-start;">
            <div style="display: flex;align-items: center;">7天内两库-匹配率
            </div>
          </van-col>
          <van-col span="12" style="display: flex;align-items: center;justify-content: flex-end;margin-right: 10px;" @click="getDialog">
            <div style="display: flex;align-items: center;color: #1296db;" >
              逻辑说明
            </div>
          </van-col>
        </van-row>
      </div>
      <chart class="canvas" ref="chart2" :options="option" :auto-resize="true" v-if="pplHidden" style="margin-top:5px;"></chart>
      <div class="errorDiv" v-if="!pplHidden">
        <img  src="~@/assets/network-error.png" height="220" width="220">
      </div>
    </div>
    <van-dialog v-model="show" :close-on-click-overlay="true" :show-confirm-button="false" title="逻辑说明">
      <div style="line-height: 20px;color: #646566;margin-bottom: 10px;font-size:14px;padding: 10px 18px;">
        <p style="padding: 3px;">1.订单匹配率 = 当期无欠货商品的批次金额/当期待货审批次总金额（衡量欠货对订单的影响）</p>
        <p style="padding: 3px;">2.总仓:成品仓+青岛仓+生活馆仓</p>
        <p style="padding: 3px;">3.总仓&供应仓:成品仓+青岛仓+生活馆仓+供方仓</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import Chart from 'vue-echarts'
import {Row, Switch, Dialog, Col} from 'vant'
import 'echarts';
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
      dhsHidden: true,
      pplHidden: true,
      form: {
        sendTargetStr: 0, // 当月目标
        sendAmtStr: 0, // 累计发货
        sendLastAmtStr: 0, // 昨天业绩
        achievementRate: 0, // 当月目标
        amtYoy: 0, // 当月目标
        dailySurplusTargetStr: 0, // 当月目标
        orderPoolStatus: '',
        sendCadence: '',
        valueaa: ''
      },
      orgObj: {
        labelList: [],
        dataList: [],
        totAmtThisMon: 0,
        totAmtThisMonStr: 0
      },
      matchObj: {
        labelList: [],
        jjDataList: [],
        lkDataList: []
      },
      orgOptions: {},
      option: {}
    };
  },
  created() {

  },
  mounted() {
    if (this.$route.query.dateString !== '') {
      this.getData(this.$route.query.dateString);
    } else {
      this.$message.error('没有指定日期');
    }
  },
  methods: {
    getData(dateString) {
      this.nowDate = this.getDate(dateString);
      this.$axios.get('/bi-mobile/api/admin/biDeliveryReport/getBaseData', {
        params: { dateStr: dateString },
      }).then(res => {
        res.data.sendLastAmtStr = this.parseNum(res.data.sendLastAmtStr);
        res.data.dailySurplusTargetStr = this.parseNum(res.data.dailySurplusTargetStr);
        res.data.sendCadence = res.data.sendCadence.replace('#imgexp', '<span style="vertical-align: text-bottom"><i class="van-icon van-icon-warning" style="vertical-align: middle;color: red;font-size: 14px;margin-right: 2px;"></i></span>');
        res.data.orderPoolStatus = res.data.orderPoolStatus.replace('#imgexp', '<span style="vertical-align: text-bottom"><i class="van-icon van-icon-warning" style="vertical-align: middle;color: red;font-size: 14px;margin-right: 2px;"></i></span>');
        res.data.sendCadence = res.data.sendCadence.replace('#imgcheck', '<span style="vertical-align: text-bottom"><i class="van-icon van-icon-checked" style="vertical-align: middle;color: #2ab02a;font-size: 14px;margin-right: 2px;"></i></span>');
        res.data.orderPoolStatus = res.data.orderPoolStatus.replace('#imgcheck', '<span style="vertical-align: text-bottom"><i class="van-icon van-icon-checked" style="vertical-align: middle;color: #2ab02a;font-size: 14px;margin-right: 2px;"></i></span>');
        this.form = res.data;
      }).catch(error => {
        this.$message.error('发货数据' + (error.message || error.msg));
      });
      this.$axios.get('/bi-mobile/api/admin/biDeliveryReport/getBiPendingTrial', {
        params: { dateStr: dateString },
      }).then(res => {
        let labelRet = [];
        let dataRet = [];
        if (res.data.length > 0) {
          res.data.forEach((item, index) => {
            labelRet.push(item.commitTime);
            dataRet.push(item.waitGoogdsAudAmt);
            if (index === 0) {
              this.orgObj.totAmtThisMonStr = item.totAmtThisMonStr;
            }
          });
          this.orgObj.labelList = labelRet;
          this.orgObj.dataList = dataRet;
          this.setPendingData();
        } else {
          this.dhsHidden = false;
        }
      }).catch(error => {
        this.$message.error('最近7天待货审异常：' + (error.message || error.msg));
        this.dhsHidden = false;
      });
      this.$axios.get('/bi-mobile/api/admin/biDeliveryReport/getMatchingRate', {
        params: { dateStr: dateString },
      }).then(res => {
        let labelRet = [];
        let jjdataRet = [];
        let lkdataRet = [];
        if (res.data.length > 0) {
          res.data.forEach((item, index) => {
            labelRet.push(item.dateStr);
            jjdataRet.push(item.jjRate);
            lkdataRet.push(item.lkRate);
          });
          this.matchObj.labelList = labelRet;
          this.matchObj.jjDataList = jjdataRet;
          this.matchObj.lkDataList = lkdataRet;
          this.setMatchData();
        } else {
          this.pplHidden = false;
        }
      }).catch(error => {
        this.$message.error('匹配率异常：' + (error.message || error.msg));
        this.pplHidden = false;
      });
    },
    getDialog() {
      this.show = true;
    },
    setPendingData() {
      this.orgOptions = {
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        color: ['#004DD6'],
        grid: {
          top: '25px',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          height: '200px'
        },
        xAxis: [
          {
            type: 'category',
            data: this.orgObj.labelList,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#7F7F7F',
              fontSize: '12px'
            },
            nameTextStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 万',
              color: '#7F7F7F',
              fontSize: '12px'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f1f1f1'
              }
            },
            nameTextStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          }
        ],
        series: [
          {
            name: '待货审金额',
            type: 'bar',
            barWidth: '40%',
            data: this.orgObj.dataList,
            label: {
              normal: {
                position: 'top',
                show: true,
                formatter: '{c}',
                color: '#313131',
                fontSize: '12px'
              }

            }
          }
        ]
      };
    },
    setMatchData() {
      this.option = {
        title: {
          text: ''
        },
        textStyle: {
          fontFamily: 'Microsoft YaHei'
        },
        legend: {
          data: ['总仓', '总仓&供应仓'],
          selectedMode: false
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.matchObj.labelList,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#7F7F7F',
            fontSize: '12px'
          },
          nameTextStyle: {
            fontFamily: 'Microsoft YaHei'
          }
        },
        yAxis: [
          {
            type: 'value',
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
              show: true,
              lineStyle: {
                color: '#f1f1f1'
              }
            },
            nameTextStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          }
        ],
        series: [
          {
            name: '总仓',
            type: 'line',
            color: '#004DD6',
            data: this.matchObj.jjDataList,
            smooth: true,
            radius: '30%',
            label: {
              normal: {
                position: 'top',
                show: true,
                formatter: '{c}%',
                color: '#313131',
                fontSize: '12px'
              }

            }
          },
          {
            name: '总仓&供应仓',
            type: 'line',
            data: this.matchObj.lkDataList,
            color: '#FF7F0E',
            smooth: true,
            radius: '30%',
            label: {
              normal: {
                position: 'top',
                show: true,
                formatter: '{c}%',
                color: '#313131',
                fontSize: '12px'
              }

            }
          }
        ]
      };
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
/deep/ .van-dialog__header{
  color:#323233;
  font-size :16px;
}
.box {
  background-color: #e1eef4
  color #bbbbbb
  padding:10px
  overflow scroll
  .content {
    background-color: #fff;
    // overflow scroll;
    -webkit-overflow-scrolling: touch;
    height:260px;
    border-radius : 5px
    .canvas {
      width: 100%;
      height: 250px;
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
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
}
.title_text{
  height: 35px;display: flex;justify-content: center;font-size: 0.7rem;color:#313131;padding-top: 5px;
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
  height:100%;width: 100%;display: flex;justify-content: center;align-items: center;
}
.textBorder{
  border-right: 1px solid #ececec;height:40px;
}
/deep/ .van-row--flex {
  display: flex;
  flex-wrap: unset;
}
.tipsBody{
  background-color: #FFFFFF;padding: 10px;margin-bottom: 10px;border-radius: 10px;color: #333333;line-height: 18px;
  span{
    vertical-align:middle
  }
  img{
    vertical-align:middle
  }
}
</style>

