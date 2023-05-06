import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import About from "@/components/About.vue";
import UserList from "@/components/pages/UserList.vue";
import ChatBoard from "@/components/pages/ChatBoard.vue";
import Login from "@/components/pages/Login.vue";

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
    path: "/chat",
    name: "Chat",
    component: ChatBoard,
  },
  {
    path: "/spam",
    name: "Spam",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
