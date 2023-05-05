<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const cards = ref(["today"]);

const route = useRoute();
const userId = route.query.user_id;

const chatData = ref("");

//Backend介さない場合の初期値
const messages = ref([
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique",
]);

const isValidText = computed(() => {
  console.log("computed");
  if (chatData.value.length <= 0) {
    console.log("invalid!");
    return false;
  }
  console.log("valid!");
  return true;
});

const clear = () => {
  chatData.value = "";
};

const submit = () => {
  messages.value.push(chatData.value);
  chatData.value = "";
};
</script>

<!-- 公式(https://vuetifyjs.com/en/wireframes/inbox/)をベースとする -->
<template>
  <v-main>
    <div>ユーザID: {{ userId }}</div>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col v-for="card in cards" :key="card" cols="12">
          <v-card>
            <v-list lines="two">
              <v-list-subheader>{{ card }}</v-list-subheader>
              <template v-for="(message, index) in messages" :key="message">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-avatar color="grey-darken-1"></v-avatar>
                  </template>

                  <v-list-item-subtitle class="message">
                    {{ message }}
                  </v-list-item-subtitle>
                </v-list-item>
                <p>{{ index }}</p>

                <v-divider inset></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>

        <v-col>
          <v-textarea
            v-model="chatData"
            prepend-inner-icon="mdi-comment"
            class="mx-2"
            rows="3"
            auto-grow
            @change="isValidText"
          ></v-textarea>
          <v-btn
            class="mr-4"
            color="purple-lighten-2"
            type="submit"
            @click="submit"
            :disabled="!isValidText"
          >
            submit
          </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.message {
  text-align: left;
}
</style>
