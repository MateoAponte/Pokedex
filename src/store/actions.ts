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
  setShowPreview: (show) => {
    state.showPreview.value = show;
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
  getSprite(sprites) {
    return sprites.versions['generation-v']
      ? sprites.versions['generation-v']['black-white'].animated.front_default
      : sprites.front_default;
  },
  getPokemonTypes(types) {
    return types.map(
      (elementType: any) =>
        elementType.sprites['generation-viii']['sword-shield'].name_icon
    );
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
  async getPokemonByName(pokemonName) {
    return await PokeApi.getPokemonByName(pokemonName)
      .then(async (response) => {
        this.setShowPreview(true);
        const { name, weight, height, sprites, types } = response.data;
        const pokemon = {
          name,
          weight,
          height,
          sprite: this.getSprite(sprites),
          types,
        };
        const parsedTypes = await this.fetchPokemonTypes(pokemon);

        const typesResources = this.getPokemonTypes(parsedTypes);

        state.currentPokemon.value = { ...pokemon, types: typesResources };
        console.log(state.currentPokemon.value);
      })
      .catch((error) => {
        this.setShowPreview(false);
        return error;
      });
  },
};
