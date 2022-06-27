<template>
  <div>


    <!-- 说明开始 -->
    <van-popup v-model="question_show" class="popup_css" get-container="body">
      <div class="kjsm_bg" style="">
        <p style="margin: 0 auto;">逻辑说明</p>            
      </div>
      <div style="text-align: left;font-size: 14px;padding-left: 20px;padding-right: 20px;padding-bottom: 20px;line-height: 23px; color:#555555;">
        <p style="margin-bottom: 5px;margin-top: 5px;">
          1、数据范围：林氏自营+经销林氏三包
        </p>
        <p style="margin-bottom: 5px;margin-top: 5px;">
          2、特别说明：<br/>
          ①是否异常：消化天数大于等于标准值则“异常”，或消化能力为0且预期库存大于0的线路也是“异常”；
          ②异常占比指的是异常线路库存占比
        </p>
        <p style="margin-bottom: 5px;margin-top: 5px;">
          3、指标解释：<br/>
          1）达标天数：本月中，消化天数＜标准值 的累计天数<br/>
          2）达标天数占比：达标天数/截止到昨日的月总天数<br/>
          3）异常线路库存：（消化天数>=标准值）or（消化能力为0且预期库存大于0）的线路对应的库存汇总<br/>
          4）异常线路库存占比：异常线路预期库存/总预期库存<br/>
          5）前100异常线路数量：线路数量计数，条件：a、线路上月发货体积在前100名范围内   b、是否异常：是<br/>
          6）目标产能：预期库存/标准值  ，标准值跟据填报表取数。<br/>
          7）预期库存：等于已到未签+超时未到货 （体积）<br/>
          8）消化天数：预期库存/消化能力 （体积）<br/>
          9）消化能力：(1天前消化+2天前+3天前)/3<br/>
          10）昨日目标消化： 昨日预期库存/填报的消化天数标准<br/>
          11）昨日实际消化：昨日送装汇总
        </p>
      </div>
    </van-popup>
    <!-- 说明结束 -->

    <div class="table-box">

      <div class="top-content clearfix" style="padding: 0px; padding-bottom: 5px;">
        <div class="title fl" style="margin-left: 0px;width:100%;">
          <span style="font-weight: normal;font-size: 12px;color: #969696;float: left;line-height: 22px;">更新时间：{{
            (Summary.length>0)?(Summary[0].LOAD_TIME).substring(0,10):'--'  
          }}</span>
          <span @click="showPopup_sm" style="float: right;font-weight: normal;font-size: 12px;line-height: 22px;color: #1E90FF;">逻辑说明</span>
        </div>
      </div>

      <!-- 整体概况开始 -->
      <div ref="Whole_Info" class="pay_retail_title" style="background: #1E90FF;border-top-right-radius: 6px;border-top-left-radius: 6px;margin-top: 0px;">
        <p style="padding: 8px 15px;margin: 0px;font-size: 14px;color: #fff;">整体概况</p>
      </div>

      <div style="background-color: #fff;">
        <ul class="pay_retail_cont">
          <li>
            <div style="margin-left: 5px;margin-right: 5px;" :style="{'border-bottom':'1px solid #ddd'}">
              <div class="pay_retail_cont_title" style="padding-top: 10px;">
                <!-- <p style="font-size: 14px;padding: 10px;margin: 0px;float: left;">11111</p> -->
                <div style="clear: both;"></div>
              </div>
              <ul class="pay_retail_cont_text">

                <li style="border-left: 0px;width: 15%;"><p>{{(Summary.length>0)?(Summary[0].INSTALL_CNT).toFixed(1):'--'}}</p> 
                  <p class="pay_retail_cont_p">消化天数</p>
                </li>

                <li><p>{{(Summary.length>0)?((Summary[0].LAST_3DAY_INSTALL_VOL).toFixed(1)+'m³'):'--'}}</p> 
                  <p class="pay_retail_cont_p">消化能力</p>
                </li>

                <li><p>{{(Summary.length>0)?(((Summary[0].STOCK_VOL)/10000).toFixed(1)+'万m³'):'--'}}</p> 
                  <p class="pay_retail_cont_p">预期库存</p>
                </li>

                <li>
                  <p>
                    {{(Summary.length>0)?
                      (((Summary[0].STOCK_VOL!=0)?(Summary[0].ABNORMAL_STOCK_VOL_SUM/Summary[0].STOCK_VOL)*100:0).toFixed(1)+'%')
                    :'--'}}  
                  </p>
                  <p class="pay_retail_cont_p">异常占比</p>
                </li>

                <li style="width: 25%;">
                  <p>{{(Summary.length>0)?(((Summary[0].ABNORMAL_SUM)).toFixed(0)):'--'}}</p>   
                  <p class="pay_retail_cont_p">前100异常线路</p>
                </li>
              </ul>  
              <div style="clear: both;"></div>                          
            </div>
          </li>
        </ul>
      </div>      

      <!-- @click='testf' -->
      <div style="background-color: #fff;padding-left: 10px;padding-top: 10px;">
        <!-- <van-radio-group v-model="checked" direction="horizontal" @change='ClickOn' >
          <van-radio :name="(val.SUPERVISION)?val.SUPERVISION:'-1'" icon-size="16px" v-for="(val, key) in Supervision" :key="key" >
            {{(val.SUPERVISION)?val.SUPERVISION:'其它'}}
          </van-radio>
        </van-radio-group> -->

        <van-checkbox-group v-model="checkedS" direction="horizontal" @change='ClickOnS' >
          <van-checkbox shape="square" :name="(val.SUPERVISION)?val.SUPERVISION:'-1'" icon-size="16px" v-for="(val, key) in Supervision" :key="key" >
            {{(val.SUPERVISION)?val.SUPERVISION:'其它'}}
          </van-checkbox>
        </van-checkbox-group>

      </div>


      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>近7天消化趋势</div>
      </div>
      <div class="performance" ref="DigestionDays"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>近7天产能趋势</div>
      </div>
      <div class="performance" ref="DigestionCapacity"></div>
      <!-- 整体概况结束 -->


      <!-- 明细数据开始  -->
      <div ref="Whole_Info" class="pay_retail_title" style="background: #1E90FF;border-top-right-radius: 6px;border-top-left-radius: 6px;margin-top:10px;">
        <p style="padding: 8px 15px;margin: 0px;font-size: 14px;color: #fff;">top5库存异常线路</p>
      </div>

      <div style="background-color: #fff;padding-top: 10px;padding-bottom: 20px;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;">
        <ul class="amt_table_css">
          <li class="amt_title">
            <ul class="amt_table_css_ul">
              <li style="width:30%;">线路名称</li>
              <li>预期库存</li>
              <li>已到未签</li>
              <li>超时未到</li>
              <li>消化天数</li>
              <li>消化能力</li>
            </ul>
            <div style="clear: both;"></div>            
          </li>


          <!-- DetailedData :style="{'font-weight': 'bold','background-color': ''}"-->
          <li v-for="(val, key) in DetailedData" :key="key"  
            style="line-height: 30px;"
            class="amt_cont">
            <ul class="amt_table_css_ul">
              <li style="width:30%;">{{(val.LINEAREA_NAME)?val.LINEAREA_NAME:'--'}}</li>
              <li>{{ val.STOCK_VOL.toFixed(0)}}</li>
              <li>{{ val.ARRIVAL_UNSIGNED_VOL.toFixed(0)}}</li>
              <li>{{ val.SEND_UNARRIVAL_OVERTIME_VOL.toFixed(0)}}</li>
              <li>{{ val.INSTALL_CNT.toFixed(1)}}</li>
              <li>{{ val.LAST_3DAY_INSTALL_VOL.toFixed(0)}}</li>
            </ul>
            <div style="clear: both;"></div>
          </li>


          <!-- 点击收起 -->

        </ul>

      </div>

      <!-- 明细数据结束  -->

    </div>


  </div>
</template>

<script>
import E from "echarts";
import {ajax_fun} from "@/views/data-report-ding/MenuSwitch/Ajax.js";
// import {rTime,unique} from "@/views/data-report-ding/MenuSwitch/Currency.js";
import {unique} from "@/views/data-report-ding/MenuSwitch/Currency.js";
import {RadioGroup, Radio,Popup,Checkbox,CheckboxGroup} from "vant";


export default {
  name:'RegManager',
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]:Popup,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup
  },

  data() {
    return{

      Supervision:[],
      UserData:[],
      SystemTime:'',
      DetailedData:[],
      Summary:[],
      question_show:false,
      checked:'',
      checkedS:[],

      chartOption:{

            grid: {
              left: "5%",
              top: "6%",
              right: "5%",
              // bottom: "15%",
              bottom: "12%",
              containLabel: true,
            },

            legend: {
              show: true,
              data: ["业绩", "同期"],

              bottom: "0%",
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
                // type: (type=='retained_capital')?'shadow':'line',
                type: 'shadow',
                label: {
                  color: "#000000",
                  backgroundColor: "aliceblue",
                },
              },

            },

            xAxis: {
              type: "category",
              boundaryGap: true,  //柱子是否中间
              data: [],
              axisLine: {
                lineStyle: {
                  color: "#ccc",
                },
              },
              axisLabel: {
                interval: 'auto',
                // interval:(this.UserRange_value_set=='5')?1:((type=='retained_capital'||type=='Change_line')?0:3),
              },
            },
            yAxis:[

              {
                type: "value",
                name:'消化天数值',
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
                  show: true,
                  textStyle: {
                    color: "#ccc",
                  },
                  // formatter: (this.UserRange_value_set=='5')?"{value}":"{value}%"
                  // formatter:function (value, index) {           
                  //   return (_this.UserRange_value_set=='5')?(value.toFixed(0)):(_this.UserRange_value_set=='4')?(value.toFixed(1)+'%'):(value.toFixed(0)+'%');      
                  // }
                },
              },
              
              {
                type: "value",
                name:'天数占比',
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
                  show: true,
                  textStyle: {
                    color: "#ccc",
                  },
                  formatter: "{value}%"
                },
                // data:ynew_data,
                // data:Utime,
              },


            ] ,

            series: [

              {
                name: "消化天数",
                showSymbol: false,
                smooth: true, //true 为平滑曲线，false为直线
                stack: '',
                yAxisIndex:0,
                itemStyle: {
                  color: "#0938F7",
                  normal: {
                    color: "#4169E1", 
                    lineStyle: {
                      color: "#4169E1",
                      width: 2, //设置线条粗细
                    },
                    areaStyle: {
                      color: 'rgba(211,211,211, 0)',
                    },
                  },
                },

                data: [],

                type: "bar",
                areaStyle: {},
              },   
              {
                name: "标准值",
                showSymbol: false,  //是否显示刻度值
                smooth: true, //true 为平滑曲线，false为直线
                stack:'',
                yAxisIndex:0,
                itemStyle: {
                  color: "#919191",
                  normal: {
                    color: "#D3D3D3", 
                    lineStyle: {
                      color: "#D3D3D3",
                      width: 2, //设置线条粗细
                      type: "dotted", //'dotted'虚线 'solid'实线
                    },
                    areaStyle: {
                      color: "rgba(65,105,225, 0)",
                    },
                  },
                },
                data: [],
                type: "line",
                areaStyle: {},
              },

              {
                name: "达标天数占比",
                showSymbol: true,  //是否显示刻度值
                smooth: true, //true 为平滑曲线，false为直线
                stack:'',
                yAxisIndex:1,
                itemStyle: {
                  color: "#919191",
                  normal: {
                    color: "#FF7F0E",
                    lineStyle: {
                      color: "#FF7F0E",
                      width: 2, //设置线条粗细
                    },
                    areaStyle: {
                      color: "rgba(65,105,225, 0)",
                    },
                  },
                },
                data: [],
                type: "line",
                areaStyle: {},
              },


            ],
      }

      
    }

  },
  created() {

    // let _time_now=new Date();
    // _time_now=_time_now.getTime()-(24*60*60*1000);
    // _time_now=new Date(_time_now);
    // this.SystemTime=rTime(_time_now).substring(0,10);
    // // this.SystemTime='2022-03-06';


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

    this.SystemTime=this.view_time;



    const apiMap2 = {
      // 线上重点店铺运营日报         
      "SQL-NON_PM_OA-DIGEST_DING_M_SUPERVISION": { resultProp: "DIGEST_DING_M_SUPERVISION" },
      "SQL-NON_PM_OA-SUPERVISION": { resultProp: "SUPERVISION" },
    }
    this.UserData=ajax_fun(apiMap2,{TDATE:this.SystemTime}); 
    this.GetSuperVion();

  },

  mounted() { 

    this.GetData();
    this.DigestionDaysF({TDATE:this.SystemTime});
    this.DigestionCaptyF({TDATE:this.SystemTime});
    this.DetailedF({TDATE:this.SystemTime});

  },

  methods: {
    showPopup_sm(){
      this.question_show=true;
    },   
    
    ClickOnS(){
      let OnUserData='';
      Object.keys(this.checkedS).forEach((key_fun) => {
        OnUserData+=this.checkedS[key_fun]+','
      });
      this.DigestionDaysF({SUPERVISION:OnUserData,TDATE:this.SystemTime});
      this.DigestionCaptyF({SUPERVISION:OnUserData,TDATE:this.SystemTime});
      this.DetailedF({SUPERVISION:OnUserData,TDATE:this.SystemTime});

    },
    
    ClickOn(){

      // console.log("运行到这里来!!!");
      this.checked=(this.checked)?this.checked:'-1'
      // console.log(this.checked);
      this.DigestionDaysF({SUPERVISION:this.checked,TDATE:this.SystemTime});
      this.DigestionCaptyF({SUPERVISION:this.checked,TDATE:this.SystemTime});
      this.DetailedF({SUPERVISION:this.checked,TDATE:this.SystemTime});

    },

    GetSuperVion(){
      this.UserData.p1.then(() => {
        this.Supervision=this.UserData.SetData["NON_PM_OA-SUPERVISION"].map((item)=>{return {SUPERVISION:item["SUPERVISION"],NUM:(item["SUPERVISION"])?'2':'1'}});
        this.Supervision.sort((a,b)=>{return b["NUM"]-a["NUM"]});
      });
    },

    GetData(){
      this.UserData.p1.then(() => {
        this.Summary=((this.UserData.SetData["NON_PM_OA-DIGEST_DING_M_SUPERVISION"]).length>0)?this.UserData.SetData["NON_PM_OA-DIGEST_DING_M_SUPERVISION"]:'--';
      });
    },
    DetailedF(SupervisionName){
      SupervisionName=(SupervisionName)?SupervisionName:null;
      const apiMapDet={"SQL-NON_PM_OA-DIGEST_DING_M_7DAYS_TOP5_NEW": { resultProp: "DIGEST_DING_M_7DAYS_TOP5_NEW" },};
      let DetailData=ajax_fun(apiMapDet,SupervisionName);
      DetailData.p1.then(() => {
        this.DetailedData=DetailData.SetData["NON_PM_OA-DIGEST_DING_M_7DAYS_TOP5_NEW"];
      });
    },

    DigestionDaysF(SupervisionName){

      SupervisionName=(SupervisionName)?SupervisionName:null;
      const apiMapDig={"SQL-NON_PM_OA-DIGEST_DING_M_7DAYS_NEW": { resultProp: "DIGEST_DING_M_7DAYS_NEW" },};
      let ChartDig=ajax_fun(apiMapDig,SupervisionName);

      ChartDig.p1.then(() => {
        this.chartIns = E.init(this.$refs["DigestionDays"]);

        // //开发时间
        let SuperviseData=ChartDig.SetData["NON_PM_OA-DIGEST_DING_M_7DAYS_NEW"];
        SuperviseData.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
            b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
            return a_time - b_time;
        });
        this.chartOption.xAxis.data=unique(SuperviseData.map((item)=>item["TDATE"].substring(5,10)));
        this.chartOption.series[0].data=(SuperviseData.map((item)=>item["INSTALL_CNT"].toFixed(1)));
        this.chartOption.series[0].name="消化天数";
        this.chartOption.series[1].data=(SuperviseData.map((item)=>item["XHUA_DAYS_TGT"].toFixed(1)));
        this.chartOption.series[1].name="标准值";
        this.chartOption.series[2].data=(SuperviseData.map((item)=>(item["NORMAL_DAY_SUM"]/item["DAY_SUM"])*100)); 
        this.chartOption.series[2].name="达标天数占比";
        this.chartOption.legend.data=["消化天数", "标准值","达标天数占比"];
        this.chartOption.tooltip.formatter=(params)=>{
          return params[0].axisValue+'<br/>'+params[0].marker+'消化天数：'+params[0].value+'<br/>'+
          params[1].marker+'标准值：'+params[1].value+'<br/>'+
          params[2].marker+'达标天数占比：'+(params[2].value).toFixed(2)+'%';  
        };
        this.chartOption.series[1].type='line'; 
        this.chartIns.setOption(this.chartOption);

      });

    }, 

    DigestionCaptyF(SupervisionName){
      SupervisionName=(SupervisionName)?SupervisionName:null
      const apiMapDigCap={"SQL-NON_PM_OA-DIGEST_DING_M_7DAYS_NEW": { resultProp: "DIGEST_DING_M_7DAYS_NEW" },};
      let ChartDigCap=ajax_fun(apiMapDigCap,SupervisionName);

      ChartDigCap.p1.then(() => {
        this.chartInsB = E.init(this.$refs["DigestionCapacity"]);
        //开发时间
        let SuperviseData=ChartDigCap.SetData["NON_PM_OA-DIGEST_DING_M_7DAYS_NEW"];
        SuperviseData.sort((a, b) => {
            let a_time = "";
            let b_time = "";
            a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
            b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
            return a_time - b_time;
        });
        this.chartOption.xAxis.data=unique(SuperviseData.map((item)=>item["TDATE"].substring(5,10)));
        this.chartOption.series[0].data=(SuperviseData.map((item)=>item["LAST_3DAY_INSTALL_VOL"].toFixed(1)));
        this.chartOption.series[0].name="消化能力";
        this.chartOption.series[1].data=(SuperviseData.map((item)=>item["INSTALL_CNT_TARGET"].toFixed(1)));
        this.chartOption.series[1].name="目标产能";
        this.chartOption.series[2].data=(SuperviseData.map((item)=>(item["ABNORMAL_STOCK_VOL_SUM"]/item["STOCK_VOL"])*100));
        this.chartOption.series[2].name="异常线路库存占比";
        this.chartOption.legend.data=["消化能力", "目标产能","异常线路库存占比"];
        this.chartOption.tooltip.formatter=(params)=>{
          return params[0].axisValue+'<br/>'+params[0].marker+'消化能力：'+params[0].value+'<br/>'+
          params[1].marker+'目标产能：'+params[1].value+'<br/>'+
          params[2].marker+'异常线路库存占比：'+(params[2].value).toFixed(2)+'%';  
        };

        this.chartOption.series[1].type='bar'; 
        this.chartInsB.setOption(this.chartOption);

      });

    }
    

  }



}
</script>

<style lang="scss" scoped>

.van-radio{
  padding-top: 10px;
  font-size: 14px;
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


.pay_retail_cont li{
  >div{
    > ul.pay_retail_cont_text{
      > li{
        float: left;
        width: 20%;
        font-size: 12px;
        // border-left: 1px solid #ddd;  
        border-left: 1px dashed #ddd;
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

.performance {
  width: 100%;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
}


.amt_table_css{
  > li{
    color: #808080;
  }
  > li.amt_cont{
    color: 	#343437;
  }
}

.amt_table_css_ul{
  > li{
    float: left;
    // width: 16.598%;
    width: 14%;
    text-align: center;
    font-size: 12px;
  }
}

.popup_css{
  border-radius: 10px;
  height: 550px;
}

.kjsm_bg{
  width: 340px;
  height: 50px;
  text-align: center;
  padding-top: 15px;
  font-size: 16px;
}

</style>