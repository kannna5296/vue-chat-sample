<script setup lang="ts">
import { ref as vueref, Ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import {
  getStorage,
  ref as firebaseref,
  uploadBytes,
  getDownloadURL,
  updateProfile,
} from "firebase/storage";
import router from "@/router/index.ts";

const drawer = vueref();
//TODO userっていう型で(mail,nameを持たせたい)
const displayName = vueref("");
const fileInput = vueref();

type Link = {
  icon: string;
  text: string;
  to: string;
};
const links: Ref<Link[]> = vueref([
  {
    icon: "mdi-inbox-arrow-down",
    text: "Inbox",
    to: "/",
  },
  { icon: "mdi-send", text: "Send", to: "/about" },
]);

const logout = () => {
  console.log("logout!");
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      localStorage.message = "ログアウトに成功しました";
      sessionStorage.removeItem("user");
      router.push("/login");
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeIcon = () => {
  fileInput.value.click();
};

const updateIcon = () => {
  console.log("updateIcon call!");
  const user = getAuth();
  if (!user) {
    sessionStorage.removeItem("user");
    router.push("/login");
  }

  const file = fileInput.value.files[0];
  const filePath = "user/" + file.name;
  console.log(file);
  console.log(filePath);

  const storage = getStorage();
  const iconImageRef = firebaseref(storage, filePath);
  uploadBytes(iconImageRef, file)
    .then((snapshot) => {
      console.log("Uploaded a blob or file!");
      console.log(snapshot);
    })
    .catch((error) => {
      console.log(error);
    });

  //firebase側の情報も更新
  const photoUrl = getDownloadURL(iconImageRef).then((url) => {
    console.log(url);
    return url;
  });
  updateProfile(user.currentUser, {
    photoURL: photoUrl,
  });
};

onMounted(() => {
  const sessionUser = sessionStorage.getItem("user");
  if (sessionUser) {
    const user = JSON.parse(sessionUser);
    console.log("mouted!", user.email);
    displayName.value = user.displayName;
  } else {
    router.push("/");
  }
});
</script>
<template>
  <v-navigation-drawer v-model="drawer">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <v-avatar color="indigo">
        <input
          type="file"
          style="display: none"
          accept="image/jpeg,image/jpg,image/png"
          ref="fileInput"
          @change="updateIcon"
        />
        <v-icon icon="mdi-account-circle" @click="changeIcon"></v-icon>
      </v-avatar>

      <div>{{ displayName }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="link in links" :key="link.icon" link :to="link.to">
        <template v-slot:prepend>
          <v-icon>{{ link.icon }}</v-icon>
        </template>

        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <template v-slot:prepend>
          <v-icon>mdi-logout</v-icon>
        </template>

        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.sidebar-top {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
