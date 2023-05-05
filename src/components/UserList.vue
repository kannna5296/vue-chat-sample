<template>
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
          <v-avatar color="grey lighten-2" size="128"></v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts"></script>
