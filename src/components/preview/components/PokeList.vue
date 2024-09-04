<template>
  <div class="poke-list" ref="previewContent">
    <RecycleScroller
      class="poke-list__container"
      :items="getPokemons"
      :item-size="96"
    >
      <template v-slot="{ item }">
        <PokeItem
          :key="item.id"
          :pokemon="item"
          :id="item.pokeId"
          @click="handleClick(item)"
          @update:favorite="updateFavorite($event)"
        />
      </template>
      <template #after>
        <div
          class="preview__loader"
          ref="loadMoreTrigger"
          v-if="props.mode === MODE.ALL"
        >
          <Loader />
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { PokeItem as PokeItemInterface } from '@/interfaces/components/PokeItem';
import { PokeList } from '@/interfaces/components/Pokelist';
import { PokemonList } from '@/interfaces/pokemon/PokemonList';
import { usePokemonStore } from '@/store';
import PokeItem from './PokeItem.vue';
import { storeToRefs } from 'pinia';
import Loader from './Loader.vue';

// @ts-ignore
import { RecycleScroller } from 'vue-virtual-scroller';
import { MODE } from '@/constants/mode';

const pokemonStore = usePokemonStore();
const {} = storeToRefs(pokemonStore);

const previewContent = ref<HTMLElement | null>(null);
const loadMoreTrigger = ref<HTMLElement | null>(null);

const $emit = defineEmits([
  'setPokemon',
  'updateFavorite',
  'deleteFavorite',
  'loadNewContent',
]);

const props = defineProps<PokeList>();

const getPokemons = computed(() => {
  return props.list;
});

const handleScroll = () => {
  const trigger = loadMoreTrigger.value;
  const container = previewContent.value;

  console.log('Handle Scroll');
  if (container) {
    const triggerFather = container.childNodes[0];
    if (trigger && triggerFather) {
      const triggerPosition = trigger.getBoundingClientRect().top;
      const containerBottomPosition = container.getBoundingClientRect().bottom;

      if (triggerPosition <= containerBottomPosition) {
        console.log('Trigger position is within container bottom position');
        $emit('loadNewContent', true);
      }
    }
  }
};

const updateFavorite = (pokemon: PokeItemInterface) => {
  const updatedPokemon = props.list.find((poke) => poke.pokeId === pokemon.id);
  pokemon.pokemon.favorite = pokemon.favorite || false;
  pokemon.favorite
    ? $emit('updateFavorite', updatedPokemon)
    : $emit('deleteFavorite', updatedPokemon);
};

const handleClick = (pokemon: PokemonList) => {
  $emit('setPokemon', pokemon);
};

onMounted(() => {
  const container = previewContent.value;
  const content = container?.childNodes[0];

  if (container && content) {
    content.addEventListener('scroll', handleScroll);
  }
});
</script>
