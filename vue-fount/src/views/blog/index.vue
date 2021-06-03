<template>
  <div class="hzc-blog">
    <a-list
      item-layout="vertical"
      size="large"
      :data-source="data"
    >
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <a-list-item-meta :description="item.description">
          <a slot="title" :href="item.href">{{ item.title }}</a>
        </a-list-item-meta>
        <p v-html="item.content"></p>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      pagination: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 加载列表
     */
    getList() {
      axios
        .get(
          `/blog/list?pageNo=${this.pagination["page"]}&pageSize=${this.pagination["pageSize"]}`
        )
        .then((res) => {
          this.data = res.data.data;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.hzc-blog {
  background-color: #fff;
  width: 1200px;
  margin-top: 40px;
  border-radius: 10px;
  padding: 20px;
  min-height: 400px;
  // max-height: 800px;
  overflow: auto;
  margin-bottom: 40px;
}
</style>