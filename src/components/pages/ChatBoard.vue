<script setup lang="ts">
import { ref, Ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.ts";
import { messagesConverter } from "@/firebase/converter/onverter.ts";
import SideBar from "@/components/SideBar.vue";
import router from "@/router/index.ts";
import { roomsConverter } from "@/firebase/converter/RoomsConverter";

const cards = ref(["today"]);

const route = useRoute();
const roomId = route.query.room_id;
const inputtingChatData = ref("");

const messages: Ref<string[]> = ref([]);
const roomName = ref(); //TODO 型指定したい

//TODO onMountedでええんか？？
onMounted(async () => {
  //ルーム情報を一つとってくる
  // roomIdはstring出ない可能性があるのでチェック
  if (typeof roomId === "string") {
    //TODO 早期リターンしたい
    const roomRef = doc(db, "rooms", roomId).withConverter(roomsConverter);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      roomName.value = roomSnap.data().name;
    } else {
      await router.push("/");
    }

    // const messageSnapShot = roomSnap.collection;
  }

  //過去のチャット情報Listとってくる
  //もうちょいスッキリ書きたい
  // const chatsCollection = collection(db, "messages").withConverter(
  //   messagesConverter
  // );
  // const chatsSanpShot = await getDocs(chatsCollection);
  // const res = chatsSanpShot.docs.map((docs) => docs.data());

  const messagesFromDb = res.map((value) => {
    return value.message;
  });
  messages.value.push(...messagesFromDb);
});

const isValidText = computed(() => {
  if (inputtingChatData.value.length <= 0) {
    return false;
  }
  return true;
});

const clear = () => {
  inputtingChatData.value = "";
};

const submit = () => {
  messages.value.push(inputtingChatData.value);
  inputtingChatData.value = "";
};
</script>

<!-- 公式(https://vuetifyjs.com/en/wireframes/inbox/)をベースとする -->
<template>
  <SideBar />
  <v-main>
    <h1>{{ roomName }}</h1>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col v-for="card in cards" :key="card" cols="12">
          <v-card>
            <v-list lines="two">
              <v-list-subheader>{{ card }}</v-list-subheader>
              <template v-for="message in messages" :key="message">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-avatar color="grey-darken-1"></v-avatar>
                  </template>

                  <v-list-item-subtitle class="message">
                    {{ message }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-divider inset></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>

        <v-col>
          <v-textarea
            v-model="inputtingChatData"
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
