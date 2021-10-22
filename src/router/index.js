import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    alias: "/contactbook",
    name: "ContactBook",
    component: () => import("../views/ContactBook"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
