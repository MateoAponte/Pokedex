<template>
  <div class="preview">
    <Pokedex :show="showPreview">
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
    </Pokedex>
  </div>
</template>

<script lang="ts" setup>
import Pokedex from '../components/preview/Pokedex.vue';
import Filter from '../components/preview/Filter.vue';
import PokeList from '../components/preview/PokeList.vue';
import Controllers from '../components/preview/Controllers.vue';
import Preview from '../components/preview/Preview.vue';
import { onMounted } from 'vue';
import { usePokemonStore } from '../store';
import { storeToRefs } from 'pinia';
import { PokemonList } from '../interfaces/pokemon/PokemonList';

const pokemonStore = usePokemonStore();

const { pokemons, currentPokemon, showPreview } = storeToRefs(pokemonStore);

const setCurrentPokemon = (pokemon: PokemonList) => {
  pokemonStore.getPokemonByName(pokemon.name);
};
const setClosePreview = () => {
  pokemonStore.setShowPreview(false);
};

onMounted(() => {
  pokemonStore.getPokemonsByPagination();
});
</script>
