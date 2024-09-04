import PokeApi from '@/api/PokeApi';

import { Actions } from '@/interfaces/store/actions';
import { state } from './state';
import LocalStorageManagement from '@/helpers/LocalStorageManagment';

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
      return a.pokeId - b.pokeId;
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
        (poke) => poke.pokeId === pokemon.pokeId
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
    LocalStorageManagement.setItem(
      LocalStorageManagement.key,
      JSON.stringify(state.favorities.value)
    );
  },
  setCurrentPokemon: (pokemon) => {
    const updatedPokemon = state.favorities.value.find(
      (poke) => poke.pokeId === pokemon.pokemonId
    );

    state.currentPokemon.value = updatedPokemon
      ? { ...pokemon, favorite: true }
      : pokemon;
  },
  setPagination: () => {
    state.pagination.value = {
      current: state.pagination.value.current + state.pagination.value.step,
      next: state.pagination.value.step,
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
      // @ts-ignore
      .then((response) => {
        state.cachePokemons.value.push(...response.data);
        state.cachePokemons.value = state.cachePokemons.value.map(
          (pokemon) => ({ ...pokemon, favorite: false })
        );

        state.pokemons.value = [...state.cachePokemons.value];
        this.updatePokemonWithFavorites();
      })
      // @ts-ignore
      .catch((error) => {
        return error;
      });
  },
  async getPokemonById(pokemonName) {
    return await PokeApi.getPokemonById(pokemonName)
      // @ts-ignore
      .then(async (response: any) => {
        this.setShowPreview(true);
        this.setCurrentPokemon(response.data);
        return response.data;
      })
      .catch((error: any) => {
        this.setShowPreview(false);
        return error;
      });
  },
  setCurrentMovement(movement) {
    state.currentMovement.value = movement;
  },
  setCurrentMovementInVoid() {
    state.currentMovement.value = {
      text: '',
      name: '',
      type: '',
      power: 0,
      pp: 0,
      movementId: 0,
      id: '',
    };
  },
  async getMovementByName(name) {
    return await PokeApi.getMovementByName(name)
      // @ts-ignore
      .then(async (response: any) => {
        this.setCurrentMovement(response.data);
        return response.data;
      })
      .catch((error: any) => {
        return error;
      });
  },
};
