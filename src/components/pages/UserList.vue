<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <SideBar />
  <v-app-bar app extended>
    <v-toolbar-title>ユーザ一覧</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

  <v-main>
    <v-container>
      <v-row>
        <v-col v-for="n in 24" :key="n" cols="4">
          <router-link :to="{ path: '/chat', query: { user_id: n } }">
            <v-avatar color="grey lighten-2" size="128"></v-avatar>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
