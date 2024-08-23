import { Ref } from 'vue';
import { Pokemon } from '../pokemon/Pokemon';
import { PokemonList } from '../pokemon/PokemonList';
import { Pagination } from '../api/Pagination';

export interface State {
  cachePokemons: Ref<PokemonList[]>;
  pokemons: Ref<PokemonList[]>;
  favorities: Ref<PokemonList[]>;
  currentPokemon: Ref<Pokemon>;
  pagination: Ref<Pagination>;
  showPreview: Ref<boolean>;
  filter: Ref<string>;
}
