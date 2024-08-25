<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { InputProps } from '@/interfaces/Input.ts';

const $emit = defineEmits(['update:value']);
const props = defineProps<InputProps>();

// Definimos el modelo usando defineModel
const modelValue = defineModel<string>();

const onFocus = ref<boolean>(false);
const input = ref<HTMLElement | null>(null);

const isError = computed(() => (props.isError ? 'poke-input--error ' : ''));
const isFocus = computed(() => (onFocus.value ? 'poke-input--focus ' : ''));

const handleClick = (event: Event) => {
  const target = event.target as HTMLElement;
  if (input.value && input.value.contains(target)) {
    onFocus.value = true;
  } else {
    onFocus.value = false;
  }
};
const emitValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    modelValue.value = target.value;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClick);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClick);
});
</script>

<template>
  <div :class="['poke-input', isFocus, isError]" ref="input">
    <div class="poke-input__icon" v-if="props.icon && !onFocus">
      <props.icon />
    </div>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.isDisabled"
      :required="props.isRequired"
      class="poke-input__field"
      :value="modelValue"
      @input="emitValue"
    />
  </div>
</template>
