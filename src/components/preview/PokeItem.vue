<template>
  <div class="poke-item">
    <span class="poke-item__name"> {{ props.pokemon.name }} </span>
    <span class="poke-item__rate poke-rate">
      <BxSolidStar />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { BxSolidStar } from '@kalimahapps/vue-icons';
import { PokeItem } from '../../interfaces/components/PokeItem';

const props = defineProps<PokeItem>();
</script>
