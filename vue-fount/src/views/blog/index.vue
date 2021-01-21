<template>
  <div class="hzc-blog">
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="false"
        :data-source="data"
      >
        <div slot="footer"><b>ant design vue</b> footer part</div>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
          <template v-for="{ type, text } in actions" slot="actions">
            <span :key="type">
              <a-icon :type="type" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <!-- <img
            slot="extra"
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          /> -->
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{ item.title }}</a>
            <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </a-list>
      <a-button
        v-if="show"
        style="margin-left: 530px; margin-bottom: 86px"
        type="warning"
        plain
        >数据加载中...</a-button
      >
      <a-button
        v-if="!show"
        style="margin-left: 530px; margin-bottom: 86px"
        type="warning"
        plain
        >没有更多数据了</a-button
      >
    </div>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";

export default {
  directives: { infiniteScroll },
  data() {
    return {
      data: [],
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" },
      ],
      loading: false,
      busy: false,
      show: true,
    };
  },
  created() {
    // this.getList(true);
  },
  methods: {
    /**
     * 滚动条加载
     */
    loadMore: function () {
      this.busy = true;
      this.show = true;
      setTimeout(() => {
        this.currentPage += 1;
        this.getList(true);
      }, 1000);
    },
    /**
     * 加载列表
     */
    getList(flag) {
      const list = [];
      for (let i = 0; i < 10; i++) {
        list.push({
          href: "https://www.antdv.com/",
          title: `ant design vue part ${i}`,
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          description: "2020-10-25",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        });
      }
      if (flag) {
        if (this.data >= 100) {
          this.busy = true;
          this.show = false;
        } else {
          this.busy = false;
        }
        this.data = this.data.concat(list);
      } else {
        this.data = list;
        this.busy = false;
      }
      // this.axios
      //   .post(
      //     this.$url +
      //       `/news/queryPage?startPage=${this.currentPage}&pageSize=${this.pageSize}`
      //   )
      //   .then((res) => {
      //     if (flag) {
      //       if (this.currentPage >= res.data.data.lastPage) {
      //         this.busy = true;
      //         this.show = false;
      //       } else {
      //         this.busy = false;
      //       }
      //       this.data = this.data.concat(res.data.data.list);
      //     } else {
      //       this.data = res.data.data.list;
      //       this.busy = false;
      //     }
      //   });
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
  min-height: 800px;
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