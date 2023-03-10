<template>
  <div class="app-container home">
    <el-row :gutter="20">


      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>后台管理框架</h2>
        <p>
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>


      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>技术选型</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>后端技术</h4>
            <ul>
              <li>SpringBoot</li>
              <li>Spring Security</li>
              <li>JWT</li>
              <li>MyBatis</li>
              <li>Druid</li>
              <li>Fastjson</li>
              <li>...</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>前端技术</h4>
            <ul>
              <li>Vue</li>
              <li>Vuex</li>
              <li>Element-ui</li>
              <li>Axios</li>
              <li>Sass</li>
              <li>Quill</li>
              <li>...</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-divider />
    <div style="margin-top: 3%; display: flex">
      <el-card style="width: 40%; margin-left: 5%">
        <h3>专利类型分析</h3>
        <div ref="chart" style="width: 100%; height: 376px"></div>
      </el-card>
      <el-card style="width: 40%; margin-left: 5%">
        <h3>法律状态分析</h3>
        <div ref="chart1" style="height: 376px"></div>
      </el-card>
    </div>
    <el-divider />
  </div>
</template>

<script>
// import * as echarts from 'echarts';

export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.4",
    };
  },
  mounted() {
    this.getEchartData();
    this.getEchartData1();
    this.getEchartData2();
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    getEchartData() {
      const chart = this.$refs.chart;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = {
          legend: {
            top: "bottom",
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: "专利类型分析",
              type: "pie",
              radius: [50, 150],
              center: ["40%", "40%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 2,
              },
              data: [
                { value: 548, name: "实用新型" },
                { value: 39, name: "发明" },
              ],
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    getEchartData1() {
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart = this.$echarts.init(chart1);
        const option = {
          legend: {
            top: "bottom",
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: "session name",
              type: "pie",
              radius: [60, 120],
              roseType: "area",
              itemStyle: {
                borderRadius: 12,
              },
              data: [
                { value: 120, name: "驳回" },
                { value: 32, name: "撤回" },
                { value: 26, name: "终止" },
                { value: 32, name: "到期" },
                { value: 38, name: "发明授权" },
                { value: 124, name: "放弃" },
                { value: 12, name: "授权" },
                { value: 9, name: "南航合作" },
                { value: 1, name: "与嵊州合作" },
                { value: 2, name: "转让天捷" },
                { value: 33, name: "停止缴费" },
                { value: 667, name: "有效" },
                { value: 586, name: "终止" },
              ],
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    getEchartData2() {},

  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

