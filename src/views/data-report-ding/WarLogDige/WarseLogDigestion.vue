<template>
  <div>
    <!-- <div>物流仓储</div> -->
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
    <div class="SliderHear">
      <swiper ref="mySwiper_Online" :options="swiperOptions">
        <template>
          <swiper-slide>
            <keep-alive>
              <RegManager></RegManager>
            </keep-alive>
          </swiper-slide>

          <swiper-slide>
            <keep-alive>
              <TreAnalysis></TreAnalysis>
            </keep-alive>
          </swiper-slide>
        </template>
      </swiper>
    </div>
    <!-- 滑块结束 -->
  </div>
</template>

<script>
import RegManager from "@/views/data-report-ding/WarLogDige/WarseLogDigestion_con.vue";
import TreAnalysis from "@/views/data-report-ding/WarLogDige/WarseLogDigestion_con2.vue";
import MenuSwitch from "@/views/data-report-ding/MenuSwitch/MenuSwitch.vue";

import {Information_log} from "@/utils/helpers";

export default {
  name: "WarseLogDigestion",
  components: {
    RegManager: RegManager,
    TreAnalysis: TreAnalysis,
    MenuSwitch: MenuSwitch,
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
    };
  },

  created() {
    this.SetOnData = [
      { code: "RegManager", name: "区域经理", num: 0 },
      { code: "TreAnalysis", name: "趋势分析", num: 1 },
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
          }
        });
      }
    );
    // 滑动的结束
    this.chenSwiper_online(0);


    // console.log(JSON.parse(sessionStorage.getItem("UserInfo")).userName);
    // 记录用户访问的次数
    if(sessionStorage.getItem("UserInfo")){
      Information_log("数据传送-仓储物流-仓储物流消化日报","访问页面",JSON.parse(sessionStorage.getItem("UserInfo")).userName);

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
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.nav-wrapperOnline {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 99;
  border-bottom: 1px solid #eeeeee;
}
</style>