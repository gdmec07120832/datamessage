<template>
  <div>
    <div class="table-box">
      <div class="top-content clearfix" style="padding: 0px;">
        <div class="title fl" style="margin-left: 0px;width:100%;">
          <span style="font-weight: normal;font-size: 12px;color: #969696;float: right;line-height: 22px;">更新时间：{{this.dateTime}}</span></div>
        <!-- <div class="time fr">{{ dateTime }}</div> 新零售概览日报-->
        <!-- <div class="time fr">{{ '未发取消目标、净业绩目标' }}</div> -->
      </div>


      <!-- 核心指标开始 -->
      <div class="pay_retail">
        <div class="pay_retail_title" style="background: #1E90FF;border-top-right-radius: 6px;border-top-left-radius: 6px;">
          <p style="padding: 8px 15px;margin: 0px;font-size: 14px;color: #fff;">整体概况</p>
        </div>

        <ul class="pay_retail_cont">
          <li v-for="(item,key) in dataMsg" :key="key">
            <div style="margin-left: 5px;margin-right: 5px;" :style="{'border-top':(key==0)?'':'1px solid #ddd'}">
              <div class="pay_retail_cont_title">
                <p style="font-size: 14px;padding: 10px;margin: 0px;float: left;">{{item.num}}</p>
                <p v-if="key==2" style="font-size: 12px;padding: 10px;margin: 0px;float: right;color:#C0C0C0;">
                  ▲{{(item.activity_name=='无蓄水')?'当期'+item.activity_name+'活动':(item.mon_target==0)?item.activity_name+'，期间无蓄水目标要求':item.activity_name}}
                </p>
                <div style="clear: both;"></div>
              </div>
              <!-- item.activity_name!='无蓄水' -->
              <ul v-if="item.activity_name!='无蓄水'" class="pay_retail_cont_text"> 
                <li style="border:0px;line-height: 45px;font-size: 16px;" 
                  :style="{'color':(item.num=='留资有效跟进'||item.num=='留资成交转化'||item.rate==0)?'#000000':(item.rate>100)?'#FF0000':'#008000'}">
                  <p>{{(item.rate==0)?'--':(item.rate+'%')}}</p></li>

                <li><p>{{(item.mon_target==0)?'--':(fomatMoney(item.mon_target)+((item.num=='留资有效跟进'||item.num=='留资成交转化'||item.num=='留资数量达成')?'':'万'))}}</p> 
                  <p class="pay_retail_cont_p">{{item.mon_tagname}}</p></li>

                <li><p>{{(item.mon_pay==0)?'--':(fomatMoney(item.mon_pay)+((item.num=='留资有效跟进'||item.num=='留资数量达成')?'':(item.num=='留资成交转化')?'%':'万'))}}</p> 
                  <p class="pay_retail_cont_p">{{item.mon_payname}}</p></li>

                <li><p>{{(item.yesterday_pay==0)?'--':(fomatMoney(item.yesterday_pay)+((item.num=='留资成交转化'||item.num=='留资数量达成')?'':(item.num=='留资转化-近60天')?'%':'万'))}}</p> 
                  <p class="pay_retail_cont_p">{{item.yesterday_payname}}</p></li>
                <li>
                  <p :style="{'color':(item.num=='留资有效跟进'||item.num=='留资成交转化'||item.yesterday_rate==0)?'#000000':(item.yesterday_rate>=100)?'#FF0000':'#008000'}">
                    {{(item.yesterday_rate==0)?'--':(fomatMoney(item.yesterday_rate)+((item.num=='留资有效跟进')?'':(item.num=='留资成交转化')?'万':'%'))}}</p> 
                  <p class="pay_retail_cont_p">{{item.yesterday_ratename}}</p>
                </li>
              </ul>  
              <div style="clear: both;"></div>                          
            </div>
          </li>

        </ul>

      </div>
      <!-- 核心指标结束 -->




      <div class="pay_retail_title" style="background: #1E90FF;border-top-right-radius: 6px;border-top-left-radius: 6px;margin-top: 10px;">
        <p style="padding: 8px 15px;margin: 0px;font-size: 14px;color: #fff;">关键指标趋势</p>
      </div>    
      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>近30天支付业绩</div>
      </div>
      <div class="performance" ref="chart7Visitor"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div style="backgroundcolor: #f6ac38"></div>
        <div>各平台留资结构</div>
      </div>
      <div class="performance" style="border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;" ref="chart7Pay"></div>



      <div class="pay_retail_title" style="background: #1E90FF;border-top-right-radius: 6px;border-top-left-radius: 6px;margin-top: 10px;">
        <p style="padding: 8px 15px;margin: 0px;font-size: 14px;color: #fff;">货品支付结构</p>
      </div>
      <!-- <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>货品销售结构</div>
      </div> -->
      <div style="background-color: #fff;padding-top: 10px;padding-bottom: 20px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;">
        <ul class="amt_table_css">
          <li class="amt_title">
            <ul class="amt_table_css_ul">
              <li>日期</li>
              <li>A货</li>
              <li>B货</li>
              <li>C货</li>
              <li>D货</li>
            </ul>
            <div style="clear: both;"></div>            
          </li>

          <li 
              style="line-height: 30px;"
              :style="{'font-weight': 'bold','background-color': ''}"
            class="amt_cont">
            
            <ul class="amt_table_css_ul">
              <li>{{(dataMsg_table_month.DATA_TYPE||0)}}</li>
              <li>{{(dataMsg_table_month.ACT_PRICE==0||dataMsg_table_month.ACT_PRICE==null)?0:
                  (((dataMsg_table_month.A_ACT_PRICE/dataMsg_table_month.ACT_PRICE)*100).toFixed(1)+'%')}}</li>
              <li>{{(dataMsg_table_month.ACT_PRICE==0||dataMsg_table_month.ACT_PRICE==null)?0:
                  (((dataMsg_table_month.B_ACT_PRICE/dataMsg_table_month.ACT_PRICE)*100).toFixed(1)+'%')}}</li>
              <li>{{(dataMsg_table_month.ACT_PRICE==0||dataMsg_table_month.ACT_PRICE==null)?0:
                  (((dataMsg_table_month.C_ACT_PRICE/dataMsg_table_month.ACT_PRICE)*100).toFixed(1)+'%')}}</li>
              <li>{{(dataMsg_table_month.ACT_PRICE==0||dataMsg_table_month.ACT_PRICE==null)?0:
                  (((dataMsg_table_month.D_ACT_PRICE/dataMsg_table_month.ACT_PRICE)*100).toFixed(1)+'%')}}</li>
            </ul>
            <div style="clear: both;"></div>
          </li>

          <li v-for="(val, key) in dataMsg_table.slice(0,ShowRowsData.rows)"
              :key="key"  
              style="line-height: 30px;"
              :style="{'font-weight': '','background-color': (key%2==0)?'rgba(	225,255,255,0.3)':''}"
            class="amt_cont">

            <ul class="amt_table_css_ul">
              <li>{{(val.USERTIME)}}</li>
              <li>{{(val.ACT_PRICE==0||val.ACT_PRICE==null)?0:(((val.A_ACT_PRICE/val.ACT_PRICE)*100).toFixed(1)+'%')}}</li>
              <li>{{(val.ACT_PRICE==0||val.ACT_PRICE==null)?0:(((val.B_ACT_PRICE/val.ACT_PRICE)*100).toFixed(1)+'%')}}</li>
              <li>{{(val.ACT_PRICE==0||val.ACT_PRICE==null)?0:(((val.C_ACT_PRICE/val.ACT_PRICE)*100).toFixed(1)+'%')}}</li>
              <li>{{(val.ACT_PRICE==0||val.ACT_PRICE==null)?0:(((val.D_ACT_PRICE/val.ACT_PRICE)*100).toFixed(1)+'%')}}</li>
            </ul>
            <div style="clear: both;"></div>
          </li>

          <li v-if="dataMsg_table.length>6">
            <div style="text-align: center;font-size: 12px;margin-top: 10px;color: #B0C4DE;" @click="ShowRows()">{{ShowRowsData.Text}}</div>
          </li>

          <!-- 点击收起 -->

        </ul>

      </div>
     


      <!--<div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7天手淘推荐访客</div>
      </div>
      <div class="performance" ref="chart7Recommend"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7天商品访客数</div>
      </div>
      <div class="performance" ref="chart7Goods"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7天商品访客/全店访客</div>
      </div>
      <div class="performance" ref="chart7GoodsAll"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7天加购人数</div>
      </div>
      <div class="performance" ref="chart7Purchase"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7天大件加购率</div>
      </div>
      <div class="performance" ref="chart7BigGoods"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7天小件加购率</div>
      </div>
      <div class="performance" ref="chart7SmallGoods"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7天未发取消</div>
      </div>
      <div class="performance" ref="chart7Cancel"></div> -->

    </div>
  </div>
</template>

<script>
/* eslint-disable */

import E from "echarts";

// import E from "echarts/lib/echarts";
// import "echarts/lib/chart/line";
// import "echarts/lib/chart/bar";
// import "echarts/lib/component/legend";
// import "echarts/lib/component/tooltip";

export default {
  name: "moneyTable",
  data() {
    return {
      // time:new Date().toLocaleString(),
      test_time:'',
      view_time:'',
      ShowRowsData:{
        rows:6,
        OnOff:true,
        Text:'点击查看更多',
      },
      dataMsg: null,
      dataMsg_table:[],
      dataMsg_table_month:[],
      chartOptions: {
        title: {
          text: "",
        },

        tooltip: {
          trigger: "axis",
        },

        textStyle: {
          fontFamily: "Microsoft YaHei",
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: " center",
          // width:'100',
          padding: [10, 0, 0, 0],
          data: ["全店访客", "去年同期", "七天均值"],
          // selectedMode: false
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "3%",
          top: "25%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: "", //新加的
            color: "#7F7F7F",
            fontSize: "12px",
          },
          nameTextStyle: {
            fontFamily: "Microsoft YaHei",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              // formatter: '{value}',
              formatter: "",
              color: "#7F7F7F",
              fontSize: "12px",
            },

            // axisLabel : {
            //   formatter: function(){
            //         return "";
            //   }
            // },

            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#f1f1f1",
              },
            },
            nameTextStyle: {
              fontFamily: "Microsoft YaHei",
            },
          },
        ],

        series: [
          {
            name: "全店访客",
            type: "line",
            color: "#004DD6",
            // data: this.matchObj.jjDataList,
            data: [2648, 2149, 2693, 2528, 2707, 2000, 2000],
            smooth: true,
            radius: "30%",
            label: {
              normal: {
                position: "top",
                show: true,
                // formatter: '{c}',
                formatter: "",
                color: "#313131",
                fontSize: "12px",
              },
            },
          },

          {
            name: "去年同期",
            type: "line",
            color: "#FF7F0E",
            // data: this.matchObj.jjDataList,  type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
            data: [
              2648 / 2,
              2149 / 2,
              2693 / 2,
              2528 / 2,
              2707 / 2,
              2000 / 2,
              2000 / 2,
            ],
            smooth: true,
            radius: "30%",
            label: {
              normal: {
                position: "top",
                show: true,
                // formatter: '{c}',
                formatter: "",
                color: "#313131",
                fontSize: "12px",
              },
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  // width:5,  // 设置线宽
                  type: "dotted", //'dotted'虚线 'solid'实线
                },
              },
            },
          },

          {
            name: "七天均值",
            type: "line",
            color: "#C0C0C0",
            // data: this.matchObj.jjDataList,
            data: [
              2648 / 4,
              2149 / 4,
              2693 / 4,
              2528 / 4,
              2707 / 4,
              2000 / 4,
              2000 / 4,
            ],
            smooth: true,
            radius: "30%",
            label: {
              normal: {
                position: "top",
                show: true,
                // formatter: '{c}',
                formatter: "",
                color: "#313131",
                fontSize: "12px",
              },
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  // width:5,  // 设置线宽
                  type: "dotted", //'dotted'虚线 'solid'实线
                },
              },
            },
          },
        ],
      },

      chartOptionsNot: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "rgba(150,150,150,0.05)",
            },
          },
          formatter: (params) => {
            let value = params[0].value;
            let sign = value === 0 ? "" : value >= 10000 ? "万" : "元";
            if (value >= 10000) {
              value = (value / 10000).toFixed(2);
            }
            return (
              params[0].axisValueLabel +
              "<br />" +
              params[0].marker +
              value +
              sign
            );
          },
          confine: true,
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        xAxis: {
          data: ["11.14", "11.15", "11.16", "11.17", "11.18", "11.19", "11.20"],
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#e3eaea",
              width: 2,
            },
          },
          axisLabel: {
            color: "#707070",
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(183,183,199,0.4)",
              type: "dotted",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            barWidth: 15,
            data: [2648, 2149, 2693, 2528, 2707, 2000, 2000],
            label: {
              show: true,
              position: "top",
              fontSize: 14,
              color: "#00A3EB",
              formatter({ dataIndex, value }) {
                console.log(value);
                if (dataIndex !== 5) {
                  return "";
                } else {
                  if (value > 10000) {
                    //return (value / 10000) + '万'
                    return "";
                  } else {
                    //return value
                    return "";
                  }
                }
              },
            },
            itemStyle: {
              color({ dataIndex }) {
                return "#f6ac38";
              },
              // barBorderRadius: [7, 7, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: "#00A3EB",
              },
            },
          },
        ],
      },
      chartOptionsCost: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "rgba(150,150,150,0.05)",
            },
          },
          formatter: (params) => {
            let value = params[0].value;
            let sign = value === 0 ? "" : value >= 10000 ? "万" : "元";
            if (value >= 10000) {
              value = (value / 10000).toFixed(2);
            }
            return (
              params[0].axisValueLabel +
              "<br />" +
              params[0].marker +
              value +
              sign
            );
          },
          confine: true,
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        xAxis: {
          data: ["11.14", "11.15", "11.16", "11.17", "11.18", "11.19", "11.20"],
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#e3eaea",
              width: 2,
            },
          },
          axisLabel: {
            color: "#707070",
            // fontSize:'16px'
          },
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(183,183,199,0.4)",
              type: "dotted",
            },
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            barWidth: 15,
            data: [2648, 2149, 2693, 2528, 2707, 2000, 2000],
            label: {
              show: true,
              position: "top",
              fontSize: 14,
              color: "#00A3EB",
              formatter({ dataIndex, value }) {
                console.log(value);
                if (dataIndex !== 5) {
                  return "";
                } else {
                  if (value > 10000) {
                    //return (value / 10000) + '万'
                    return "";
                  } else {
                    //return value
                    return "";
                  }
                }
              },
            },
            itemStyle: {
              color({ dataIndex }) {
                return "#00A3EB";
              },
              // barBorderRadius: [7, 7, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: "#f6ac38",
              },
            },
          },
        ],
      },
      chartIns: null,
      chartNot: null,
      chartCost: null,
      dateTime: "",

      data:{}
    };
  },



  created() {
    // this.$route.query.dateString
    // 做T+1处理开始
    let _time_now=new Date();
    _time_now=_time_now.getTime()-(24*60*60*1000);
    _time_now=new Date(_time_now);
    // 做T+1处理结束
    let now_month_user=_time_now.getFullYear() +"-"+
      (_time_now.getMonth() + 1 >= 1 && _time_now.getMonth() + 1 <= 9? "0" + (_time_now.getMonth() + 1): _time_now.getMonth() + 1)+'-'+
      ((_time_now.getDate()<= 9)?'0'+_time_now.getDate():_time_now.getDate());
    let on_time=(this.$route.query.dateString||now_month_user);
    this.view_time=on_time;

    const apiMap2 = {

      // 采购毛利        
      "SQL-NON_PM_FS_XLS-INFO_PLTF_M": { resultProp: "INFO_PLTF_M" },
      "SQL-NON_PM_FS_XLS-XLS_D": { resultProp: "XLS_D" },
      "SQL-NON_PM_FS_XLS-XLS_M": { resultProp: "XLS_M" },  
      "SQL-NON_PM_FS_XLS-XLS_AMT_D": { resultProp: "XLS_AMT_D" },
      "SQL-NON_PM_FS_XLS-XLS_AMT_M": { resultProp: "XLS_AMT_M" },
      "SQL-NON_PM_FS_XLS-PAMT_30DAY_D": { resultProp: "PAMT_30DAY_D" },
    };
    this.ajax_data(apiMap2,on_time);

    console.log(this.data);

  },
  mounted() {
    // // this.getCityList()
    // if (this.$route.query.dateString !== '') {
    //   this.getDetailData(this.$route.query.dateString)
    //   this.dateTime = '更新时间 : ' + this.$route.query.dateString + '  08:30'
    // } else {
    //   this.$message.error('没有指定日期')
    // }


    console.log("=========asdad!!!!!=========");
    console.log(this.$route.query.dateString);
    this.test_time=this.$route.query.dateString;
    this.test_fun();
    this.initEcharts("chart7Visitor","day_amt");
    this.initEcharts("chart7Pay","retained_capital");
    // this.initEcharts("chart7Search","BDelivery");
    this.getTargetData();

    


  },
  methods: {
    test_fun() {
      this.dataMsg = [
          {
            num: '支付业绩达成',
            rate: 36.3,

            mon_tagname:"本月目标",
            mon_target:47000,

            mon_payname:"本月支付",
            mon_pay:1704,

            yesterday_payname:'昨日支付',
            yesterday_pay:746,

            yesterday_ratename:'昨日达成',
            yesterday_rate:72.0,
          },

          {
            num: '发货业绩达成',
            rate: 4.3,

            mon_tagname:"本月目标",
            mon_target:27992,

            mon_payname:"本月发货",
            mon_pay:1688,

            yesterday_payname:'昨日发货',
            yesterday_pay:891,

            yesterday_ratename:'昨日达成',
            yesterday_rate:95.5,
          },

          {
            num: '蓄水业绩达成',
            rate: 4.3,

            mon_tagname:"本月目标",
            mon_target:27992,

            mon_payname:"本月蓄水",
            mon_pay:1688,

            yesterday_payname:'昨日蓄水',
            yesterday_pay:891,

            yesterday_ratename:'昨日达成',
            yesterday_rate:95.5,
          },



          {
            num: '留资数量达成',
            rate: 4.3,

            mon_tagname:"本月目标",
            mon_target:27992,

            mon_payname:"本月留资",
            mon_pay:1688,

            yesterday_payname:'昨日留资',
            yesterday_pay:891,

            yesterday_ratename:'昨日达成',
            yesterday_rate:95.5,
          },


          {
            num: '留资本月跟进',
            rate: 81.7,

            mon_tagname:"话务下推",
            mon_target:19516,

            mon_payname:"按时跟进",
            mon_pay:15946,

            yesterday_payname:'超时跟进',
            yesterday_pay:3459,

            yesterday_ratename:'未跟进量',
            yesterday_rate:111,
          },

      ];

      // console.log(this.dataMsg);

    },

    ShowRows(){

      // ShowRowsData:{
      //   rows:6,
      //   OnOff:true,
      // },
      console.log(this.ShowRowsData.OnOff);
      if(this.ShowRowsData.OnOff==true){
        this.ShowRowsData.rows=this.dataMsg_table.length;
        this.ShowRowsData.OnOff=false;
        this.ShowRowsData.Text='点击收起';
      }else{
        this.ShowRowsData.rows=6;
        this.ShowRowsData.OnOff=true;
        this.ShowRowsData.Text='点击查看更多';

      }



    },


    getTargetData() {

      this.p1.then(() => {

        this.dataMsg=[];
        this.dataMsg.push({
          num: '支付业绩达成',
          rate: ((this.data["NON_PM_FS_XLS-XLS_M"][0].PAY_AMT_RATE||0)*100).toFixed(1),   
          mon_tagname:"本月目标",
          mon_target:((this.data["NON_PM_FS_XLS-XLS_M"][0].TGT_PAY_AMT||0)/10000).toFixed(0),  
          mon_payname:"本月支付",
          mon_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].PAY_AMT||0)/10000).toFixed(0),
          yesterday_payname:'昨日支付',
          yesterday_pay:((this.data["NON_PM_FS_XLS-XLS_D"][0].PAY_AMT||0)/10000).toFixed(0),
          yesterday_ratename:'昨日达成',
          yesterday_rate:((this.data["NON_PM_FS_XLS-XLS_D"][0].PAY_AMT_RATE||0)*100).toFixed(1),
          activity_name:(null)
        },);

        this.dataMsg.push({
          num: '发货业绩达成',
          rate: ((this.data["NON_PM_FS_XLS-XLS_M"][0].DLVRED_AMT_RATE||0)*100).toFixed(1),   
          mon_tagname:"本月目标",
          mon_target:((this.data["NON_PM_FS_XLS-XLS_M"][0].TGT_DLVRED_AMT||0)/10000).toFixed(0),  
          mon_payname:"本月发货",
          mon_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].DLVRED_AMT||0)/10000).toFixed(0),
          yesterday_payname:'昨日发货',
          yesterday_pay:((this.data["NON_PM_FS_XLS-XLS_D"][0].DLVRED_AMT||0)/10000).toFixed(0),
          yesterday_ratename:'昨日达成',
          yesterday_rate:((this.data["NON_PM_FS_XLS-XLS_D"][0].DLVRED_AMT_RATE||0)*100).toFixed(1),
          activity_name:(null)
        },);

        this.dataMsg.push({
          num: '蓄水业绩达成',
          rate: ((this.data["NON_PM_FS_XLS-XLS_M"][0].WATER_AMT_RATE||0)*100).toFixed(1),   
          mon_tagname:"活动目标",
          mon_target:((this.data["NON_PM_FS_XLS-XLS_M"][0].WATER_STORAGE_TGT||0)/10000).toFixed(0),  
          mon_payname:"活动蓄水",
          mon_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].WATER_ORDER_AMT||0)/10000).toFixed(0),
          yesterday_payname:'昨日蓄水',
          yesterday_pay:((this.data["NON_PM_FS_XLS-XLS_D"][0].WATER_ORDER_AMT||0)/10000).toFixed(0),
          yesterday_ratename:'昨日达成',
          yesterday_rate:((this.data["NON_PM_FS_XLS-XLS_D"][0].WATER_AMT_RATE||0)*100).toFixed(1),
          activity_name:((this.data["NON_PM_FS_XLS-XLS_M"][0].ACTIVITY_NAME||null))
        },);

        this.dataMsg.push({
          num: '留资数量达成',
          rate: ((this.data["NON_PM_FS_XLS-XLS_M"][0].INFO_COUNT_RATE||0)*100).toFixed(1),   
          mon_tagname:"本月目标",
          mon_target:((this.data["NON_PM_FS_XLS-XLS_M"][0].INFO_COUNT_TGT||0)).toFixed(0),  
          mon_payname:"本月留资",
          mon_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].INFO_COUNT||0)).toFixed(0),
          yesterday_payname:'昨日留资',
          yesterday_pay:((this.data["NON_PM_FS_XLS-XLS_D"][0].INFO_COUNT||0)).toFixed(0),
          yesterday_ratename:'昨日达成',
          yesterday_rate:((this.data["NON_PM_FS_XLS-XLS_D"][0].INFO_COUNT_RATE||0)*100).toFixed(1),
          activity_name:(null)
        },);

        // this.dataMsg.push({
        //   num: '留资有效跟进',
        //   rate: ((this.data["NON_PM_FS_XLS-XLS_M"][0].ON_TIME_RATE||0)*100).toFixed(1),     
        //   mon_tagname:"话务下推",
        //   mon_target:((this.data["NON_PM_FS_XLS-XLS_M"][0].TEL_OPER_NUM||0)).toFixed(0),  
        //   mon_payname:"按时跟进",
        //   mon_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].ON_TIME_NUM||0)).toFixed(0),
        //   yesterday_payname:'超时跟进',
        //   yesterday_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].OUT_TIME_NUM||0)).toFixed(0),
        //   yesterday_ratename:'未跟进量',
        //   yesterday_rate:((this.data["NON_PM_FS_XLS-XLS_M"][0].NOT_NUM||0)).toFixed(0),
        //   activity_name:(null)
        // },);
        // this.dataMsg.push({
        //   num: '留资转化-近60天',
        //   rate: ((this.data["NON_PM_FS_XLS-XLS_M"][0].APPT_PAY_NUM60_RATE||0)*100).toFixed(1),     
        //   mon_tagname:"话务下推",
        //   mon_target:((this.data["NON_PM_FS_XLS-XLS_M"][0].TEL_OPER_NUM60||0)).toFixed(0),  
        //   mon_payname:"导购意向",
        //   mon_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].HAVE_BUY60_RATE||0)*100).toFixed(0), 
        //   yesterday_payname:'核销到店',
        //   yesterday_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].SHOP_VISIT_NUM60_RATE||0)*100).toFixed(0),
        //   yesterday_ratename:'成交金额',
        //   yesterday_rate:((this.data["NON_PM_FS_XLS-XLS_M"][0].APPT_PAY_AMT60||0)/10000).toFixed(0),
        //   activity_name:(null)
        // },);

        this.dataMsg.push({
          num: '留资成交转化',
          rate: ((this.data["NON_PM_FS_XLS-XLS_M"][0].APPT_PAY_NUM60_RATE||0)*100).toFixed(1),     
          mon_tagname:"话务下推",
          mon_target:((this.data["NON_PM_FS_XLS-XLS_M"][0].TEL_OPER_NUM||0)).toFixed(0),  
          mon_payname:"按时跟进",
          mon_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].ON_TIME_RATE||0)*100).toFixed(1),
          yesterday_payname:'未跟进量',
          yesterday_pay:((this.data["NON_PM_FS_XLS-XLS_M"][0].NOT_NUM||0)).toFixed(0),
          yesterday_ratename:'成交金额',
          yesterday_rate:((this.data["NON_PM_FS_XLS-XLS_M"][0].APPT_PAY_AMT60||0)/10000).toFixed(0),
          activity_name:(null)
        },);
        

        // 货品销售结构
        this.dataMsg_table=this.data["NON_PM_FS_XLS-XLS_AMT_D"];
        Object.keys(this.dataMsg_table).forEach((key_amt) => {
          // this.dataMsg_table[key_amt].TDATE.substring(0,4)+'/'+
          this.dataMsg_table[key_amt].USERTIME=this.dataMsg_table[key_amt].TDATE.substring(5,7)+'.'+this.dataMsg_table[key_amt].TDATE.substring(8,10);

          if(this.dataMsg_table[key_amt].DATA_TYPE=='月累计'){
            this.dataMsg_table[key_amt].RANK=999999999;
          }else{
            this.dataMsg_table[key_amt].RANK=this.dataMsg_table[key_amt].TDATE_WID;
          }
        });
        this.dataMsg_table.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = (a["RANK"]);
            b_time = (b["RANK"]);
            return b_time - a_time;
        });

        this.dataMsg_table_month=this.data["NON_PM_FS_XLS-XLS_AMT_M"][0]||0;

        console.log("=============月的========");
        console.log(this.dataMsg_table_month);

        


        // console.log(this.dataMsg_table);


        
        // console.log("=============adasd asda asdasd================")
        // this.dateTime=(this.data["NON_PM_FS_XLS-XLS_M"][0]==undefined||this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME==null)?'--':
        //   (this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME.substring(5,7)+'月'+this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME.substring(8,10)+'日 '+
        //   ((this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME.substring(11,13)*1>12)?
        //     (this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME.substring(11,13)-12+this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME.substring(13,16)+' pm')
        //       :this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME.substring(11,16)+' am'));

        this.dateTime=(this.data["NON_PM_FS_XLS-XLS_M"][0]==undefined||this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME==null)?'--':
          (this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME.substring(5,7)+'月'+this.data["NON_PM_FS_XLS-XLS_M"][0].LOAD_TIME.substring(8,10)+'日 '+'10:00 am');     
        // // console.log(this.data["NON_FS_XLS-XLS_M"][0].LOAD_TIME);
        // // console.log(this.dateTime);

        // this.dateTime=(this.view_time.substring(5,7)+'月'+this.view_time.substring(8,10)+'日 '+'10:00 am');   

        




      });


    },

    
    initEcharts(user_refs,type) {


      this.p1.then(() => {

        this.chartIns = E.init(this.$refs[user_refs]);
        // console.log(user_refs);
        // console.log(type);

        let Utime=[];
        let Uamt=[];
        let Uagoamt=[];

        let UAllAmt=[];
        let UagoAllAmt=[];
        let _this=this;

        if(type=='day_amt'){
          // console.log("运行到这里来！！！");

          this.data["NON_PM_FS_XLS-PAMT_30DAY_D"].sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
              b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
              return a_time - b_time;
          });

          Object.keys(this.data["NON_PM_FS_XLS-PAMT_30DAY_D"]).forEach((key_fun) => {
            Utime.push(this.data["NON_PM_FS_XLS-PAMT_30DAY_D"][key_fun].TDATE.substring(5,7)+'.'+this.data["NON_PM_FS_XLS-PAMT_30DAY_D"][key_fun].TDATE.substring(8,10));
            Uamt.push((this.data["NON_PM_FS_XLS-PAMT_30DAY_D"][key_fun].PAY_AMT/10000).toFixed(1));   
            Uagoamt.push((this.data["NON_PM_FS_XLS-PAMT_30DAY_D"][key_fun].PAY_AMT_PREV/10000).toFixed(1));
          });

      
        }else if(type=='retained_capital'){  
          // console.log("122");

          this.data["NON_PM_FS_XLS-INFO_PLTF_M"].sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = a["COUNT_THIS_MONTH_RATE"];
              b_time = b["COUNT_THIS_MONTH_RATE"];
              return b_time - a_time;
          });


          let user_val=0;
          Object.keys(this.data["NON_PM_FS_XLS-INFO_PLTF_M"]).forEach((key_fun) => {

            Utime.push(this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].INFO_PLTF_NAME);
            Uamt.push(((this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].COUNT_THIS_MONTH_RATE||0)*100).toFixed(1));  
            user_val=(this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].ALL_COUNT_YESTERDAY==0||this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].ALL_COUNT_YESTERDAY==null)? 0:
              ((this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].COUNT_YESTERDAY/(this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].ALL_COUNT_YESTERDAY)));
            UAllAmt.push({onname:this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].INFO_PLTF_NAME,
              onval:(this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].COUNT_THIS_MONTH)});
            UagoAllAmt.push({onname:this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].INFO_PLTF_NAME,
              onval:(this.data["NON_PM_FS_XLS-INFO_PLTF_M"][key_fun].COUNT_YESTERDAY)});
  
            Uagoamt.push(((user_val||0)*100).toFixed(1));
          });

          console.log("=========asdad奥术大师大大多多·=======")
          console.log(this.data["NON_PM_FS_XLS-INFO_PLTF_M"]);
          console.log(UAllAmt);
          console.log(UagoAllAmt);

        }


        // console.log(Uamt);


        this.chartIns.setOption({

            grid: {
              left: "5%",
              top: "6%",
              right: "5%",
              // bottom: "15%",
              bottom: "0%",
              containLabel: true,
            },

            legend: {
              show: false,
              data: ["业绩", "同期"],
              // right: "3%",
              // top: "0%",
              // bottom: "2%",
              bottom: "bottom",
              textStyle: {
                fontSize: 12,
              },
              itemHeight: 4,
              itemWidth: 18,
              icon: "pie",

              formatter: function (name) {
                // console.log(name);
                return name;
              },
            },

            tooltip: {
              trigger: "axis",
              axisPointer: {
                // type: "cross",
                type: (type=='retained_capital')?'shadow':'line',
                label: {
                  color: "#000000",
                  backgroundColor: "aliceblue",
                },
              },

              formatter:function (params) {

                let set_value='';
                if(type=='day_amt'){
                  set_value=params[1].axisValue+
                    '<br/>'+params[1].marker+
                    '业绩：'+params[1].value+'万'+
                    ((params[0]==undefined)?'':('<br/>'+(params[0].marker)+
                    '同期：'+params[0].value+'万'));
                }else if(type=='retained_capital'){

                  let OnUAllAmt=0;
                  let OnUagoAllAmt=0;
                  OnUAllAmt=(params[0])?UAllAmt.filter(_ => {return _['onname'] === params[0].name}):0;
                  OnUagoAllAmt=(params[1])?UagoAllAmt.filter(_ => {return _['onname'] === params[1].name}):0;

                  set_value=params[0].axisValue+
                    '<br/>'+params[0].marker+
                    '本月：'+_this.fomatMoney(OnUAllAmt[0].onval)+'('+params[0].value+'%'+')'+
                    ((params[1]==undefined)?'':('<br/>'+(params[1].marker)+
                    '昨日：'+_this.fomatMoney(OnUagoAllAmt[0].onval)+'('+params[1].value+'%'+')'));
                }

                return set_value;
              }

            },

            xAxis: {
              type: "category",
              boundaryGap: true,  //柱子是否中间
              data: Utime,
              axisLine: {
                lineStyle: {
                  color: "#ccc",
                },
              },
              axisLabel: {
                // interval: 'auto',
                interval: (type=='retained_capital')?0:3,
              },
            },
            yAxis: {
              // type: "value",
              // type: "log",
              // type:(this.sel_value.Range_on.Range_set=='1')?"category":"value",
              
              splitLine: {
                show: true,
                lineStyle: { type: "dotted", color: "#ccc" },
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
                textStyle: {
                  color: "#ccc",
                },
              },

              // data:ynew_data,
              // data:Utime,

            },

            series: [

              {
                name: "同期",
                showSymbol: false,
                smooth: true, //true 为平滑曲线，false为直线
                stack: (type=='retained_capital')?'':'支付业绩',
                itemStyle: {
                  color: "#0938F7",
                  normal: {
                    color: (type=='retained_capital')?"#4169E1":"#D3D3D3",
                    lineStyle: {
                      color: (type=='retained_capital')?"#4169E1":"#D3D3D3",
                      width: 0, //设置线条粗细
                    },
                    areaStyle: {
                      color: new E.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                          offset: 0,
                          color: "rgba(211,211,211, 1)",
                        },
                        {
                          offset: 0.1,
                          color: "rgba(211,211,211, 1)",
                        },
                        {
                          offset: 0.6,
                          color: "rgba(211,211,211, 1)",
                        },
                        {
                          offset: 1,
                          color: "rgba(211,211,211, 1)",
                        },
                      ]),
                    },
                  },
                },

                data: (type=='retained_capital')?Uamt:Uagoamt,

                type: (type=='retained_capital')?"bar":"line",
                areaStyle: {},
              },   

              {
                name: "业绩",
                showSymbol: false,  //是否显示刻度值
                smooth: true, //true 为平滑曲线，false为直线
                stack: (type=='retained_capital')?'':'支付业绩',
                itemStyle: {
                  color: "#919191",
                  normal: {
                    color: (type=='retained_capital')?"#D3D3D3":"#4169E1",
                    lineStyle: {
                      color: (type=='retained_capital')?"#D3D3D3":"#4169E1",
                      width: 0, //设置线条粗细
                    },
                    areaStyle: {
                      color: "rgba(65,105,225, 0.9)",
                    },
                  },
                },
                data: (type=='retained_capital')?Uagoamt:Uamt,
                type: (type=='retained_capital')?"bar":"line",
                areaStyle: {},
              },


            ],

        });




      });



      // this.chartIns.setOption(this.chartOptions);
    },





    // initEcharts() {

    //   this.chartIns = E.init(this.$refs["chart7Visitor"]);
    //   this.chartIns.setOption(this.chartOptions);
    // },

    initEchartsOet(SetName, Data, DataAgo, DataAvg, MonthDay, LegendName,Unit) {

      if (LegendName!=undefined&&LegendName.legend != 0) {
        this.chartOptions.legend.data = LegendName;
        this.chartOptions.series[0].name = LegendName[0];
        this.chartOptions.series[1].name = LegendName[1];
        this.chartOptions.series[2].name = LegendName[2];
      }

      Unit=(Unit==undefined)?'1':Unit;
      this.chartOptions.tooltip.formatter= function (params) {
        // console.log(params);
        return  '第'+params[0].axisValue+'<br/>'+params[0].marker+params[0].seriesName+'：'+params[0].value+Unit+'<br/>'
        +params[1].marker+params[1].seriesName+'：'+params[1].value+Unit+'<br/>'
        +params[2].marker+params[2].seriesName+'：'+params[2].value+Unit+'<br/>'
      }  



      this.chartOptions.series[0].data = Data;
      this.chartOptions.series[1].data = DataAgo;
      this.chartOptions.series[2].data = DataAvg;
      this.chartOptions.xAxis.data = MonthDay;
      this.chartIns = E.init(this.$refs[SetName]);
      this.chartIns.setOption(this.chartOptions);
    },

    ajax_data(apiMap,senttime){

      console.log("运行到ajax交互哪里！！！！！！！！");
      let num_api=0;
      // let num_api_pd=0;
      let p_array=[];
      let variable={};

      // 数组处理开始
      Object.keys(apiMap).forEach((key_fun) => {
        num_api++;
        [variable['p'+num_api],variable['resolve'+num_api]]=this.generatePromise();
        p_array.push(variable['p'+num_api]);
        apiMap[key_fun].type=Array;
        apiMap[key_fun]['resolve'+num_api]=variable['resolve'+num_api];
        apiMap[key_fun]['num']=num_api;
      });
      // 数组处理结束

      Object.keys(apiMap).forEach((key) => {


          const [, prefix, interfaceName] = key.split("-"); //把上面的拆分出来
          if (prefix && interfaceName) {
            // console.log(prefix+"              "+interfaceName);  
            this.$axios
              .post(`/bi-mobile/api/user/data/${prefix}/${interfaceName}/get`, {MDATE: senttime})
              .then(({ data }) => {
                if (apiMap[key].type === Array) {
                  this.data[`${prefix}-${interfaceName}`] = data;
                } else {
                  this.data[`${prefix}-${interfaceName}`] = data;
                }

                // num_api_pd++;
                Object.keys(variable).forEach((key_var) => {

                  if(key_var==('resolve'+apiMap[key]['num'])){
                    // console.log(apiMap[key]['resolve'+apiMap[key]['num']]());
                    apiMap[key]['resolve'+apiMap[key]['num']]();

                    // console.log(num_api_pd);

                  }
                });

              });
          }
          
      });


      this.p1= Promise.all(p_array);

    },

    generatePromise(){
      let resolve, reject
      const p = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return [p, resolve ,reject]
    },

    fomatMoney(num) {
      num = num + "";
      if (!num.includes(".")) {
        num += ".";
      }
      return num
        .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ",";
        })
        .replace(/\.$/, "");
    },

    nll_undefined(setvalue) {
      setvalue = setvalue.toString();
      setvalue = setvalue.indexOf("undefined") == -1 ? setvalue : "--";
      return setvalue;
    },
  },
};
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
  content: "";
  display: block;
  clear: both;
}

.table-box {
  padding: 10px;
  background: -webkit-linear-gradient(
    top,
    rgba(50, 148, 248, 0.2),
    rgba(50, 148, 248, 0.1)
  );
  background: -o-linear-gradient(
    bottom,
    rgba(50, 148, 248, 0.2),
    rgba(50, 148, 248, 0.1)
  );
  background: -moz-linear-gradient(
    bottom,
    rgba(50, 148, 248, 0.2),
    rgba(50, 148, 248, 0.1)
  );
  background: linear-gradient(
    to bottom,
    rgba(50, 148, 248, 0.2),
    rgba(50, 148, 248, 0.1)
  );
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

.pay_retail{
  width: 100%;
  // height: 60px;
  border-radius: 6px;
  background-color: #fff;
  padding: 0px 0;
  margin-bottom: 6px;
}

.pay_retail_cont li{
  >div{
    > ul.pay_retail_cont_text{
      > li{
        float: left;
        width: 20%;
        font-size: 12px;
        border-left: 1px solid #ddd;
        text-align: center;
        margin-bottom: 10px;
        > p{
          padding: 0px;
          margin: 0px;
        }
        > p.pay_retail_cont_p{
          padding-top: 10px;
          font-size: 12px;
        }
      }
    }    
  }

}



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
  height: 200px;
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



.amt_table_css{
  > li{
    // padding-top: 10px;
    color: #808080;
  }

  > li.amt_cont{
    color: 	#343437;
  }


}

.amt_table_css_ul{
  > li{
    float: left;
    width: 20%;
    text-align: center;
    font-size: 12px;
  }
}

</style>
