<template>
  <div>
    <!-- 顶部导航栏开始 -->
    <div>
      <!-- 导航栏开始 -->
      <section class="px10 py10 nav-wrapper men_css">
        <div class="Productmarket_title" style="">
          <van-row type="flex" justify="center">
            <van-col
              v-for="(val, key) in setdata"
              :span="
                setdata.length == 5 ? '5' : setdata.length == 4 ? '6' : '7'
              "
              :key="key"
              @click="ChooseOn(key)"
            >
              <div class="select_title_css" :class="{ active: ChoVal == key }">
                {{ val.name }}
              </div>
            </van-col>
          </van-row>
        </div>
      </section>
      <!-- 导航栏结束 -->
    </div>
    <!-- 顶部导航栏结束 -->
  </div>
</template>

<script>
import { Row, Col } from "vant";

export default {
  name: "MenuSwitch",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },

  props: {
    setdata: {
      type: [Object, Array],
      default: () => ({}),
    },
    SandData: {
      type: [String, Array],
    },
  },
  data() {
    return {
      ChoVal: 0,
    };
  },

  watch: {
    SandData: {
      immediate: true,
      handler(val) {
        console.log(val);
        Object.keys(this.setdata).forEach((key) => {
          if (this.setdata[key].name == val) {
            this.ChoVal = this.setdata[key].num;
          }
        });
      },
    },
  },

  created() {
    // console.log("====asdada=====");
    // console.log(this.setdata);
  },
  mounted() {},

  methods: {
    ChooseOn(num) {
      this.ChoVal = num;
      Object.keys(this.setdata).forEach((key) => {
        if (this.ChoVal == key) {
          this.$emit("output", this.setdata[key]);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.men_css {
  padding-top: 5px;
  padding-bottom: 13px;
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