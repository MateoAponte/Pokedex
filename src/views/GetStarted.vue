<template>
  <div class="get-started">
    <div class="get-started__image">
      <img
        class="get-started__image-character"
        :src="PokeImage"
        alt="Image about pokedex"
      />
      <img
        class="get-started__image-circle"
        :src="PokeCircle"
        alt="Background of the Poke image"
      />
    </div>
    <PokeText
      class="get-started__title"
      text="Welcome to Pokédex!"
      type="heading"
    />
    <PokeText
      class="get-started__helper"
      text="The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world."
      type="common"
      alignment="center"
    />
    <PokeButton
      text="Get Started"
      size="medium"
      color="red"
      @click="setCookie()"
    />
  </div>
</template>

<script lang="ts" setup>
import PokeImage from '@/assets/images/item.svg';
import PokeCircle from '@/assets/images/circle.svg';
import router from '@/router/index';
import CookieManagement from '@/helpers/CookieManagement';

const setCookie = () => {
  CookieManagement.setCookie('poke-started', 'true', 15);
  router.push('/preview');
};
</script>
