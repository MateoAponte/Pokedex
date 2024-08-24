<template>
  <div class="preview">
    <Pokedex
      :show="showPreview"
      :isLoading="isLoading"
      :isFiltered="!!filter"
      @loadNewContent="getNewPokemons"
    >
      <template #filter>
        <Filter />
      </template>
      <template #information>
        <PokeList
          :list="pokemons"
          @setPokemon="setCurrentPokemon"
          @updateFavorite="updateFavorite"
          @deleteFavorite="deleteFavorite"
        />
      </template>
      <template #controllers>
        <Controllers />
      </template>
      <template #preview>
        <Preview
          v-bind="{ ...currentPokemon }"
          @close="setClosePreview"
          @updateFavorite="updatePreviewFavorite"
          @sharePokemon="copyToClipboard"
        />
      </template>
      <template #loader>
        <Loader />
      </template>
    </Pokedex>
  </div>
</template>

<script lang="ts" setup>
import Pokedex from '../components/preview/Pokedex.vue';
import Filter from '../components/preview/components/Filter.vue';
import PokeList from '../components/preview/components/PokeList.vue';
import Controllers from '../components/preview/components/Controllers.vue';
import Loader from '../components/preview/components/Loader.vue';
import Preview from '../components/preview/components/Preview.vue';
import { onMounted, ref } from 'vue';
import { usePokemonStore } from '../store';
import { storeToRefs } from 'pinia';
import { PokemonList } from '../interfaces/pokemon/PokemonList';
import { Pokemon } from '../interfaces/pokemon/Pokemon';
import LocalStorageManagement from '../helpers/LocalStorageManagment';
import router from '../router';

const isLoading = ref(false);

const pokemonStore = usePokemonStore();

const { pokemons, currentPokemon, showPreview, filter } =
  storeToRefs(pokemonStore);

const getNewPokemons = (executePagination: boolean) => {
  if (isLoading.value) return;
  isLoading.value = true;
  executePagination && pokemonStore.setPagination();
  pokemonStore.getPokemonsByPagination().finally(() => {
    isLoading.value = false;
  });
};
const setCurrentPokemon = (pokemon: PokemonList) => {
  router.replace({ path: '/preview', query: { name: pokemon.name } });
  pokemonStore.getPokemonByName(pokemon.name);
};
const copyToClipboard = async () => {
  navigator.clipboard.writeText(window.location.href);
};
const setClosePreview = () => {
  router.replace({ path: '/preview' });
  pokemonStore.setShowPreview(false);
};
const updatePreviewFavorite = (pokemon: Pokemon) => {
  const pokePreview = pokemons.value.find((poke) => poke.id === pokemon.id);
  if (pokePreview) {
    setCurrentPokemon({ ...pokePreview, favorite: pokemon.favorite });
    pokePreview.favorite = pokemon.favorite;

    console.log(pokePreview.favorite);

    pokePreview.favorite
      ? pokemonStore.addFavorites(pokePreview)
      : pokemonStore.deleteFavorites(pokePreview);
    pokemonStore.updatePokemonWithFavorites();
  }
};

const deleteFavorite = (pokemon: PokemonList) => {
  pokemonStore.deleteFavorites(pokemon);
};
const updateFavorite = (pokemon: PokemonList) => {
  pokemonStore.addFavorites(pokemon);
  pokemonStore.updatePokemonWithFavorites();
};

onMounted(() => {
  const favorites = LocalStorageManagement.getItem(LocalStorageManagement.key);
  if (favorites) pokemonStore.setFavorites(JSON.parse(favorites));
  getNewPokemons(false);
});
</script>
