<template>
  <div class="TitleTop10">
    <div class="TitleTopUser">
      <span>{{label}}</span>
      <span class="SingChoice" v-if="IsChange===true">
        <van-radio-group v-model="Option.area"  direction="horizontal" @change='ClickOnS'>
          <van-radio :name="val" icon-size="16px" v-for="(val, key) in Option.areaOption" :key="key">
            <div style="font-size: 12px;">{{val}}</div>
          </van-radio>
        </van-radio-group>
      </span>              
    </div>
  </div>
</template>

<script>
import {RadioGroup, Radio,Popup,Checkbox,CheckboxGroup,Switch} from "vant";
export default {
  name: "Title",
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]:Popup,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
    [Switch.name]:Switch
  },
  props: {
    label: {
        type: String,
        default: '标题'
    },
    IsChange:{
      type:Boolean,
      default:false
    },
    Option:{
      type:Object
    }
  },
  data() {
    return {
      AreaData:{
        area:'数量',
        areaOption:['数量','占比']
      },      
    };
  },
  methods: {
    ClickOnS(val){
      this.$emit('update:value', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.TitleTop10:before{
  display: inline-block;
  width: 3px;
  height: 16px;
  background: linear-gradient(180deg, #41A4FF 0%, #1890FF 100%);
  border-radius: 2px;
  content: '';
  margin-right: 7px;
}
.TitleTop10{
  display: flex;
  align-items: center;
  padding: 0px 5px;
  padding-top: 10px;
  .TitleTopUser{
    display: flex;
    justify-content: space-between;
    width: 100%;
    span{
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #444444;
      line-height: 20px;            
    }            
  }
}
</style>