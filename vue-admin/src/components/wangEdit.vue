<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editoritem",
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null,
      portalToken: "",
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  created() {
    this.portalToken = sessionStorage.getItem("portalToken");
  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    seteditor() {
      // http://192.168.2.125:8080/admin/storage/create
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig = this.editor.customConfig
        ? this.editor.customConfig
        : this.editor.config;
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.customConfig.uploadImgServer =
        "http://141.164.50.57:9998/photo/upload"; // 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {
        // portalToken: this.portalToken,
      }; // 自定义 header
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgAccept = ["jpg", "jpeg", "png"];
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      // 配置菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen", // 全屏
      ];
      // let _that = this;
      // this.editor.customConfig.customUploadImg = (resultFiles, insertImgFn) => {
      // debugger
      //   console.log(resultFiles);
      //   const formData = new FormData();
      //   formData.append("file", resultFiles[0]);
      //   _that.axios({
      //     method: "post",
      //     url: "/photo/upload",
      //     headers: {},
      //     params: {},
      //     data: formData,
      //   }).then((response) => {
      //     let img = response.data.img
      //     insertImgFn(img);
      //   });
      //   // console.log(resultFiles);
      //   // console.log(insertImgFn);
      //   // resultFiles 是 input 中选中的文件列表
      //   // insertImgFn 是获取图片 url 后，插入到编辑器的方法

      //   // 上传图片，返回结果，将图片插入到编辑器中
      //   // insertImgFn(imgUrl);
      // };
      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          console.log(xhr, editor, result);
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          console.log(xhr, editor, result);
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          console.log(xhr, editor);
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          console.log(xhr, editor);
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          console.log(result);
          console.log(insertImg, editor);
          console.log(editor);
          let url = result.img;
          insertImg(url);
        },
      };
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit("change", this.info_); // 将内容同步到父组件中
      };
      // 创建富文本编辑器
      this.editor.create();
    },
  },
};
</script>

<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  min-height: 300px;
}
.w-e-text-container p {
  text-align: justify;
  font-size: 14px;
  letter-spacing: 1px;
  color: #666666;
  line-height: 24px;
}
</style>