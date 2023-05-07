<!-- 元ネタ https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-form/misc-exposed.vue -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router/index.ts";
import { User } from "@/components/User";

const email = ref("");
const password = ref("");
const valid = ref(true);
const message = ref("");
const errorMessage = ref("");

const emailRequiredValidation = (value: string) =>
  !!value || "メールアドレスを入力してください。";
const emailFormValidation = (value: string) =>
  /.+@.+\..+/.test(value) || "メールアドレスの形式が不正です";
const emailRules = [emailRequiredValidation, emailFormValidation];

const passwordRequiredValidation = (value: string) =>
  !!value || "パスワードを入力してください。";
const passwordRules = [passwordRequiredValidation];

onMounted(() => {
  if (localStorage.message) {
    message.value = localStorage.message;
    localStorage.message = "";
  }
});

const submit = async () => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("success!!");
      console.log(userCredential.user);
      errorMessage.value = "";

      const user = new User(
        userCredential.user.displayName ? userCredential.user.displayName : "",
        userCredential.user.email ? userCredential.user.email : "",
        "",
        userCredential.user.uid,
        userCredential.user.refreshToken
      );
      sessionStorage.setItem("user", JSON.stringify(user));

      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      errorMessage.value = "ログインに失敗しました。";
    });
};
</script>

<template>
  <div class="login-container">
    <v-card :elevation="10" class="login-form">
      <!-- TODOタイトルとサブタイトルを中央よせする -->
      <v-card-title>Login</v-card-title>
      <v-card-subtitle>ユーザ情報を入力ください</v-card-subtitle>
      <v-btn variant="text" color="pink-darken-4" to="signup"
        >新規登録はこちら</v-btn
      >
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
        <div class="button-container">
          <v-btn
            class="login-button"
            color="success"
            :disabled="!valid"
            @click="submit"
            >LOGIN</v-btn
          >
          <v-btn class="clear-button">CLEAR</v-btn>
        </div>
        <v-alert v-if="message" dense outlined type="success">{{
          message
        }}</v-alert>
        <v-alert v-if="errorMessage" dense outlined type="error">{{
          errorMessage
        }}</v-alert>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-form {
  margin: 150px auto;
  padding: 30px;
  width: 70%;
}

.button-container {
  margin-bottom: 15px;
}

.clear-button,
.login-button {
  margin: 0 6px;
}
</style>
