<script lang="ts" setup>
import { MOVEMENTS } from '@/constants/movementType';
import { Movement } from '@/interfaces/pokemon/Pokemon';
import { AnFilledCloseCircle } from '@kalimahapps/vue-icons';
import { computed, ref } from 'vue';

const props = defineProps<Movement>();
const $emit = defineEmits(['close']);

const isClose = ref(false);

const canShow = computed(() => {
  return !!props.name && isClose.value;
});
const getStats = computed(() => {
  const { name, id, ...content } = props;
  isClose.value = true;
  const fields = Object.keys(content).map((key: string) => {
    let translateKey;
    if (key === 'movementId') translateKey = 'id';
    if (key === 'text') translateKey = 'Description';
    return {
      value: (content as any)[key],
      key: translateKey || key,
    };
  });
  return fields;
});
const getIcon = (stat: any) => {
  if (stat.key === 'type') return MOVEMENTS[stat.value];
};
const getText = (stat: any) => {
  if (stat.key === 'type') return `(${stat.value})`;
  return stat.value;
};

const handleClose = () => {
  isClose.value = false;
  setTimeout(() => {
    $emit('close');
  }, 800);
};
</script>

<template>
  <Transition name="fade">
    <div class="preview__image-movement" v-show="canShow">
      <div class="preview__image-movement-title">
        {{ props.name }}
        <span class="preview__image-movement-close">
          <AnFilledCloseCircle @click="handleClose" />
        </span>
      </div>
      <div class="preview__image-movement-stats container">
        <div v-for="stat of getStats" class="preview__image-movement-stat">
          <span class="preview__image-movement-label"> {{ stat.key }}: </span>
          <span
            :class="[
              'preview__image-movement-text',
              getIcon(stat) && 'preview__image-movement-text--description',
            ]"
          >
            <img
              v-if="getIcon(stat)"
              :src="getIcon(stat)"
              alt="Type movement icon"
            />
            {{ getText(stat) }}
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>
