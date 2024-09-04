<template>
  <div class="preview">
    <Pokedex
      :show="showPreview"
      :mode="mode"
      :isLoading="isLoading"
      :isFiltered="!!filter"
    >
      <template #filter>
        <Filter />
      </template>
      <template #information>
        <PokeList
          :list="pokemons"
          :mode="mode"
          @setPokemon="setCurrentPokemon"
          @updateFavorite="updateFavorite"
          @deleteFavorite="deleteFavorite"
          @loadNewContent="getNewPokemons(true)"
        />
      </template>
      <template #controllers>
        <Controllers @changeContent="changeContent" :mode="mode" />
      </template>
      <template #preview>
        <Preview
          v-bind="{ ...currentPokemon }"
          :currentMovement="currentMovement"
          @close="setClosePreview"
          @updateFavorite="updatePreviewFavorite"
          @sharePokemon="copyToClipboard"
          @updateMovement="updateMovement"
        />
      </template>
      <template #loader>
        <!-- <Loader /> -->
      </template>
    </Pokedex>
    <PokeNotification
      :show="toast.show"
      :message="toast.message"
      :time="toast.time"
    />
  </div>
</template>

<script lang="ts" setup>
import Pokedex from '@/components/preview/Pokedex.vue';
import Filter from '@/components/preview/components/Filter.vue';
import PokeList from '@/components/preview/components/PokeList.vue';
import Controllers from '@/components/preview/components/Controllers.vue';
import Preview from '@/components/preview/components/Preview.vue';
import { onMounted, ref } from 'vue';
import { usePokemonStore } from '@/store/index.ts';
import { storeToRefs } from 'pinia';
import { PokemonList } from '@/interfaces/pokemon/PokemonList.ts';
import { Pokemon } from '@/interfaces/pokemon/Pokemon.ts';
import LocalStorageManagement from '@/helpers/LocalStorageManagment.ts';
import router from '@/router/index';
import { MODE } from '@/constants/mode.ts';

const isLoading = ref(false);
const mode = ref<MODE>(MODE.ALL);

const toast = ref({
  show: false,
  message: '',
  time: 5000,
});

const pokemonStore = usePokemonStore();

const {
  pokemons,
  currentPokemon,
  showPreview,
  filter,
  favorities,
  cachePokemons,
  currentMovement,
} = storeToRefs(pokemonStore);

const getNewPokemons = (executePagination: boolean) => {
  if (isLoading.value) return;
  isLoading.value = true;
  executePagination && pokemonStore.setPagination();
  pokemonStore.getPokemonsByPagination().finally(() => {
    isLoading.value = false;
  });
};
const setCurrentPokemon = (pokemon: PokemonList) => {
  router.replace({ path: '/preview', query: { id: pokemon.pokeId } });
  pokemonStore.getPokemonById(pokemon.pokeId);
};
const copyToClipboard = async () => {
  navigator.clipboard.writeText(window.location.href);
  toast.value.message = 'Copied to clipboard';
  toast.value.show = true;
  setTimeout(() => {
    toast.value.show = false;
  }, toast.value.time);
};
const setClosePreview = () => {
  router.replace({ path: '/preview' });
  pokemonStore.setShowPreview(false);
  pokemonStore.setCurrentMovementInVoid();
};
const updateMovement = (move: string) => {
  !!move
    ? pokemonStore.getMovementByName(move)
    : pokemonStore.setCurrentMovementInVoid();
};
const updatePreviewFavorite = (pokemon: Pokemon) => {
  const pokePreview = pokemons.value.find(
    (poke) => poke.pokeId === pokemon.pokemonId
  );

  if (pokePreview) {
    setCurrentPokemon({ ...pokePreview, favorite: pokemon.favorite });
    pokePreview.favorite = pokemon.favorite;

    pokePreview.favorite
      ? pokemonStore.addFavorites(pokePreview)
      : pokemonStore.deleteFavorites(pokePreview);
    pokemonStore.updatePokemonWithFavorites();
  }
};

const deleteFavorite = (pokemon: PokemonList) => {
  pokemonStore.deleteFavorites(pokemon);
};
const updateFavorite = (pokemon: PokemonList) => {
  pokemonStore.addFavorites(pokemon);
  pokemonStore.updatePokemonWithFavorites();
};

const changeContent = (modeContent: MODE) => {
  mode.value = modeContent;
  modeContent === MODE.ALL
    ? pokemonStore.setPokemons(cachePokemons.value)
    : pokemonStore.setPokemons(favorities.value);
};

onMounted(() => {
  const favorites = LocalStorageManagement.getItem(LocalStorageManagement.key);
  if (favorites) pokemonStore.setFavorites(JSON.parse(favorites));
  getNewPokemons(false);
});
</script>
