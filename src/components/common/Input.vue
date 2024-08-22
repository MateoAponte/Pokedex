<template>
  <input
    :type="props.type"
    :placeholder="props.placeholder"
    :disabled="props.isDisabled"
    :required="props.isRequired"
    :class="['poke-input', isError]"
  />
</template>

<script lang="ts" setup>
import { InputProps } from '../..//interfaces/Input.ts';

const props = defineProps<InputProps>();

const isError = props.isError ? 'poke-input--error ' : '';
</script>
