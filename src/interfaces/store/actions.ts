import { AxiosResponse } from 'axios';
import { Pokemon } from '../pokemon/Pokemon';
import { PokemonList } from '../pokemon/PokemonList';
import { ListPokemonApi, PokemonApi } from '../api/PokemonApi';

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
  fetchPokemonTypes: (pokemon: Pokemon) => Promise<AxiosResponse[]>;
  filterPokemons: (filter: string) => void;
  setFilter: (filter: string) => void;
  resetPokemons: () => void;
  getPokemonsByPagination: () => Promise<AxiosResponse<ListPokemonApi>>;
  getPokemonByName: (pokemonName: string) => Promise<AxiosResponse<PokemonApi>>;
  parsedPokemonFetch: (response: AxiosResponse<PokemonApi>) => Promise<void>;
}
