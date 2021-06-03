<template>
  <div class="bgc">
    <Header></Header>
    <div class="content">
      <router-view></router-view>
      <a-drawer
        title="笔下大魔王"
        placement="right"
        :closable="false"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
      >
        <Introduction class="right"></Introduction>
      </a-drawer>
      <div class="open" @click="visible = true">打开个人信息</div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Introduction from "../components/Introduction";

export default {
  data() {
    return {
      visible: false,
    };
  },
  components: {
    Header,
    Introduction,
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.bgc {
  background: url('../assets/img/bgc.jpg') no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
.open {
  color:#fff;
  position: fixed;
  top: 200px;
  right: 0px;
  margin-right: 30px;
  cursor: pointer;
}
</style>