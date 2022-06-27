<template>

  <div class="IndexCss">
    <div v-for="(item, index) in IndexData" :key="index" class="IndexLabel">
      <div class="IndexName">{{item.title}}</div>
      <div class="IndexVal">{{HandVal(index,-1,item.Tnum,sign)}}</div>
      <div class="IsContInfo" v-if="item.ContInfo.length>0">
        <div class="ContInfo" v-for="(item1,index1) in item.ContInfo" :key="index1" :style="{width:OnWith+'%'}">
          <div class="ConTitle">{{item1.title}}</div>
          <div class="ConVal">{{HandVal(index,index1,item1.val,sign)}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {HandleNum} from "@/views/data-report-ding/MenuSwitch/Currency.js";
export default {
  name: "Indextcq",
  components: {},
  props: {
    OnType: {
      type: String,
    },
    sign: {
      type: Number,
    },
    IndexData: {
      type: Array,
    },
    OnWith:{
      type:Number,
    }
  },
  data() {
    return {};
  },
  methods: {
    HandVal(Cval, Rval, val) {

      if(this.OnType === 'Demand'){
        return HandleNum('Null',val);
      }else if(this.OnType === 'Release'){
        if(Rval===-1){
          return HandleNum('Null',val);
        }else if(Rval===0){
          return HandleNum('Null',val)+'%';
        }
      }else if(this.OnType === 'Accident'){
        return HandleNum('Null',val);
      }

    }
  }
};
</script>

<style lang="scss" scoped>
.IndexCss{
  padding: 0px 10px;
  padding-top: 10px;
  display: flex;
  .IndexLabel{
    flex: 1;
    .IndexName{
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 20px;
      text-align: center;
    }
    .IndexVal{
      padding-top: 10px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 20px;
      text-align: center;
    }
    .IsContInfo{
      .ContInfo{
        float: left;
        display: flex;
        .ConTitle{
          flex: 1;
          padding-top: 10px;
          padding-right: 5px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 400;
          color: #999999;
          text-align:right;
        }
        .ConVal{
          flex: 1;
          padding-top: 10px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 400;
          color: #666666;
          text-align:left;
        }
      }      
    }

  }
}
</style>