<template>
  <div class="poke-list">
    <PokeItem
      v-for="(pokemon, index) in props.list"
      :key="index"
      :pokemon="pokemon"
      :index="index"
      @click="handleClick(pokemon)"
    />
  </div>
</template>

<script lang="ts" setup>
import { PokeList } from '../../../interfaces/components/Pokelist';
import { PokemonList } from '../../../interfaces/pokemon/PokemonList';
import PokeItem from './PokeItem.vue';

const $emit = defineEmits(['setPokemon']);

const props = defineProps<PokeList>();

const handleClick = (pokemon: PokemonList) => {
  $emit('setPokemon', pokemon);
};
</script>
