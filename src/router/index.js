import { createRouter, createWebHistory } from "vue-router";
import AddProject from "../views/AddProject.vue";
import HomeView from "../views/HomeView.vue";
import EditProject from "../components/EditProject.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/createproject",
      name: "createproject",
      component: AddProject,

      //   component: () => import('../views/AboutView.vue')
    },
    { path: "/editProject/:title", name: "title", component: EditProject },
  ],
});

export default router;
