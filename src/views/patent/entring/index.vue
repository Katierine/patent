<template>
  <div class="entring">
    <el-form
            ref="entring"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="150px"
            label-position disabled="center"
            style="margin-top: 3%"
          >
            <el-col :span="6">
              <el-form-item label="管理编号" prop="applicationId">
                <el-input
                  v-model="formData.field104"
                  placeholder="请输入管理编号"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="专利状态" prop="legalStatus">
                <el-select
                  v-model="formData.feeType"
                  placeholder="请选择专利状态"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in field103Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="专利号" prop="patentId">
                <el-input
                  v-model="formData.patentId"
                  placeholder="请输入专利号"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="专利名称" prop="patentName">
                <el-input
                  v-model="formData.patentName"
                  placeholder="请输入专利名称"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="费用类型" prop="feeType">
                <el-select
                  v-model="formData.feeType"
                  placeholder="请选择费用类型"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in feeTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="缴费日期" prop="payMonth">
                <el-input
                  v-model="formData.patepayMonthntName"
                  placeholder="请输入缴费日期"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="缴费金额" prop="payMoney">
                <el-input
                  v-model="formData.payMoney"
                  placeholder="请输入缴费金额"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="费减比例" prop="bili">
                <el-input
                  v-model="formData.bili"
                  placeholder="请输入费减比例"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="收费单位" prop="field112">
                <el-select
                  v-model="formData.field112"
                  placeholder="请选择收费单位"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in field112Options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="收款单位" prop="payee">
                <el-input
                  v-model="formData.payee"
                  placeholder="请输入收款单位"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="收款账号" prop="chargeAccount">
                <el-input
                  v-model="formData.chargeAccount"
                  placeholder="请输入收款账号"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="收款金额" prop="field115">
                <el-input
                  v-model="formData.field115"
                  placeholder="请输入收款金额"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="formData.remark"
                  type="textarea"
                  placeholder="请输入备注"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="费用发票扫描件" prop="invoice" required>
                <el-upload
                  ref="invoice"
                  :file-list="invoicefileList"
                  :action="invoiceAction"
                  :before-upload="invoiceBeforeUpload"
                >
                  <el-button size="small" type="primary" icon="el-icon-upload"
                    >上传</el-button
                  >
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="已缴费明细" prop="feeDetials">
                <el-input
                  v-model="formData.feeDetials"
                  placeholder="请输入已缴费明细"
                  clearable
                  :style="{ width: '100%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>

  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field104: undefined,
        field103: undefined,
        patentId: undefined,
        patentName: undefined,
        feeType: undefined,
        field109: null,
        payMoney: undefined,
        bili: undefined,
        field112: undefined,
        payee: null,
        chargeAccount: undefined,
        field115: undefined,
        remark: undefined,
        invoice: null,
        feeDetials: undefined,
      },
      rules: {
        field104: [
          {
            required: true,
            message: "请输入管理编号",
            trigger: "blur",
          },
        ],
        field103: [
          {
            required: true,
            message: "请输入专利状态",
            trigger: "blur",
          },
        ],
        patentId: [
          {
            required: true,
            message: "请输入专利号",
            trigger: "blur",
          },
        ],
        patentName: [
          {
            required: true,
            message: "请输入专利名称",
            trigger: "blur",
          },
        ],
        feeType: [
          {
            required: true,
            message: "请选择费用类型",
            trigger: "change",
          },
        ],
        field109: [
          {
            required: true,
            message: "请选择缴费日期",
            trigger: "change",
          },
        ],
        payMoney: [
          {
            required: true,
            message: "请输入缴费金额",
            trigger: "blur",
          },
        ],
        bili: [
          {
            required: true,
            message: "请输入费减比例",
            trigger: "blur",
          },
        ],
        field112: [
          {
            required: true,
            message: "请选择收费单位",
            trigger: "change",
          },
        ],
        payee: [
          {
            required: true,
            message: "请选择收款单位",
            trigger: "change",
          },
        ],
        chargeAccount: [
          {
            required: true,
            message: "请输入收款号码",
            trigger: "blur",
          },
        ],
        field115: [
          {
            required: true,
            message: "请输入收款金额",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
        feeDetials: [
          {
            required: true,
            message: "请输入已缴费明细",
            trigger: "blur",
          },
        ],
      },
      invoiceAction: "https://jsonplaceholder.typicode.com/posts/",
      invoicefileList: [],
      field103Options: [
        {
          label: "已授权",
          value: 1,
        },
        {
          label: "未授权",
          value: 2,
        },
      ],
      feeTypeOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field112Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["entring"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["entring"].resetFields();
    },
    invoiceBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
  },
};
</script>
