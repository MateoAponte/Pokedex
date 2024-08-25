<template>
  <span :class="['poke-text', `poke-text--${props.type}`, textAlign]">
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
import { TextProps } from '@//interfaces/Text.ts';

const props = defineProps<TextProps>();
const textAlign = props.alignment ? `poke-button--${props.alignment}` : '';
</script>
