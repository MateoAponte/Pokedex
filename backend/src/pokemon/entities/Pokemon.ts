import { Ability } from '@prisma/client';
import { Stat } from './Stat';
import { Type } from './Type';
import { Movement } from './Moves';

export interface IPokemon {
  abilities: Ability[];
  height: number;
  name: string;
  pokemonId: number;
  sprites: string;
  stats: Stat[];
  types: Type[];
  moves: Movement[];
  weight: number;
}

export interface BDPokemon {
  id: string;
  abilities: string[];
  height: number;
  name: string;
  pokemonId: number;
  sprites: string;
  stats: string;
  types: string[];
  moves: string[];
  weight: number;
}
