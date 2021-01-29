<template>
  <div style="height: 100%">
    <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" v-if="!collapsed">笔下后台管理</div>
        <div class="logo" v-else>笔下</div>
        <!-- <div class="logo" /> -->
        <a-menu
          :default-selected-keys="[current]"
          :default-open-keys="[openKey]"
          mode="inline"
          :theme="theme"
          :selected-keys="[current]"
          @click="handleClick"
        >
          <a-sub-menu key="/index">
            <span slot="title"
              ><a-icon type="appstore" /><span>系统管理</span></span
            >
            <a-menu-item key="/user">用户管理</a-menu-item>
            <a-menu-item key="/photo">照片管理</a-menu-item>
            <a-menu-item key="/blog">博客管理</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <Breadcrumb></Breadcrumb>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      current: "1",
      openKey: "",
      theme: "dark",
      collapsed: false,
    };
  },
  created() {
    // console.log(window.location.pathname.split("/"));
    this.current = "/" + window.location.pathname.split("/")[2];
    this.openKey = "/" + window.location.pathname.split("/")[1];
  },
  methods: {
    handleClick(e) {
      // console.log(e);
      this.current = e.key;
      this.$router.push(e.keyPath[1] + e.keyPath[0]);
    },
  },
};
</script>

<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  color: #fff;
  font-size: 22px;
  text-align: center;
}
</style>