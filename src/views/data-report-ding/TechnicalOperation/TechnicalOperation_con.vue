<template>
  <div class="table-box">
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

      <div class="ChartCss" style="width:100%;" id="ChartTrendTest">
        <div class="ChartCssOn" ref="ChartTrend" style="width:100%;height:250px;"></div>
      </div>

      <div class="TableCss">
        <div class="SingChoice">
          <van-radio-group v-model="AreaData.area" direction="horizontal">
            <van-radio :name="val" icon-size="16px" v-for="(val, key) in AreaData.areaOption" :key="key">
              <div style="font-size: 12px;">{{val}}</div>
            </van-radio>
          </van-radio-group>
        </div>
        <Tabletcq v-bind="tableData" />
      </div>
    </div>

    <div class="CountCss">
      <div class="Detailed">
        <div class="Title">本周个体概况</div>
        <div class="SwitchCss">
          <div class="Fenbu">分布</div>  
          <van-switch class="SwitchOn" v-model="checked" active-color="rgba(244,244,245, 0.80)" size="14px" inactive-color="rgba(244,244,245, 0.80)" />
          <div class="Mingxi">明细</div>
        </div>
      </div>

      <div class="DetailCharts" :style="{display: (checked===false)?'inline':'none'}">
        <div class="ProductTop10" style="padding-top: 0px;">
          <TitleOn :label="'产品经理负责需求TOP10'" :IsChange='false' />
          <div class="ChartsTop10">
            <div class="ChartProTopCss" ref="ChartProTop" style="width:100%;height:250px;"></div>
          </div>
        </div>

        <div class="ProductTop10">
          <TitleOn :label="'开发负责需求数TOP10'" :IsChange='true' :value.sync='AreaDataDeve.area' :Option='AreaDataDeve' />
          <div class="ChartsTop10">
            <div class="DevelopmentScc" ref="ChartDevel" style="width:100%;height:250px;"></div>
          </div>
        </div>

        <div class="ProductTop10">
          <TitleOn :label="'开发缺陷数TOP10'" :IsChange='true' :value.sync='AreaDataDefe.area' :Option='AreaDataDefe' />

          <div class="ChartsTop10" :style="{display: (AreaDataDefe.IsNull===true)?'none':'inline'}">
            <div class="DefectScc" ref="ChartDefect" style="width:100%;height:250px;"></div>
          </div>
          <van-empty v-if="AreaDataDefe.IsNull===true" 
            :image='ImagesOn'
            style="height:250px;" image-size="100" description="本周无缺陷" />
        </div>


      </div>

      <div class="DetailTable" :style="{display: (checked===true)?'inline':'none'}">
        <div class="TableTop10">
          <TitleOn :label="'产品经理负责需求TOP10'" :IsChange='false' />
          <Tabletcq v-bind="ProTabData" />
        </div>

        <div class="TableTop10">
          <TitleOn :label="'开发负责需求数TOP10'" :IsChange='true' :value.sync='AreaDataDeveTab.area' :Option='AreaDataDeveTab' />
          <Tabletcq v-bind="DeveTabData" />
        </div>

        <div class="TableTop10">
          <TitleOn :label="'开发缺陷数TOP10'" :IsChange='true' :value.sync='AreaDataDefeTab.area' :Option='AreaDataDefeTab' />
          <Tabletcq v-if="AreaDataDefeTab.IsNull===false" v-bind="DefeTabData1" />
          <!-- <Tabletcq v-bind="DefeTabData2" v-if="AreaDataDefeTab.area==='需求'" /> -->
          <van-empty v-if="AreaDataDefeTab.IsNull===true" style="height:250px;" image-size="100" description="本周无缺陷" />
        </div>

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
import TitleOn from "@/views/data-report-ding/MenuSwitch/components/Title.vue";
import {RadioGroup, Radio,Popup,Checkbox,CheckboxGroup,Switch,Icon,Empty} from "vant";
import {ChartData} from "@/views/data-report-ding/MenuSwitch/Currency.js";
import {ajax_fun} from "@/views/data-report-ding/MenuSwitch/Ajax.js";
import moment from 'moment'
export default {
  name:'Demand',
  components: {
    Indextcq,
    Tabletcq,
    TitleOn,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]:Popup,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
    [Switch.name]:Switch,
    [Icon.name]:Icon,
    [Empty.name]:Empty


  },
  data(){
    return{
      OnIndex:[],
      ImagesOn:require("@/assets/empty-image-default.png"),
      AreaData:{
        area:'数量',
        areaOption:['数量','占比'],
        IsNull:false,
      },
      AreaDataDeve:{
        area:'需求',
        areaOption:['需求','任务'],
        IsNull:false,
      },
      AreaDataDeveTab:{
        area:'需求',
        areaOption:['需求','任务'],
        IsNull:false,
      },
      AreaDataDefe:{
        area:'需求',
        areaOption:['需求','开发'],
        IsNull:false,
      },
      AreaDataDefeTab:{
        area:'需求',
        areaOption:['需求','开发'],
        IsNull:false,
      },

      checked:false,
      tableData:{
        index:'Demand',
        labelD:[],
        tableD:[],
      },
      ProTabData:{
        index:'Demand_Pro',
        labelD:[],
        tableD:[],
      },
      DeveTabData:{
        index:'Demand_Deve',
        labelD:[],
        tableD:[],
      },
      DefeTabData1:{
        index:'Demand_Defe1',
        labelD:[],
        tableD:[],
      },
      DefeTabData2:{
        index:'Demand_Defe2',
        labelD:[],
        tableD:[],
      },
      ECharesDat:{},
      ECharesProDat:{},
      ECharesDeveDat:{},
      ECharesDefeDat:{},
      Start_Time:moment(_time_now).format("YYYY-MM-DD"),
      End_Time:moment(new Date()).format("YYYY-MM-DD")

    }
  },
  watch:{
    'checked':{
      handler(){
        // console.log("==================!!!!!!!!!!!")
        // console.log(this.checked);
        if(this.checked===false){
          setTimeout(() => {
            this.ChartProTop10Fun();
            this.ChartDevelFun();
            this.ChartDefectFun();
          }, 50)
        }else{
          this.TableProTop10Fun();
          this.TableDevelFun();
          this.TableDefectFun();
        }
      }
    },

    'AreaData.area':{
      handler(){
        // console.log("========组件有变化=========");
        // console.log(this.AreaData.area);
        this.TableWholeFun();
        
      }
    },
    'AreaDataDeve.area':{
      handler(){
        // 开发负责需求数TOP10
        this.ChartDevelFun();
      }
    },
    'AreaDataDeveTab.area':{
      handler(){
        // 开发负责需求数TOP10表格的
        this.TableDevelFun();
      }
    },
    'AreaDataDefe.area':{
      handler(){
        // 开发缺陷需求数TOP10
        this.ChartDefectFun();
      }
    },
    'AreaDataDefeTab.area':{
      handler(){
        // 开发缺陷需求数TOP10表格的
        this.TableDefectFun();        
      }
    }

  },

  created() {
    // this.Indextcq=[];
    this.ECharesDat= ChartData();
    this.ECharesProDat= ChartData();
    this.ECharesDeveDat=ChartData();
    this.ECharesDefeDat=ChartData();

    this.OnIndex=[
      {OnType:'Demand',sign:0, IndexData:[
        {title:'需求数量',Tnum:0,ContInfo:[]},
        {title:'开发任务',Tnum:0,ContInfo:[]},
        {title:'测试缺陷',Tnum:0,ContInfo:[]},
        {title:'线上缺陷',Tnum:0,ContInfo:[]},
        {title:'部门人数',Tnum:0,ContInfo:[]},
      ]},
    ];

    this.tableData.labelD=[
      {Val:'部门',Width:23},
      {Val:'需求',Width:10.32},
      {Val:'开发任务',Width:16.66},
      {Val:'测试缺陷',Width:16.66},
      {Val:'线上缺陷',Width:16.66},
      {Val:'部门人数',Width:16.66}
    ];
    this.tableData.tableD=[
      [
        {Val:'4PL物流平台',Width:23},
        {Val:0,Width:10.32},
        {Val:0,Width:16.66},
        {Val:0,Width:16.66},
        {Val:0,Width:16.66},
        {Val:0,Width:16.66},
      ],
      [
        {Val:'内控业务部',Width:23},
        {Val:0,Width:10.32},
        {Val:0,Width:16.66},
        {Val:0,Width:16.66},
        {Val:0,Width:16.66},
        {Val:0,Width:16.66},
      ],
    ];


    this.ProTabData.labelD=[
      {Val:'序号',Width:25},
      {Val:'部门',Width:25},
      {Val:'花名',Width:25},
      {Val:'需求数',Width:25},
    ];
    this.ProTabData.tableD=[
      [
        {Val:'1',Width:25},
        {Val:'内控',Width:25},
        {Val:'海海',Width:25},
        {Val:10,Width:25},
      ],
      [
        {Val:'2',Width:25},
        {Val:'内控',Width:25},
        {Val:'海海',Width:25},
        {Val:10,Width:25},
      ],
    ];

    this.DeveTabData.labelD=[
      {Val:'序号',Width:20},
      {Val:'部门',Width:20},
      {Val:'花名',Width:20},
      {Val:'需求数',Width:20},
      {Val:'任务数',Width:20},
    ];
    this.DeveTabData.tableD=[
      [
        {Val:'1',Width:20},
        {Val:'内控',Width:20},
        {Val:'小龙',Width:20},
        {Val:10,Width:20},
        {Val:20,Width:20},
      ],
      [
        {Val:'2',Width:20},
        {Val:'内控',Width:20},
        {Val:'小龙',Width:20},
        {Val:10,Width:20},
        {Val:20,Width:20},
      ],
    ];

    this.DefeTabData1.labelD=[
      {Val:'序号',Width:25},
      {Val:'部门',Width:25},
      {Val:'花名',Width:25},
      {Val:'缺陷数',Width:25},
    ];
    this.DefeTabData1.tableD=[
      [
        {Val:'1',Width:25},
        {Val:'内控',Width:25},
        {Val:'小龙',Width:25},
        {Val:10,Width:25},
      ],
      [
        {Val:'2',Width:25},
        {Val:'内控',Width:25},
        {Val:'小龙',Width:25},
        {Val:10,Width:25},
      ],
    ];

    this.DefeTabData2.labelD=[
      {Val:'序号',Width:20},
      {Val:'需求名称',Width:20},
      {Val:'负责部门',Width:20},
      {Val:'负责人花名',Width:20},
      {Val:'缺陷数',Width:20},
    ];
    this.DefeTabData2.tableD=[
      [
        {Val:'1',Width:20},
        {Val:'电子档案管理',Width:20},
        {Val:'内控',Width:20},
        {Val:'小龙',Width:20},
        {Val:10,Width:20},
      ],
      [
        {Val:'1',Width:20},
        {Val:'电子档案管理',Width:20},
        {Val:'内控',Width:20},
        {Val:'小龙',Width:20},
        {Val:10,Width:20},
      ],
    ];

    const apiMap2 = {
      // 数信中心技术运营周报      
      "SQL-NON_PM_ZT-ZT_STORY": { resultProp: "ZT_STORY" },
      "SQL-NON_PM_ZT-ZT_STORY_DEPT": { resultProp: "ZT_STORY_DEPT" },
      "SQL-NON_PM_ZT-ZT_STORY_TOP10": { resultProp: "ZT_STORY_TOP10" },

      "SQL-NON_PM_ZT-ZT_STORY_DEV_TOP10": { resultProp: "ZT_STORY_DEV_TOP10" }, //需求
      "SQL-NON_PM_ZT-ZT_TASK_DEV_TOP10": { resultProp: "ZT_TASK_DEV_TOP10" }, //任务

      "SQL-NON_PM_ZT-ZT_TASK_DEV_BUG_TOP10": { resultProp: "ZT_TASK_DEV_BUG_TOP10" },  //缺陷开发
      "SQL-NON_PM_ZT-ZT_STORY_BUG_TOP10": { resultProp: "ZT_STORY_BUG_TOP10" },  //缺陷需求

    }
    this.UserData=ajax_fun(apiMap2,
      {start_date:moment(_time_now).format("YYYYMMDD"),
      end_date:moment(new Date()).format("YYYYMMDD")});  
    


  },
  mounted() {
    const _thisOn=this;
    window.addEventListener("resize",()=>{
      console.log("====111111运行上了！！！======");
      E.init(_thisOn.$refs["ChartTrend"]).resize();
      E.init(_thisOn.$refs["ChartProTop"]).resize();
      E.init(_thisOn.$refs["ChartDevel"]).resize();
      E.init(_thisOn.$refs["ChartDefect"]).resize();
    },false);

    this.GetViewData();

    this.ChartFun();
    this.TableWholeFun();

    this.ChartProTop10Fun();
    this.TableProTop10Fun();

    this.ChartDevelFun();
    this.TableDevelFun();

    this.ChartDefectFun();
    this.TableDefectFun();

  },
  methods: {
    GetViewData(){
      this.UserData.p1.then(()=>{
        if(this.UserData.SetData["NON_PM_ZT-ZT_STORY"].length>0){
          this.OnIndex=[
            {OnType:'Demand',sign:0, IndexData:[
              {title:'需求数量',Tnum:this.UserData.SetData["NON_PM_ZT-ZT_STORY"][0].STORY_CNT,ContInfo:[]},
              {title:'开发任务',Tnum:this.UserData.SetData["NON_PM_ZT-ZT_STORY"][0].TASK_CNT,ContInfo:[]},
              {title:'测试缺陷',Tnum:this.UserData.SetData["NON_PM_ZT-ZT_STORY"][0].BUG_CNT,ContInfo:[]},
              {title:'线上缺陷',Tnum:this.UserData.SetData["NON_PM_ZT-ZT_STORY"][0].ONLINE_BUG_CNT,ContInfo:[]},
              {title:'部门人数',Tnum:this.UserData.SetData["NON_PM_ZT-ZT_STORY"][0].STAFF_CNT,ContInfo:[]},
            ]},
          ];
        }else{
          this.OnIndex=[
            {OnType:'Demand',sign:0, IndexData:[
              {title:'需求数量',Tnum:0,ContInfo:[]},
              {title:'开发任务',Tnum:0,ContInfo:[]},
              {title:'测试缺陷',Tnum:0,ContInfo:[]},
              {title:'线上缺陷',Tnum:0,ContInfo:[]},
              {title:'部门人数',Tnum:0,ContInfo:[]},
            ]},
          ];
        }

      });
    },

    ChartFun(){

      this.UserData.p1.then(()=>{

        let OnData=this.UserData.SetData["NON_PM_ZT-ZT_STORY_DEPT"];
        OnData.sort((a,b)=>{
          return (a['RANK_ON']) - (b['RANK_ON'])
        });
        this.chartIns = E.init(this.$refs["ChartTrend"]);
        this.ECharesDat.xAxis[0].data=[];
        this.ECharesDat.series[0].data=[];
        this.ECharesDat.series[1].data=[];
        this.ECharesDat.series[2].data=[];
        this.ECharesDat.series[3].data=[];
        this.ECharesDat.series[4].data=[];

        this.ECharesDat.grid.top=35;
        this.ECharesDat.grid.left=20;
        this.ECharesDat.grid.right=20;
        this.ECharesDat.grid.bottom=10;

        this.ECharesDat.series[0].type='bar';
        this.ECharesDat.series[1].type='bar';
        this.ECharesDat.series[2].type='bar';
        this.ECharesDat.series[3].type='bar';
        this.ECharesDat.series[4].type='line';
        this.ECharesDat.series[0].barWidth='15%';
        this.ECharesDat.series[1].barWidth='15%';
        this.ECharesDat.series[2].barWidth='15%';
        this.ECharesDat.series[3].barWidth='15%';
        this.ECharesDat.series[4].barWidth='15%';
        this.ECharesDat.series[0].itemStyle.normal.color='#5B8FF9';
        this.ECharesDat.series[1].itemStyle.normal.color='#73DEB3';
        this.ECharesDat.series[2].itemStyle.normal.color='#7585A2';
        this.ECharesDat.series[3].itemStyle.normal.color='#F7C739';
        this.ECharesDat.series[4].itemStyle.normal.color='#DFE4EA';
        this.ECharesDat.series[4].smooth=false;
 
        this.ECharesDat.legend.itemWidth=8;
        this.ECharesDat.legend.x='center';
        

        this.ECharesDat.series[0].name='需求数量';
        this.ECharesDat.series[1].name='开发任务';
        this.ECharesDat.series[2].name='测试缺陷';
        this.ECharesDat.series[3].name='线上缺陷';
        this.ECharesDat.series[4].name='部门人数';

        Object.keys(OnData).forEach((OnKey) => {
          this.ECharesDat.xAxis[0].data.push(OnData[OnKey].DEPT_NAME);
          this.ECharesDat.series[0].data.push(OnData[OnKey].STORY_CNT);
          this.ECharesDat.series[1].data.push(OnData[OnKey].TASK_CNT);
          this.ECharesDat.series[2].data.push(OnData[OnKey].BUG_CNT);
          this.ECharesDat.series[3].data.push(OnData[OnKey].ONLINE_BUG_CNT);
          this.ECharesDat.series[4].data.push(OnData[OnKey].STAFF_CNT);
        });
        this.chartIns.setOption(this.ECharesDat);
      });
    },


    TableWholeFun(){

      this.UserData.p1.then(()=>{
        this.tableData.labelD=[
          {Val:'部门',Width:23},
          {Val:'需求',Width:10.32},
          {Val:'开发任务',Width:16.66},
          {Val:'测试缺陷',Width:16.66},
          {Val:'线上缺陷',Width:16.66},
          {Val:'部门人数',Width:16.66}
        ];
        this.tableData.tableD=[];

        let OnData=this.UserData.SetData["NON_PM_ZT-ZT_STORY_DEPT"];
        OnData.sort((a,b)=>{
          return (a['RANK_ON']) - (b['RANK_ON'])
        });
        if(OnData.length>0){
          if(this.AreaData.area==='数量'){
            Object.keys(OnData).forEach((OnKey) => {
              this.tableData.tableD.push(
                [
                  {Val:OnData[OnKey].DEPT_NAME,Width:23},
                  {Val:OnData[OnKey].STORY_CNT,Width:10.32},
                  {Val:OnData[OnKey].TASK_CNT,Width:16.66},
                  {Val:OnData[OnKey].BUG_CNT,Width:16.66},
                  {Val:OnData[OnKey].ONLINE_BUG_CNT,Width:16.66},
                  {Val:OnData[OnKey].STAFF_CNT,Width:16.66},
                ]
              )
            });            
          }else if(this.AreaData.area==='占比'){
            Object.keys(OnData).forEach((OnKey) => {
              this.tableData.tableD.push(
                [
                  {Val:OnData[OnKey].DEPT_NAME,Width:23},
                  {Val:OnData[OnKey].STORY_CNT_RATE+'%',Width:10.32},
                  {Val:OnData[OnKey].TASK_CNT_RATE+'%',Width:16.66},
                  {Val:OnData[OnKey].BUG_CNT_REATE+'%',Width:16.66},
                  {Val:OnData[OnKey].ONLINE_BUG_RATE+'%',Width:16.66},
                  {Val:OnData[OnKey].STAFF_CNT,Width:16.66},
                ]
              )
            });   
          }

        }

      });

    },


    ChartProTop10Fun(){

      this.UserData.p1.then(()=>{
        this.chartPro = E.init(this.$refs["ChartProTop"]);
        let OnData=this.UserData.SetData["NON_PM_ZT-ZT_STORY_TOP10"].filter(_=>_.RN<=10);
        OnData.sort((a,b)=>{return (a['RN']) - (b['RN'])});

        this.ECharesProDat.xAxis[0].data=[];
        this.ECharesProDat.series[0].data=[];
        this.ECharesProDat.series[1].data=[];

        this.ECharesProDat.grid.top=25;
        this.ECharesProDat.grid.left=20;
        this.ECharesProDat.grid.right=20;
        this.ECharesProDat.grid.bottom=10;
        this.ECharesProDat.legend.show=false;
        this.ECharesProDat.series[0].name='需求数量';
        this.ECharesProDat.series[0].barWidth='35%';

        Object.keys(OnData).forEach((OnKey) => {
          this.ECharesProDat.xAxis[0].data.push(OnData[OnKey].PERSONALNAME);
          this.ECharesProDat.series[0].data.push(OnData[OnKey].STORY_CNT);
        });


        this.ECharesProDat.xAxis[0].axisLabel.formatter=((parms)=>{
          var ret = '';
          var max = 3;
          var val = parms.length;
          var rowN = Math.ceil(val/max);
          if(rowN>1&&this.ECharesProDat.series[0].data.length>10){
            for(var i = 0; i<rowN; i++){
              var temp = '';
              var start = i*max;
              var end = start + max;
              temp = parms.substring(start,end)+"\n"
              ret += temp;
            }
            return ret;

          }else{
            return parms;
          }
        });



        this.chartPro.setOption(this.ECharesProDat);

      });

    },

    TableProTop10Fun(){
      this.UserData.p1.then(()=>{
        let OnData=this.UserData.SetData["NON_PM_ZT-ZT_STORY_TOP10"].filter(_=>_.RN<=10);
        OnData.sort((a,b)=>{return (a['RN']) - (b['RN'])});

        this.ProTabData.labelD=[
          {Val:'序号',Width:25},
          {Val:'部门',Width:25},
          {Val:'花名',Width:25},
          {Val:'需求数',Width:25},
        ];
        this.ProTabData.tableD=[];

        if(OnData.length>0){
          Object.keys(OnData).forEach((OnKey) => {
              this.ProTabData.tableD.push([
                {Val:OnData[OnKey].RN,Width:25},
                {Val:OnData[OnKey].DEPT_NAME,Width:25},
                {Val:OnData[OnKey].PERSONALNAME,Width:25},
                {Val:OnData[OnKey].STORY_CNT,Width:25},
              ])
          });
        }

      });

    },

    ChartDevelFun(){  
      
      this.UserData.p1.then(()=>{
        this.chartDeve = E.init(this.$refs["ChartDevel"]);
        let OnData=[];
        if(this.AreaDataDeve.area==='需求'){
          OnData=this.UserData.SetData["NON_PM_ZT-ZT_STORY_DEV_TOP10"].filter(_=>_.RN<=10);
        }else if(this.AreaDataDeve.area==='任务'){
          OnData=this.UserData.SetData["NON_PM_ZT-ZT_TASK_DEV_TOP10"].filter(_=>_.RN<=10);
        }
        OnData.sort((a,b)=>{return (a['RN']) - (b['RN'])});

        this.ECharesDeveDat.xAxis[0].data=[];
        this.ECharesDeveDat.series[0].data=[];
        this.ECharesDeveDat.series[1].data=[];

        this.ECharesDeveDat.grid.top=25;
        this.ECharesDeveDat.grid.left=20;
        this.ECharesDeveDat.grid.right=20;
        this.ECharesDeveDat.grid.bottom=10;
        this.ECharesDeveDat.legend.show=false;
        this.ECharesDeveDat.series[0].name=(this.AreaDataDeve.area==='需求')?'需求数量':'任务数量';
        this.ECharesDeveDat.series[0].barWidth='35%';

        Object.keys(OnData).forEach((OnKey) => {
          this.ECharesDeveDat.xAxis[0].data.push(OnData[OnKey].PERSONALNAME);
          this.ECharesDeveDat.series[0].data.push(
            (this.AreaDataDeve.area==='需求')?OnData[OnKey].STORY_CNT:
            (this.AreaDataDeve.area==='任务')?OnData[OnKey].TASK_CNT:0
          );
        });

        this.ECharesDeveDat.xAxis[0].axisLabel.formatter=((parms)=>{
          var ret = '';
          var max = 3;
          var val = parms.length;
          var rowN = Math.ceil(val/max);
          if(rowN>1&&this.ECharesDeveDat.series[0].data.length>10){
            for(var i = 0; i<rowN; i++){
              var temp = '';
              var start = i*max;
              var end = start + max;
              temp = parms.substring(start,end)+"\n"
              ret += temp;
            }
            return ret;

          }else{
            return parms;
          }
        });

        this.chartDeve.setOption(this.ECharesDeveDat);

      });

    },

    TableDevelFun(){
      this.UserData.p1.then(()=>{
        // 待确定
        let OnData=[];//需求
        // let OnData2=[];//任务
        if(this.AreaDataDeveTab.area==='需求'){
          OnData=this.UserData.SetData["NON_PM_ZT-ZT_STORY_DEV_TOP10"].filter(_=>_.RN<=10);
        }else if(this.AreaDataDeveTab.area==='任务'){
          OnData=this.UserData.SetData["NON_PM_ZT-ZT_TASK_DEV_TOP10"].filter(_=>_.RN<=10);
        }
        OnData.sort((a,b)=>{return (a['RN']) - (b['RN'])});

        this.DeveTabData.labelD=[];
        this.DeveTabData.tableD=[];
        this.DeveTabData.labelD=[
          {Val:'序号',Width:25},
          {Val:'部门',Width:25},
          {Val:'花名',Width:25},
          {Val:(this.AreaDataDeveTab.area==='需求')?'需求数':'任务数',Width:25},
          // {Val:'任务数',Width:20},
        ];
        Object.keys(OnData).forEach((OnKey) => {
          this.DeveTabData.tableD.push([
            {Val:OnData[OnKey].RN,Width:25},
            {Val:OnData[OnKey].DEPT_NAME,Width:25},
            {Val:OnData[OnKey].PERSONALNAME,Width:25},
            {Val:(this.AreaDataDeveTab.area==='需求')?OnData[OnKey].STORY_CNT:
            OnData[OnKey].TASK_CNT,Width:25}, 
          ])
        });

      });

    },


    ChartDefectFun(){

      this.UserData.p1.then(()=>{

        let OnData=[];
        if(this.AreaDataDefe.area==='开发'){
          OnData=this.UserData.SetData["NON_PM_ZT-ZT_TASK_DEV_BUG_TOP10"].filter(_=>_.RN<=10);
        }else if(this.AreaDataDefe.area==='需求'){
          OnData=this.UserData.SetData["NON_PM_ZT-ZT_STORY_BUG_TOP10"].filter(_=>_.RN<=10);
        }
        OnData.sort((a,b)=>{return (a['RN']) - (b['RN'])});
  

        this.ECharesDefeDat.xAxis[0].data=[];
        this.ECharesDefeDat.series[0].data=[];
        this.ECharesDefeDat.series[1].data=[];

        this.ECharesDefeDat.grid.top=25;
        this.ECharesDefeDat.grid.left=20;
        this.ECharesDefeDat.grid.right=20;
        this.ECharesDefeDat.grid.bottom=10;
        this.ECharesDefeDat.legend.show=false;
        this.ECharesDefeDat.series[0].name=(this.AreaDataDefe.area==='开发')?'缺陷数量':'缺陷数量';
        this.ECharesDefeDat.series[0].barWidth='35%';

        Object.keys(OnData).forEach((OnKey) => {
          this.ECharesDefeDat.xAxis[0].data.push(OnData[OnKey].PERSONALNAME);
          this.ECharesDefeDat.series[0].data.push(
            (this.AreaDataDefe.area==='开发')?OnData[OnKey].BUG_CNT:
            (this.AreaDataDefe.area==='需求')?OnData[OnKey].STORY_BUG_CNT:0
          );
        });


        this.ECharesDefeDat.xAxis[0].axisLabel.formatter=((parms)=>{
          var ret = '';
          var max = 2;
          var val = parms.length;
          var rowN = Math.ceil(val/max);
          if(rowN>1&&this.ECharesDefeDat.series[0].data.length>10){
            for(var i = 0; i<rowN; i++){
              var temp = '';
              var start = i*max;
              var end = start + max;
              temp = parms.substring(start,end)+"\n"
              ret += temp;
            }
            return ret;

          }else{
            return parms;
          }
        });

        if(OnData.length>0){
          this.AreaDataDefe.IsNull=false;
        }else{
          this.AreaDataDefe.IsNull=true;
        }
        this.chartDefect = E.init(this.$refs["ChartDefect"]);
        this.chartDefect.setOption(this.ECharesDefeDat);        

      });

    },

    TableDefectFun(){

      this.UserData.p1.then(()=>{
        let OnData=[];
        if(this.AreaDataDefeTab.area==='开发'){
          OnData=this.UserData.SetData["NON_PM_ZT-ZT_TASK_DEV_BUG_TOP10"].filter(_=>_.RN<=10);
        }else if(this.AreaDataDefeTab.area==='需求'){
          OnData=this.UserData.SetData["NON_PM_ZT-ZT_STORY_BUG_TOP10"].filter(_=>_.RN<=10);
        }
        OnData.sort((a,b)=>{return (a['RN']) - (b['RN'])});

        if(this.AreaDataDefeTab.area==='开发'){
          this.DefeTabData1.labelD=[
            {Val:'序号',Width:25},
            {Val:'部门',Width:25},
            {Val:'花名',Width:25},
            {Val:'缺陷数',Width:25},
          ];          
        }else if(this.AreaDataDefeTab.area==='需求'){
          this.DefeTabData1.labelD=[
            {Val:'序号',Width:20},
            {Val:'需求名称',Width:20},
            {Val:'负责部门',Width:20},
            {Val:'负责人花名',Width:20},
            {Val:'缺陷数',Width:20},
          ];
        }

        // console.log("========运行是打撒十大大苏打撒旦=======")


        this.DefeTabData1.tableD=[];
        // this.DefeTabData1.tableD=[
        //   [
        //     {Val:'1',Width:25},
        //     {Val:'内控',Width:25},
        //     {Val:'小龙',Width:25},
        //     {Val:10,Width:25},
        //   ],
        //   [
        //     {Val:'2',Width:25},
        //     {Val:'内控',Width:25},
        //     {Val:'小龙',Width:25},
        //     {Val:10,Width:25},
        //   ],
        // ];
        if(OnData.length>0){
          this.AreaDataDefeTab.IsNull=false;
          if(this.AreaDataDefeTab.area==='开发'){
            Object.keys(OnData).forEach((OnKey) => {
              this.DefeTabData1.tableD.push([
                {Val:OnData[OnKey].RN,Width:25},
                {Val:OnData[OnKey].DEPT_NAME,Width:25},
                {Val:OnData[OnKey].PERSONALNAME,Width:25},
                {Val:OnData[OnKey].BUG_CNT,Width:25},
              ])
            });
          }else if(this.AreaDataDefeTab.area==='需求'){
            Object.keys(OnData).forEach((OnKey) => {
              this.DefeTabData1.tableD.push([
                {Val:OnData[OnKey].RN,Width:20},
                {Val:OnData[OnKey].STORY_NAME,Width:20},
                {Val:OnData[OnKey].TWO_DEPT,Width:20},
                {Val:OnData[OnKey].PERSONALNAME,Width:20},
                {Val:OnData[OnKey].STORY_BUG_CNT,Width:20},
              ])
            });
          }
        }else{
          this.AreaDataDefeTab.IsNull=true;
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
    width: 100%;
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
    .Detailed{
      // padding: 10px 5px;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      .Title{
        padding: 0;
        margin: 0; 
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
      }
      .SwitchCss{
        display: flex;
        font-size: 14px;
        .SwitchOn{
          margin-top: 2px;
        }
        .Fenbu{
          padding-right: 5px;
          color: #333333;
        }
        .Mingxi{
          padding-left: 5px;
          padding-right: 10px;
          color: #333333;
        }



        .icon-wrapper .van-icon-success {
          line-height: 32px;
          color: #333333;
        }

        .icon-wrapper .van-icon-cross {
          line-height: 32px;
          color:brown;
        }


      }
    }
    .IndexOnCss{
      .IndexCss{
        padding: 0px 5px;
        padding-top: 10px;
      }
    }
    .ChartCss{
      padding-top: 10px;
    }
    .TableCss{
      .SingChoice{
        display: flex;
        justify-content: flex-end;
        padding: 10px 0px;
      }
    }

    .DetailCharts{
      width: 100%;
      .ProductTop10{
        width: 100%;
        padding-top: 15px;
        .TitleTop10{
          padding: 0px 20px;
        }
        .ChartsTop10{
          width: 100%;
        }
      }
    }
    .DetailTable{
      .TableTop10{
        .TitleTop10{
          padding: 15px 20px;
        }
      }
      .TableTop10:nth-child(1){
        .TitleTop10{
          padding-top: 0px;
        }
      }
    }



  }




}
</style>