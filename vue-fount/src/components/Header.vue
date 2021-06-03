<template>
  <div style="background: #fff">
    <a-row class="baner">
      <a-col :span="8">
        <h1 class="logo">笔下的博客</h1>
      </a-col>
      <a-col :span="8">
        <ul class="ul">
          <li>文章</li>
          <li>相册</li>
          <li>收藏</li>
        </ul>
      </a-col>
      <a-col :span="8" class="img-col">
        <img
          src="../assets/img/github.png"
          @click="goGithub"
          alt=""
          title="github"
        />
        <img src="../assets/img/qq.png" @click="addQQ" alt="" title="QQ" />
        <img
          src="../assets/img/weixin.png"
          @mouseover="onmouseover"
          @mouseout="onmouseout"
          alt=""
          title="微信"
        />
        <!-- <img
          src="../assets/img/icon.png"
          @click="goLink('login')"
          alt=""
          title="登录"
        />
        <img
          src="../assets/img/zhuce.png"
          @click="goLink('register')"
          alt=""
          title="注册"
        /> -->
        <img src="../assets/img/wx.png" v-if="wxShow" class="wxImg" alt="" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      wxShow: false,
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
  methods: {
    addQQ() {
      window.open(
        "tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=384716313"
      );
    },
    goGithub() {
      window.open("https://github.com/bixiadamowang");
    },
    goLink(url) {
      this.$router.push("/" + url);
    },
    onmouseover() {
      this.wxShow = true;
    },
    onmouseout() {
      this.wxShow = false;
    },
  },
};
</script>


<style lang="less" scoped>
.baner {
  width: 1200px;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  .ul {
    li {
      float: left;
      width: 100px;
      font-size: 16px;
      cursor: pointer;
      margin-left: 30px;
      color: #999;
      text-align: center;
    }
  }
  .logo {
    font-size: 24px;
    color: #1890ff;
  }
  .img-col {
    text-align: right;
    position: relative;
    img {
      vertical-align: middle;
      border-style: none;
      width: 25px;
      margin-left: 15px;
      cursor: pointer;
    }
    .wxImg {
      width: 80px;
      height: 80px;
      position: absolute;
      right: 50px;
      top: 50px;
    }
  }
}
</style>