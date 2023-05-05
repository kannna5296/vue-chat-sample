<script setup lang="ts">
import { ref, Ref } from "vue";

const drawer = ref();
type Link = {
  icon: string;
  text: string;
  to: string;
};
const links: Ref<Link[]> = ref([
  {
    icon: "mdi-inbox-arrow-down",
    text: "Inbox",
    to: "/",
  },
  { icon: "mdi-send", text: "Send", to: "/about" },
  { icon: "mdi-delete", text: "Trash", to: "/" },
  { icon: "mdi-alert-octagon", text: "Spam", to: "/" },
]);
</script>
<template>
  <v-navigation-drawer v-model="drawer">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

      <div>john@google.com</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="link in links" :key="link.icon" link :to="link.to">
        <template v-slot:prepend>
          <v-icon>{{ link.icon }}</v-icon>
        </template>

        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
