import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";

const routes= [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/chat/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach(() => {});

export default router;
