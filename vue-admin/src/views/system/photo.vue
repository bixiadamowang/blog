<template>
  <div>
    <img :src="img" alt="" />
    <a-upload
      name="file"
      :multiple="false"
      :customRequest="customRequest"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      imageUrl: "",
      img: "",
    };
  },
  methods: {
    changeFile(info) {
      // 上传文件
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} 上传失败.`);
      }
    },
    customRequest(data) {
      // 上传提交
      const formData = new FormData();
      formData.append("file", data.file);
      this.saveFile(formData);
    },
    saveFile(formData) {
      this.axios({
        method: "post",
        url: "/photo/upload",
        headers: {},
        params: {},
        data: formData,
      })
        .then((response) => {
          // console.log(response.data.img.data);
          let bytes = new Uint8Array(response.data.img.data);
          let data = "";
          let len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            data += String.fromCharCode(bytes[i]);
          }
          this.img = "data:image/png;base64," + window.btoa(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>