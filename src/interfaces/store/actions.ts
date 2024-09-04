import { AxiosResponse } from 'axios';
import { Movement, Pokemon } from '@/interfaces/pokemon/Pokemon';
import { PokemonList } from '@/interfaces/pokemon/PokemonList';
import {
  ListPokemonApi,
  MovementApi,
  PokemonApi,
} from '@/interfaces/api/PokemonApi';

export interface Actions {
  setPokemons: (pokemons: PokemonList[]) => void;
  addFavorites: (pokemons: PokemonList) => void;
  setFavorites: (pokemons: PokemonList[]) => void;
  deleteFavorites: (pokemons: PokemonList) => void;
  setLocalStorageFavorites: (pokemons: PokemonList[]) => void;
  updatePokemonWithFavorites: () => void;
  setCurrentPokemon: (pokemon: Pokemon) => void;
  setPagination: () => void;
  setShowPreview: (show: boolean) => void;
  filterPokemons: (filter: string) => void;
  setFilter: (filter: string) => void;
  resetPokemons: () => void;
  getPokemonsByPagination: () => Promise<AxiosResponse<ListPokemonApi>>;
  getPokemonById: (id: number) => Promise<AxiosResponse<PokemonApi>>;
  getMovementByName: (name: string) => Promise<AxiosResponse<MovementApi>>;
  setCurrentMovement: (movement: Movement) => void;
  setCurrentMovementInVoid: () => void;
}
