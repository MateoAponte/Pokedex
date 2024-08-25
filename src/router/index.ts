import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { usePokemonStore } from '../store';
import CookieManagement from '../helpers/CookieManagement';

const routes = [
  {
    path: '/get-started',
    name: 'started',
    component: () => import('../views/GetStarted.vue'),
  },
  {
    path: '/preview/:name',
    alias: '/preview',
    name: 'Preview',
    component: () => import('../views/Preview.vue'),
    beforeEnter: (
      to: RouteLocationNormalized,
      _: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const name = to.query.name as string;
      if (name) {
        const pokemonStore = usePokemonStore();
        const result = pokemonStore.getPokemonByName(name);
        result.then((response) => {
          pokemonStore.parsedPokemonFetch(response);
          const currentName = to.query.name;
          if (to.query.name !== currentName) {
            next({ path: '/preview', query: { name: currentName } });
          } else {
            next();
          }
        });
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const cookieValue = CookieManagement.getCookie('poke-started');
  console.log('Navigating to:', to.path, 'Cookie Value:', cookieValue);

  if (cookieValue !== 'true' && to.path !== '/get-started') {
    console.log('Redirecting to /get-started');
    next({ path: '/get-started' });
  } else if (cookieValue === 'true' && to.path !== '/preview') {
    console.log('Redirecting to /preview');
    next({ path: '/preview' });
  } else {
    console.log('Navigation allowed');
    next();
  }
});

export default router;
