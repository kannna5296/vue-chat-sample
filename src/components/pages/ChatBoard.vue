<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const cards = ref(["today"]);

const route = useRoute();
const userId = route.query.user_id;
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
              <template v-for="n in 6" :key="n">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-avatar color="grey-darken-1"></v-avatar>
                  </template>

                  <v-list-item-subtitle class="message">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nihil repellendus distinctio similique
                  </v-list-item-subtitle>
                </v-list-item>

                <v-divider
                  v-if="n !== 6"
                  :key="`divider-${n}`"
                  inset
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-textarea
      prepend-inner-icon="mdi-comment"
      class="mx-2"
      label="prepend-inner-icon"
      rows="3"
      auto-grow
    ></v-textarea>
  </v-main>
</template>

<style scoped>
.message {
  text-align: left;
}
</style>
