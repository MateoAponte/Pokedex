import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/get-started',
    name: 'started',
    component: () => import('../views/GetStarted.vue'),
  },
  {
    path: '/preview/:id',
    name: 'Preview',
    component: () => import('../views/Preview.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
