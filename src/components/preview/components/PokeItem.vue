<template>
  <div class="poke-item">
    <span class="poke-item__name">
      <span class="poke-item__tag"> # {{ getDecenes(props.id) }} </span>
      {{ props.pokemon.name }}
    </span>
    <span
      :class="[
        'poke-item__rate poke-rate',
        props.pokemon.favorite ? 'poke-rate--checked' : 'poke-rate--unchecked',
      ]"
      @click="
        $emit('update:favorite', {
          ...props,
          favorite: !props.pokemon.favorite,
        })
      "
    >
      <BxSolidStar />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { BxSolidStar } from '@kalimahapps/vue-icons';
import { PokeItem } from '@/interfaces/components/PokeItem';
import { getDecenes } from '@/helpers/PokeDataBuilder';

const props = defineProps<PokeItem>();

const $emit = defineEmits(['update:favorite']);
</script>
