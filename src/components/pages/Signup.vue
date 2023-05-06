<!-- 元ネタ https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-form/misc-exposed.vue -->
<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import router from "@/router/index.ts";

const email = ref("");
const password = ref("");
const name = ref("");
const valid = ref(true);
const errorMessage = ref("");

// 「メール」バリデーション
const emailRequiredValidation = (value: string) =>
  !!value || "メールアドレスを入力してください。";
const emailFormValidation = (value: string) =>
  /.+@.+\..+/.test(value) || "メールアドレスの形式が不正です";
const emailRules = [emailRequiredValidation, emailFormValidation];

// 「パスワード」バリデーション
const passwordRequiredValidation = (value: string) =>
  !!value || "パスワードを入力してください。";
const passwordRules = [passwordRequiredValidation];

// 「名前」バリデーション
const nameRequiredValidation = (value: string) =>
  !!value || "お名前を入力してください。";
const nameLengthLimitValidation = (value: string) =>
  (value && value.length <= 10) || "お名前は10文字以下で入力してください。";
const nameRules = [nameRequiredValidation, nameLengthLimitValidation];

const submit = async () => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      updateProfile(userCredential.user, { displayName: name.value }); //displayNameを更新する
      router.push("/login");
    })
    .catch((error) => {
      console.log(error);
      errorMessage.value = "ユーザーの新規作成に失敗しました。";
    });
};
</script>

<template>
  <div class="signup-container">
    <v-card class="signup-form">
      <v-card-title>Signup</v-card-title>
      <v-card-subtitle>ユーザ情報を入力ください</v-card-subtitle>
      <v-btn variant="text" color="pink-darken-4" to="login"
        >すでに登録済みの方はこちら</v-btn
      >

      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Username"
          hint="Enter your name to access this website"
          required
        ></v-text-field>

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
        <div class="button-container">
          <v-btn
            class="signup-button"
            color="success"
            :disabled="!valid"
            @click="submit"
            >SIGNUP</v-btn
          >
          <v-btn class="clear-button">CLEAR</v-btn>
        </div>
        <v-alert v-if="errorMessage" dense outlined type="error">{{
          errorMessage
        }}</v-alert>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.signup-container {
  background-color: rgb(183, 140, 253);
  width: 100%;
  height: 100%;
}
.signup-form {
  margin: 150px auto;
  padding: 30px;
  width: 70%;
}

.button-container {
  margin-bottom: 15px;
}

.clear-button,
.signup-button {
  margin: 0 6px;
}
</style>
