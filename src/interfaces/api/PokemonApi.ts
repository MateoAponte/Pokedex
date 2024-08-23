import { PokemonList } from '../pokemon/PokemonList';

export interface ListPokemonApi {
  count: number;
  next: string;
  previous: string;
  results: PokemonList[];
}

export interface PokemonApi {
  [key: string]: any;
}
