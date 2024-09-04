import { Stat } from './Stat';
import { Abilitie } from './Abilitie';

export interface Pokemon {
  name: string;
  weight: number;
  height: number;
  sprites: string;
  types: string[];
  favorite: boolean;
  id: number;
  pokemonId: number;
  stats: Stat[];
  abilities: Abilitie[];
}
