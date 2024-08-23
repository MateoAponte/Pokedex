import { TypesPokemon } from './TypesPokemon';

export interface Pokemon {
  name: string;
  weight: number;
  height: number;
  sprite: string;
  types: TypesPokemon[];
}
