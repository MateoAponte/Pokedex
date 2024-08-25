import { MODE } from '@/constants/mode';

export interface Pokedex {
  show: boolean;
  isLoading: boolean;
  isFiltered: boolean;
  mode: MODE;
}
