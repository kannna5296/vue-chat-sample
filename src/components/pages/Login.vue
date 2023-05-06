<!-- 元ネタ https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-form/misc-exposed.vue -->
<script setup lang="ts">
import { ref } from "vue";

const name = ref("");

const requiredValidation = (value: string) => !!value || "Name is required";
const limitLengthValidation = (value: string) =>
  (value && value.length <= 10) || "Name is required";
const nameRules = [requiredValidation, limitLengthValidation];

const select = ref();

const items = ref(["Item 1", "Item 2"]);
const checkbox = ref(false);
const valid = ref(true);

const validate = async () => {
  //   const valid = await validate();
  //   if (valid) alert("Form is valid");
  valid.value = true;
};

const reset = async () => {
  reset();
};
const resetValidation = async () => {
  resetValidation();
};
// export default {
//   data: () => ({
//     // valid: true,
//     // // name: "",
//     // // nameRules: [
//     // //   (v) => !!v || "Name is required",
//     // //   (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
//     // // ],
//     // select: null,
//     // items: ["Item 1", "Item 2", "Item 3", "Item 4"],
//     // checkbox: false,
//   }),
//   methods: {
//     // async validate() {
//     //   const { valid } = await this.$refs.form.validate();
//     //   if (valid) alert("Form is valid");
//     // },
//     reset() {
//       this.$refs.form.reset();
//     },
//     resetValidation() {
//       this.$refs.form.resetValidation();
//     },
//   },
// };
</script>

<template>
  <div class="login-container">
    <v-card class="login-form">
      <v-card-title>Login</v-card-title>
      <v-card-subtitle>ユーザ情報を入力ください</v-card-subtitle>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block @click="validate">
            Validate
          </v-btn>

          <v-btn color="error" class="mt-4" block @click="reset">
            Reset Form
          </v-btn>

          <v-btn color="warning" class="mt-4" block @click="resetValidation">
            Reset Validation
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.login-container {
  background-color: rgb(255, 178, 171);
}
.login-form {
  margin: 150px auto;
  padding: 30px;
  width: 70%;
}
</style>
