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
          v-model="formInline.rePassword"
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
          :disabled="
            formInline.userName === '' ||
            formInline.password === '' ||
            formInline.rePassword === ''
          "
        >
          Log on
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {  
        userName: "",   
        rePassword: "",
        password: "",  
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$axios
        .post(this.$url + `user/register`, this.formInline)
        .then((res) => {
          console.log(res.data);
        });
    },
  },
};
</script>

<style>
</style>