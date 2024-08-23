import { PokemonList } from '../pokemon/PokemonList';

export interface PokemonApi {
  count: number;
  next: string;
  previous: string;
  results: PokemonList[];
}
