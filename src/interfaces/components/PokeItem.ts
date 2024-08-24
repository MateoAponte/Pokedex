import { PokemonList } from '../pokemon/PokemonList';

export interface PokeItem {
  pokemon: PokemonList;
  id: number;
  favorite?: boolean;
}
