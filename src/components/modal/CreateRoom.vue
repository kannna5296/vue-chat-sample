<!-- 由来 https://vuetifyjs.com/en/components/dialogs/#form
https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-dialog/misc-form.vue -->
<script setup lang="ts">
import { ref } from "vue";
import {
  getStorage,
  ref as firebaseref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db } from "@/firebase/firebase.ts";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const dialog = ref(false);
const inputtingName = ref("");
const inputtingFile = ref(); //TODO 型指定したい

const onSubmit = async () => {
  //画像ファイルアップロード
  let thumnailUrl = "";
  if (inputtingFile) {
    const file = inputtingFile.value.files[0];
    const filePath = "/room/thumnail/" + file.name;
    const storage = getStorage();
    const iconImageRef = firebaseref(storage, filePath);
    await uploadBytes(iconImageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
        console.log(snapshot);
      })
      .catch((error) => {
        console.log(error);
      });

    thumnailUrl = await getDownloadURL(iconImageRef).then((url) => {
      return url;
    });
  }

  // FireStoreにroom情報を追加
  await addDoc(collection(db, "rooms"), {
    name: inputtingName.value,
    thumnailUrl: thumnailUrl,
    createdAt: Timestamp.now(),
  })
    .then((result) => {
      console.log(result);
      dialog.value = false;
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Create Room </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Room</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Room Name*"
                  v-model="inputtingName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  truncate-length="15"
                  accept="image/jpeg,image/jpg,image/png"
                  ref="inputtingFile"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="onSubmit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
