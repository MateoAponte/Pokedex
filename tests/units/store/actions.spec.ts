import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { state } from '@/store/state'; // Ajusta la ruta según la estructura de tu proyecto
import PokeApi from '@/api/PokeApi'; // Ajusta la ruta según la estructura de tu proyecto
import LocalStorageManagement from '@/helpers/LocalStorageManagment'; // Ajusta la ruta según la estructura de tu proyecto
import { usePokemonStore } from '@/store'; // Ajusta la ruta según la estructura de tu proyecto
import { createPinia, setActivePinia } from 'pinia';
import PaginatedPokemon from '../__mocks__/payloads/PaginatedPokemons.json';
import PokemonByName from '../__mocks__/payloads/PokemonByName.json';

vi.mock('@/api/PokeApi'); // Mockea el módulo PokeApi
vi.mock('@/helpers/LocalStorageManagment'); // Mockea el módulo LocalStorageManagement

let pokemonStore;

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    pokemonStore = usePokemonStore();

    vi.clearAllMocks();
    state.pokemons.value = [];
    state.cachePokemons.value = [];
    state.favorities.value = [];
    state.currentPokemon.value = null;
    state.pagination.value = { current: 0, next: 10, step: 10 };
    state.showPreview.value = false;
  });

  it('setPokemons should update state.pokemons', () => {
    pokemonStore.setPokemons(PaginatedPokemon.results);
    expect(state.pokemons.value).toEqual(PaginatedPokemon.results);
  });

  it('setLocalStorageFavorites should call setItem on LocalStorageManagement', () => {
    const pokemons = [{ name: 'Pikachu', id: 1 }];
    pokemonStore.setLocalStorageFavorites(pokemons);
    expect(LocalStorageManagement.setItem).toHaveBeenCalledWith(
      LocalStorageManagement.key,
      JSON.stringify(pokemons)
    );
  });

  it('addFavorites should add a pokemon to state.favorities and update localStorage', () => {
    const pokemon = { name: 'Pikachu', id: 1, favorite: false };
    pokemonStore.addFavorites(pokemon);
    expect(state.favorities.value).toEqual([pokemon]);
  });

  it('getPokemonByName should fetch and set the current pokemon', async () => {
    PokeApi.getPokemonByName.mockResolvedValueOnce(PokemonByName);

    const result = await pokemonStore.getPokemonByName('Pikachu');

    expect(PokeApi.getPokemonByName).toHaveBeenCalledWith('Pikachu');
    expect(result).toEqual(PokemonByName);
  });
});
