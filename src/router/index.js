import Vue from "vue";
import VueRouter from "vue-router";
import ProjectsList from "@/components/ProjectsList.vue";
import Project from "@/components/Project.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ProjectsList",
    component: ProjectsList
  },
  {
    path: '/project/:id',
    name: 'Project',
    props: true,
    component: Project
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
