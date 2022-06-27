<template>
  <div>
    <div class="table-box">
      <div class="top-content clearfix">
        <div class="title fl">B店推送报表(周报)</div>
        <div class="time fr">{{ dateTime }}</div>
        <!-- <div class="time fr">{{ '未发取消目标、净业绩目标' }}</div> -->
      </div>

      <!--                -->


      <div class="pay" v-for="(item, index) in dataMsg" :key="index">
        <li v-for="(key, i) in item" :key="i">
          <div
            :class="
              index === 4
                ? {
                    redColor: i === 2 && Number(key.num.replace('%', '')) <= 40,
                    greenColor:
                      i === 2 && Number(key.num.replace('%', '')) > 40,
                  }
                :{
                  greenColor:
                    i === 2 && Number(key.num.replace('%', '')) < 100,
                  redColor:
                    i === 2 && Number(key.num.replace('%', '')) >= 100,
                }
            "
          >
            {{ key.num }}
          </div>
          <div>{{ key.content }}</div>
        </li>
      </div>
      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周全店访客</div>
      </div>
      <div class="performance" ref="chart7Visitor"></div>
      <div class="perTitle clearfix" style="margintop: 10px">
        <div style="backgroundcolor: #f6ac38"></div>
        <div>最近7周付费访客</div>
      </div>
      <div class="performance" ref="chart7Pay"></div>
      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周搜索访客</div>
      </div>
      <div class="performance" ref="chart7Search"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周手淘推荐访客</div>
      </div>
      <div class="performance" ref="chart7Recommend"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周商品访客数</div>
      </div>
      <div class="performance" ref="chart7Goods"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周商品访客/全店访客</div>
      </div>
      <div class="performance" ref="chart7GoodsAll"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周加购人数</div>
      </div>
      <div class="performance" ref="chart7Purchase"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周大件加购率</div>
      </div>
      <div class="performance" ref="chart7BigGoods"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周小件加购率</div>
      </div>
      <div class="performance" ref="chart7SmallGoods"></div>

      <div class="perTitle clearfix" style="margintop: 10px">
        <div></div>
        <div>最近7周未发取消</div>
      </div>
      <div class="performance" ref="chart7Cancel"></div>
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
      dataMsg: null,
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
          data: ["全店访客", "去年同期", "七周均值"],
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
            name: "七周均值",
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
    };
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
    // this.test_fun();
    // this.initEcharts();

    this.getTargetData();
  },
  methods: {
    test_fun() {
      this.dataMsg = [
        [
          {
            num: 11 + "亿",
            content: "线上月度目标",
          },
          {
            num: 12 + "亿",
            content: "累计支付",
          },
          {
            num: 13 + "%",
            content: "累计达成",
          },
        ],
        [
          {
            num: 14 + "亿",
            content: "线上累计目标",
          },
          {
            num: 15 + "亿",
            content: "累计支付",
          },
          {
            num: 16 + "%",
            content: "累计达成",
          },
        ],
        [
          {
            num: 17 + "亿",
            content: "全渠道月度目标",
          },
          {
            num: 18 + "亿",
            content: "累计支付",
          },
          {
            num: 19 + "%",
            content: "累计达成",
          },
        ],
        [
          {
            num: 20 + "亿",
            content: "全渠道累计目标",
          },
          {
            num: 21 + "亿",
            content: "累计支付",
          },
          {
            num: 22 + "%",
            content: "累计达成",
          },
        ],
        [
          {
            num: "/",
            content: "未发取消目标",
          },
          {
            num: 24 + "亿",
            content: "未发取消",
          },
          {
            num: 25 + "%",
            content: "未发取消占比",
          },
        ],
        [
          {
            num: 26 + "亿",
            content: "发货目标",
          },
          {
            num: 27 + "亿",
            content: "累计发货",
          },
          {
            num: 28 + "%",
            content: "累计达成",
          },
        ],
      ];
    },

    getTargetData() {
      this.$axios
        .post(`/bi-mobile/api/user/data/NON_PM_FS_YY_PROJECT_B/YJ_KPI/get`, {})
        .then((res) => {
          // console.log(res.data[0]);
          this.dataMsg = [
            [
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].MON_TGT_PAY_AMT_B / 10000 / 10000).toFixed(2)
                    )
                  ) + "亿",
                content: "线上月度目标",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].PAY_AMT_B / 10000 / 10000).toFixed(2)
                    )
                  ) + "亿",
                content: "累计支付",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].MON_PAY_REACH_RATE_B * 100).toFixed(2)
                    )
                  ) + "%",
                content: "累计达成",
              },
            ],
            [
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].SUM_TGT_PAY_AMT_B / 10000 / 10000).toFixed(2)
                    )
                  ) + "亿",
                content: "线上累计目标",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].PAY_AMT_B / 10000 / 10000).toFixed(2)
                    )
                  ) + "亿",
                content: "累计支付",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].SUM_PAY_REACH_RATE_B * 100).toFixed(2)
                    )
                  ) + "%",
                content: "累计达成",
              },
            ],
            [
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].MON_TGT_PAY_AMT_ALL / 10000 / 10000).toFixed(
                        2
                      )
                    )
                  ) + "亿",
                content: "全渠道月度目标",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].PAY_AMT_ALL / 10000 / 10000).toFixed(2)
                    )
                  ) + "亿",
                content: "累计支付",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].MON_PAY_REACH_RATE_ALL * 100).toFixed(2)
                    )
                  ) + "%",
                content: "累计达成",
              },
            ],
            [
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].SUM_TGT_PAY_AMT_ALL / 10000 / 10000).toFixed(
                        2
                      )
                    )
                  ) + "亿",
                content: "全渠道累计目标",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].PAY_AMT_ALL / 10000 / 10000).toFixed(2)
                    )
                  ) + "亿",
                content: "累计支付",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].SUM_PAY_REACH_RATE_ALL * 100).toFixed(2)
                    )
                  ) + "%",
                content: "累计达成",
              },
            ],
            [
              {
                num:                   
                  this.nll_undefined(
                    this.fomatMoney(
                      ((res.data[0].未发取消目标||0)*100).toFixed(0)
                    )
                  )+'%',
                content: "未发取消参考值",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].CANCEL_AMT / 10000 / 10000).toFixed(2)
                    )
                  ) + "亿",
                content: "未发取消",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney((res.data[0].CANCEL_RATE * 100).toFixed(2))
                  ) + "%",
                content: "未发取消占比",
              },
            ],
            [
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (
                        res.data[0].MON_TGT_DLVRED_AMT_B /
                        10000 /
                        10000
                      ).toFixed(2)
                    )
                  ) + "亿",
                content: "发货目标",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].DLVRED_AMT_B / 10000 / 10000).toFixed(2)
                    )
                  ) + "亿",
                content: "累计发货",
              },
              {
                num:
                  this.nll_undefined(
                    this.fomatMoney(
                      (res.data[0].MON_DLVRED_REACH_RATE_B * 100).toFixed(2)
                    )
                  ) + "%",
                content: "累计达成",
              },
            ],
          ];
        })
        .then(() => {  	
          return this.$axios
            .post(`/bi-mobile/api/user/data/NON_PM_FS_YY_PROJECT_B/FLOW_W/get`, {})
            .then((res) => {
              console.log("==========最近7周=============");
              let set_data = res.data;
              set_data = set_data.sort((a, b) => {
                let value_sort = "";
                // let a_time = new Date(a["TDATE"]).getTime(new Date(a["TDATE"]));
                // let b_time = new Date(b["TDATE"]).getTime(new Date(b["TDATE"]));
                value_sort = Number(a["YWEEK"]) - Number(b["YWEEK"]);
                return value_sort;
              });
              // console.log(set_data);


              // 图例名称
              let LegendName = [];

              let month_day = [];
              // 最近7天全店访客
              let all_visitors = [];
              let ago_all_visitors = [];
              let all_visitors_per_day = [];
              // 最近7天付费访客
              let pay_flow = [];
              let ago_pay_flow = [];
              let pay_flow_per_day = [];
              // 最近7天搜索访客
              let st_search = [];
              let ago_st_search = [];
              let st_search_per_day = [];
              // 最近7天手淘推荐访客
              let st_recommend = [];
              let ago_st_recommend = [];
              let st_recommend_per_day = [];
              // 最近7天商品访客数
              let items_visitors = [];
              let ago_items_visitors = [];
              let items_visitors_per_day = [];
              // 最近7天商品访客/全店访客
              let visitors_rate = [];
              let ago_visitors_rate = [];
              let visitors_rate_per_day = [];
              // 最近7天加购人数
              let items_pur_number = [];
              let ago_items_pur_number = [];
              let items_pur_number_per_day = [];
              // 最近7天大件加购率
              let dj_items_pur_rate = [];
              let ago_dj_items_pur_rate = [];
              let dj_items_pur_rate_per_day = [];
              // 最近7天小件加购率
              let xj_items_pur_rate = [];
              let ago_xj_items_pur_rate = [];
              let xj_items_pur_rate_per_day = [];
              // 最近7天未发取消
              let re_amt = [];
              let ago_re_amt = [];
              let re_amt_per_day = [];

              Object.keys(set_data).forEach((UserValue) => {
                // console.log(UserValue);
                month_day.push(set_data[UserValue].YWEEK+'周');
                all_visitors.push((set_data[UserValue].ALL_VISITORS/10000).toFixed(2));
                ago_all_visitors.push(
                  (set_data[UserValue].AGO_ALL_VISITORS/10000).toFixed(2)
                );
                all_visitors_per_day.push(
                  (set_data[UserValue].ALL_VISITORS_PER_DAY/10000).toFixed(2)
                );

                pay_flow.push((set_data[UserValue].PAY_FLOW/10000).toFixed(2));
                ago_pay_flow.push((set_data[UserValue].AGO_PAY_FLOW/10000).toFixed(2));
                pay_flow_per_day.push(
                  (set_data[UserValue].PAY_FLOW_PER_DAY/10000).toFixed(2)
                );

                st_search.push((set_data[UserValue].ST_SEARCH/10000).toFixed(2));
                ago_st_search.push(
                  (set_data[UserValue].AGO_ST_SEARCH/10000).toFixed(2)
                );
                st_search_per_day.push(
                  (set_data[UserValue].ST_SEARCH_PER_DAY/10000).toFixed(2)
                );

                st_recommend.push((set_data[UserValue].ST_RECOMMEND/10000).toFixed(2));
                ago_st_recommend.push(
                  (set_data[UserValue].AGO_ST_RECOMMEND/10000).toFixed(2)
                );
                st_recommend_per_day.push(
                  (set_data[UserValue].ST_RECOMMEND_PER_DAY/10000).toFixed(2)
                );

                items_visitors.push(
                  (set_data[UserValue].ITEMS_VISITORS/10000).toFixed(2)
                );
                ago_items_visitors.push(
                  (set_data[UserValue].AGO_ITEMS_VISITORS/10000).toFixed(2)
                );
                items_visitors_per_day.push(
                  (set_data[UserValue].ITEMS_VISITORS_PER_DAY/10000).toFixed(2)
                );

                visitors_rate.push(
                  (set_data[UserValue].VISITORS_RATE/10000).toFixed(2)
                );
                ago_visitors_rate.push(
                  (set_data[UserValue].AGO_VISITORS_RATE/10000).toFixed(2)
                );
                visitors_rate_per_day.push(
                  (set_data[UserValue].VISITORS_RATE_PER_DAY/10000).toFixed(2)
                );

                items_pur_number.push(
                  (set_data[UserValue].ITEMS_PUR_NUMBER/10000).toFixed(2)
                );
                ago_items_pur_number.push(
                  (set_data[UserValue].AGO_ITEMS_PUR_NUMBER/10000).toFixed(2)
                );
                items_pur_number_per_day.push(
                  (set_data[UserValue].ITEMS_PUR_NUMBER_PER_DAY/10000).toFixed(2)
                );

                dj_items_pur_rate.push(
                  (set_data[UserValue].DJ_ITEMS_PUR_RATE*100).toFixed(2)
                );
                ago_dj_items_pur_rate.push(
                  (set_data[UserValue].AGO_DJ_ITEMS_PUR_RATE*100).toFixed(2)
                );
                dj_items_pur_rate_per_day.push(
                  (set_data[UserValue].DJ_ITEMS_PUR_RATE_PER_DAY*100).toFixed(2)
                );

                xj_items_pur_rate.push(
                  (set_data[UserValue].XJ_ITEMS_PUR_RATE*100).toFixed(2)
                );
                ago_xj_items_pur_rate.push(
                  (set_data[UserValue].AGO_XJ_ITEMS_PUR_RATE*100).toFixed(2)
                );
                xj_items_pur_rate_per_day.push(
                  (set_data[UserValue].XJ_ITEMS_PUR_RATE_PER_DAY*100).toFixed(2)
                );

                re_amt.push((set_data[UserValue].RE_AMT/10000).toFixed(2));
                ago_re_amt.push((set_data[UserValue].AGO_RE_AMT/10000).toFixed(2));
                re_amt_per_day.push(
                  (set_data[UserValue].RE_AMT_PER_DAY/10000).toFixed(2)
                );
              });

              this.initEchartsOet(
                "chart7Visitor",
                all_visitors,
                ago_all_visitors,
                all_visitors_per_day,
                month_day,
                ["最近7周", "同期7周", "7周均值"],
                '万'
              );
              this.initEchartsOet(
                "chart7Pay",
                pay_flow,
                ago_pay_flow,
                pay_flow_per_day,
                month_day,
                ["最近7周", "同期7周", "7周均值"],
                '万'
              );
              this.initEchartsOet(
                "chart7Search",
                st_search,
                ago_st_search,
                st_search_per_day,
                month_day,
                ["最近7周", "同期7周", "7周均值"],
                '万'
              );

              this.initEchartsOet(
                "chart7Recommend",
                st_recommend,
                ago_st_recommend,
                st_recommend_per_day,
                month_day,
                ["最近7周", "同期7周", "7周均值"],
                '万'
              );
              this.initEchartsOet(
                "chart7Goods",
                items_visitors,
                ago_items_visitors,
                items_visitors_per_day,
                month_day,
                ["最近7周", "同期7周", "7周均值"],
                '万'
              );
              this.initEchartsOet(
                "chart7GoodsAll",
                visitors_rate,
                ago_visitors_rate,
                visitors_rate_per_day,
                month_day,
                ["最近7周", "同期7周", "7周均值"],
                ''
              );
              LegendName = ["最近7周", "同期7周", "7周均值"];
              this.initEchartsOet(
                "chart7Purchase",
                items_pur_number,
                ago_items_pur_number,
                items_pur_number_per_day,
                month_day,
                LegendName,
                '万'
              );
              LegendName = ["最近7周", "同期7周", "7周均值"];
              this.initEchartsOet(
                "chart7BigGoods",
                dj_items_pur_rate,
                ago_dj_items_pur_rate,
                dj_items_pur_rate_per_day,
                month_day,
                LegendName,
                '%'
              );
              LegendName = ["最近7周", "同期7周", "7周均值"];
              this.initEchartsOet(
                "chart7SmallGoods",
                xj_items_pur_rate,
                ago_xj_items_pur_rate,
                xj_items_pur_rate_per_day,
                month_day,
                LegendName,
                '%'
              );
              LegendName = ["最近7周", "同期7周", "7周均值"];
              this.initEchartsOet(
                "chart7Cancel",
                re_amt,
                ago_re_amt,
                re_amt_per_day,
                month_day,
                LegendName,
                '万'
              );
            });
        });
    },

    getDetailData(date) {
      this.$axios
        .get("/bi-mobile/api/admin/biProjectBReport/getDetail", {
          params: { dateStr: date },
        })
        .then((res) => {
          this.dataMsg = [
            [
              {
                num: Number(res.data.paymentTarget).toLocaleString() + "亿",
                content: "支付目标",
              },
              {
                num: Number(res.data.paymentSum).toLocaleString() + "亿",
                content: "累计支付",
              },
              {
                num: res.data.paymentReached + "%",
                content: "累计达成",
              },
            ],
            [
              {
                num:
                  res.data.cancelTarget === 0
                    ? "/"
                    : Number(res.data.cancelTarget).toLocaleString(),
                content: "未发取消目标",
              },
              {
                num: Number(res.data.cancelActual).toLocaleString() + "亿",
                content: "未发取消",
              },
              {
                num: res.data.cancelProportion + "%",
                content: "未发取消占比",
              },
            ],
            [
              {
                num: Number(res.data.target).toLocaleString() + "亿",
                content: "净业绩目标",
              },
              {
                num: Number(res.data.sumTarget).toLocaleString() + "亿",
                content: "累计净业绩",
              },
              {
                num: res.data.sumTargetReached + "%",
                content: "累计达成",
              },
            ],
            [
              {
                num: Number(res.data.deliveryTarget).toLocaleString() + "亿",
                content: "发货目标",
              },
              {
                num: Number(res.data.deliverySum).toLocaleString() + "亿",
                content: "累计发货",
              },
              {
                num: res.data.deliveryReached + "%",
                content: "累计达成",
              },
            ],
            [
              {
                num: Number(res.data.cdTarget).toLocaleString(),
                content: "客单价目标",
              },
              {
                num: Number(res.data.kdPrice).toLocaleString(),
                content: "客单价",
              },
              {
                num: res.data.kdReached + "%",
                content: "累计达成",
              },
            ],
          ];
        })
        .then(() => {
          //获取净业绩图表数据
          return this.$axios
            .get("/bi-mobile/api/admin/biProjectBReport/getList1")
            .then((res) => {
              let timeDate = [];
              let numData = [];
              for (let i = res.data.length - 1; i >= 0; i--) {
                timeDate.push(res.data[i].value);
                numData.push(res.data[i].label);
              }
              this.chartOptions.series[0].data = timeDate;
              this.chartOptions.xAxis.data = numData;
            });
        })
        .then(() => {
          //获取未发取消图表数据
          return this.$axios
            .get("/bi-mobile/api/admin/biProjectBReport/getList2")
            .then((res) => {
              let timeDate = [];
              let numData = [];
              for (let i = res.data.length - 1; i >= 0; i--) {
                timeDate.push(res.data[i].value);
                numData.push(res.data[i].label);
              }
              this.chartOptionsNot.series[0].data = timeDate;
              this.chartOptionsNot.xAxis.data = numData;
            });
        })
        .then(() => {
          //获取客单价图表数据
          return this.$axios
            .get("/bi-mobile/api/admin/biProjectBReport/getList3")
            .then((res) => {
              let timeDate = [];
              let numData = [];
              for (let i = res.data.length - 1; i >= 0; i--) {
                timeDate.push(res.data[i].value);
                numData.push(res.data[i].label);
              }
              this.chartOptionsCost.series[0].data = timeDate;
              this.chartOptionsCost.xAxis.data = numData;
              this.initEcharts();
              // this.hideLoading()
            });
        })
        .catch((error) => {
          this.$message.error(error.message || error.msg);
        });
    },
    initEcharts() {
      // this.chartIns = E.init(this.$refs['chart'])
      // this.chartIns.setOption(this.chartOptions)
      // this.chartNot = E.init(this.$refs['chartNot'])
      // this.chartNot.setOption(this.chartOptionsNot)
      // this.chartCost = E.init(this.$refs['chartCost'])
      // this.chartCost.setOption(this.chartOptionsCost)

      this.chartIns = E.init(this.$refs["chart7Visitor"]);
      this.chartIns.setOption(this.chartOptions);
    },

    initEchartsOet(SetName, Data, DataAgo, DataAvg, MonthDay, LegendName,Unit) {
      let _this=this;

      if (LegendName!=undefined&&LegendName.legend != 0) {
        this.chartOptions.legend.data = LegendName;
        this.chartOptions.series[0].name = LegendName[0];
        this.chartOptions.series[1].name = LegendName[1];
        this.chartOptions.series[2].name = LegendName[2];
      }
      let istwo=false;
      if(SetName=='chart7GoodsAll'||SetName=='chart7BigGoods'||SetName=='chart7SmallGoods'){
        istwo=true;
      }else{
        istwo=false;
      }
      Unit=(Unit==undefined)?'1':Unit;
      this.chartOptions.tooltip.formatter= function (params) {
        // console.log(params);
        return  '第'+params[0].axisValue+'<br/>'+params[0].marker+params[0].seriesName+'：'
        +((istwo)?(_this.fomatMoney(params[0].value)):_this.fomatMoney((params[0].value*1).toFixed(0)))+Unit+'<br/>'
        +params[1].marker+params[1].seriesName+'：'+((istwo)?(_this.fomatMoney(params[1].value)):_this.fomatMoney((params[1].value*1).toFixed(0)))+Unit+'<br/>'
        +params[2].marker+params[2].seriesName+'：'+((istwo)?(_this.fomatMoney(params[2].value)):_this.fomatMoney((params[2].value*1).toFixed(0)))+Unit+'<br/>'
      }        
      
      this.chartOptions.series[0].data = Data;
      this.chartOptions.series[1].data = DataAgo;
      this.chartOptions.series[2].data = DataAvg;
      this.chartOptions.xAxis.data = MonthDay;
      this.chartIns = E.init(this.$refs[SetName]);
      this.chartIns.setOption(this.chartOptions);
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
</style>
