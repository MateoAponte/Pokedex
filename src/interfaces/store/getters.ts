import { TypesPokemon } from '../pokemon/TypesPokemon';
import { State } from './state';

export interface Getters {
  getPokemonTypes: (state: State) => TypesPokemon[];
}
