<template>
  <div class="preview-content">
    <slot name="filter" />
    <slot name="noContent" />
    <slot name="information" />
  </div>
  <div v-show="props.show">
    <slot name="preview" />
  </div>
  <slot name="controllers" />
</template>

<script lang="ts" setup>
import { Pokedex } from '../../interfaces/components/Pokedex';

const props = defineProps<Pokedex>();
</script>
