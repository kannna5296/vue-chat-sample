import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import About from "@/components/About.vue";
import UserList from "@/components/pages/UserList.vue";
import ChatBoard from "@/components/pages/ChatBoard.vue";
import Login from "@/components/pages/Login.vue";
import Signup from "@/components/pages/Signup.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "userlist",
    component: UserList,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    name: "Chat",
    component: ChatBoard,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

//認証状態チェック
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    const user = sessionStorage.getItem("user");
    if (!user) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
