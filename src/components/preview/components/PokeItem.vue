<template>
  <div class="poke-item">
    <span class="poke-item__name">
      <span class="poke-item__tag"> # {{ getDecenes }} </span>
      {{ props.pokemon.name }}
    </span>
    <span class="poke-item__rate poke-rate">
      <BxSolidStar />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { BxSolidStar } from '@kalimahapps/vue-icons';
import { PokeItem } from '../../../interfaces/components/PokeItem';
import { computed } from 'vue';

const props = defineProps<PokeItem>();

const getDecenes = computed(() => {
  const realNumber = props.id + 1;
  return realNumber.toString().padStart(4, '0');
});
</script>
