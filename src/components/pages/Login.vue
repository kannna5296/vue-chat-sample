<!-- 元ネタ https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-form/misc-exposed.vue -->
<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const valid = ref(true);

const emailRequiredValidation = (value: string) =>
  !!value || "メールアドレスを入力してください。";
const emailFormValidation = (value: string) =>
  /.+@.+\..+/.test(value) || "メールアドレスの形式が不正です";
const emailRules = [emailRequiredValidation, emailFormValidation];

const passwordRequiredValidation = (value: string) =>
  !!value || "パスワードを入力してください。";
const passwordRules = [passwordRequiredValidation];
</script>

<template>
  <div class="login-container">
    <v-card class="login-form">
      <v-card-title>Login</v-card-title>
      <v-card-subtitle>ユーザ情報を入力ください</v-card-subtitle>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          hint="Enter your email to access this website"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          hint="Enter your password to access this website"
          required
        ></v-text-field>
        <v-btn color="success" :disabled="!valid">LOGIN</v-btn>
        <v-btn>CLEAR</v-btn>
        {{ valid }}
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.login-container {
  background-color: rgb(255, 178, 171);
  width: 100%;
  height: 100%;
}
.login-form {
  margin: 150px auto;
  padding: 30px;
  width: 70%;
}
</style>
