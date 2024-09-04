import { PokemonList } from '@/interfaces/pokemon/PokemonList';

export interface ListPokemonApi {
  count: number;
  next: string;
  previous: string;
  results: PokemonList[];
}

export interface PokemonApi {
  [key: string]: any;
}
export interface MovementApi {
  [key: string]: any;
}
