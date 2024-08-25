<template>
  <div class="preview__filter">
    <PokeInput placeholder="Buscar" :icon="BxSearch" v-model="filter" />
  </div>
</template>

<script lang="ts" setup>
import { BxSearch } from '@kalimahapps/vue-icons';
import { usePokemonStore } from '@/store';
import { watch } from 'vue';

const pokemonStore = usePokemonStore();

const filter = defineModel<string>('');

watch(filter, (value: string | undefined) => {
  if (value !== undefined) {
    pokemonStore.setFilter(value);
    if (!!value) {
      pokemonStore.filterPokemons(value);
    } else {
      pokemonStore.resetPokemons();
    }
  }
});
</script>
