<template>
  <div class="poke-list">
    <PokeItem
      v-for="(pokemon, index) in props.list"
      :key="index"
      :pokemon="pokemon"
    />
  </div>
</template>

<script lang="ts" setup>
import { PokeList } from '../../interfaces/components/Pokelist';
import PokeItem from './PokeItem.vue';

const props = defineProps<PokeList>();
</script>
