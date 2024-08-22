<template>
  <span :class="['poke-text', `poke-text--${props.type}`]">
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
import { TextProps } from '../..//interfaces/Text.ts';

const props = defineProps<TextProps>();
</script>
