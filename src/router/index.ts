import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/country/:name",
      name: "county",
      component: () => import("../pages/County.vue"),
      props: true,
    },
  ],
});
