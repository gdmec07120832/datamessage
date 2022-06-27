<template>
  <div class="table-box" ref="HeightOn">
    <div class="TimeCss">
      <p>数据时间：{{Start_Time}} 至 {{End_Time}}</p>
    </div>

    <div class="CountCss">
      <div class="CounTitle">
        <p>本周整体概况</p>
      </div>

      <div class="IndexOnCss">
        <Indextcq v-bind="OnIndex" />        
      </div> 
      <div class="ChartCss" style="width:100%;" id="ChartTrendTest" :style="{display: (ChartIsNull===false)?'inline-block':'none'}">
        <div class="ChartCssOn" ref="ChartTrend" style="width:100%;height:250px;"></div>
      </div>
      <van-empty v-if="ChartIsNull===true" 
        :image='ImagesOn' 
        style="height:250px;" image-size="100" description="本周无发布" />

      <div class="TableCss">
        <Tabletcq v-bind="tableData" v-if="TavleIsNull===false" />
        <van-empty v-if="TavleIsNull===true"
          :image='ImagesOn' 
          style="height:250px;" image-size="100" description="本周无发布" />
      </div>

    </div>

  </div>
</template>

<script>
// 做近7天处理开始
let _time_now=new Date();
_time_now=_time_now.getTime()-((24*6)*60*60*1000);
_time_now=new Date(_time_now);
// 做近7天处理结束
import E from "echarts";
import "echarts/lib/component/legend";
import Indextcq from "@/views/data-report-ding/MenuSwitch/components/Indextcq.vue";
import Tabletcq from "@/views/data-report-ding/MenuSwitch/components/tabletcq.vue";
import {ChartData} from "@/views/data-report-ding/MenuSwitch/Currency.js";
import {ajax_fun} from "@/views/data-report-ding/MenuSwitch/Ajax.js";
import moment from 'moment';
import {Empty} from "vant";
export default {
  name:'Release',
  components: {
    Indextcq,
    Tabletcq,
    [Empty.name]:Empty,
  },
  data(){
    return{
      OnIndex:[],
      ImagesOn:require("@/assets/empty-image-default.png"),
      ECharesDat:{},
      // tableData:{},
      tableData:{
        index:'Release',
        labelD:[],
        tableD:[],
      },
      Start_Time:moment(_time_now).format("YYYY-MM-DD"),
      End_Time:moment(new Date()).format("YYYY-MM-DD"),
      TavleIsNull:false,
      ChartIsNull:false,
    }
  },
  watch:{

  },
  created() {
    this.ECharesDat= ChartData();
    this.OnIndex=[
      {OnType:'Release',sign:0,OnWith:50, IndexData:[
        {title:'需求数量',Tnum:0,ContInfo:[]},
        {title:'开发任务',Tnum:0,ContInfo:[]},
        {title:'测试缺陷',Tnum:0,ContInfo:[]},
        {title:'线上缺陷',Tnum:0,ContInfo:[]},
        {title:'部门人数',Tnum:0,ContInfo:[]},
      ]},
    ];

    this.tableData.labelD=[
      {Val:'部门',Width:16.66},
      {Val:'发布总数',Width:16.66},
      {Val:'常规发布',Width:16.66},
      {Val:'占比',Width:16.66},
      {Val:'紧急发布',Width:16.66},
      {Val:'占比',Width:16.66}
    ];

    this.tableData.tableD=[
      [
        {Val:'4PL物流平台',Width:16.66},
        {Val:21,Width:16.66},
        {Val:13,Width:16.66},
        {Val:61.9,Width:16.66},
        {Val:8,Width:16.66},
        {Val:38.1,Width:16.66}        
      ]
    ];

    const apiMap2 = {
      // 数信中心技术运营周报      
      "SQL-NON_PM_PUSH-PUSH_TOTAL": { resultProp: "PUSH_TOTAL" },
      "SQL-NON_PM_PUSH-PUSH_DEPT": { resultProp: "PUSH_DEPT" },
    }
    this.UserData=ajax_fun(apiMap2,{start_date:moment(_time_now).format("YYYYMMDD"),
      end_date:moment(new Date()).format("YYYYMMDD")});

  },
  mounted() {
    const _thisOn=this;
    window.addEventListener("resize",()=>{
      console.log("====111111运行上了！！！======");
      E.init(_thisOn.$refs["ChartTrend"]).resize();
    },false);

    this.GetViewData();
    this.ChartFun();
    this.TableWholeFun();
    // setTimeout(() => {
    //   // console.log(this.$refs["HeightOn"].offsetHeight);
    //   this.$EventBus.$emit("SwiperHeight",{num:1,height: this.$refs["HeightOn"].offsetHeight});
    // },500);
    this.$EventBus.$on("SwiperHeightSend", (data) => {
      if(data.num==1){
        this.$EventBus.$emit("SwiperHeight",{num:1,height: this.$refs["HeightOn"].offsetHeight});
      }
    });

    
    

  },
  methods: {

    GetViewData(){
      this.UserData.p1.then(()=>{
        if(this.UserData.SetData["NON_PM_PUSH-PUSH_TOTAL"].length>0){
          this.OnIndex=[
            {OnType:'Release',sign:0,OnWith:100, IndexData:[
              {title:'发布总数',Tnum:this.UserData.SetData["NON_PM_PUSH-PUSH_TOTAL"][0].PUBLISH_CNT,ContInfo:[]},
              {title:'常规发布',Tnum:this.UserData.SetData["NON_PM_PUSH-PUSH_TOTAL"][0].ROUTINE_CNT,ContInfo:[
                {title:'占比',val:this.UserData.SetData["NON_PM_PUSH-PUSH_TOTAL"][0].ROUTINE_CNT_RATE}
              ]},
              {title:'紧急发布',Tnum:this.UserData.SetData["NON_PM_PUSH-PUSH_TOTAL"][0].URGENT_CNT,ContInfo:[
                {title:'占比',val:this.UserData.SetData["NON_PM_PUSH-PUSH_TOTAL"][0].URGENT_CNT_RATE}
              ]},
            ]},
          ];
        }else{
          this.OnIndex=[
            {OnType:'Release',sign:0, IndexData:[
              {title:'发布总数',Tnum:0,ContInfo:[]},
              {title:'常规发布',Tnum:0,ContInfo:[]},
              {title:'紧急发布',Tnum:0,ContInfo:[]},
            ]},
          ];
        }

      });
    },

    ChartFun(){

      this.UserData.p1.then(()=>{
        let OnData=this.UserData.SetData["NON_PM_PUSH-PUSH_DEPT"];
        this.chartIns = E.init(this.$refs["ChartTrend"]);
        this.ECharesDat.xAxis[0].data=[];
        this.ECharesDat.series[0].data=[];
        this.ECharesDat.series[1].data=[];
        this.ECharesDat.grid.top=35;
        this.ECharesDat.grid.left=20;
        this.ECharesDat.grid.right=20;
        this.ECharesDat.series[0].type='bar';
        this.ECharesDat.series[1].type='bar';
        this.ECharesDat.series[0].barWidth='15%';
        this.ECharesDat.series[1].barWidth='15%';
        this.ECharesDat.series[0].itemStyle.normal.color='#5B8FF9';
        this.ECharesDat.series[1].itemStyle.normal.color='#F7C739';
        this.ECharesDat.series[0].name='常规发布';
        this.ECharesDat.series[1].name='紧急发布';
        this.ECharesDat.legend.x='center';

        if(OnData.length>0){
          this.ChartIsNull=false;
          Object.keys(OnData).forEach((OnKey) => {
            this.ECharesDat.xAxis[0].data.push(OnData[OnKey].TWO_DEPT);
            this.ECharesDat.series[0].data.push(OnData[OnKey].ROUTINE_CNT);
            this.ECharesDat.series[1].data.push(OnData[OnKey].URGENT_CNT);
          });
        }else{
          this.ChartIsNull=true;
        }


        this.chartIns.setOption(this.ECharesDat);
      });

    },

    TableWholeFun(){
      this.UserData.p1.then(()=>{

        this.tableData.labelD=[
          {Val:'部门',Width:22},
          {Val:'发布总数',Width:16.66},
          {Val:'常规发布',Width:16.66},
          {Val:'占比',Width:13.32},
          {Val:'紧急发布',Width:16.66},
          {Val:'占比',Width:14.66}
        ];
        let OnData=this.UserData.SetData["NON_PM_PUSH-PUSH_DEPT"];
        this.tableData.tableD=[];
        
        if(OnData.length>0){
          this.TavleIsNull=false;
          Object.keys(OnData).forEach((OnKey) => {
            this.tableData.tableD.push(
              [
                {Val:OnData[OnKey].TWO_DEPT,Width:22},
                {Val:OnData[OnKey].PUBLISH_CNT,Width:16.66},
                {Val:OnData[OnKey].ROUTINE_CNT,Width:16.66},
                {Val:OnData[OnKey].ROUTINE_CNT_RATE.toFixed(1)+'%',Width:13.32},
                {Val:OnData[OnKey].URGENT_CNT,Width:16.66},
                {Val:OnData[OnKey].URGENT_CNT_RATE.toFixed(1)+'%',Width:14.66},
              ]
            )
          });          
        }else{
          this.tableData.tableD=[];
          this.TavleIsNull=true;
        }



      });
    }


  }

}
</script>

<style lang="scss" scoped>
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

  .TimeCss{
    p{
      font-size: 12px;
      padding: 0;
      margin: 0;
      // padding-left: 5px;   
      padding-left: 20px;   
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;    
    }
  }
  .CountCss{
    margin-top: 10px;
    background: #FFFFFF;
    box-shadow: 0px 4px 6px 0px #F7F7F7;
    border-radius: 15px 15px 0px 0px;
    .CounTitle{
      // padding: 10px 5px;
      padding: 10px 20px;
      p{
        padding: 0;
        margin: 0; 
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
      }
    }
    .IndexOnCss{
      .IndexCss{
        padding: 0px 5px;
        padding-top: 10px;
      }
    }
    .ChartCss{
      padding-top: 20px;
    }
    .TableCss{
      padding-top: 20px;
    }
    
  }

}
</style>