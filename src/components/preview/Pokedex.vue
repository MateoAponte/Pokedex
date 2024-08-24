<template>
  <div class="preview-content" ref="previewContent">
    <slot name="filter" />
    <slot name="noContent" />
    <slot name="information" />
    <div ref="loadMoreTrigger" v-if="showLoader">
      <div class="preview__loader">
        <slot name="loader" />
      </div>
    </div>
  </div>
  <div v-if="props.show">
    <slot name="preview" />
  </div>
  <slot name="controllers" />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { Pokedex } from '../../interfaces/components/Pokedex';
import { MODE } from '../../constants/mode';

const $emits = defineEmits(['loadNewContent']);

const props = defineProps<Pokedex>();

const previewContent = ref<HTMLElement | null>(null);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const showLoader = computed(() => {
  return !props.isFiltered && props.mode === MODE.ALL;
});

const handleScroll = () => {
  const trigger = loadMoreTrigger.value;
  const container = previewContent.value;
  if (trigger && container) {
    const triggerPosition = trigger.getBoundingClientRect().top;
    const containerBottomPosition = container.getBoundingClientRect().bottom;

    if (triggerPosition <= containerBottomPosition) {
      $emits('loadNewContent', true);
    }
  }
};

onMounted(() => {
  const container = previewContent.value;
  if (container) {
    container.addEventListener('scroll', handleScroll);
  }
});
</script>
