<template>
  <div class="bao">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item
        v-for="(item, index) of routes"
        :key="index"
        style="padding: 5px"
      >
        <router-link :to="item.path" style="font-size: 18px">{{
          item.meta.title
        }}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      routes: [],
    };
  },
  watch: {
    $route(e) {
      this.routes = e.matched.filter((items) => items.meta.title);
    },
  },
  created() {
    this.routes = this.$route.matched.filter(item => item.meta.title)
  },
};
</script>

<style lang="less" scoped>
.bao {
  display: inline-block;
  background-color: #fff;
  padding: 5px 0px;
  margin-bottom: 20px;
  // border: 1px solid #dddddd;
  padding-left: 10px;
  border-radius: 10px;
}
</style>