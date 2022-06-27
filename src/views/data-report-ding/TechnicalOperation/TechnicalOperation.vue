<template>
  <div>

    <!-- 切换导航栏开始 -->
    <div class="nav-wrapperOnline">
      <MenuSwitch
        :setdata="SetOnData"
        :SandData="MenuInfo"
        @output="OutPutVal"
      ></MenuSwitch>
    </div>
    <!-- 切换导航栏结束 -->
    

    <!-- 滑块开始 -->
    <div class="SliderHear" style="overflow: hidden;padding-top: 44px;" 
      :style="{height:(MenuInfoNum!=0)?(((UserHeightInfo.value+44>UserHeightInfo.BodyH)?(UserHeightInfo.value+44):UserHeightInfo.BodyH)+'px'):'auto'}">
      <swiper ref="mySwiper_Online" :options="swiperOptions">
        <template>
          <swiper-slide>
            <keep-alive> 
              <Demand></Demand>
              <!-- <Demand v-if="MenuInfoNum==0"></Demand> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div> -->
            </keep-alive>
          </swiper-slide>

          <swiper-slide>
            <keep-alive>
              <Release></Release>
              <!-- <Release v-if="MenuInfoNum==1"></Release> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div> -->
            </keep-alive>
          </swiper-slide>

          <swiper-slide>
            <keep-alive>
              <Accident></Accident>
              <!-- <Accident v-if="MenuInfoNum==2"></Accident> <div style="padding: 20px 0" v-else><van-skeleton title :row="10"  /></div> -->
            </keep-alive>
          </swiper-slide>

        </template>
      </swiper>
    </div>
    <!-- 滑块结束 -->
  </div>
</template>

<script>
var BodyOH=document.body.clientHeight;
import Demand from "@/views/data-report-ding/TechnicalOperation/TechnicalOperation_con.vue"; //需求
import Release from "@/views/data-report-ding/TechnicalOperation/TechnicalOperation_con2.vue"; //发布
import Accident from "@/views/data-report-ding/TechnicalOperation/TechnicalOperation_con3.vue"; //事故
import MenuSwitch from "@/views/data-report-ding/MenuSwitch/MenuSwitch.vue";
import {Skeleton} from "vant";

export default {
  name: "TechnicalOperation",
  components: {
    Demand: Demand,
    Release: Release,
    Accident: Accident,
    MenuSwitch: MenuSwitch,
    [Skeleton.name]:Skeleton
  },

  data() {
    return {
      swiperOptions: {
        // direction: "vertical", // 垂直切换选项
        loop: false, // 循环模式选项
        initialSlide: 1,
        preventInteractionOnTransition: true,
        noSwiping: true,
        // noSwipingClass : 'stop-swiping',
        noSwipingSelector: "canvas",
        noSwipingClass: "test_addd",
        followFinger: false,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      },

      SetOnData: [],
      MenuInfo: [],
      MenuInfoNum:0,
      UserHeightInfo:{
        value:700,
        ArrayOn:[{num:0,height:'auto'}],
        BodyH:BodyOH+1,
      }
    };
  },

  created() {
    this.SetOnData = [
      { code: "Demand", name: "需求", num: 0 },
      { code: "Release", name: "发布", num: 1 },
      { code: "Accident", name: "事故", num: 2 },
      //   { code: "c", name: "测试栏目" },
    ];
  },

  mounted() {
    // 滑动的开始
    this.$refs["mySwiper_Online"].$swiper.on(
      "slideChangeTransitionEnd",
      (swiper) => {
        const index = swiper.realIndex;
        Object.keys(this.SetOnData).forEach((key) => {
          if (this.SetOnData[key].num == index) {
            this.MenuInfo = this.SetOnData[key].name;
            this.MenuInfoNum = this.SetOnData[key].num;
          }
        });
      }
    );
    // 滑动的结束
    this.chenSwiper_online(0);
    this.$EventBus.$on("SwiperHeight", (data) => {
      // console.log("===========asasassas====");
      this.UserHeightInfo.value=data.height;
      // console.log(this.MenuInfoNum+'    '+this.UserHeightInfo.value);
      this.UserHeightInfo.ArrayOn.push({num:data.num,height:data.height});
    });



    // console.log(JSON.parse(sessionStorage.getItem("UserInfo")).userName);

  },

  watch: {
    'MenuInfoNum':{
      handler(){
        this.$EventBus.$emit("SwiperHeightSend",{num:this.MenuInfoNum});

        // Object.keys(this.UserHeightInfo.ArrayOn).forEach((key) => {
        //   if(this.UserHeightInfo.ArrayOn[key].num==this.MenuInfoNum){
        //     this.UserHeightInfo.value=this.UserHeightInfo.ArrayOn[key].height;
        //     // this.$EventBus.$emit("SwiperHeightSend",{num:this.MenuInfoNum});
        //   }
        // });
      }
    }
  },
  methods: {
    chenSwiper_online(value) {
      this.$refs["mySwiper_Online"].$swiper.slideTo(value, 0, false);
    },
    OutPutVal(data) {
      Object.keys(this.SetOnData).forEach((key) => {
        if (data.num == this.SetOnData[key].num) {
          this.chenSwiper_online(this.SetOnData[key].num);
          this.MenuInfoNum=data.num;
        }
      });
    },
  },


};
</script>

<style lang="scss" scoped>
.nav-wrapperOnline{

  position: fixed;
  top: 0px;
  z-index: 100;
  width: 100%;
  background-color: #ffffff;

  border-bottom: 1px solid #F0F0F0;
  ::v-deep .select_title_css{
    color: #999999;
  }
  ::v-deep .select_title_css.active{
    color: #333333;
  }
  ::v-deep .select_title_css.active:after{
    width: 20%;
    height: 3px;
    background-color: #1890FF;
    border-radius: 6px;
  }
}
</style>