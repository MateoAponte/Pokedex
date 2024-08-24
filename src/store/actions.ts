import PokeApi from '../api/PokeApi';
import {
  buildCurrentPokemonData,
  getPokemonTypes,
} from '../helpers/PokeDataBuilder';
import { Pokemon } from '../interfaces/pokemon/Pokemon';
import { Actions } from '../interfaces/store/actions';
import { state } from './state';
import LocalStorageManagement from '../helpers/LocalStorageManagment';

export const actions: Actions = {
  setPokemons: (pokemons) => {
    state.pokemons.value = pokemons;
  },
  setLocalStorageFavorites: (pokemons) => {
    LocalStorageManagement.setItem(
      LocalStorageManagement.key,
      JSON.stringify(pokemons)
    );
  },
  addFavorites: (pokemon) => {
    state.favorities.value.push(pokemon);
    state.favorities.value = state.favorities.value.sort((a, b) => {
      return a.id - b.id;
    });
    actions.setLocalStorageFavorites(state.favorities?.value);
  },
  setFavorites: (favorites) => {
    state.favorities.value = favorites;
    actions.setLocalStorageFavorites(favorites);
  },
  updatePokemonWithFavorites: () => {
    state.pokemons.value.forEach((pokemon, index) => {
      const updatedPokemon = state.favorities.value.find(
        (poke) => poke.id === pokemon.id
      );
      if (updatedPokemon) {
        state.pokemons.value[index].favorite = true;
      }
    });
  },
  deleteFavorites: (pokemon) => {
    state.favorities.value = state.favorities.value.filter((poke) => {
      return poke.id !== pokemon.id;
    });
  },
  setCurrentPokemon: (pokemon) => {
    const updatedPokemon = state.favorities.value.find(
      (poke) => poke.id === pokemon.id
    );

    state.currentPokemon.value = updatedPokemon
      ? { ...pokemon, favorite: true }
      : pokemon;
  },
  setPagination: () => {
    state.pagination.value = {
      current: state.pagination.value.current + state.pagination.value.step,
      next: state.pagination.value.step + 20,
      step: state.pagination.value.step,
    };
  },
  setShowPreview: (show) => {
    state.showPreview.value = show;
  },
  filterPokemons: (filter) => {
    state.pokemons.value = state.cachePokemons.value.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(filter.toLowerCase());
    });
  },
  setFilter: (filter) => {
    state.filter.value = filter;
  },
  resetPokemons: () => {
    state.pokemons.value = [...state.cachePokemons.value];
  },
  async getPokemonsByPagination() {
    const { current, next } = state.pagination.value;
    return await PokeApi.getAllPokemons(current, next)
      .then((response) => {
        state.cachePokemons.value.push(...response.data.results);
        state.cachePokemons.value = state.cachePokemons.value.map(
          (pokemon, index) => {
            return pokemon.id
              ? { ...pokemon, favorite: false }
              : { ...pokemon, id: index + 1, favorite: false };
          }
        );
        state.pokemons.value = [...state.cachePokemons.value];
        this.updatePokemonWithFavorites();
      })
      .catch((error) => {
        return error;
      });
  },
  async fetchPokemonTypes(pokemon) {
    const promises = pokemon.types.map(
      (elementType: any) => elementType.type.url
    );

    return await Promise.all([
      ...promises.map((url) => PokeApi.getTypes(url)),
    ]).then((response) => {
      const data = response.map((element: any) => element.data);
      return data;
    });
  },
  async parsedPokemonFetch(response) {
    this.setShowPreview(true);
    const pokemon = buildCurrentPokemonData(response);
    const parsedTypes = await this.fetchPokemonTypes(pokemon);
    const typesResources = getPokemonTypes(parsedTypes);
    state.currentPokemon.value = { ...pokemon, types: typesResources };
  },
  async getPokemonByName(pokemonName) {
    return await PokeApi.getPokemonByName(pokemonName)
      .then(async (response) => {
        this.parsedPokemonFetch(response);
        return response;
      })
      .catch((error) => {
        this.setShowPreview(false);
        return error;
      });
  },
};
