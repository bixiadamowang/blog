<template>
  <div class="content">
    <Header></Header>
    <router-view></router-view>
    <Introduction class="right"></Introduction>
  </div>
</template>

<script>
import Header from "../components/Header";
import Introduction from "../components/Introduction";

export default {
  components: {
    Header,
    Introduction,
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.right {
  position: absolute;
  right: 0;
  top: 100px;
  margin-top: 60px;
  border-radius: 10px;
  padding: 20px;
}
</style>