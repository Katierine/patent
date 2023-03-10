
  <template>
  <div>
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

    <div class="histogram">
      <div ref="chart2" style="height: 376px"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  mounted() {
    this.getEchartData();
    this.getEchartData1();
    this.getEchartData2();
  },
  methods: {
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





