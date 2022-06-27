<template>
  <div>
    <!-- 说明开始 -->
    <van-popup v-model="question_show" class="popup_css" get-container="body">
      <div class="kjsm_bg" style="">
        <p style="margin: 0 auto;">逻辑说明</p>            
      </div>
      <div style="text-align: left;font-size: 14px;padding-left: 20px;padding-right: 20px;padding-bottom: 20px;line-height: 23px; color:#555555;">
        <!-- <p style="margin-bottom: 5px;margin-top: 5px;">1、选择项置顶，页面拖拉也置顶在第一行</p>
        <p style="margin-bottom: 5px;margin-top: 5px;">2、点击以及滑动都能达到切换的效果</p>   、卡伊莲家具旗舰店
        <p>逻辑说明点击弹出以下内容：</p> -->
        <p style="margin-bottom: 5px;margin-top: 5px;">
          1.店铺包含：林氏木业家具旗舰店、JD-林氏木业家具旗舰店、林氏旗舰店、林氏木业唯品会旗舰店、林氏木业苏宁旗舰店
        </p>
        <p style="margin-bottom: 5px;margin-top: 5px;">
          2.《支付》、《发货》、《访客》、《转化》的整体概况板块为5个店铺汇总结果，《客单》的整体概况为线上渠道结果
        </p>
        <p style="margin-bottom: 5px;margin-top: 5px;color:rgb(169, 169, 169);">备注：2021年12月的转化、客单目标只做参考，不做考核</p>
      </div>






    </van-popup>
    <!-- 说明结束 -->

    <div class="table-box">
      <div class="top-content clearfix" style="padding: 0px; padding-bottom: 5px;">
        <div class="title fl" style="margin-left: 0px;width:100%;">
          <span style="font-weight: normal;font-size: 12px;color: #969696;float: left;line-height: 22px;">更新时间：{{this.dateTime}}</span>
          <span @click="showPopup_sm" style="float: right;font-weight: normal;font-size: 12px;line-height: 22px;color: #1E90FF;">逻辑说明</span>
        </div>
        <!-- <div class="time fr">{{ dateTime }}</div> 线上重点店铺运营日报-->
        <!-- <div class="time fr">{{ '未发取消目标、净业绩目标' }}</div> -->
      </div>


      <!-- 整体概况开始 -->
      <div ref="Whole_Info" class="pay_retail_title" style="background: #1E90FF;border-top-right-radius: 6px;border-top-left-radius: 6px;margin-top: 0px;">
        <p style="padding: 8px 15px;margin: 0px;font-size: 14px;color: #fff;">整体概况</p>
      </div>  

      <div style="background-color: #fff;">
        <ul class="pay_retail_cont">
          <li>
            <div style="margin-left: 5px;margin-right: 5px;" :style="{'border-bottom':'1px solid #ddd'}">
              <div class="pay_retail_cont_title">
                <p style="font-size: 14px;padding: 10px;margin: 0px;float: left;">{{this.dataMsgTotal[0].num}}</p>
                <div style="clear: both;"></div>
              </div>
              <ul class="pay_retail_cont_text">
                <li style="border:0px;line-height: 45px;font-size: 16px;" :style="{'color':'#000000'}">
                  <p>{{(this.dataMsgTotal[0].rate==0)?'--':
                    (fomatMoney(this.dataMsgTotal[0].rate)+((UserRange_value_set=='4')?'%':((UserRange_value_set=='5')?'':'万')))}}</p>
                </li>

                <li><p>{{(this.dataMsgTotal[0].mon_target==0)?'--':
                  (fomatMoney(this.dataMsgTotal[0].mon_target)+((UserRange_value_set=='4')?'%':((UserRange_value_set=='5')?'':'万')))}}</p> 
                  <p class="pay_retail_cont_p">{{this.dataMsgTotal[0].mon_tagname}}</p>
                </li>

                <li><p :style="{'color':(UserRange_value_set=='5')?((this.dataMsgTotal[0].mon_pay>=0)?'#FF0000':'#008000')
                  :((this.dataMsgTotal[0].mon_pay>=100)?'#FF0000':'#008000')}">
                  {{(this.dataMsgTotal[0].mon_pay==0)?'--':(fomatMoney(this.dataMsgTotal[0].mon_pay)+('%'))}}</p> 
                  <p class="pay_retail_cont_p">{{this.dataMsgTotal[0].mon_payname}}</p>
                </li>

                <li>
                  <p>{{(this.dataMsgTotal[0].yesterday_pay==0)?'--':(fomatMoney(this.dataMsgTotal[0].yesterday_pay)+
                    ((UserRange_value_set=='4'||UserRange_value_set=='5')?'':'万'))}}</p> 
                  <p class="pay_retail_cont_p">{{this.dataMsgTotal[0].yesterday_payname}}</p>
                </li>

                <li>
                  <p :style="{'color':(UserRange_value_set=='4')?'#000000'
                    :(UserRange_value_set=='5')?((this.dataMsgTotal[0].yesterday_rate>=0)?'#FF0000':'#008000')
                    :((this.dataMsgTotal[0].yesterday_rate>=100)?'#FF0000':'#008000')}">
                    {{(this.dataMsgTotal[0].yesterday_rate==0)?'--':(fomatMoney(this.dataMsgTotal[0].yesterday_rate)+((UserRange_value_set=='4')?'万':'%'))}}</p> 
                  <p class="pay_retail_cont_p">{{this.dataMsgTotal[0].yesterday_ratename}}</p>
                </li>
              </ul>  
              <div style="clear: both;"></div>                          
            </div>
          </li>
        </ul>
      </div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>{{(UserRange_value_set=='5')?'年度趋势':'近7天趋势'}}</div>
      </div>
      <div class="performance" ref="chart7Visitor"></div>

      <!-- <div class="perTitle clearfix" style="margintop: 10px">
        <div style="backgroundcolor: #f6ac38"></div>
        <div>各平台留资结构</div>
      </div>
      <div class="performance" style="border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;" ref="chart7Pay"></div> -->
      <!-- 整体概况结束 -->



      <!-- 店铺概况开始 -->
      <div class="pay_retail" ref="Shop_Info" style="margin-top: 10px;">
        <div class="pay_retail_title" style="background: #1E90FF;border-top-right-radius: 6px;border-top-left-radius: 6px;">
          <p style="padding: 8px 15px;margin: 0px;font-size: 14px;color: #fff;">店铺概况</p>
        </div>

        <ul class="pay_retail_cont">
          <li v-for="(item,key) in dataMsg" :key="key">
            <div style="margin-left: 5px;margin-right: 5px;" :style="{'border-top':(key==0||item.rank_on=='top500')?'':'1px solid #ddd',
            'display': (item.rank_on!='top500')?'block':((topshow)?'block':'none')}">  
              <div class="pay_retail_cont_title">
                <p style="font-size: 14px;padding: 10px;margin: 0px;float: left;">{{item.num}}</p>
                <!-- <p v-if="key==2&&item.mon_target==0" style="font-size: 12px;padding: 10px;margin: 0px;float: right;color:#C0C0C0;">▲期间无蓄水目标要求</p> -->
                <div style="clear: both;"></div>
              </div>
              <ul class="pay_retail_cont_text">
                <li style="border:0px;line-height: 45px;font-size: 16px;" :style="{'color':'#000000'}">
                  <p :style="{'line-height': ((item.num=='林氏木业家具旗舰店'&&item.rank_on!='top500'&&(UserRange_value_set=='4'||UserRange_value_set=='3'))?26:45)+'px'}">
                    {{(item.rate==0)?'--':(fomatMoney(item.rate)+((UserRange_value_set=='4')?'%':((UserRange_value_set=='5')?'':'万')))}}
                  </p>
                  <p v-if="item.num=='林氏木业家具旗舰店'&&item.rank_on!='top500'&&(UserRange_value_set=='4'||UserRange_value_set=='3')" @click="top500_fun()"
                    style="font-size: 12px;line-height: 15px;color: #A9A9A9;">
                    {{(topshow)?'点击收起▲':'商品访客▼'}}
                  </p>
                </li>

                <li><p>{{(item.mon_target==0)?'--':
                  (fomatMoney(item.mon_target)+((UserRange_value_set=='4')?'%':
                  ((item.num=='留资有效跟进'||item.num=='留资数量达成'||UserRange_value_set=='5')?'':'万')))}}</p> 
                  <p class="pay_retail_cont_p">{{item.mon_tagname}}</p>
                </li>
                
                <li><p :style="{'color':(item.mon_pay>=100)?'#FF0000':'#008000'}">{{(item.mon_pay==0)?'--':(fomatMoney(item.mon_pay)+('%'))}}</p> 
                  <p class="pay_retail_cont_p">{{item.mon_payname}}</p></li>

                <li><p :style="{'color':(UserRange_value_set=='5')?((item.mon_pay>=0)?'#FF0000':'#008000'):'#000000'}">
                  {{(item.yesterday_pay==0)?'--':(fomatMoney(item.yesterday_pay)+
                  ((UserRange_value_set=='4')?'':(((UserRange_value_set=='5')?'%':'万'))))}}</p> 
                  <p class="pay_retail_cont_p">{{item.yesterday_payname}}</p></li>

                <li>
                  <p :style="{'color':(UserRange_value_set=='4')?'#000000':
                  (UserRange_value_set=='5')?((item.yesterday_rate>=0)?'#FF0000':'#008000'):((item.yesterday_rate>=100)?'#FF0000':'#008000')}">
                    {{(item.yesterday_rate==0)?'--':(fomatMoney(item.yesterday_rate)+((UserRange_value_set=='4')?'万':'%'))}}</p> 
                  <p class="pay_retail_cont_p">{{item.yesterday_ratename}}</p>
                </li>
              </ul>  
              <div style="clear: both;"></div>                          
            </div>
          </li>
        </ul>

      </div>
      <!-- 店铺概况结束 -->



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

import {Popup}from "vant";
import {Information_log,} from "@/utils/helpers";

export default {
  name: "OnlineKStoreODaily_con",
  components: {
    [Popup.name]: Popup,
  },
  data() {
    return {
      // time:new Date().toLocaleString(),
      //逻辑说明变量
      question_show: false,

      test_time:'',
      view_time:'',
      ShowRowsData:{
        rows:6,
        OnOff:true,
        Text:'点击查看更多',
      },
      dataMsg: null,
      dataMsgTotal:null,
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

      chartIns: null,
      chartNot: null,
      chartCost: null,
      dateTime: "",
      UserRange_value_set:'1',
      topshow:false,

      Shop_Info_On:0,
      Whole_Info_On:0,

      Is_Set_mess:0,
      Is_Set_mess2:0,

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

      // 线上重点店铺运营日报     
      "SQL-NON_PM_CORE_SHOP-CORE_SHOP_M": { resultProp: "CORE_SHOP_M" },
      "SQL-NON_PM_CORE_SHOP-CORE_SHOP_D": { resultProp: "CORE_SHOP_D" },
      "SQL-NON_PM_CORE_SHOP-M_ALL": { resultProp: "M_ALL" },

      "SQL-NON_PM_CORE_SHOP-PCT_M": { resultProp: "PCT_M" },
      "SQL-NON_PM_CORE_SHOP-TOP500": { resultProp: "TOP500" },
      "SQL-NON_PM_CORE_SHOP-PCT_M_ALL": { resultProp: "PCT_M_ALL" },
      "SQL-NON_PM_CORE_SHOP-PCT_MS": { resultProp: "PCT_MS" },

      


    };
    this.ajax_data(apiMap2,on_time);

    console.log(on_time);
    console.log(this.data);

  },

  watch: {
    "UserRange_value_set": {
      handler(val) {

        // console.log("============值有变化！！！！=============");
        // console.log(val);
        this.getTargetData();
        // this.initEcharts("chart7Visitor","retained_capital");

      },
      immediate: false,

    },
  },

  mounted() {

    this.$EventBus.$on("OnlineDaily_f", (Range_value_set) => {
      this.UserRange_value_set=Range_value_set.Range_value_set;      

    });

     


    this.test_time=this.$route.query.dateString;
    // this.test_fun();
    this.getTargetData();
    // let _this=this;
    // setTimeout(function name() {
    //   // 选择需要观察变动的节点
    //   const targetNode = _this.$refs["Store_Info"];
    //   // 观察器的配置（需要观察什么变动）
    //   const config = { attributes: true, childList: true, subtree: true };
    //   // 当观察到变动时执行的回调函数
    //   const callback = function(mutationsList, observer) {
    //       // Use traditional 'for loops' for IE 11
    //       // for(let mutation of mutationsList) {
    //       //     if (mutation.type === 'childList') {
    //       //         console.log('A child node has been added or removed.');
    //       //     }
    //       //     else if (mutation.type === 'attributes') {
    //       //         console.log('The ' + mutation.attributeName + ' attribute was modified.');
    //       //     }
    //       // }
    //       console.log(mutationsList);
    //       console.log(observer);
    //   };
    //   // 创建一个观察器实例并传入回调函数
    //   const observer = new MutationObserver(callback);
    //   // 以上述配置开始观察目标节点
    //   observer.observe(targetNode, config);
    // }, 2000);  
    
    // window.addEventListener('scroll',this.handleScroll,true);  //添加了操作日志记录接口

    
  },
  methods: {

    // async fun_all(data,time){
    //   await this.ajax_data(data,time);
    //   this.initEcharts("chart7Visitor","retained_capital");
    // },

    handleScroll(){

      var scrollTop =document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log('可视区域:'+windowHeight*1/3);
      // console.log('总高度：'+scrollHeight);
      // console.log(scrollTop); _this.Whole_Info_On

      if((scrollTop+windowHeight*1/3)>this.Whole_Info_On&&(scrollTop+windowHeight*1/3)<this.Shop_Info_On){
        // console.log("浏览到整体概况模块");
        if(this.Is_Set_mess==0){
          Information_log('线上重点店铺运营日报','线上重点店铺运营日报-浏览到整体概况模块');
          this.Is_Set_mess=1;
        }
        
      }else if((scrollTop+windowHeight*1/3)>this.Shop_Info_On){
        // console.log("浏览到店铺概况模块");
        if(this.Is_Set_mess2==0){
          Information_log('线上重点店铺运营日报','线上重点店铺运营日报-浏览到店铺概况模块');
          this.Is_Set_mess2=1;
        }

      }


    },



    top500_fun(){
      // console.log("运行到top500这里");
      if(this.topshow==true){
        this.topshow=false;
      }else{
        this.topshow=true;
      }
    },



    showPopup_sm(){
      this.question_show=true;
    },      

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


        // 汇总数据开始  
        this.dataMsgTotal=[];
        // 汇总数据结束
        this.dataMsg=[];


        this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"].sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = a["SHOP_RANK"];
            b_time = b["SHOP_RANK"];
            return a_time - b_time;
        });        

        if(this.UserRange_value_set=='1'){
          Object.keys(this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"]).forEach((key_tag) => {
            this.dataMsg.push({
              num:this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].SHOP_NAME,
              rate: ((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].PAY_AMT||0)/10000).toFixed(0),   
              mon_tagname:"月累目标",
              mon_target:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].TGT_PAY_AMT||0)/10000).toFixed(0),  
              mon_payname:"月累达成",
              mon_pay:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].PAY_AMT_RATE||0)*100).toFixed(1),
              yesterday_payname:'日累目标',
              yesterday_pay:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].LJ_TGT_PAY_AMT||0)/10000).toFixed(0),
              yesterday_ratename:'日累达成',
              yesterday_rate:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].LJ_PAY_AMT_RATE||0)*100).toFixed(1),
            });
          });

          // 汇总数据开始  
          this.dataMsgTotal.push({
            num:"整体达成",
            rate: ((this.data["NON_PM_CORE_SHOP-M_ALL"][0].PAY_AMT||0)/10000).toFixed(0),   
            mon_tagname:"月累目标",
            mon_target:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].TGT_PAY_AMT||0)/10000).toFixed(0),  
            mon_payname:"月累达成",
            mon_pay:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].PAY_AMT_RATE||0)*100).toFixed(1),
            yesterday_payname:'日累目标',
            yesterday_pay:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].LJ_TGT_PAY_AMT||0)/10000).toFixed(0),
            yesterday_ratename:'日累达成',
            yesterday_rate:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].LJ_PAY_AMT_RATE||0)*100).toFixed(1),
          });

        }else if(this.UserRange_value_set=='2'){
          Object.keys(this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"]).forEach((key_tag) => {
            this.dataMsg.push({
              num:this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].SHOP_NAME,
              rate: ((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].DLVRED_AMT||0)/10000).toFixed(0),   
              mon_tagname:"月累目标",
              mon_target:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].TGT_DLVRED_AMT||0)/10000).toFixed(0),  
              mon_payname:"月累达成",
              mon_pay:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].DLVRED_AMT_RATE||0)*100).toFixed(1),
              yesterday_payname:'日累目标',
              yesterday_pay:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].LJ_TGT_DLVRED_AMT||0)/10000).toFixed(0),
              yesterday_ratename:'日累达成',
              yesterday_rate:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].LJ_DLVRED_AMT_RATE||0)*100).toFixed(1),
            });
          });

          // 汇总数据开始  
          this.dataMsgTotal.push({
            num:"整体达成",
            rate: ((this.data["NON_PM_CORE_SHOP-M_ALL"][0].DLVRED_AMT||0)/10000).toFixed(0),   
            mon_tagname:"月累目标",
            mon_target:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].TGT_DLVRED_AMT||0)/10000).toFixed(0),  
            mon_payname:"月累达成",
            mon_pay:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].DLVRED_AMT_RATE||0)*100).toFixed(1),
            yesterday_payname:'日累目标',
            yesterday_pay:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].LJ_TGT_DLVRED_AMT||0)/10000).toFixed(0),
            yesterday_ratename:'日累达成',
            yesterday_rate:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].LJ_DLVRED_AMT_RATE||0)*100).toFixed(1),
          });

        }else if(this.UserRange_value_set=='3'){
          Object.keys(this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"]).forEach((key_tag) => {
            this.dataMsg.push({
              num:this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].SHOP_NAME,
              rate: ((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].VISITORS_DEAL||0)/10000).toFixed(0),   
              mon_tagname:"月累目标",
              mon_target:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].VISITOR_TARGET||0)/10000).toFixed(0),  
              mon_payname:"月累达成",
              mon_pay:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].VISITORS_DEAL_RATE||0)*100).toFixed(1),
              yesterday_payname:'日累目标',
              yesterday_pay:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].LJ_VISITOR_TARGET||0)/10000).toFixed(0),
              yesterday_ratename:'日累达成',
              yesterday_rate:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].LJ_VISITORS_DEAL_RATE||0)*100).toFixed(1),
            });
          });


          Object.keys(this.data["NON_PM_CORE_SHOP-TOP500"]).forEach((key_tagM) => {
 
            this.dataMsg.splice(1,0,{
              // num:this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].SHOP_NAME,
              num:'TOP500商品',
              rate: ((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].VISITORS_DEAL||0)/10000).toFixed(0),   
              mon_tagname:"月度目标",
              mon_target:((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].VISITOR_TARGET||0)/10000).toFixed(0),  
              mon_payname:"月累达成",
              mon_pay:((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].VISITORS_DEAL_RATE||0)*100).toFixed(1),
              yesterday_payname:'日累目标',
              yesterday_pay:((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].LJ_VISITOR_TARGET||0)/10000).toFixed(0),  
              yesterday_ratename:'日累达成',
              yesterday_rate:((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].LJ_VISITORS_DEAL_RATE||0)*100).toFixed(1),
              rank_on:'top500'
            });

          });


          // 汇总数据开始  
          this.dataMsgTotal.push({
            num:"整体达成",
            rate: ((this.data["NON_PM_CORE_SHOP-M_ALL"][0].VISITORS_DEAL||0)/10000).toFixed(0),   
            mon_tagname:"月累目标",
            mon_target:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].VISITOR_TARGET||0)/10000).toFixed(0),  
            mon_payname:"月累达成",
            mon_pay:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].VISITORS_DEAL_RATE||0)*100).toFixed(1),
            yesterday_payname:'日累目标',
            yesterday_pay:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].LJ_VISITOR_TARGET||0)/10000).toFixed(0),
            yesterday_ratename:'日累达成',
            yesterday_rate:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].LJ_VISITORS_DEAL_RATE||0)*100).toFixed(1),
          });

        }else if(this.UserRange_value_set=='4'){
          console.log("===44444==");

          Object.keys(this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"]).forEach((key_tag) => {
            this.dataMsg.push({
              num:this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].SHOP_NAME,
              rate: ((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].VISITORS_CONV_RATE||0)*100).toFixed(2),   
              mon_tagname:"月度目标",
              mon_target:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].VISITORS_CONV_RATE_TGT||0)*100).toFixed(2),  
              mon_payname:"月累达成",
              mon_pay:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].CONV_RATIO||0)*100).toFixed(1),
              yesterday_payname:'支付人数',
              yesterday_pay:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].PT_BUYER_CNT||0)).toFixed(0),  
              yesterday_ratename:'访客人数',
              yesterday_rate:((this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].VISITORS_DEAL||0)/10000).toFixed(1),
              rank_on:this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][key_tag].SHOP_RANK
            });
          });

          Object.keys(this.data["NON_PM_CORE_SHOP-TOP500"]).forEach((key_tagM) => {
 
            this.dataMsg.splice(1,0,{
              // num:this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].SHOP_NAME,
              num:'TOP500商品',
              rate: ((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].VISITORS_CONV_RATE||0)*100).toFixed(2),   
              mon_tagname:"月度目标",
              mon_target:((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].VISITORS_CONV_RATE_TGT||0)*100).toFixed(2),  
              mon_payname:"月累达成",
              mon_pay:((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].CONV_RATIO||0)*100).toFixed(1),
              yesterday_payname:'支付件数',
              yesterday_pay:((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].PAY_NUM||0)).toFixed(0),  
              yesterday_ratename:'访客人数',
              yesterday_rate:((this.data["NON_PM_CORE_SHOP-TOP500"][key_tagM].VISITORS_DEAL||0)/10000).toFixed(1),
              rank_on:'top500'
            });

          });


          // 汇总数据开始  
          this.dataMsgTotal.push({
            num:"整体达成",
            rate: ((this.data["NON_PM_CORE_SHOP-M_ALL"][0].VISITORS_CONV_RATE||0)*100).toFixed(2),   
            mon_tagname:"月度目标",
            mon_target:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].VISITORS_CONV_RATE_TGT||0)*100).toFixed(2),  
            mon_payname:"月累达成",
            mon_pay:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].CONV_RATIO||0)*100).toFixed(1),
            yesterday_payname:'支付人数',
            yesterday_pay:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].PT_BUYER_CNT||0)).toFixed(0), 
            yesterday_ratename:'访客人数',
            yesterday_rate:((this.data["NON_PM_CORE_SHOP-M_ALL"][0].VISITORS_DEAL||0)/10000).toFixed(1),
          });

        }else if(this.UserRange_value_set=='5'){
          console.log("===55555==");

          this.data["NON_PM_CORE_SHOP-PCT_M"].sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = a["SHOP_RANK"];
              b_time = b["SHOP_RANK"];
              return a_time - b_time;
          }); 

          Object.keys(this.data["NON_PM_CORE_SHOP-PCT_M"]).forEach((key_tag) => {
            this.dataMsg.push({
              num:this.data["NON_PM_CORE_SHOP-PCT_M"][key_tag].SHOP_NAME,
              rate: ((this.data["NON_PM_CORE_SHOP-PCT_M"][key_tag].CUST_PRC_A||0)).toFixed(0),   
              mon_tagname:"月度目标",
              mon_target:((this.data["NON_PM_CORE_SHOP-PCT_M"][key_tag].PCT_TGT||0)).toFixed(0),  
              mon_payname:"月累达成",
              mon_pay:((this.data["NON_PM_CORE_SHOP-PCT_M"][key_tag].PCT_RATIO||0)*100).toFixed(1),
              yesterday_payname:'同期增幅',
              yesterday_pay:((this.data["NON_PM_CORE_SHOP-PCT_M"][key_tag].PCT_YOY||0)*100).toFixed(2),  
              yesterday_ratename:'上期增幅',
              yesterday_rate:((this.data["NON_PM_CORE_SHOP-PCT_M"][key_tag].PCT_MOM||0)*100).toFixed(2),
              rank_on:this.data["NON_PM_CORE_SHOP-PCT_M"][key_tag].SHOP_RANK
            });
          });    

          // 汇总数据开始 
          this.dataMsgTotal.push({
            num:"线上渠道",
            rate: ((this.data["NON_PM_CORE_SHOP-PCT_M_ALL"][0].CUST_PRC_A||0)).toFixed(0),   
            mon_tagname:"同期客单",
            mon_target:((this.data["NON_PM_CORE_SHOP-PCT_M_ALL"][0].AGO_CUST_PRC_A||0)).toFixed(0),  
            mon_payname:"同期增幅",
            mon_pay:((this.data["NON_PM_CORE_SHOP-PCT_M_ALL"][0].PCT_YOY||0)*100).toFixed(2),
            yesterday_payname:'上期客单',
            yesterday_pay:((this.data["NON_PM_CORE_SHOP-PCT_M_ALL"][0].LAST_CUST_PRC_A||0)).toFixed(0), 
            yesterday_ratename:'上期增幅',
            yesterday_rate:((this.data["NON_PM_CORE_SHOP-PCT_M_ALL"][0].PCT_MOM||0)*100).toFixed(2),
          });

        }





        this.dateTime=(this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][0]==undefined||this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][0].LOAD_TIME==null)?'--':
          (this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][0].LOAD_TIME.substring(5,7)+'月'+this.data["NON_PM_CORE_SHOP-CORE_SHOP_M"][0].LOAD_TIME.substring(8,10)+'日 '+'10:30 am'); 
          
        
        if(this.UserRange_value_set=='4'||this.UserRange_value_set=='5'){
          this.initEcharts("chart7Visitor","Change_line");
        }else{
          this.initEcharts("chart7Visitor","retained_capital");
        }



        let _this=this;
        setTimeout(function name() {
          const targetNode = _this.$refs["Shop_Info"];
          _this.Shop_Info_On=targetNode.offsetTop;
          _this.Whole_Info_On=_this.$refs["Whole_Info"].offsetTop
          
        },50);
        
        
        
      });


    },

    
    initEcharts(user_refs,type) {

      // console.log(this.$refs);
      // console.log(JSON.stringify(this.$refs));
      // console.log(this.$refs["chart7Visitor"]);
      
      this.p1.then(() => {

        // console.log(type);
        this.chartIns = E.init(this.$refs[user_refs]);

        let Utime=[];
        let Uamt=[];
        let Uagoamt=[];
        let Urate=[];
        let _this=this;

        if(type=='retained_capital'){
          // console.log("运行到这里来！！！");
          // console.log(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"]);

          this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"].sort((a, b) => {
              let a_time = "";
              let b_time = "";
              a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
              b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
              return a_time - b_time;
          });
          if(this.UserRange_value_set=='1'){
            Object.keys(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"]).forEach((key_fun) => {
              Utime.push(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].TDATE.substring(5,7)*1+'.'+this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].TDATE.substring(8,10));
              Uamt.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].PAY_AMT/10000).toFixed(1));   
              Uagoamt.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].PAY_AMT_PREV/10000).toFixed(1));
              Urate.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].PAY_AMT_RATE*100).toFixed(1));
            });            
          }else if(this.UserRange_value_set=='2'){
            Object.keys(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"]).forEach((key_fun) => {
              Utime.push(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].TDATE.substring(5,7)*1+'.'+this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].TDATE.substring(8,10));
              Uamt.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].DLVRED_AMT/10000).toFixed(1));   
              Uagoamt.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].DLVRED_AMT_PREV/10000).toFixed(1));
              Urate.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].DLVRED_AMT_RATE*100).toFixed(1));
            });    
          }else if(this.UserRange_value_set=='3'){
            Object.keys(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"]).forEach((key_fun) => {
              Utime.push(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].TDATE.substring(5,7)*1+'.'+this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].TDATE.substring(8,10));
              Uamt.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].VISITORS_DEAL/10000).toFixed(1));   
              Uagoamt.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].VISITORS_DEAL_PREV/10000).toFixed(1));
              Urate.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].VISITORS_DEAL_RATE*100).toFixed(1));
            });    
          }

        }else if(type=='Change_line'){
          if(this.UserRange_value_set=='4'){

            Object.keys(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"]).forEach((key_fun) => {
              Utime.push(this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].TDATE.substring(5,7)*1+'.'+this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].TDATE.substring(8,10));
              Uamt.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].VISITORS_CONV_RATE*100).toFixed(2));   
              Uagoamt.push((this.data["NON_PM_CORE_SHOP-CORE_SHOP_D"][key_fun].VISITORS_CONV_RATE_PREV*100).toFixed(2));
            });

          }else if(this.UserRange_value_set=='5'){

            this.data["NON_PM_CORE_SHOP-PCT_MS"].sort((a, b) => {
                let a_time = "";
                let b_time = "";
                a_time = new Date(a["MDATE"]).getTime(new Date(a["MDATE"]));
                b_time = new Date(b["MDATE"]).getTime(new Date(b["MDATE"]));
                return a_time - b_time;
            });

            Object.keys(this.data["NON_PM_CORE_SHOP-PCT_MS"]).forEach((key_fun) => {
              Utime.push(this.data["NON_PM_CORE_SHOP-PCT_MS"][key_fun].MDATE.substring(5,7)*1+'月');
              Uamt.push((this.data["NON_PM_CORE_SHOP-PCT_MS"][key_fun].CUST_PRC_A).toFixed(0));   
              Uagoamt.push((this.data["NON_PM_CORE_SHOP-PCT_MS"][key_fun].AGO_CUST_PRC_A).toFixed(0));
            });

          }


        }


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
                  set_value=params[0].axisValue+
                    '<br/>'+params[0].marker+
                    '业绩：'+params[0].value+'万'+
                    ((params[1]==undefined)?'':('<br/>'+(params[1].marker)+
                    '同期：'+params[1].value+'万'))+
                    ((params[2]==undefined)?'':('<br/>'+(params[2].marker)+
                    '达成：'+params[2].value+'%'))
                    ;
                }else if(type=='Change_line'){
                  if(_this.UserRange_value_set=='5'){
                    set_value=params[0].axisValue+
                      '<br/>'+params[0].marker+
                      '本期：'+_this.fomatMoney(params[0].value)+''+
                      ((params[1]==undefined)?'':('<br/>'+(params[1].marker)+
                      '同期：'+_this.fomatMoney(params[1].value)+''));
                  }else{
                    set_value=params[0].axisValue+
                      '<br/>'+params[0].marker+
                      '本期：'+params[0].value+'%'+
                      ((params[1]==undefined)?'':('<br/>'+(params[1].marker)+
                      '同期：'+params[1].value+'%'));
                  }
                }

                return set_value;
              }

            },

            xAxis: {
              type: "category",
              boundaryGap: (type=='retained_capital')?true:false,  //柱子是否中间
              data: Utime,
              axisLine: {
                lineStyle: {
                  color: "#ccc",
                },
              },
              axisLabel: {
                // interval: 'auto',
                interval:(this.UserRange_value_set=='5')?1:((type=='retained_capital'||type=='Change_line')?0:3),
              },
            },
            yAxis:[

              {
                type: "value",
                name:'达成率',
                // type: "log",
                // type:(this.sel_value.Range_on.Range_set=='1')?"category":"value", 
                splitLine: {
                  show: (this.UserRange_value_set=='5'||this.UserRange_value_set=='4')?true:false,
                  lineStyle: { type: "dotted", color: "#ccc" },
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#ccc",
                  },
                  // formatter: (this.UserRange_value_set=='5')?"{value}":"{value}%"
                  formatter:function (value, index) {           
                    
                    return (_this.UserRange_value_set=='5')?(value.toFixed(0)):(_this.UserRange_value_set=='4')?(value.toFixed(1)+'%'):(value.toFixed(0)+'%');      
                  }
                },
              },
              
              {
                type: "value",
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


            ] ,

            series: [

              {
                name: "业绩",
                showSymbol: false,
                smooth: (type=='retained_capital')?true:false, //true 为平滑曲线，false为直线
                stack: (type=='retained_capital'||type=='Change_line')?'':'支付业绩',
                yAxisIndex:(this.UserRange_value_set=='5'||this.UserRange_value_set=='4')?0:1,
                itemStyle: {
                  color: "#0938F7",
                  normal: {
                    color: (type=='retained_capital'||type=='Change_line')?"#4169E1":"#D3D3D3",
                    lineStyle: {
                      color: (type=='retained_capital'||type=='Change_line')?"#4169E1":"#D3D3D3",
                      width: (type=='retained_capital')?0:2, //设置线条粗细
                    },
                    areaStyle: {
                      color: (type=='retained_capital')?'#D3D3D3':'rgba(211,211,211, 0)',
                    },
                  },
                },

                data: (type=='retained_capital'||type=='Change_line')?Uamt:Uagoamt,

                type: (type=='retained_capital')?"bar":"line",
                areaStyle: {},
              },   

              {
                name: "同期",
                showSymbol: false,  //是否显示刻度值
                smooth: (type=='retained_capital')?true:false, //true 为平滑曲线，false为直线
                stack: (type=='retained_capital'||type=='Change_line')?'':'支付业绩',
                yAxisIndex:(this.UserRange_value_set=='5'||this.UserRange_value_set=='4')?0:1,
                itemStyle: {
                  color: "#919191",
                  normal: {
                    color: (type=='retained_capital'||type=='Change_line')?"#D3D3D3":"#4169E1",
                    lineStyle: {
                      color: (type=='retained_capital'||type=='Change_line')?"#D3D3D3":"#4169E1",
                      width: (type=='retained_capital')?0:2, //设置线条粗细
                    },
                    areaStyle: {
                      color: (type=='retained_capital')?"rgba(65,105,225, 0.9)":"rgba(65,105,225, 0)",
                    },
                  },
                },
                data: (type=='retained_capital'||type=='Change_line')?Uagoamt:Uamt,
                type: (type=='retained_capital')?"bar":"line",
                areaStyle: {},
              },


              {
                name: "达成",
                showSymbol: false,  //是否显示刻度值
                smooth: false, //true 为平滑曲线，false为直线
                stack: (type=='retained_capital')?'达成率':'支付业绩',
                yAxisIndex:0,
                itemStyle: {
                  // color: "#919191",
                  normal: {
                    color: (type=='retained_capital')?"#F5A028":"#4169E1",
                    lineStyle: {
                      color: (type=='retained_capital')?"#F5A028":"#4169E1",
                      width: 2, //设置线条粗细
                    },
                    areaStyle: {
                      color: "rgba(65,105,225, 0)",
                    },
                  },
                },
                data: (type=='retained_capital')?Urate:'',
                type: "line",
                areaStyle: {},
              },
              

            ],

        });




      });



      // this.chartIns.setOption(this.chartOptions);
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

  //生命周期结束之前销毁
  beforeDestroy() {
    this.$EventBus.$off("OnlineDaily_f");
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
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;

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

.popup_css{
  border-radius: 10px;
}

.kjsm_bg{
  width: 300px;
  height: 50px;
  text-align: center;
  padding-top: 15px;
  //   font-weight: bold;
  font-size: 16px;
  //   background: url("~@/assets/images/sm_bg.png") no-repeat left top/cover;
}


</style>
