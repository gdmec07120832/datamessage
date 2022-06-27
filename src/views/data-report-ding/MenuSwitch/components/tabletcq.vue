<template>
  <div class="TableWhole">
    <div class="TableHeard">
      <table>
        <thead>
          <tr>
            <td v-for="(item, index) in labelD" :key="index" :title="item.Val"
              :style="{width:item.Width+'%'}"
            >
              {{item.Val}}
            </td>
          </tr>
        </thead>
      </table>
    </div>

    <div class="TableBody">
      <table>
        <tbody>
          <tr v-for="(item, index) in (tableD)" :key="index">
            <td v-for="(item1, index1) in item" :key="index1"
              :class="[HandleColor(index,index1,item1),]"
              :style="{width:item1.Width+'%'}"
              :title="item1.Val"
            >
              {{ HandVal(index,index1,item1.Val)}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabletcq",
  props: {
    labelD: {
      type: Array,
    },
    tableD: {
      type: Array,
    },
    index: {
      type: [Number, String],
    },
  },
  data() {
    return {};
  },
  methods: {
    HandVal(Cval, Rval, val){
      if(Cval!==undefined&&Rval!==undefined&&val!==undefined) return val
    },
    HandleColor(Cval, Rval, val) {
      if(Cval!==undefined&&Rval!==undefined&&val!==undefined) return ''
    }

  }

};
</script>

<style lang="scss" scoped>
.TableWhole {
  padding: 0px 5px;
  .TableHeard {
    display: contents;
  }
  .TableBody {
    display: contents;
  }
  .TableHeard table,
  .TableBody table {
    width: 100%;
    font-size: 12px;
    table-layout: fixed;
    border-collapse: collapse;
    text-align: center;
    td {
      // border: 1px solid #e7e9f0;
      border-top: 1px solid #e7e9f0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // width: 16.66%;
      line-height: 35px;
    }
    // td:nth-child(1) {
    //   width: 23%;
    // }
    // td:nth-child(2) {
    //   width: 10.32%;
    // }
  }

  .TableHeard table{
    tr{
      td{
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
    }
  }

  .TableBody table {
    tr{
      td{
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
  }


}
</style>