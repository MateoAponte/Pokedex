import { Stat } from './Stat';

export interface Pokemon {
  name: string;
  weight: number;
  height: number;
  sprite: string;
  types: string[];
  favorite: boolean;
  id: number;
  stats: Stat[];
}
