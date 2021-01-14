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
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.userName === '' || formInline.password === ''"
        >
          Log on
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { login } from "@/api/login.js";
export default {
  data() {
    return {
      formInline: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      login("user/login", this.formInline).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>

<style>
</style>