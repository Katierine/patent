<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['patent:Application:add']"
          >内部申请</el-button>
      </el-col>
    </el-row>

    <el-drawer
      title="内部申请"
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
              <el-form-item label="管理员编号" prop="applicationId">
                <el-input
                  v-model="form.applicationId"
                  placeholder="请输入管理员编号"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="申  请  人" prop="applicant">
                <el-input
                  v-model="form.applicant"
                  placeholder="请输入申请人"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="申请人电话" prop="applicantPhone">
                <el-input
                  v-model="form.applicantPhone"
                  placeholder="请输入申请人电话"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="申请日期" prop="applicationDate">
                <el-date-picker
                  v-model="form.applicationDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择申请日期"
                  clearable></el-date-picker>
              </el-form-item>
              <el-form-item label="内部专利名称" prop="patentName">
                <el-input
                  v-model="form.patentName"
                  placeholder="请输入内部专利名称"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="专利发明人" prop="inventor">
                <el-input
                  v-model="form.inventor"
                  placeholder="请输入专利发明人"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="专利类型" prop="patentType">
                <el-input
                  v-model="form.patentType"
                  placeholder="请输入专利类型"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item label="专利内容摘要" prop="zhaiyao">
                <el-input
                  v-model="form.zhaiyao"
                  type="textarea"
                  placeholder="请输入专利内容摘要"
                  show-word-limit
                  :autosize="{ minRows: 1, maxRows: 7 }"></el-input>
              </el-form-item>
              <!-- <el-col :span="24">
              <el-form-item label="专利申请附件" prop="adjunct" required>
                <el-upload
                  ref="adjunct"
                  :file-list="adjunctfileList"
                  :action="adjunctAction"
                  :before-upload="adjunctBeforeUpload">
                  <el-button size="small" type="primary" icon="el-icon-upload"
                    >上传附件</el-button
                  >
                </el-upload>
              </el-form-item>
            </el-col> -->
              <el-form-item label="状态：" prop="status">
                <el-select v-model="form.status" placeholder="请选择">
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
    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="ApplicationList"
      row-key="applicationId"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="管理员编号" align="center" prop="applicationId" />
      <el-table-column label="申请人" align="center" prop="applicant" />
      <el-table-column label="专利名称" align="center" prop="patentName" />
      <el-table-column label="专利类型" align="center" prop="patentType" />
      <el-table-column label="发明人" align="center" prop="inventor" />
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <div>{{ hanldeStatus(scope.row.status) }}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="申请时间"
        align="center"
        prop="applicationDate"
        width="150">
        <template slot-scope="scope">
          <div>{{ hanldeDateTime(scope.row.applicationDate) }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-padding fixed-width">
        <template slot-scope="scope" v-if="scope.row.userId !== 1">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['patent:application:edit']"
            >修改</el-button> -->
          <el-button
            v-if="scope.row.parentId != 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['patent:application:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  listApplication,
  getApplication,
  delApplication,
  addApplication,
  updateApplication,
} from "@/api/patent/application";

export default {
  name: "application",
  data() {
    return {
      dialogVisible: false,
      loading3: false,
      ApplicationList: [],
      options: [
        {
          value: "0",
          label: "未知",
        },
        {
          value: "1",
          label: "已审核",
        },
        {
          value: "2",
          label: "未审核",
        },
      ],
      // 部门树选项
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        applicationId: undefined,
        applicant: undefined,
        patentName: undefined,
        applicationDate: undefined,
        inventor: undefined,
        opinion: undefined,
        zhaiyao: undefined,
        status: [],
        applicantPhone: undefined,
      },

      // 表单参数
      form: {
        status: 1,
      },
      // 表单校验
      rules: {
        applicationId: [
          { required: true, message: "管理员编号不能为空", trigger: "blur" },
        ],
        applicant: [
          { required: true, message: "申请人不能为空", trigger: "blur" },
        ],
        patentName: [
          { required: true, message: "专利名称不能为空", trigger: "blur" },
        ],
        inventor: [
          { required: true, message: "发明人不能为空", trigger: "blur" },
        ],
        patentType: [
          { required: true, message: "专利类型不为空", trigger: "blur" },
        ],
        applicantPhone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "状态不能为空",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      listApplication(this.queryParams).then((response) => {
        this.ApplicationList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 转换数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.ApplicationId,
        label: node.ApplicationName,
        children: node.children,
      };
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        pageNum: 1,
        pageSize: 10,
        applicant: undefined,
        applicantPhone: undefined,
        applicationDate: null,
        patentName: undefined,
        inventor: undefined,
        status: [],
        applicationId: undefined,
        adjunct: undefined,
        zhaiyao: undefined,
      };
      this.resetForm("form");
    },

    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      if (row != undefined) {
        this.form.ApplicationId = row.ApplicationId;
      }
      this.open = true;
      this.title = "新增内部申请";
    },
    adjunctBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.ApplicationId != undefined) {
            updateApplication(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApplication(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /**修改 */
    handleUpdate(row) {
      this.reset();
      getApplication(row.applicationId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改内部申请";
        listDeptExcludeChild(row.applicationId).then((response) => {
          this.applicationOptions = this.handleTree(
            response.data,
            "applicationId"
          );
          if (this.applicationOptions.length == 0) {
            const noResultsOptions = {
              applicationId: this.form.applicationId,
              applicant: this.form.applicant,
              children: [],
            };
            this.applicationOptions.push(noResultsOptions);
          }
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const applicationIds = row.applicationId || this.ids
      this.$modal
        .confirm('是否确认删除编号为"' + row.applicationId+ '"的数据项？')
        .then(function () {
          return delApplication(row.applicationId);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
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
