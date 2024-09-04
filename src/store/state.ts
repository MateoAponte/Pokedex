import { ref } from 'vue';
import { State } from '@/interfaces/store/state';

export const state: State = {
  cachePokemons: ref([]),
  pokemons: ref([]),
  favorities: ref([]),
  filter: ref(''),
  currentPokemon: ref({
    name: '',
    weight: 0,
    height: 0,
    sprites: '',
    types: [],
    id: 0,
    favorite: false,
    stats: [],
    abilities: [],
    moves: [],
    pokemonId: 0,
  }),
  pagination: ref({
    step: 20,
    current: 0,
    next: 20,
  }),
  showPreview: ref(false),
  currentMovement: ref({
    text: '',
    name: '',
    type: '',
    power: 0,
    pp: 0,
    movementId: 0,
    id: '',
  }),
};
