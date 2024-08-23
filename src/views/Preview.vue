<template>
  <div class="preview">
    <Pokedex>
      <template #filter>
        <Filter />
      </template>
      <template #information>
        <PokeList :list="pokemons" />
      </template>
      <template #controllers>
        <Controllers />
      </template>
    </Pokedex>
  </div>
</template>

<script lang="ts" setup>
import Pokedex from '../components/preview/Pokedex.vue';
import Filter from '../components/preview/Filter.vue';
import PokeList from '../components/preview/PokeList.vue';
import Controllers from '../components/preview/Controllers.vue';
import { onMounted } from 'vue';
import { usePokemonStore } from '../store';
import { storeToRefs } from 'pinia';

const pokemonStore = usePokemonStore();

const { pokemons } = storeToRefs(pokemonStore);

onMounted(() => {
  pokemonStore.getPokemonsByPagination();
});
</script>
