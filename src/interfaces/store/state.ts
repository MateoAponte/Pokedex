import { Ref } from 'vue';
import { Movement, Pokemon } from '@/interfaces/pokemon/Pokemon';
import { PokemonList } from '@/interfaces/pokemon/PokemonList';
import { Pagination } from '@/interfaces/api/Pagination';

export interface State {
  cachePokemons: Ref<PokemonList[]>;
  pokemons: Ref<PokemonList[]>;
  favorities: Ref<PokemonList[]>;
  currentPokemon: Ref<Pokemon>;
  pagination: Ref<Pagination>;
  showPreview: Ref<boolean>;
  filter: Ref<string>;
  currentMovement: Ref<Movement>;
}
