import { AxiosResponse } from 'axios';
import { Pokemon } from '../pokemon/Pokemon';
import { PokemonList } from '../pokemon/PokemonList';
import { ListPokemonApi, PokemonApi } from '../api/PokemonApi';
import { ListTypesApi, TypesApi } from '../api/TypesApi';

export interface Actions {
  setPokemons: (pokemons: PokemonList[]) => void;
  setFavorites: (pokemons: PokemonList[]) => void;
  setCurrentPokemon: (pokemon: Pokemon) => void;
  setPagination: () => void;
  setShowPreview: (show: boolean) => void;
  fetchPokemonTypes: (pokemon: Pokemon) => Promise<AxiosResponse[]>;
  getPokemonsByPagination: () => Promise<AxiosResponse<ListPokemonApi>>;
  getPokemonByName: (pokemonName: string) => Promise<AxiosResponse<PokemonApi>>;
}
