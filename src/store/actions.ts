import PokeApi from '../api/PokeApi';
import { getPokemonTypes, getSprite } from '../helpers/PokeDataBuilder';
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
            return pokemon.id ? { ...pokemon } : { ...pokemon, id: index };
          }
        );
        state.pokemons.value = [...state.cachePokemons.value];
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
  async getPokemonByName(pokemonName) {
    return await PokeApi.getPokemonByName(pokemonName)
      .then(async (response) => {
        this.setShowPreview(true);
        const { name, weight, height, sprites, types, id } = response.data;
        const pokemon = {
          name,
          weight,
          height,
          sprite: getSprite(sprites),
          types,
        };
        const parsedTypes = await this.fetchPokemonTypes(pokemon);
        const typesResources = getPokemonTypes(parsedTypes);

        state.currentPokemon.value = { ...pokemon, types: typesResources };
      })
      .catch((error) => {
        this.setShowPreview(false);
        return error;
      });
  },
};
