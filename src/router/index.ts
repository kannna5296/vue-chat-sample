import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Chat from "../components/Chat.vue";
import About from "../components/About.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Chat,
  },
  {
    path: "/",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory("http://localhost:5173"),
  routes,
});

export default router;
