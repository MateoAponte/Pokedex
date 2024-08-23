<template>
  <PokeInput placeholder="Buscar" :icon="BxSearch" v-model="filter" />
</template>

<script lang="ts" setup>
import { BxSearch } from '@kalimahapps/vue-icons';
import { usePokemonStore } from '../../../store';
import { watch } from 'vue';

const pokemonStore = usePokemonStore();

const filter = defineModel({});

watch(filter, (value) => {
  pokemonStore.setFilter(value);
  !!filter.value
    ? pokemonStore.filterPokemons(value)
    : pokemonStore.resetPokemons();
});
</script>
