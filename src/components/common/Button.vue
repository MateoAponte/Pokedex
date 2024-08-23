<template>
  <button
    :disabled="props.isDisabled"
    :class="['poke-button', colorButton, isLoading, isDisabled, colorSize]"
  >
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
import { ButtonProps } from '../../interfaces/Button.ts';

const props = defineProps<ButtonProps>();

const isLoading = props.isLoading ? 'poke-button--loading ' : '';
const isDisabled = props.isDisabled ? 'poke-button--disabled ' : '';
const colorButton = `poke-button--${props.color}`;
const colorSize = `poke-button--${props.size}`;
</script>
