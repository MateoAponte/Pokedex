<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { InputProps } from '../../interfaces/Input.ts';

const props = defineProps<InputProps>();

const onFocus = ref<boolean>(false);
const input = ref(null);

const isError = computed(() => (props.isError ? 'poke-input--error ' : ''));
const isFocus = computed(() => (onFocus.value ? 'poke-input--focus ' : ''));

const handleClick = (event: Event) => {
  if (input.value && input.value.contains(event.target)) {
    onFocus.value = true;
  } else {
    onFocus.value = false;
  }
  console.log(onFocus.value);
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
    />
  </div>
</template>
