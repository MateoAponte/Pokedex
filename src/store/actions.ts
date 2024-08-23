import PokeApi from '../api/PokeApi';
import { Actions } from '../interfaces/store/actions';
import { state } from './state';

export const actions: Actions = {
  setPokemons: (pokemons) => {
    state.pokemons.value = pokemons;
  },
  setFavorites: (favorities) => {
    state.favorities.value = favorities;
  },
  setCurrentPokemon: (pokemon) => {
    state.currentPokemon.value = pokemon;
  },
  setPagination: () => {
    state.pagination.value = {
      current: state.pagination.value.current + state.pagination.value.step,
      next: state.pagination.value.step * 2,
      step: state.pagination.value.step,
    };
  },
  async getPokemonsByPagination() { 
    const { current, next } = state.pagination.value;
    return await PokeApi.getAllPokemons(current, next)
      .then((response) => {
        state.pokemons.value = response.data.results;
        state.pagination.value = response.data;
      })
      .catch((error) => {
        return error;
      });
  },
};
