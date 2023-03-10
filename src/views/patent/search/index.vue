<template>
  <div class="app-container">
    <el-row :gutter="24">
    <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="发明人" prop="inventor">
            <el-input
              v-model="queryParams.inventor"
              placeholder="请输入发明人"
              clearable
              style="width: 200px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="专利名称" prop="patentName">
            <el-input
              v-model="queryParams.patentName"
              placeholder="请输入专利名称"
              clearable
              style="width: 200px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>

          <el-form-item label="专利类型" prop="patentType">
            <el-input
              v-model="queryParams.patentType"
              placeholder="请输入专利类型"
              clearable
              style="width: 200px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="申请日期">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

          <el-form-item label="授权日期" prop="authorizationDate">
            <el-input
              v-model="queryParams.authorizationDate"
              placeholder="请输入授权日期"
              clearable
              style="width: 200px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>

          </el-form-item>
          <el-form-item>
            <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['patent:entering:add']"
          >录入已有专利</el-button>

          </el-form-item>
        </el-form>

    <el-table
      v-loading="loading"
      :data="PatentList"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="patentId" />
      <el-table-column label="专利类型" align="center" prop="patentType" >
      </el-table-column>
      <el-table-column label="专利名称" align="center" prop="patentName" />
      <el-table-column label="专利号" align="center" prop="patentCode" />
      <el-table-column label="发明人" align="center" prop="inventor" />
      <el-table-column label="部门" align="center" prop="department" />
      <el-table-column label="代理公司" align="center" prop="agencyCompany" />
      <el-table-column label="缴费月份" align="center" prop="payMonth" />
      <el-table-column label="法律状态" align="center" prop="legalStatus" >
        <template slot-scope="scope">
          <div>{{ hanldeStatus(scope.row.legalStatus) }}</div>
        </template>
      </el-table-column>

      <el-table-column label="申请时间" align="center" prop="applicationTime" width="180"/>
      <el-table-column label="授权时间" align="center" prop="authorizationDate" width="180"/>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['patent:patent:edit']"
            >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['patent:patent:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
      </el-row>
      <!-- 录入已有专利 -->
      <el-drawer
      title="录入已有专利"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="35%"
      :visible.sync="open"
      :before-close="handleClose">
      <div class="demo-drawer__content">
        <el-row>
          <el-form label-width="120px" ref="form" :model="form" :rules="rules">
            <el-col :span="20">
              <el-form-item label="编号" prop="patentId">
                <el-input
                  v-model="form.patentId"
                  placeholder="请输入编号"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="专利类型" prop="patentType">
                <el-input
                  v-model="form.patentType"
                  placeholder="请输入发明类型"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="专利号" prop="patentCode">
                <el-input
                  v-model="form.patentCode"
                  placeholder="请输入专利号"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="专利名称" prop="patentName">
                <el-input
                  v-model="form.patentName"
                  placeholder="请输入专利名称"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="申请日期" prop="applicationTime">
                <el-date-picker
                  v-model="form.applicationTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择申请日期"
                  clearable></el-date-picker>
              </el-form-item>

              <el-form-item label="证书" prop="certificate">
                <el-input
                  v-model="form.certificate"
                  placeholder="是否有证书"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="授权日期" prop="authorizationDate">
                <el-date-picker
                  v-model="form.authorizationDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择授权日期"
                  clearable></el-date-picker>
              </el-form-item>
              <el-form-item label="登记费" prop="registrationFee">
                <el-input
                  v-model="form.registrationFee"
                  placeholder="请输入登记费"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="时间" prop="time">
                <el-input
                  v-model="form.time"
                  placeholder="请输入时间"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="专利发明人" prop="inventor">
                <el-input
                  v-model="form.inventor"
                  placeholder="请输入专利发明人"
                  clearable>
                </el-input>
              </el-form-item>

              <el-form-item label="部门" prop="department">
                <el-input
                  v-model="form.department"
                  placeholder="请输入部门"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="缴费月份" prop="payMonth">
                <el-input
                  v-model="form.payMonth"
                  placeholder="请输入缴费日期"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="缴费年份" prop="payYear">
                <el-input
                  v-model="form.payYear"
                  placeholder="请输入缴费年份"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="费用" prop="fee">
                <el-input
                  v-model="form.fee"
                  placeholder="费用"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="form.remark"
                  type="textarea"
                  placeholder="备注"
                  show-word-limit
                  :autosize="{ minRows: 1, maxRows: 7 }"></el-input>
              </el-form-item>
              <el-form-item label="法律状态：" prop="legalStatus">
                <el-select v-model="form.legalStatus" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="审核意见" prop="opinion">
                <el-input
                  v-model="form.opinion"
                  type="textarea"
                  placeholder="请输入审核意见"
                  :autosize="{ minRows: 1, maxRows: 6 }"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div
          slot="footer"
          class="dialog-footer"
          style="margin-left: 35%; margin-top: 5%">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel" style="margin-left: 15%">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  listPatent,
  getPatent,
  delPatent,
  addPatent,
  updatePatent,
} from "@/api/patent/search";

export default {
  name: "patent",
  dicts: ["patent_normal_disable"],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 专利表格数据
      PatentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      dateRange: [],
      // 数据范围选项
      types: [
      {
          value: "0",
          label: "实用新型",
        },
        {
          value: "1",
          label: "发明",
        },
      ],
      options: [
        {
          value: "0",
          label: "终止",
        },
        {
          value: "1",
          label: "驳回",
        },
        {
          value: "2",
          label: "放弃",
        },
        {
          value: "3",
          label: "停止缴费",
        },
        {
          value: "4",
          label: "撤回",
        },
        {
          value: "5",
          label: "南航合作",
        },
        {
          value: "6",
          label: "发明授权",
        },
        {
          value: "7",
          label: "有效",
        },
        {
          value: "8",
          label: "授权",
        }

      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        patentId: undefined,
        patentName: undefined,
        patentCode:undefined,
        patentType: undefined,
        inventor: undefined,
        payMonth: undefined,
      },
      // 表单参数
      form: {
        status: 1,
        patentType: 1,
      },      // 表单校验
      rules: {
        patentId: [
        { required: true, message: "编号不能为空", trigger: "blur" },

        ],
        patentName: [
        { required: true, message: "专利名称不能为空", trigger: "blur" },

        ],

        patentType: [
          { required: true, message: "专利类型不能为空", trigger: "blur" },
        ],
        patentCode: [
          { required: true, message: "专利号不能为空", trigger: "blur" },
        ],
        inventor: [
          { required: true, message: "创建人不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询专利列表 */
    getList() {
      this.loading = true;
      listPatent(this.queryParams).then((response) => {
        this.PatentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        patentCode: undefined,
        patentId: undefined,
        patentName: undefined,
        patentCode:undefined,
        inventor: undefined,
        payMonth: undefined,
        status: [],
        patentType: [],
        applicationTime: undefined,
        remark: undefined,
      };
      this.resetForm("form");
    },
       /** 新增按钮操作 */
       handleAdd(row) {
      this.reset();
      if (row != undefined) {
        this.form.patentId = row.patentId;
      }
      this.open = true;
      this.title = "录入已有专利";
    },


    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.patentId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },


    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const patentId = row.patentId || this.ids;
      getPatent(patentId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改专利";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.patentId != undefined) {
            updatePatent(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPatent(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const patentIds = row.patentId || this.ids;
      this.$modal
        .confirm('是否确认删除专利编号为"' + patentIds + '"的数据项？')
        .then(function () {
          return delPatent(patentIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "patent/patent/export",
        {
          ...this.queryParams,
        },
        `patent_${new Date().getTime()}.xlsx`
      );
    },
        handleClose(done) {
      this.$confirm("还有未保存的工作哦确定关闭吗？")
        .then((_) => {
          this.dialogVisible = false;
        })
        .catch((_) => {});
    },
    // 处理表格状态
    hanldeStatus(status) {
      const some = this.options.find((item) => item.value == status);
      return some ? some.label : "";
    },
    hanldeTypes(patentType) {
      const some = this.types.find((item) => item.value == patentType);
      return some ? some.label : "";
    },
    hanldeDateTime(dateStr) {
      const getStr = (num) => num < 10 ? `0${num}` : num;
      try {
        const date = new Date(dateStr);
        const yy = date.getFullYear();
        const MM = date.getMonth() +1;
        const dd = date.getDate();
        const HH = date.getHours();
        const mm = date.getMinutes();
        const ss = date.getSeconds();
        return `${yy}-${getStr(MM)}-${getStr(dd)} ${getStr(HH)}:${getStr(mm)}:${getStr(ss)}`;
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
