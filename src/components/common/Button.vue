<template>
  <button
    :disabled="props.isDisabled"
    :class="['poke-button', colorButton, isLoading, isDisabled, colorSize]"
  >
    <span class="poke-button__icon">
      <props.icon v-if="props.icon" />
    </span>
    <span class="poke-button__text">
      {{ text }}
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ButtonProps } from '@/interfaces/Button.ts';

const props = defineProps<ButtonProps>();

const isLoading = computed(() => {
  return props.isLoading ? 'poke-button--loading ' : '';
});
const isDisabled = computed(() => {
  return props.isDisabled ? 'poke-button--disabled ' : '';
});
const colorButton = computed(() => {
  return `poke-button--${props.color}`;
});
const colorSize = computed(() => {
  return `poke-button--${props.size}`;
});
</script>
