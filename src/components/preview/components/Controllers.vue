<template>
  <div class="poke-controllers">
    <PokeButton
      id="button-control"
      text="All"
      :color="props.mode === MODE.ALL ? 'red' : 'gray'"
      size="medium"
      :icon="BxListUl"
      @click="$emit('changeContent', MODE.ALL)"
    />
    <PokeButton
      id="button-control"
      text="Favorites"
      :color="props.mode === MODE.FAVORITES ? 'red' : 'gray'"
      size="medium"
      :icon="AkStar"
      @click="$emit('changeContent', MODE.FAVORITES)"
    />
  </div>
</template>

<script lang="ts" setup>
import { BxListUl } from '@kalimahapps/vue-icons';
import { AkStar } from '@kalimahapps/vue-icons';

import { PokeControllers } from '@/interfaces/components/PokeControllers';
import { MODE } from '@/constants/mode.ts';

const props = defineProps<PokeControllers>();

const $emit = defineEmits(['changeContent']);
</script>
