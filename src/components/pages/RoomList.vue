<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
import { onMounted, ref, Ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.ts";
import { roomsConverter } from "@/firebase/converter/RoomsConverter";
import { Room } from "@/firebase/converter/RoomsConverter";

const rooms: Ref<Room[]> = ref([]);

const getRooms = async () => {
  console.log("getrooms");
  const roomsSnapshot = await getDocs(
    collection(db, "rooms").withConverter(roomsConverter)
  );
  roomsSnapshot.docs.forEach((doc) => {
    const room = doc.data();
    room.id = doc.id;
    rooms.value.push(doc.data());
  });
};

onMounted(() => getRooms());
</script>

<template>
  <SideBar />
  <v-app-bar app extended>
    <v-toolbar-title>チャットルーム一覧</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

  <v-main>
    <v-container>
      <v-row>
        <v-col v-for="room in rooms" :key="room.id" cols="4">
          <router-link :to="{ path: '/chat', query: { room_id: room.id } }">
            <v-avatar color="grey lighten-2" size="128">
              <v-img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
                v-if="!room.thumnailUrl"
              ></v-img>
              <v-img
                :src="room.thumnailUrl"
                alt="John"
                v-if="room.thumnailUrl"
              ></v-img>
            </v-avatar>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
