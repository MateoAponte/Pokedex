import { AxiosResponse } from 'axios';
import { Pokemon } from '../pokemon/Pokemon';
import { PokemonList } from '../pokemon/PokemonList';
import { PokemonApi } from '../api/PokemonApi';

export interface Actions {
  setPokemons: (pokemons: PokemonList[]) => void;
  setFavorites: (pokemons: PokemonList[]) => void;
  setCurrentPokemon: (pokemon: Pokemon) => void;
  setPagination: () => void;
  getPokemonsByPagination: () => Promise<AxiosResponse<PokemonApi>>;
}
