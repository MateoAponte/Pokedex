<template>
  <div class="poke-controllers">
    <PokeButton text="All" color="red" size="medium" :icon="BxListUl" />
    <PokeButton text="Favorites" color="gray" size="medium" :icon="AkStar" />
  </div>
</template>

<script lang="ts" setup>
import { BxListUl } from '@kalimahapps/vue-icons';
import { AkStar } from '@kalimahapps/vue-icons';
</script>
