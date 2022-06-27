<template>
  <div>
    <!-- 顶部导航栏开始 -->
    <div class="nav-wrapperOnline" style="border-bottom: 1px solid #eeeeee">
      <!-- 二级目录开始 -->
      <section
        class="px10 py10 nav-wrapper"
        style="padding-top: 5px; padding-bottom: 13px"
      >
        <div class="Productmarket_title" style="">
          <van-row type="flex" justify="center">
            <van-col
              span="5"
              @click="
                Range_Single_choice(
                  'cpcy',
                  '_this.sel_value.Range_on',
                  true,
                  '_this.sel_value.theme',
                  '1'
                )
              "
            >
              <div
                class="select_title_css"
                :class="{ active: sel_value.Range_on.Range_set === '1' }"
              >
                支付
              </div>
            </van-col>
            <van-col
              span="5"
              @click="
                Range_Single_choice(
                  'ouk',
                  '_this.sel_value.Range_on',
                  true,
                  '_this.sel_value.theme',
                  '2'
                )
              "
            >
              <div
                class="select_title_css"
                :class="{ active: sel_value.Range_on.Range_set === '2' }"
              >
                发货
              </div>
            </van-col>
            <van-col
              span="5"
              @click="
                Range_Single_choice(
                  'muying',
                  '_this.sel_value.Range_on',
                  true,
                  '_this.sel_value.theme',
                  '3'
                )
              "
              ><div
                class="select_title_css"
                :class="{ active: sel_value.Range_on.Range_set === '3' }"
              >
                访客
              </div></van-col
            >


            <van-col
              span="5"
              @click="
                Range_Single_choice(
                  'pinzhi',
                  '_this.sel_value.Range_on',
                  true,
                  '_this.sel_value.theme',
                  '4'
                )
              "
              ><div
                class="select_title_css"
                :class="{ active: sel_value.Range_on.Range_set === '4' }"
              >
                转化
              </div></van-col
            >

            <van-col
              span="5"
              @click="
                Range_Single_choice(
                  'kedanjia',
                  '_this.sel_value.Range_on',
                  true,
                  '_this.sel_value.theme',
                  '5'
                )
              "
              ><div
                class="select_title_css"
                :class="{ active: sel_value.Range_on.Range_set === '5' }"
              >
                客单
              </div></van-col
            >

          </van-row>
        </div>
      </section>
      <!-- 二级目录结束 -->
    </div>
    <!-- 顶部导航栏结束 -->

    <!-- 滑块开始 -->
    <div style="">
      <swiper ref="mySwiper_Online" :options="swiperOptions">
        <template>

          <swiper-slide>
            <keep-alive>
              <OnlineKStoreODaily ></OnlineKStoreODaily>
              <!-- <div style="padding: 10px 0" v-else>  v-if="pd_val == 1"
                <van-skeleton title :row="10" />
              </div> -->
            </keep-alive>
          </swiper-slide>

          <swiper-slide>
            <keep-alive>
              <OnlineKStoreODaily2 ></OnlineKStoreODaily2>
              <!-- <div style="padding: 10px 0" v-else>  v-if="pd_val == 2"
                <van-skeleton title :row="10" />
              </div> -->
            </keep-alive>
          </swiper-slide>

          <swiper-slide>
            <keep-alive>
              <OnlineKStoreODaily3 ></OnlineKStoreODaily3>
              <!-- <div style="padding: 10px 0" v-else>  v-if="pd_val == 3"
                <van-skeleton title :row="10" />
              </div> -->
            </keep-alive>
          </swiper-slide>

          <swiper-slide>
            <keep-alive>
              <OnlineKStoreODaily4 ></OnlineKStoreODaily4>
            </keep-alive>
          </swiper-slide>

          <swiper-slide>
            <keep-alive>
              <OnlineKStoreODaily5 ></OnlineKStoreODaily5>
            </keep-alive>
          </swiper-slide>

        </template>
      </swiper>
    </div>
    <!-- 滑块结束 -->
  </div>
</template>

<script>
import OnlineKStoreODailyset from "@/views/data-report-ding/OnlineKStoreODaily/OnlineKStoreODaily_con.vue";
import OnlineKStoreODailyset2 from "@/views/data-report-ding/OnlineKStoreODaily/OnlineKStoreODaily_con.vue";
import OnlineKStoreODailyset3 from "@/views/data-report-ding/OnlineKStoreODaily/OnlineKStoreODaily_con.vue";
import OnlineKStoreODailyset4 from "@/views/data-report-ding/OnlineKStoreODaily/OnlineKStoreODaily_con.vue";
import OnlineKStoreODailyset5 from "@/views/data-report-ding/OnlineKStoreODaily/OnlineKStoreODaily_con.vue";


import { Row, Col } from "vant";

export default {
  name: "OnlineKSODailyName",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    OnlineKStoreODaily: OnlineKStoreODailyset,
    OnlineKStoreODaily2: OnlineKStoreODailyset2,
    OnlineKStoreODaily3: OnlineKStoreODailyset3,
    OnlineKStoreODaily4:OnlineKStoreODailyset4,
    OnlineKStoreODaily5:OnlineKStoreODailyset5
  },
  data() {
    return {
      pd_val: 1,
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

      sel_value: {
        theme: {
          cpcy: true,
          ouk: false,
          muying: false,
          pinzhi: false,
          kedanjia: false,
        },
        Range_on: {
          Range_set: "1",
        },
      },
    };
  },

  mounted() {
    console.log("==========asda切换页这里===========");

    // 滑动的开始
    this.$refs["mySwiper_Online"].$swiper.on(
      "slideChangeTransitionEnd",
      (swiper) => {
        const index = swiper.realIndex;
        // console.log("这里运行了！！！  " + index);
        // this.sel_value.Range_on.Range_set=(index+1)+'';
        // console.log(this.sel_value.Range_on.Range_set);
        if(((index+1)+'')=='1'){
          this.Range_Single_choice('cpcy','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'');
        }else if(((index+1)+'')=='2'){
          this.Range_Single_choice('ouk','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        }else if(((index+1)+'')=='3'){
          this.Range_Single_choice('muying','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        }else if(((index+1)+'')=='4'){
          this.Range_Single_choice('pinzhi','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        }else if(((index+1)+'')=='5'){
          this.Range_Single_choice('kedanjia','_this.sel_value.Range_on',true,'_this.sel_value.theme',index+1+'')
        }

        
      }
    );
    // 滑动的结束
    this.chenSwiper_online(0);
  },

  methods: {
    chenSwiper_online(value) {
      //   console.log("运行到这里来了！！！！！！！！");
      this.pd_val=value+1;
      //   console.log(this.pd_val);
      this.$refs["mySwiper_Online"].$swiper.slideTo(value, 0, false);
    },

    Range_Single_choice(
      value,
      josn_value,
      target_value,
      for_value,
      number_value
    ) {
      var _this = this;
      _this.show; //意义不大 防止定义不调用出现的报错
      for_value = eval(for_value);
      // let pd_num=0;

      Object.keys(for_value).forEach((key) => {
        if (key == value) {
          for_value[key] = target_value;
        } else {
          for_value[key] = false;
        }
      });

      if (josn_value) {
        this.$EventBus.$emit("OnlineDaily_f", {
          Range_value_set: number_value,
        });
        josn_value = eval(josn_value);
        Object.keys(josn_value).forEach((key_fun) => {
          josn_value[key_fun] = number_value;
        });
      }

      if(_this.sel_value.Range_on.Range_set=='1'){
        this.chenSwiper_online(0);
      }else if(_this.sel_value.Range_on.Range_set=='2'){
        this.chenSwiper_online(1);
      }else if(_this.sel_value.Range_on.Range_set=='3'){
        this.chenSwiper_online(2);
      }

    },


  },

  //生命周期结束之前销毁
  beforeDestroy () {
    this.$EventBus.$off("OnlineDaily_f");
  },


};
</script>

<style scoped lang="scss">
.nav-wrapperOnline {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 99;
}

.Productmarket_title .van-row .van-col--5 {
  width: 20%;
}

.Productmarket_title .van-row .van-col button {
  font-size: 14px;
  height: 28px;
  // color: #ffffff;
}
.Productmarket_title .van-row .van-col .but_no_select {
  font-size: 14px;
  height: 28px;
  color: #000000;
}

.select_title_css {
  position: relative;
  font-size: 14px;
  text-align: center;
  line-height: 25px;

  &.active {
    font-size: 14px;
    color: #23b0a8;
    font-weight: bold;

    &:after {
      position: absolute;
      content: "";
      left: 50%;
      width: 30%;
      transform: translateX(-50%);
      height: 2px;
      background-color: #23b0a8;
      bottom: -3px;
    }
  }
}
</style>