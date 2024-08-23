import { createRouter, createWebHistory } from 'vue-router';
import CookieManagement from '../assets/helpers/CookieManagement';

const routes = [
  {
    path: '/get-started',
    name: 'started',
    component: () => import('../views/GetStarted.vue'),
  },
  {
    path: '/preview/:id',
    alias: '/preview',
    name: 'Preview',
    component: () => import('../views/Preview.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const cookieValue = CookieManagement.getCookie('poke-started');
//   console.log('Navigating to:', to.path, 'Cookie Value:', cookieValue);

//   // Check if the user is navigating to any route other than /get-started and the cookie is not set
//   if (to.path !== '/get-started' && cookieValue == 'true') {
//     console.log('Redirecting to /preview');
//     next({ path: '/preview' }); // Redirect to /preview
//   } else {
//     console.log('Navigation allowed');
//     next(); // Allow the navigation to proceed as intended
//   }
// });

export default router;
