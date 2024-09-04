import { Stat } from './Stat';
import { Abilitie } from './Abilitie';
import { TypesPokemon } from './TypesPokemon';

export interface Pokemon {
  name: string;
  weight: number;
  height: number;
  sprites: string;
  types: TypesPokemon[];
  favorite: boolean;
  id: number;
  pokemonId: number;
  stats: Stat[];
  abilities: Abilitie[];
  moves: string[];
}

export interface Movement {
  text: string;
  name: string;
  type: string;
  power: number;
  pp: number;
  movementId: number;
  id: string;
}
