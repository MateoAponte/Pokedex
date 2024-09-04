<template>
  <div class="preview__backdrop">
    <div class="preview__element">
      <div class="preview__image">
        <img
          class="preview__image-background"
          :src="Background"
          alt="Background image"
        />
        <span class="preview__image-tag">
          # {{ getDecenes(props.pokemonId) }}
        </span>
        <img class="preview__image-content" :src="props.sprites" alt="" />
        <span class="preview__close">
          <AnFilledCloseCircle @click="handleClose" />
        </span>
        <MovementInfo
          v-bind="{ ...props.currentMovement }"
          @close="closeMovementPopover"
        />
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
            <img :src="types.sprite" alt="asdasd" />
          </span>
        </div>
        <div class="preview__info-item">
          <span class="preview__info-item__label"> Base stats: </span>
          <div class="preview__info-item__stats">
            <div
              class="preview__info-item__stats-content"
              v-for="stat in getStats"
            >
              <span class="preview__info-item__stats-label">
                <component :is="getStatIcon(stat.name)" />
                {{ processName(stat.name) }}
              </span>
              <span class="preview__info-item__stats-text">
                {{ stat.base_stat }}
              </span>
            </div>
          </div>
        </div>
        <div class="preview__info-item">
          <span class="preview__info-item__label"> Passive Skills: </span>
          <div class="preview__info-item__abilities">
            <div
              class="preview__info-item__abilities-content"
              v-for="passive in getPassives"
            >
              <span class="preview__info-item__abilities-label">
                <div>
                  <component :is="getStatIcon(passive.name)" />
                  {{ passive.name }}
                </div>
                <component
                  class="preview__info-item__abilities--icon"
                  :is="getHidden(passive.isHidden)"
                />
              </span>
              <span class="preview__info-item__abilities-text">
                {{ passive.text }}
              </span>
            </div>
          </div>
        </div>
        <div class="preview__info-item">
          <span class="preview__info-item__label"> Movements: </span>
          <div class="preview__info-item__move">
            <div
              class="preview__info-item__move-content"
              v-for="move in getMoves"
              @click="updateMove(move)"
            >
              <span class="preview__info-item__move-label">
                {{ move }}
              </span>
            </div>
          </div>
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
import { computed, ComputedRef } from 'vue';
import Background from '@/assets/images/background.png';
import { AnFilledCloseCircle, BxSolidStar } from '@kalimahapps/vue-icons';
import { getDecenes } from '@/helpers/PokeDataBuilder';

import { GlStatusHealth } from '@kalimahapps/vue-icons';
import { LuSwords } from '@kalimahapps/vue-icons';
import { FaShieldHeart } from '@kalimahapps/vue-icons';
import { FaShieldHalved } from '@kalimahapps/vue-icons';
import { FaExplosion } from '@kalimahapps/vue-icons';
import { FlFilledRun } from '@kalimahapps/vue-icons';
import { PhFillGear } from '@kalimahapps/vue-icons';
import { IconStat } from '@/interfaces/pokemon/Stat';
import { McIncognitoModeFill } from '@kalimahapps/vue-icons';
import { TypesPokemon } from '@/interfaces/pokemon/TypesPokemon';
import { Preview } from '@/interfaces/components/Preview';

import MovementInfo from './MovementInfo.vue';

const $emit = defineEmits([
  'close',
  'updateFavorite',
  'share',
  'sharePokemon',
  'updateMovement',
]);

const props = defineProps<Preview>();

const getSummaryFields = computed(() => {
  const {
    sprites,
    types,
    favorite,
    id,
    stats,
    abilities,
    moves,
    currentMovement,
    ...content
  } = props;
  const fields = Object.keys(content).map((key: string) => ({
    value: (content as any)[key],
    key,
  }));
  const addDataToFields = proccessFields(fields);
  return addDataToFields;
});
const getTypes: ComputedRef<TypesPokemon[]> = computed(() => {
  const { types } = props;
  return types;
});
const getStats = computed(() => {
  const { stats } = props;
  return stats;
});
const getMoves = computed(() => {
  const { moves } = props;
  return moves;
});
const getPassives = computed(() => {
  const { abilities } = props;
  return abilities;
});
const processName = (name: string) => {
  return name.replace(/-/g, ' ');
};
const getHidden = (isHidden: boolean) => {
  return isHidden ? McIncognitoModeFill : null;
};

const getStatIcon = (name: string) => {
  const icons: IconStat = {
    hp: GlStatusHealth,
    attack: LuSwords,
    defense: FaShieldHeart,
    'special-attack': FaExplosion,
    'special-defense': FaShieldHalved,
    speed: FlFilledRun,
  };
  return icons[name] || PhFillGear;
};
const closeMovementPopover = () => {
  $emit('updateMovement', '');
};
const updateMove = (move: string) => {
  $emit('updateMovement', move);
};
const proccessFields = (fields: any) => {
  return fields.map((field: any) => {
    if (field.key === 'weight') {
      field.value = processWeight(field.value);
    }
    if (field.key === 'height') {
      field.value = processHeight(field.value);
    }
    return field;
  });
};
const processWeight = (weight: number) => {
  return `${weight / 10} Kg`;
};
const processHeight = (height: number) => {
  return `${height / 10} mt`;
};

const handleShare = () => {
  $emit('sharePokemon');
};
const handleClose = () => {
  $emit('close');
};
</script>
