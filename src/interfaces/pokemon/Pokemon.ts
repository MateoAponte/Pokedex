import { Stat } from './Stat';
import { Passive } from './Passive';

export interface Pokemon {
  name: string;
  weight: number;
  height: number;
  sprite: string;
  types: string[];
  favorite: boolean;
  id: number;
  stats: Stat[];
  passives: Passive[];
}
