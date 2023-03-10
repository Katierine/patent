<template>
  <!-- 定义标签 -->
  <div
    :id="id"
    :style="{
      width: width,
      height: height,
    }"
  ></div>
</template>

<script>
import * as echarts from "echarts";
// 2.生成一个 id 值给标签，目的是为了当多次使用组件防止id重复
const uid = function () {
  return new Date().getTime();
};
export default {
  //1.获取传过来的值
  props: {
    width: {
      typeof: String,
    },
    height: {
      typeof: String,
    },
    option: {
      typeof: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      //3.在这定义 id 与 myChart图表实例 ， 方便管理
      id: null,
      myChart: null,
    };
  },
  created() {
    // 4.id赋值
    this.id = uid();
  },
  mounted() {
    //   5. 创建echarts图表实例
    this.myChart = echarts.init(document.getElementById(this.id));
    // 指定图表的配置项和数据
    var option = this.option;
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
  },
};
</script>
