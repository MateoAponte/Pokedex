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
        <PokeList :list="pokemons" @setPokemon="setCurrentPokemon" />
      </template>
      <template #controllers>
        <Controllers />
      </template>
      <template #preview>
        <Preview v-bind="{ ...currentPokemon }" @close="setClosePreview" />
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

const isLoading = ref(false);

const pokemonStore = usePokemonStore();

const { pokemons, currentPokemon, showPreview, filter } =
  storeToRefs(pokemonStore);

const getNewPokemons = (executePagination: boolean) => {
  if (isLoading.value) return;
  isLoading.value = true;
  executePagination && pokemonStore.setPagination();
  console.log(isLoading.value);

  pokemonStore.getPokemonsByPagination().finally(() => {
    isLoading.value = false;
  });
};
const setCurrentPokemon = (pokemon: PokemonList) => {
  pokemonStore.getPokemonByName(pokemon.name);
};
const setClosePreview = () => {
  pokemonStore.setShowPreview(false);
};

onMounted(() => {
  getNewPokemons(false);
});
</script>
