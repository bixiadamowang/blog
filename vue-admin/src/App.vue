<template>
  <div id="app" style="height: 100%">
    <router-view />
  </div>
</template>

<style lang="less">
.ant-layout-sider-children {
  overflow: auto !important;
}
.ant-layout-sider-children::-webkit-scrollbar {
  width: 0 !important;
}
</style>
