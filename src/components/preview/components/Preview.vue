<template>
  <div class="preview__backdrop">
    <div class="preview__element">
      <div class="preview__image">
        <img
          class="preview__image-background"
          :src="Background"
          alt="Background image"
        />
        <span class="preview__image-tag"> # {{ getDecenes(props.id) }} </span>
        <img class="preview__image-content" :src="props.sprite" alt="" />
        <span class="preview__close">
          <AnFilledCloseCircle @click="handleClose" />
        </span>
      </div>
      <div class="preview__info">
        <div v-for="field of getSummaryFields" class="preview__info-item">
          <span class="preview__info-item__label"> {{ field.key }}: </span>
          <span class="preview__info-item__content">
            {{ field.value }}
          </span>
        </div>
        <div class="preview__info-item">
          <span class="preview__info-item__label"> Types: </span>
          <span
            class="preview__info-item__content preview__info-item__content--image"
            v-for="types in getTypes"
          >
            <img :src="types" alt="asdasd" />
          </span>
        </div>
      </div>
      <div class="preview__actions">
        <PokeButton
          text="Share to my friends"
          color="red"
          size="medium"
          @click="handleShare"
        />
        <div
          :class="[
            'poke-rate',
            props.favorite ? 'poke-rate--checked' : 'poke-rate--unchecked',
          ]"
          @click="
            $emit('updateFavorite', { ...props, favorite: !props.favorite })
          "
        >
          <BxSolidStar />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Pokemon } from '../../../interfaces/pokemon/Pokemon';
import Background from '../../../assets/images/background.png';
import { AnFilledCloseCircle, BxSolidStar } from '@kalimahapps/vue-icons';
import { getDecenes } from '../../../helpers/PokeDataBuilder';

const $emit = defineEmits(['close', 'updateFavorite', 'share', 'sharePokemon']);

const getSummaryFields = computed(() => {
  const { sprite, types, favorite, id, ...content } = props;
  return Object.keys(content).map((key: string) => ({
    value: (content as any)[key],
    key,
  }));
});
const getTypes = computed(() => {
  const { types } = props;
  return types;
});

const handleShare = () => {
  $emit('sharePokemon');
};
const handleClose = () => {
  $emit('close');
};

const props = defineProps<Pokemon>();
</script>
