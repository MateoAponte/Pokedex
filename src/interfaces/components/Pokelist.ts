import { MODE } from '@/constants/mode';
import { PokemonList } from '@/interfaces/pokemon/PokemonList';

export interface PokeList {
  list: Array<PokemonList>;
  mode: MODE;
}
