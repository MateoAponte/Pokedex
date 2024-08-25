<template>
  <div class="loader">
    <div class="loader__element">
      <img :src="Loader" alt="Loader image about a pokeball" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Loader from '@/assets/images/loader.svg';
</script>
