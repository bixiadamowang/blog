<template>
  <div>
    <a-form-model
      layout="inline"
      :model="formInline"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item>
        <a-input v-model="formInline.userName" placeholder="Username">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="formInline.password"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="formInline.email"
          placeholder="邮箱"
        >
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="formInline.phone"
          placeholder="电话"
        >
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-select :default-value="1" @change="changeSex" style="width:200px;">
          <a-select-option :value="1"> 男 </a-select-option>
          <a-select-option :value="2"> 女 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> Log on </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { register } from "@/api/login.js";
export default {
  data() {
    return {
      formInline: {
        userName: "",
        password: "",
        email: "",
        phone: "",
        sex: 1,
      },
    };
  },
  methods: {
    changeSex(value) {
      this.formInline["sex"] = value;
    },
    handleSubmit() {
      register("user/register", this.formInline).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>

<style>
</style>