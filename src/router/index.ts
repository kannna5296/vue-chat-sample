import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
// import Chat from "../components/ChatComponent.vue";
import About from "../components/About.vue";
import UserList from "../components/UserList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "userlist",
    component: UserList,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/trash",
    name: "Trash",
    component: UserList,
  },
  {
    path: "/spam",
    name: "Spam",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
