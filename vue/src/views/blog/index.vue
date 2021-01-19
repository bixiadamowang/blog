<template>
  <div class="hzc-blog">
    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      class="demo-infinite-container"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="false"
        :data-source="listData"
      >
        <div slot="footer"><b>ant design vue</b> footer part</div>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
          <template v-for="{ type, text } in actions" slot="actions">
            <span :key="type">
              <a-icon :type="type" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <img
            slot="extra"
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{ item.title }}</a>
            <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";

export default {
  directives: { infiniteScroll },
  data() {
    return {
      listData,
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" },
      ],
      loading: false,
      busy: false,
    };
  },
  created() {
    for (let i = 0; i < 23; i++) {
      this.listData.push({
        href: "https://www.antdv.com/",
        title: `ant design vue part ${i}`,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description: "2020-10-25",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      });
    }
  },
  methods: {
    handleInfiniteOnLoad() {
      const data = this.listData;
      this.loading = true;
      console.log(data)
      if (data.length > 14) {
        this.$message.warning("Infinite List loaded all");
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData((res) => {
        this.listData = data.concat(res.results);
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.hzc-blog {
  background-color: #fff;
  width: 880px;
  margin-top: 100px;
  border-radius: 10px;
  padding: 20px;
}
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 800px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>