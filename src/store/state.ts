import { ref } from 'vue';
import { State } from '../interfaces/store/state';

export const state: State = {
  pokemons: ref([]),
  favorities: ref([]),
  currentPokemon: ref({
    name: '',
    weight: 0,
    height: 0,
    sprite: '',
    types: [],
  }),
  pagination: ref({
    step: 20,
    current: 0,
    next: 20,
  }),
};
