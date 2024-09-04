import { Movement, Pokemon } from '../pokemon/Pokemon';

export interface Preview extends Pokemon {
  currentMovement: Movement;
}
