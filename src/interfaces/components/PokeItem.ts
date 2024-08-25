import { PokemonList } from '@/interfaces/pokemon/PokemonList';

export interface PokeItem {
  pokemon: PokemonList;
  id: number;
  favorite?: boolean;
}
