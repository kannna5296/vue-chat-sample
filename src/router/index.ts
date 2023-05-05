import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
// import Chat from "../components/ChatComponent.vue";
import About from "../components/About.vue";
import UserList from "../components/UserList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/hoge",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/hoge2",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
