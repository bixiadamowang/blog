<template>
  <div>
    <div style="margin: 10px 0; text-align: right">
      <a-button @click="create"> 新建 </a-button>
    </div>
    <!-- 表格 -->
    <vxe-table
      border
      show-header-overflow
      show-overflow
      highlight-hover-row
      :data="data"
    >
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="title" title="标题"></vxe-table-column>
      <vxe-table-column field="time" title="创建时间"></vxe-table-column>
      <vxe-table-column field="action" title="操作" width="180">
        <template v-slot="{ row }">
          <a-button type="primary" @click="edite(row)"> 编辑 </a-button>
          <a-button
            type="danger"
            @click="del(row.id)"
            style="margin-left: 10px"
          >
            删除
          </a-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <a-modal
      title="富文本"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      cancelText="取消"
      okText="确认"
      :width="900"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="title" label="标题" prop="title">
          <a-input
            v-model="form.title"
            @blur="
              () => {
                $refs.title.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="日期" required prop="time">
          <a-date-picker
            v-model="form.time"
            show-time
            type="date"
            format="YYYY-MM-DD"
            placeholder="选择日期"
            style="width: 100%"
            @change="onChange"
          />
        </a-form-model-item>
        <a-form-model-item label="内容" required prop="content">
          <editor-bar
            v-model="form.content"
            :isClear="isClear"
            @change="change"
            style="width: 800px"
          ></editor-bar>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getBlogList,insertBlog } from "@/api/blog.js";
import EditorBar from "@/components/wangEdit";
export default {
  components: {
    EditorBar, //ueditor富文本编辑器
  },
  data() {
    return {
      data: [],
      searchPage: {
        pageNo: 1,
        pageSize: 10,
      },
      // 新建
      visible: false,
      confirmLoading: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
      form: {
        title: "",
        time:'',
        content: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "change",
          },
        ],
      },
      // 富文本
      isClear: false,
    };
  },
  created() {
    this.getList(this.searchPage);
  },
  methods: {
    /**
     * 获取博客列表
     */
    getList(search) {
      getBlogList(search).then((res) => {
        this.data = res.data;
      });
    },
    /**
     * 新增模态框
     */
    create() {
      this.visible = true;
      this.form = {
        title:'',
        time:'',
        content:''
      }
    },
    /**
     * 选择日期
     */
    onChange(val,mode) {
      this.form['time'] = mode;
    },
    /**
     * 确认模态
     */
    handleOk(e) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          insertBlog(this.form).then(res => {
            this.getList(this.searchPage);
            this.visible = false;
            this.confirmLoading = false;
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 取消模态
     */
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    edit(row) {},
    del(row) {},
    /**
     * 搜索
     */
    search() {
      this.getList(this.searchPage);
    },
    change() {},
  },
};
</script>

<style lang="less" scoped>
.head-search {
  margin-bottom: 20px;
  .left-write {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .right-input {
    height: 30px;
  }
}
</style>