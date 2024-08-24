import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { usePokemonStore } from '../store';
import { buildCurrentPokemonData } from '../helpers/PokeDataBuilder';

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
          const pokemon = buildCurrentPokemonData(response);
          pokemonStore.setCurrentPokemon(pokemon);

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
