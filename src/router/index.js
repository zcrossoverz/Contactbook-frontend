import { createWebHistory, createRouter } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    alias: "/contactbook",
    name: "ContactBook",
    component: () => import("../views/ContactBook"),
  },
  {
    path: "/contacts/:id",
    name: "EditContact",
    component: () => import("../views/ContactEdit"),
  },
  {
    path: "/add",
    name: "AddContact",
    component: () => import("../views/AddContact"),
  },  
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
      path: "/register",
      name: "Register",
      component: () => import("../views/UserRegister.vue"),
  },
  {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/UserProfile.vue"),
  },  
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.loggedInUser;

  console.log("logged in: "+loggedIn);
  console.log("auth required : "+authRequired);

  if (authRequired && !loggedIn) {
      next("/login");
  } else {
      next();
  }
});

export default router;
