<template>
  <div>
    <!-- 搜索 -->
    <div class="head-search">
      <a-row>
        <a-col :span="4">
          <a-col :span="6" class="left-write">用户名</a-col>
          <a-col :span="18" class="right-input">
            <a-input placeholder="请输入用户名" />
          </a-col>
        </a-col>
        <a-col :span="20" style="text-align: right">
          <a-button type="primary"> 查询 </a-button>
        </a-col>
      </a-row>
      <div style="margin-top: 10px; text-align: right">
        <a-button @click="create"> 新建 </a-button>
      </div>
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
      <vxe-table-column field="name" title="姓名"></vxe-table-column>
      <vxe-table-column field="sex" title="性别">
        <template v-slot="{ row }">
          <span>{{ row.sex === 1 ? "男" : "女" }}</span>
        </template></vxe-table-column
      >
      <vxe-table-column field="phone" title="电话"></vxe-table-column>
      <vxe-table-column field="email" title="邮箱"></vxe-table-column>
      <vxe-table-column field="action" title="操作">
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
  </div>
</template>

<script>
import { getUserList } from "@/api/user.js";
export default {
  data() {
    return {
      data: [],
      searchPage: {
        pageNo: 1,
        pageSize: 10,
        keyword: "",
      },
    };
  },
  created() {
    this.getList(this.searchPage);
  },
  methods: {
    /**
     * 获取用户列表
     */
    getList(search) {
      getUserList(search).then((res) => {
        this.data = res.data;
      });
    },
    create() {},
    edit(row) {},
    del(row) {},
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