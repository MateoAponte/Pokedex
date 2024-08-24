<template>
  <div class="poke-list">
    <PokeItem
      v-for="(pokemon, index) in getPokemons"
      :key="index"
      :pokemon="pokemon"
      :id="pokemon.id"
      @click="handleClick(pokemon)"
      @update:favorite="updateFavorite($event)"
      @share="handleShare()"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { PokeItem as PokeItemInterface } from '../../../interfaces/components/PokeItem';
import { PokeList } from '../../../interfaces/components/Pokelist';
import { PokemonList } from '../../../interfaces/pokemon/PokemonList';
import { usePokemonStore } from '../../../store';
import PokeItem from './PokeItem.vue';

const pokemonStore = usePokemonStore();
const {} = pokemonStore;

const $emit = defineEmits(['setPokemon', 'updateFavorite', 'deleteFavorite']);

const props = defineProps<PokeList>();

const getPokemons = computed(() => {
  return props.list;
});

const updateFavorite = (pokemon: PokeItemInterface) => {
  const updatedPokemon = props.list.find((poke) => poke.id === pokemon.id);
  pokemon.pokemon.favorite = pokemon.favorite;
  pokemon.favorite
    ? $emit('updateFavorite', updatedPokemon)
    : $emit('deleteFavorite', updatedPokemon);
};

const handleClick = (pokemon: PokemonList) => {
  $emit('setPokemon', pokemon);
};
</script>
